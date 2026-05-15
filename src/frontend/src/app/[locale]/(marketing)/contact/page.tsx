import type { Metadata } from "next";
import { APP_NAME } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: `Liên hệ — ${APP_NAME}`,
  description: "Liên hệ với chúng tôi để được hỗ trợ và tư vấn.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Liên hệ</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Có câu hỏi hay cần hỗ trợ? Chúng tôi luôn sẵn sàng giúp đỡ bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Mail className="w-5 h-5" />,
              title: "Email",
              value: "hello@example.com",
              desc: "Gửi email bất kỳ lúc nào",
            },
            {
              icon: <Phone className="w-5 h-5" />,
              title: "Điện thoại",
              value: "+84 123 456 789",
              desc: "Thứ 2 – Thứ 6, 8:00–17:00",
            },
            {
              icon: <MapPin className="w-5 h-5" />,
              title: "Địa chỉ",
              value: "Hà Nội, Việt Nam",
              desc: "123 Đường ABC, Quận XYZ",
            },
          ].map((item) => (
            <Card key={item.title} className="border-border/50 hover:border-primary/30 transition-colors text-center">
              <CardHeader className="pb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  {item.icon}
                </div>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">{item.value}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
