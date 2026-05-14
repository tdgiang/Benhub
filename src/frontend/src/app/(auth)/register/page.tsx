"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { APP_NAME } from "@/lib/constants";
import { useState } from "react";
import { ApiError } from "@/lib/api";

const registerSchema = z.object({
  firstName: z.string().min(1, "Vui lòng nhập tên"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json();
      if (!res.ok) throw new ApiError(res.status, body.message ?? "Đăng ký thất bại");

      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-border/50 bg-card/80 backdrop-blur">
      <CardHeader className="text-center pb-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Tạo tài khoản</CardTitle>
        <CardDescription>{APP_NAME} — Điền thông tin để đăng ký</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="register-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="register-name">Tên *</Label>
            <Input
              id="register-name"
              placeholder="Văn A"
              {...register("firstName")}
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="text-xs text-destructive">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email">Email *</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="ban@example.com"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">Mật khẩu *</Label>
            <div className="relative">
              <Input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="Tối thiểu 6 ký tự"
                {...register("password")}
                disabled={isSubmitting}
                className="pr-10"
              />
              <button
                type="button"
                id="register-toggle-password"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            id="register-submit-btn"
            className="w-full h-11"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Đăng ký"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            id="goto-login"
            className="text-primary hover:underline underline-offset-4 font-medium"
          >
            Đăng nhập
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
