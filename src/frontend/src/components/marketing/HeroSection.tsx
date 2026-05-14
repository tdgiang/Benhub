import { Award, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: "#050B18" }}
    >
      {/* ── Aurora background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Construction site photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: "url('/bg_login.png')" }}
        />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-slate-950/12 to-[#050B18]/60" />
        <div className="absolute inset-0 bg-linear-to-r from-[#050B18]/60 via-[#050B18]/15 to-[#050B18]/30" />

        {/* Gradient orbs */}
        <div
          className="absolute -top-32 -left-32 w-[700px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse, #F97316 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, #3B82F6 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-[600px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #F59E0B 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />

        {/* Grid */}
        {/* <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        /> */}

        {/* Vignette bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            background: "linear-gradient(to top, #050B18, transparent)",
          }}
        />

        {/* Animated GPS map SVG */}
        <svg
          viewBox="0 0 900 500"
          className="absolute inset-0 w-full h-full opacity-[0.08]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="r1"
            d="M150,80 Q280,150 380,260 Q460,350 520,430"
            stroke="#F97316"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="14 8"
            className="route-dash"
          />
          <path
            id="r2"
            d="M100,220 Q220,200 340,170 Q480,135 620,200 Q720,250 800,310"
            stroke="#F97316"
            strokeWidth="1"
            fill="none"
            strokeDasharray="10 12"
            className="route-dash-slow"
          />
          <path
            id="r3"
            d="M680,80 Q660,170 620,270 Q580,360 540,440"
            stroke="#FB923C"
            strokeWidth="1"
            fill="none"
            strokeDasharray="8 14"
            className="route-dash"
            style={{ animationDelay: "2s" }}
          />
          {[
            { cx: 150, cy: 80 },
            { cx: 380, cy: 260 },
            { cx: 520, cy: 430 },
            { cx: 100, cy: 220 },
            { cx: 800, cy: 310 },
            { cx: 680, cy: 80 },
          ].map(({ cx, cy }, i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={8}
                fill="#F97316"
                opacity="0.12"
                className="pulse-city"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <circle cx={cx} cy={cy} r={3.5} fill="#F97316" opacity="0.8" />
            </g>
          ))}
          <circle r="4" fill="#FB923C">
            <animateMotion dur="6s" repeatCount="indefinite">
              <mpath href="#r1" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#F97316">
            <animateMotion dur="9s" repeatCount="indefinite" begin="2s">
              <mpath href="#r2" />
            </animateMotion>
          </circle>
        </svg>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-2 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/6 backdrop-blur-xl border border-white/12 text-sm font-medium px-5 py-2.5 rounded-full mb-6 fade-up">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <Award className="w-4 h-4 text-orange-400" />
          <span className="text-slate-200">
            Nền tảng logistics công trình #1 Việt Nam
          </span>
        </div>

        {/* H1 */}
        <h1
          className="font-black text-white leading-none tracking-tight mb-5 fade-up"
          style={{
            fontFamily: "var(--font-barlow), system-ui, sans-serif",
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            animationDelay: "0.1s",
          }}
        >
          Số Hóa
          <br />
          Ngành Vận Tải
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #F97316 0%, #FBBF24 45%, #F97316 100%)",
            }}
          >
            Công Trình Việt Nam
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-7 leading-relaxed fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          BenHub số hóa toàn bộ chuỗi logistics xây dựng — từ điều phối xe ben,
          quản lý đội xe đến đối soát tài chính realtime.
          <br />
          <span className="text-white font-semibold">
            Minh bạch. Hiệu quả. Dữ liệu.
          </span>
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="/doi-tac"
            className="btn-glow inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
            }}
          >
            Đăng ký đối tác →
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-xl border border-white/15 hover:bg-white/12 hover:border-white/25 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all duration-200 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            Xem cách hoạt động
          </a>
        </div>

        {/* Social proof */}
        <div
          className="inline-flex flex-wrap justify-center gap-x-8 gap-y-3 pt-4 border-t text-sm mb-8 fade-up"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            animationDelay: "0.4s",
          }}
        >
          {["25,000+ xe tham gia", "100+ dự án vận hành", "16+ tỉnh thành"].map(
            (item) => (
              <span
                key={item}
                className="flex items-center gap-2 text-slate-400"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                {item}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
