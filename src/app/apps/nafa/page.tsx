'use client';

import { useEffect, useRef } from 'react';

export default function NAFAPage() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const API_BASE = 'https://radical-mounting-logging-fruit.trycloudflare.com';

    // ---- Rate Limiting (5 requests per 60 seconds) ----
    const RATE_LIMIT_MAX = 5;
    const RATE_LIMIT_WINDOW_MS = 60 * 1000;
    const requestTimestamps: number[] = [];
    let cooldownInterval: ReturnType<typeof setInterval> | null = null;

    function isRateLimited() {
      const now = Date.now();
      while (requestTimestamps.length > 0 && now - requestTimestamps[0] > RATE_LIMIT_WINDOW_MS) {
        requestTimestamps.shift();
      }
      return requestTimestamps.length >= RATE_LIMIT_MAX;
    }

    function getRemainingCooldown() {
      if (requestTimestamps.length === 0) return 0;
      const oldest = requestTimestamps[0];
      const elapsed = Date.now() - oldest;
      return Math.max(0, Math.ceil((RATE_LIMIT_WINDOW_MS - elapsed) / 1000));
    }

    function recordRequest() {
      requestTimestamps.push(Date.now());
    }

    const analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement | null;
    const errorBox = document.getElementById('errorBox') as HTMLElement | null;

    function showError(msg: string) {
      if (!errorBox) return;
      errorBox.textContent = msg;
      errorBox.classList.add('visible');
    }

    function startCooldownTimer() {
      if (cooldownInterval) clearInterval(cooldownInterval);
      const updateCooldown = () => {
        const remaining = getRemainingCooldown();
        if (remaining <= 0 || !isRateLimited()) {
          clearInterval(cooldownInterval!);
          cooldownInterval = null;
          errorBox?.classList.remove('visible');
          if (selectedFile && analyzeBtn) analyzeBtn.disabled = false;
          return;
        }
        if (analyzeBtn) analyzeBtn.disabled = true;
        showError(`Rate limit reached (${RATE_LIMIT_MAX} analyses per minute). Try again in ${remaining}s.`);
      };
      updateCooldown();
      cooldownInterval = setInterval(updateCooldown, 1000);
    }

    // ---- Elements ----
    const uploadZone = document.getElementById('uploadZone') as HTMLElement | null;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement | null;
    const uploadPrompt = document.getElementById('uploadPrompt') as HTMLElement | null;
    const previewContainer = document.getElementById('previewContainer') as HTMLElement | null;
    const previewImage = document.getElementById('previewImage') as HTMLImageElement | null;
    const previewFilename = document.getElementById('previewFilename') as HTMLElement | null;
    const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement | null;
    const loadingOverlay = document.getElementById('loadingOverlay') as HTMLElement | null;
    const resultsPanel = document.getElementById('resultsPanel') as HTMLElement | null;

    let selectedFile: File | null = null;

    uploadZone?.addEventListener('click', (e) => {
      if (e.target === analyzeBtn || e.target === resetBtn) return;
      fileInput?.click();
    });

    uploadZone?.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });

    uploadZone?.addEventListener('dragleave', () => {
      uploadZone.classList.remove('dragover');
    });

    uploadZone?.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      const dt = (e as DragEvent).dataTransfer;
      if (dt && dt.files.length > 0) handleFile(dt.files[0]);
    });

    fileInput?.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) handleFile(fileInput.files[0]);
    });

    function handleFile(file: File) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        showError('Please upload a JPEG, PNG, or WebP image.');
        return;
      }
      selectedFile = file;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (previewImage) previewImage.src = ev.target?.result as string;
        previewContainer?.classList.add('visible');
        if (uploadPrompt) uploadPrompt.style.display = 'none';
        uploadZone?.classList.add('has-image');
        if (previewFilename) previewFilename.textContent = file.name;
      };
      reader.readAsDataURL(file);
      if (analyzeBtn) analyzeBtn.disabled = isRateLimited();
      if (resetBtn) resetBtn.style.display = 'inline-flex';
      resultsPanel?.classList.remove('visible');
      errorBox?.classList.remove('visible');
    }

    analyzeBtn?.addEventListener('click', async () => {
      if (!selectedFile) return;
      if (isRateLimited()) { startCooldownTimer(); return; }

      if (analyzeBtn) analyzeBtn.disabled = true;
      loadingOverlay?.classList.add('visible');
      resultsPanel?.classList.remove('visible');
      errorBox?.classList.remove('visible');

      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch(`${API_BASE}/predict`, { method: 'POST', body: formData });

        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const waitSec = retryAfter ? parseInt(retryAfter) : 60;
          showError(`Server rate limit reached. Please wait ${waitSec} seconds before trying again.`);
          return;
        }

        const data = await response.json();
        if (!response.ok || data.error) { showError(data.error || 'Prediction failed.'); return; }

        recordRequest();
        displayResults(data);
      } catch (err) {
        showError('Connection error. Is the server running?');
        console.error(err);
      } finally {
        loadingOverlay?.classList.remove('visible');
        if (analyzeBtn) analyzeBtn.disabled = isRateLimited();
        if (isRateLimited()) startCooldownTimer();
      }
    });

    function displayResults(data: { water_percent: number | string; nutrition: { protein: number | string; carbs: number | string; fat: number | string; fiber: number | string; calories: number | string } }) {
      const waterEl = document.getElementById('waterValue');
      if (waterEl) waterEl.textContent = String(data.water_percent);
      const n = data.nutrition;
      const set = (id: string, val: number | string) => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(val);
      };
      set('proteinValue', n.protein);
      set('carbsValue', n.carbs);
      set('fatValue', n.fat);
      set('fiberValue', n.fiber);
      set('caloriesValue', n.calories);
      resultsPanel?.classList.add('visible');
    }

    resetBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      selectedFile = null;
      if (fileInput) fileInput.value = '';
      previewContainer?.classList.remove('visible');
      if (uploadPrompt) uploadPrompt.style.display = '';
      uploadZone?.classList.remove('has-image');
      if (analyzeBtn) analyzeBtn.disabled = true;
      if (resetBtn) resetBtn.style.display = 'none';
      resultsPanel?.classList.remove('visible');
      errorBox?.classList.remove('visible');
      loadingOverlay?.classList.remove('visible');
    });

    return () => {
      if (cooldownInterval) clearInterval(cooldownInterval);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .nafa-root *, .nafa-root *::before, .nafa-root *::after {
          margin: 0; padding: 0; box-sizing: border-box;
        }
        .nafa-root {
          --bg-primary: #0a0a0f;
          --bg-secondary: #12121a;
          --bg-card: #1a1a28;
          --bg-card-hover: #222236;
          --border: #2a2a40;
          --border-glow: #6c5ce7;
          --text-primary: #f0f0f5;
          --text-secondary: #9090b0;
          --text-muted: #606080;
          --accent-primary: #6c5ce7;
          --accent-secondary: #a29bfe;
          --accent-gradient: linear-gradient(135deg, #6c5ce7 0%, #a855f7 50%, #ec4899 100%);
          --success: #00d2a0;
          --warning: #fbc531;
          --error: #e74c3c;
          --radius: 16px;
          --radius-sm: 10px;
          --shadow-lg: 0 20px 60px rgba(0,0,0,0.5);
          --shadow-glow: 0 0 30px rgba(108,92,231,0.15);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }
        .nafa-root::before {
          content: '';
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background:
            radial-gradient(ellipse 600px 400px at 20% 20%, rgba(108,92,231,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 500px 300px at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 70%),
            radial-gradient(ellipse 400px 400px at 50% 50%, rgba(236,72,153,0.04) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .nafa-container {
          max-width: 960px; margin: 0 auto; padding: 40px 24px;
          position: relative; z-index: 1;
        }
        .nafa-header { text-align: center; margin-bottom: 48px; }
        .nafa-header .badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 16px; background: rgba(108,92,231,0.12);
          border: 1px solid rgba(108,92,231,0.25); border-radius: 100px;
          font-size: 12px; font-weight: 600; color: var(--accent-secondary);
          letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 20px;
        }
        .badge .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--success); animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .nafa-header h1 {
          font-size: 42px; font-weight: 800; letter-spacing: -1.5px;
          background: var(--accent-gradient); -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1.15; margin-bottom: 8px;
        }
        .nafa-header .subtitle { font-size: 15px; color: var(--text-secondary); font-weight: 400; }
        .upload-zone {
          background: var(--bg-card); border: 2px dashed var(--border);
          border-radius: var(--radius); padding: 56px 32px; text-align: center;
          cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .upload-zone:hover { border-color: var(--accent-primary); background: var(--bg-card-hover); box-shadow: var(--shadow-glow); }
        .upload-zone.dragover { border-color: var(--accent-primary); background: rgba(108,92,231,0.08); transform: scale(1.01); }
        .upload-zone.has-image { padding: 24px; border-style: solid; border-color: var(--border); }
        .upload-icon {
          width: 64px; height: 64px; margin: 0 auto 20px; border-radius: 50%;
          background: rgba(108,92,231,0.12); display: flex; align-items: center; justify-content: center;
        }
        .upload-icon svg { width: 28px; height: 28px; stroke: var(--accent-secondary); }
        .upload-zone h3 { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .upload-zone p { font-size: 14px; color: var(--text-muted); }
        input[type="file"] { display: none; }
        .preview-container { display: none; flex-direction: column; align-items: center; gap: 16px; }
        .preview-container.visible { display: flex; }
        .preview-image { max-width: 100%; max-height: 360px; border-radius: var(--radius-sm); object-fit: contain; }
        .preview-filename { font-size: 13px; color: var(--text-muted); }
        .btn-row { display: flex; gap: 12px; justify-content: center; margin-top: 24px; }
        .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px; font-size: 15px; font-weight: 600; border: none; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.25s ease; font-family: inherit; letter-spacing: -0.2px; }
        .btn-primary { background: var(--accent-gradient); color: white; box-shadow: 0 4px 20px rgba(108,92,231,0.35); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(108,92,231,0.45); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-secondary { background: var(--bg-card-hover); color: var(--text-secondary); border: 1px solid var(--border); }
        .btn-secondary:hover { color: var(--text-primary); border-color: var(--text-muted); }
        .loading-overlay { display: none; flex-direction: column; align-items: center; justify-content: center; padding: 48px; gap: 24px; }
        .loading-overlay.visible { display: flex; }
        .spinner { width: 48px; height: 48px; border: 3px solid var(--border); border-top-color: var(--accent-primary); border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-text { font-size: 15px; color: var(--text-secondary); animation: fade-pulse 1.5s ease-in-out infinite; }
        @keyframes fade-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        .results-panel { display: none; margin-top: 32px; animation: slide-up 0.5s ease; }
        .results-panel.visible { display: block; }
        @keyframes slide-up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .results-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .results-header h2 { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
        .check-icon { width: 24px; height: 24px; border-radius: 50%; background: rgba(0,210,160,0.15); display: flex; align-items: center; justify-content: center; }
        .check-icon svg { width: 14px; height: 14px; stroke: var(--success); }
        .water-card {
          background: linear-gradient(135deg, rgba(108,92,231,0.15) 0%, rgba(168,85,247,0.1) 100%);
          border: 1px solid rgba(108,92,231,0.25); border-radius: var(--radius);
          padding: 32px; text-align: center; margin-bottom: 20px; position: relative; overflow: hidden;
        }
        .water-card::before { content:''; position:absolute; top:-50%; left:-50%; width:200%; height:200%; background: radial-gradient(circle, rgba(108,92,231,0.06) 0%, transparent 50%); animation: float-bg 8s ease-in-out infinite; }
        @keyframes float-bg { 0%,100%{transform:translate(0,0)} 50%{transform:translate(5%,5%)} }
        .water-label { font-size: 13px; font-weight: 600; color: var(--accent-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; position: relative; }
        .water-value { font-size: 56px; font-weight: 800; letter-spacing: -2px; background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; position: relative; }
        .water-unit { font-size: 28px; font-weight: 600; }
        .nutrition-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
        .nutrition-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 20px; text-align: center; transition: all 0.25s ease; }
        .nutrition-card:hover { border-color: var(--accent-primary); background: var(--bg-card-hover); transform: translateY(-2px); }
        .nutrition-card .label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .nutrition-card .value { font-size: 28px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.5px; }
        .nutrition-card .unit { font-size: 13px; font-weight: 500; color: var(--text-secondary); margin-top: 4px; }
        .nutrition-card.protein { border-top: 3px solid #00b894; }
        .nutrition-card.carbs { border-top: 3px solid #fdcb6e; }
        .nutrition-card.fat { border-top: 3px solid #e17055; }
        .nutrition-card.fiber { border-top: 3px solid #74b9ff; }
        .nutrition-card.calories { border-top: 3px solid #e84393; }
        .error-box { display: none; background: rgba(231,76,60,0.1); border: 1px solid rgba(231,76,60,0.3); border-radius: var(--radius-sm); padding: 16px 20px; margin-top: 24px; color: #e74c3c; font-size: 14px; }
        .error-box.visible { display: block; animation: slide-up 0.3s ease; }
        .nafa-footer { text-align: center; margin-top: 56px; padding-top: 24px; border-top: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
        .nafa-footer span { background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 600; }
        @media (max-width: 640px) {
          .nafa-container { padding: 24px 16px; }
          .nafa-header h1 { font-size: 30px; }
          .water-value { font-size: 42px; }
          .nutrition-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="nafa-root">
        <div className="nafa-container">
          <header className="nafa-header">
            <div className="badge">
              <span className="dot"></span>
              AI-Powered Analysis
            </div>
            <h1>NAFA</h1>
            <p className="subtitle">Navdhi Advanced Food Analyser — Dal Nutrition Intelligence</p>
          </header>

          <div className="upload-zone" id="uploadZone">
            <div id="uploadPrompt">
              <div className="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <h3>Upload Dal Image</h3>
              <p>Drag &amp; drop or click to select — JPEG, PNG, WebP</p>
            </div>

            <div className="preview-container" id="previewContainer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="preview-image" id="previewImage" alt="Dal image preview" />
              <span className="preview-filename" id="previewFilename"></span>
            </div>

            <input type="file" id="fileInput" accept="image/jpeg,image/png,image/webp" />
          </div>

          <div className="btn-row">
            <button className="btn btn-primary" id="analyzeBtn" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Analyze
            </button>
            <button className="btn btn-secondary" id="resetBtn" style={{ display: 'none' }}>Clear</button>
          </div>

          <div className="loading-overlay" id="loadingOverlay">
            <div className="spinner"></div>
            <span className="loading-text">Analyzing dal composition...</span>
          </div>

          <div className="error-box" id="errorBox"></div>

          <div className="results-panel" id="resultsPanel">
            <div className="results-header">
              <div className="check-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2>Analysis Results</h2>
            </div>

            <div className="water-card">
              <div className="water-label">Predicted Water Content</div>
              <div className="water-value"><span id="waterValue">--</span><span className="water-unit">%</span></div>
            </div>

            <div className="nutrition-grid">
              <div className="nutrition-card protein">
                <div className="label">Protein</div>
                <div className="value" id="proteinValue">--</div>
                <div className="unit">g per 100g</div>
              </div>
              <div className="nutrition-card carbs">
                <div className="label">Carbs</div>
                <div className="value" id="carbsValue">--</div>
                <div className="unit">g per 100g</div>
              </div>
              <div className="nutrition-card fat">
                <div className="label">Fat</div>
                <div className="value" id="fatValue">--</div>
                <div className="unit">g per 100g</div>
              </div>
              <div className="nutrition-card fiber">
                <div className="label">Fiber</div>
                <div className="value" id="fiberValue">--</div>
                <div className="unit">g per 100g</div>
              </div>
              <div className="nutrition-card calories">
                <div className="label">Calories</div>
                <div className="value" id="caloriesValue">--</div>
                <div className="unit">kcal per 100g</div>
              </div>
            </div>
          </div>

          <footer className="nafa-footer">
            <p>Built with <span>NAFA</span> — Proprietary AI by Navdhi Innovations</p>
          </footer>
        </div>
      </div>
    </>
  );
}
