import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Topbar } from "@/components/cms/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Inbox, Eye, TrendingUp, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard — CMS" };

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

interface DashboardStats {
  posts: { total: number; published: number; draft: number };
  leads: { total: number; driver: number; partner: number; thisWeek: number };
  users: { total: number; active: number };
  recentLeads: { id: string; segment: string; fullName: string; phone: string; province: string | null; createdAt: string }[];
  recentPosts: { id: string; title: string; status: string; createdAt: string }[];
}

async function fetchStats(token: string): Promise<DashboardStats | null> {
  try {
    const res = await fetch(`${BACKEND}/api/v1/stats`, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const session = await auth();
  const stats = session?.accessToken ? await fetchStats(session.accessToken) : null;

  const statCards = [
    {
      title: "Tổng bài viết",
      value: stats?.posts.total ?? "—",
      sub: stats ? `${stats.posts.published} đã xuất bản · ${stats.posts.draft} nháp` : "...",
      icon: <FileText className="w-5 h-5" />,
      color: "text-blue-500",
      id: "stat-card-0",
    },
    {
      title: "Bài đã xuất bản",
      value: stats?.posts.published ?? "—",
      sub: stats ? `${stats.posts.draft} đang là nháp` : "...",
      icon: <Eye className="w-5 h-5" />,
      color: "text-green-500",
      id: "stat-card-1",
    },
    {
      title: "Leads đăng ký",
      value: stats?.leads.total ?? "—",
      sub: stats ? `+${stats.leads.thisWeek} trong 7 ngày qua` : "...",
      icon: <Inbox className="w-5 h-5" />,
      color: "text-orange-500",
      id: "stat-card-2",
    },
    {
      title: "Người dùng CMS",
      value: stats?.users.active ?? "—",
      sub: stats ? `${stats.users.total} tổng tài khoản` : "...",
      icon: <Users className="w-5 h-5" />,
      color: "text-violet-500",
      id: "stat-card-3",
    },
  ];

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
          <p className="text-muted-foreground mt-1">Tổng quan hoạt động của hệ thống.</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.id} id={stat.id} className="border-border/50 hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <span className={stat.color}>{stat.icon}</span>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leads distribution */}
        {stats && stats.leads.total > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  Phân khúc Leads
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-sm">Tài xế</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 rounded-full bg-orange-200 overflow-hidden" style={{ width: 120 }}>
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${stats.leads.total ? (stats.leads.driver / stats.leads.total) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-8 text-right">{stats.leads.driver}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm">Đối tác</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 rounded-full bg-blue-200 overflow-hidden" style={{ width: 120 }}>
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${stats.leads.total ? (stats.leads.partner / stats.leads.total) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-8 text-right">{stats.leads.partner}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent leads */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Leads gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentLeads.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Chưa có lead nào.</p>
                ) : (
                  <div className="space-y-2">
                    {stats.recentLeads.map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{lead.fullName}</p>
                          <p className="text-xs text-muted-foreground">{lead.phone} · {lead.province ?? "—"}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <Badge variant={lead.segment === "driver" ? "default" : "secondary"} className="text-[10px] py-0">
                            {lead.segment === "driver" ? "Tài xế" : "Đối tác"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent posts */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Bài viết gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            {!stats || stats.recentPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Chưa có bài viết nào. <a href="/cms/posts/new" className="text-primary hover:underline">Tạo bài viết đầu tiên →</a>
              </p>
            ) : (
              <div className="space-y-2">
                {stats.recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div className="min-w-0">
                      <a href={`/cms/posts/${post.id}/edit`} className="text-sm font-medium hover:text-primary truncate block">
                        {post.title}
                      </a>
                      <p className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</p>
                    </div>
                    <Badge variant={post.status === "PUBLISHED" ? "default" : "secondary"} className="shrink-0 ml-2">
                      {post.status === "PUBLISHED" ? "Xuất bản" : "Nháp"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
