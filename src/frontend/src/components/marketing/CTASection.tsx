import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  className?: string;
}

export function CTASection({ className }: CTASectionProps) {
  return (
    <section
      id="cta-section"
      className={`py-24 ${className ?? ""}`}
    >
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-12 md:p-16">
          {/* Background orbs */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Đăng nhập vào CMS để quản lý nội dung, hoặc khám phá codebase để tùy chỉnh theo nhu cầu của bạn.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                render={<Link href="/login" />}
                nativeButton={false}
                size="lg"
                id="cta-primary-btn"
                className="gap-2 text-base px-8 h-12 shadow-lg shadow-primary/25"
              >
                Vào CMS Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                render={<Link href="/about" />}
                nativeButton={false}
                size="lg"
                variant="outline"
                id="cta-secondary-btn"
                className="text-base px-8 h-12"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
