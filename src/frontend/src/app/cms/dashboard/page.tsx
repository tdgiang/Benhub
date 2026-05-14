import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Topbar } from "@/components/cms/Topbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Users, TrendingUp, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard — CMS",
};

const stats = [
  { title: "Tổng bài viết", value: "24", change: "+3 tuần này", icon: <FileText className="w-5 h-5" />, color: "text-blue-500" },
  { title: "Đã xuất bản", value: "18", change: "+2 tuần này", icon: <Eye className="w-5 h-5" />, color: "text-green-500" },
  { title: "Người dùng", value: "5", change: "Không đổi", icon: <Users className="w-5 h-5" />, color: "text-violet-500" },
  { title: "Lượt xem", value: "1.2K", change: "+12% tháng này", icon: <TrendingUp className="w-5 h-5" />, color: "text-orange-500" },
];

export default async function DashboardPage() {
  const session = await auth();

  return (
    <>
      <Topbar
        title="Dashboard"
        userName={session?.user?.name}
        userEmail={session?.user?.email}
        userImage={session?.user?.image}
      />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            Xin chào, {session?.user?.name ?? "Admin"} 👋
          </h2>
          <p className="text-muted-foreground mt-1">
            Đây là tổng quan hoạt động của hệ thống.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} id={`stat-card-${i}`} className="border-border/50 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <span className={stat.color}>{stat.icon}</span>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick actions */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Bài viết mới được tạo", time: "5 phút trước", author: "Admin" },
                { action: "Bài viết được xuất bản", time: "1 giờ trước", author: "Admin" },
                { action: "Cập nhật cài đặt hệ thống", time: "3 giờ trước", author: "Admin" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.author}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
