import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Topbar } from "@/components/cms/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cài đặt — CMS",
};

export default async function SettingsPage() {
  const session = await auth();

  return (
    <>
      <Topbar
        title="Cài đặt"
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userImage={session?.user?.image}
      />
      <main className="flex-1 p-6">
        <div className="max-w-2xl space-y-6">
          {/* App info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Thông tin ứng dụng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tên ứng dụng</span>
                <span className="font-medium text-sm">{APP_NAME}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Phiên bản</span>
                <Badge variant="secondary">v1.0.0</Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Framework</span>
                <span className="font-medium text-sm">Next.js 16</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Auth</span>
                <span className="font-medium text-sm">NextAuth v5</span>
              </div>
            </CardContent>
          </Card>

          {/* Account */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tên</span>
                <span className="font-medium text-sm">{session?.user?.name}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="font-medium text-sm">{session?.user?.email}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Vai trò</span>
                <Badge>{session?.user?.role ?? "USER"}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
