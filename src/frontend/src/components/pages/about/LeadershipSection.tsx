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
    title: "COO & Co-Founder",
    bio: "15 năm vận hành đội xe và dự án hạ tầng. Am hiểu sâu về bài toán logistics công trình từ thực tế hiện trường.",
    initials: "LC",
  },
  {
    name: "Nguyễn Thị Thuý",
    title: "CTO",
    bio: "Chuyên gia về AI và hệ thống phân tán. Từng xây dựng platform cho dự án quốc gia.",
    initials: "TB",
  },
];

const AVATAR_STYLES = [
  {
    bg: "linear-gradient(135deg, #F0B429 0%, #C8941A 100%)",
    ring: "rgba(240,180,41,0.3)",
  },
  {
    bg: "linear-gradient(135deg, #1E40AF 0%, #0F2246 100%)",
    ring: "rgba(30,64,175,0.3)",
  },
  {
    bg: "linear-gradient(135deg, #F97316 0%, #C2410C 100%)",
    ring: "rgba(249,115,22,0.3)",
  },
];

export function LeadershipSection() {
  const t = useTranslations("AboutUs");

  if (leaders.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      {/* Chapter watermark */}
      <div
        className="pointer-events-none absolute -left-6 top-6 select-none font-black leading-none text-slate-100"
        style={{
          fontFamily: "var(--font-barlow), system-ui, sans-serif",
          fontSize: "clamp(10rem, 20vw, 22rem)",
        }}
        aria-hidden="true"
      >
        06
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[#F0B429]" />
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F0B429]">
              {t("team_label")}
            </p>
          </div>
          <h2
            className="font-black leading-tight text-[#0F2246]"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
            }}
          >
            {t("team_h2")}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-500">
            {t("team_sub")}
          </p>
        </FadeUp>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader, i) => {
            const style = AVATAR_STYLES[i % AVATAR_STYLES.length];
            return (
              <FadeUp key={leader.name} delay={i * 100}>
                <div
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                  style={{
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
                    border: "1px solid #F1F5F9",
                  }}
                >
                  {/* Top gradient band */}
                  <div
                    className="relative h-24 overflow-hidden"
                    style={{ background: style.bg }}
                  >
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    {/* Avatar positioned at bottom */}
                    <div className="absolute bottom-0 left-6 translate-y-1/2">
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black text-white ring-4 ring-white"
                        style={{ background: style.bg }}
                      >
                        {leader.initials}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 pt-12">
                    <div>
                      <p className="text-base font-bold text-[#0F2246]">
                        {leader.name}
                      </p>
                      <p
                        className="mt-0.5 text-sm font-semibold"
                        style={{ color: "#F0B429" }}
                      >
                        {leader.title}
                      </p>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-[1.75] text-slate-500">
                      {leader.bio}
                    </p>

                    {leader.linkedin && (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-[#0F2246]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
