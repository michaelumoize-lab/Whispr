// app/(main)/layout.tsx
import Navbar from "@/components/Shared/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="px-6 md:px-8 lg:px-12 py-6">{children}</main>
    </>
  );
}
