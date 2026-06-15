import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[393px] md:max-w-[1440px] mx-auto min-h-screen bg-white flex flex-col overflow-x-hidden">
      {/* Navbar Global */}
      <Navbar />

      <main className="w-full flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
}