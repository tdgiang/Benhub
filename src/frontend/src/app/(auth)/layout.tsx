import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Xác thực — ${APP_NAME}`,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl bg-gradient-to-r from-violet-500 to-cyan-500 pointer-events-none" />
      </div>
      {children}
    </div>
  );
}
