import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NAFA — Navdhi Advanced Food Analyser',
  description: 'AI-powered dal water percentage prediction with nutrition scaling. Upload a dal image and get instant nutrition insights powered by Navdhi AI.',
  keywords: ['NAFA', 'food analyser', 'dal nutrition', 'AI food analysis', 'Navdhi'],
  openGraph: {
    title: 'NAFA — Navdhi Advanced Food Analyser',
    description: 'AI-powered dal water percentage prediction with nutrition scaling.',
    url: 'https://navdhi.com/apps/nafa',
    siteName: 'Navdhi',
    type: 'website',
  },
};

export default function NAFALayout({ children }: { children: React.ReactNode }) {
  return children;
}
