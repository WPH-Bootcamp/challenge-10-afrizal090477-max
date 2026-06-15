import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <h2 className="text-4xl font-bold mb-4">404 - Halaman Tidak Ditemukan</h2>
      <p className="text-muted-foreground mb-8">
        Maaf, halaman yang kamu cari tidak ada.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}