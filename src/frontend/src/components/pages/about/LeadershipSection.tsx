import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { FadeUp } from "@/components/ui/FadeUp";

interface Leader {
  name: string;
  title: string;
  bio: string;
  initials: string;
  linkedin?: string;
}

const leaders: Leader[] = [
  {
    name: "Nguyễn Văn Thi",
    title: "CEO & Co-Founder",
    bio: "10+ năm kinh nghiệm trong ngành logistics và công nghệ. Cựu quản lý cấp cao tại các tập đoàn xây dựng lớn tại Việt Nam.",
    initials: "NA",
  },
  {
    name: "Cao Quốc Thắng",
    title: "CTO & Co-Founder",
    bio: "Chuyên gia về AI và hệ thống phân tán. Từng xây dựng platform logistics cho 3 quốc gia Đông Nam Á.",
    initials: "TB",
  },
  {
    name: "Lê Văn Lộc",
    title: "COO",
    bio: "15 năm vận hành đội xe và dự án hạ tầng. Am hiểu sâu về bài toán logistics công trình từ thực tế hiện trường.",
    initials: "LC",
  },
];

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #F0B429 0%, #C8941A 100%)",
  "linear-gradient(135deg, #1E3A5F 0%, #0F2246 100%)",
  "linear-gradient(135deg, #F97316 0%, #ea580c 100%)",
];

export function LeadershipSection() {
  const t = useTranslations("AboutUs");

  if (leaders.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-12 text-center">
          <p
            className="mb-3 text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color: "#F0B429" }}
          >
            {t("team_label")}
          </p>
          <h2
            className="font-black leading-tight text-[#0F2246]"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {t("team_h2")}
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-base text-slate-500">
            {t("team_sub")}
          </p>
        </FadeUp>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader, i) => (
            <FadeUp key={leader.name} delay={i * 100}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-200 hover:border-[#F0B429]/40 hover:shadow-lg">
                {/* Avatar */}
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white"
                    style={{
                      background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                    }}
                  >
                    {leader.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#0F2246]">{leader.name}</p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#F0B429" }}
                    >
                      {leader.title}
                    </p>
                  </div>
                </div>
                {/* Bio */}
                <p className="flex-1 text-sm leading-relaxed text-slate-600">
                  {leader.bio}
                </p>
                {/* LinkedIn */}
                {leader.linkedin && (
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-[#0F2246]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
