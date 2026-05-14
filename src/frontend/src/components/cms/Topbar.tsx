import { Bell } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth";

interface TopbarProps {
  title?: string;
  userName?: string | null;
  userEmail?: string | null;
  userImage?: string | null;
}

export function Topbar({
  title,
  userName,
  userEmail,
  userImage,
}: TopbarProps) {
  return (
    <header
      id="cms-topbar"
      className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-30"
    >
      {title && (
        <h1 className="font-semibold text-lg">{title}</h1>
      )}
      {!title && <div />}

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Button
          variant="ghost"
          size="icon"
          id="topbar-notifications"
          aria-label="Thông báo"
        >
          <Bell className="w-5 h-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full"
                id="topbar-user-menu"
                aria-label="Menu người dùng"
              />
            }
          >
            <UserAvatar name={userName} image={userImage} className="w-8 h-8" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground font-normal">
                  {userEmail}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
                className="w-full"
              >
                <button
                  type="submit"
                  className="w-full text-left text-destructive text-sm"
                  id="topbar-logout"
                >
                  Đăng xuất
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
