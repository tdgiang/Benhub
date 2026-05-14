import {
  Zap,
  Shield,
  LayoutDashboard,
  Moon,
  Code2,
  Smartphone,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  LayoutDashboard: <LayoutDashboard className="w-6 h-6" />,
  Moon: <Moon className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
};

export function FeaturesSection({ className }: { className?: string }) {
  return (
    <section
      id="features-section"
      className={`py-24 ${className ?? ""}`}
    >
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Tính năng
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Mọi thứ bạn cần để bắt đầu
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Template được thiết kế để bạn có thể bắt đầu xây dựng sản phẩm ngay lập tức, không phải cấu hình.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <Card
              key={feature.title}
              id={`feature-card-${index}`}
              className="group relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              {/* Subtle gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  {iconMap[feature.icon] ?? <Zap className="w-6 h-6" />}
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
