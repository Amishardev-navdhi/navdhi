import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-2">Page Not Found</h2>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition">Go to Homepage</Link>
    </div>
  );
} 