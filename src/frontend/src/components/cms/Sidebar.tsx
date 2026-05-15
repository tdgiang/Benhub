"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Zap,
  LogOut,
  ChevronRight,
  Inbox,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { CMS_NAV_ITEMS, APP_NAME } from "@/lib/constants";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  Inbox: <Inbox className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
};

interface SidebarProps {
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
}

export function Sidebar({ userName, userEmail, userImage }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      id="cms-sidebar"
      className="fixed left-0 top-0 bottom-0 w-60 flex flex-col border-r bg-card z-40"
    >
      {/* Header */}
      <div className="h-16 flex items-center gap-2.5 px-4 border-b">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">{APP_NAME}</p>
          <p className="text-xs text-muted-foreground leading-tight">CMS</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
          Menu
        </p>
        {CMS_NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/cms/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              id={`sidebar-${item.icon.toLowerCase()}`}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <span
                className={cn(
                  "shrink-0 transition-transform duration-200",
                  "group-hover:scale-110",
                  isActive && "scale-110"
                )}
              >
                {iconMap[item.icon]}
              </span>
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 opacity-60" />}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User footer */}
      <div className="p-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
          <UserAvatar name={userName} image={userImage} className="w-8 h-8" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName ?? "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            id="sidebar-logout-btn"
            onClick={() => signOut({ callbackUrl: "/login" })}
            aria-label="Đăng xuất"
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
