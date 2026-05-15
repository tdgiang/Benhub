import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Code2, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: `Giới thiệu — ${APP_NAME}`,
  description: "Tìm hiểu về dự án và công nghệ sử dụng trong base template này.",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Về chúng tôi</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Giới thiệu về <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Một base template Next.js 14 production-ready được thiết kế để tăng tốc quá trình phát triển landing page và CMS nội bộ.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Sứ mệnh",
              desc: "Giúp developers bắt đầu dự án mới nhanh hơn với một nền tảng vững chắc, không cần mất thời gian cấu hình từ đầu.",
            },
            {
              icon: <Code2 className="w-6 h-6" />,
              title: "Công nghệ",
              desc: "Sử dụng những công nghệ tốt nhất: Next.js 14, TypeScript strict, shadcn/ui, NextAuth v5 và Tailwind CSS v4.",
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: "Mục tiêu",
              desc: "Template production-ready, dễ mở rộng và tái sử dụng được trên nhiều dự án khác nhau.",
            },
          ].map((item) => (
            <Card key={item.title} className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tech stack */}
        <div className="rounded-2xl border bg-muted/30 p-8">
          <h2 className="font-bold text-xl mb-6">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["Next.js 16", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "NextAuth v5", "pnpm", "ESLint", "Prettier"].map(
              (tech) => (
                <Badge key={tech} variant="secondary" className="justify-center py-2 text-sm font-medium">
                  {tech}
                </Badge>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
