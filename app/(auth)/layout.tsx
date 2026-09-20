import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (session?.user) redirect("/dashboard");

  return (
    <div className="min-h-svh w-full flex items-center justify-center">
      {children}
    </div>
  );
}
