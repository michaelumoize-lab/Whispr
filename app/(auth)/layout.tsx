import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      {children}
    </div>
  );
}

// // app/(auth)/layout.tsx
// import { getServerSession } from "@/lib/get-session";
// import { redirect } from "next/navigation";
// import { ReactNode } from "react";

// export default async function AuthLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const session = await getServerSession();
//   const user = session?.user;

//   if (user) redirect("/dashboard");

//   return children;
// }
