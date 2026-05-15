"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Truck,
  User,
  Building2,
  Briefcase,
  CheckCircle2,
  Loader2,
  Lock,
  Zap,
} from "lucide-react";

type Segment = "fleet_owner" | "driver" | "investor" | "partner";

const segments: {
  id: Segment;
  icon: typeof Truck;
  label: string;
  description: string;
}[] = [
  {
    id: "fleet_owner",
    icon: Truck,
    label: "Chủ Đội Xe",
    description: "Sở hữu hoặc quản lý đội xe ben",
  },
  {
    id: "driver",
    icon: User,
    label: "Tài Xế",
    description: "Tài xế xe ben muốn có việc đều",
  },
  {
    id: "investor",
    icon: Building2,
    label: "Chủ Đầu Tư / Tổng Thầu",
    description: "Cần giải pháp quản lý vận tải dự án",
  },
  {
    id: "partner",
    icon: Briefcase,
    label: "Nhà Đầu Tư / Đối Tác",
    description: "Muốn hợp tác hoặc đầu tư vào BenHub",
  },
];

const PROVINCES = [
  "An Giang",
  "Bà Rịa – Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cần Thơ",
  "Cao Bằng",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hồ Chí Minh",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

const baseSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .regex(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)"),
  note: z.string().max(500, "Tối đa 500 ký tự").optional(),
});

const schema = baseSchema.extend({
  email: z.string().email("Email không hợp lệ").or(z.literal("")).optional(),
  province: z.string().optional(),
  fleetSize: z.coerce
    .number()
    .int()
    .positive("Phải là số dương")
    .optional()
    .or(z.nan()),
  licensePlate: z.string().optional(),
  companyName: z.string().optional(),
  projectScale: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type SuccessData = { fullName: string; phone: string };

export function RegisterSection() {
  const [step, setStep] = useState<1 | 2>(1);
  const [segment, setSegment] = useState<Segment | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState<SuccessData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  function selectSegment(s: Segment) {
    setSegment(s);
    setStep(2);
  }

  function goBack() {
    setStep(1);
    setSegment(null);
    setSubmitStatus("idle");
    reset();
  }

  async function onSubmit(values: FormValues) {
    if (!segment) return;
    setSubmitStatus("loading");
    setErrorMsg("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const res = await fetch(`${apiUrl}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, segment, source: "landing_page" }),
      });

      if (res.ok || res.status === 201) {
        setSuccess({ fullName: values.fullName, phone: values.phone });
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.message ?? "Có lỗi xảy ra. Vui lòng thử lại.");
        setSubmitStatus("error");
      }
    } catch {
      setErrorMsg("Không kết nối được máy chủ. Vui lòng thử lại sau.");
      setSubmitStatus("error");
    }
  }

  const showEmail = segment !== "driver";
  const showProvince = segment !== "partner";
  const showFleetSize = segment === "fleet_owner";
  const showLicensePlate = segment === "driver";
  const showCompany = segment === "investor" || segment === "partner";
  const showProjectScale = segment === "investor";

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-colors text-slate-900 placeholder-slate-400 text-sm bg-white";
  const labelCls = "block text-sm font-semibold text-slate-700 mb-1.5";
  const errorCls = "text-red-500 text-xs mt-1.5";

  return (
    <section
      id="register"
      className="py-16 md:py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)",
      }}
    >
      {/* Subtle overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, #fff 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-9">
          <h2
            className="font-black text-white leading-tight mb-3"
            style={{
              fontFamily: "var(--font-barlow), system-ui, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            Tham gia hệ sinh thái BenHub
          </h2>
          <p className="text-orange-100 text-lg">
            Đội ngũ sẽ liên hệ với bạn trong vòng 24 giờ làm việc
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Success screen */}
          {success ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-2xl shadow-orange-900/20">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3
                className="font-black text-slate-900 mb-3"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  fontSize: "2rem",
                }}
              >
                Đăng ký thành công!
              </h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Cảm ơn{" "}
                <strong className="text-slate-900">{success.fullName}</strong>.
                Đội ngũ BenHub sẽ liên hệ với bạn qua số{" "}
                <strong className="text-orange-600">{success.phone}</strong>{" "}
                trong vòng <strong>24 giờ làm việc</strong>.
              </p>
              <p className="text-slate-500 text-sm mb-6">
                Trong thời gian chờ, hãy theo dõi BenHub tại:
              </p>
              <div className="flex justify-center gap-3 mb-6">
                {["Facebook", "Zalo OA", "LinkedIn"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-xs font-semibold text-slate-600 hover:text-orange-500 px-3 py-1.5 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    {s}
                  </a>
                ))}
              </div>
              <button
                onClick={goBack}
                className="text-slate-400 hover:text-slate-700 text-sm transition-colors cursor-pointer"
              >
                Đăng ký thêm →
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-2xl shadow-orange-900/20 overflow-hidden">
              {/* Step indicator */}
              <div className="flex border-b border-slate-100">
                {[1, 2].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 py-4 text-center text-sm font-semibold transition-colors ${
                      s === step
                        ? "text-orange-600 border-b-2 border-orange-500"
                        : "text-slate-400"
                    }`}
                  >
                    Bước {s}: {s === 1 ? "Chọn nhóm" : "Điền thông tin"}
                  </div>
                ))}
              </div>

              <div className="p-7">
                {/* Step 1: Segment selection */}
                {step === 1 && (
                  <div className="grid grid-cols-2 gap-3">
                    {segments.map(({ id, icon: Icon, label, description }) => (
                      <button
                        key={id}
                        onClick={() => selectSegment(id)}
                        className="group flex flex-col items-center gap-3 p-5 rounded-xl border-2 border-slate-100 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 text-center cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-200">
                          <Icon className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm mb-0.5">
                            {label}
                          </p>
                          <p className="text-slate-400 text-xs leading-tight">
                            {description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 2: Form */}
                {step === 2 && (
                  <div>
                    {/* Segment pill + back */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200 text-orange-700 text-sm font-semibold">
                        {(() => {
                          const seg = segments.find((s) => s.id === segment)!;
                          const Icon = seg.icon;
                          return (
                            <>
                              <Icon className="w-3.5 h-3.5" />
                              {seg.label}
                            </>
                          );
                        })()}
                      </div>
                      <button
                        onClick={goBack}
                        className="text-sm text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        ← Thay đổi
                      </button>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                      noValidate
                    >
                      {/* Full name */}
                      <div>
                        <label htmlFor="fullName" className={labelCls}>
                          Họ và tên *
                        </label>
                        <input
                          id="fullName"
                          {...register("fullName")}
                          placeholder="Nguyễn Văn Thi"
                          className={inputCls}
                        />
                        {errors.fullName && (
                          <p className={errorCls}>{errors.fullName.message}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className={labelCls}>
                          Số điện thoại *
                        </label>
                        <input
                          id="phone"
                          {...register("phone")}
                          type="tel"
                          placeholder="0912345678"
                          className={inputCls}
                        />
                        {errors.phone && (
                          <p className={errorCls}>{errors.phone.message}</p>
                        )}
                      </div>

                      {/* Email (conditional) */}
                      {showEmail && (
                        <div>
                          <label htmlFor="email" className={labelCls}>
                            Email{" "}
                            {segment === "investor" || segment === "partner"
                              ? "*"
                              : ""}
                          </label>
                          <input
                            id="email"
                            {...register("email")}
                            type="email"
                            placeholder="example@email.com"
                            className={inputCls}
                          />
                          {errors.email && (
                            <p className={errorCls}>{errors.email.message}</p>
                          )}
                        </div>
                      )}

                      {/* Province (conditional) */}
                      {showProvince && (
                        <div>
                          <label htmlFor="province" className={labelCls}>
                            Tỉnh / Thành phố *
                          </label>
                          <select
                            id="province"
                            {...register("province")}
                            className={`${inputCls} cursor-pointer`}
                          >
                            <option value="">-- Chọn tỉnh/thành --</option>
                            {PROVINCES.map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Fleet size */}
                      {showFleetSize && (
                        <div>
                          <label htmlFor="fleetSize" className={labelCls}>
                            Số lượng xe hiện có
                          </label>
                          <input
                            id="fleetSize"
                            {...register("fleetSize")}
                            type="number"
                            min={1}
                            placeholder="Ví dụ: 10"
                            className={inputCls}
                          />
                          {errors.fleetSize && (
                            <p className={errorCls}>
                              {errors.fleetSize.message}
                            </p>
                          )}
                        </div>
                      )}

                      {/* License plate */}
                      {showLicensePlate && (
                        <div>
                          <label htmlFor="licensePlate" className={labelCls}>
                            Biển số xe (1 xe tiêu biểu)
                          </label>
                          <input
                            id="licensePlate"
                            {...register("licensePlate")}
                            placeholder="51C-12345"
                            className={inputCls}
                          />
                        </div>
                      )}

                      {/* Company */}
                      {showCompany && (
                        <div>
                          <label htmlFor="companyName" className={labelCls}>
                            Tên công ty / Dự án *
                          </label>
                          <input
                            id="companyName"
                            {...register("companyName")}
                            placeholder="Công ty TNHH..."
                            className={inputCls}
                          />
                        </div>
                      )}

                      {/* Project scale */}
                      {showProjectScale && (
                        <div>
                          <label htmlFor="projectScale" className={labelCls}>
                            Quy mô dự án (tỷ VNĐ)
                          </label>
                          <select
                            id="projectScale"
                            {...register("projectScale")}
                            className={`${inputCls} cursor-pointer`}
                          >
                            <option value="">-- Chọn quy mô --</option>
                            <option value="under_10">Dưới 10 tỷ</option>
                            <option value="10_50">10 – 50 tỷ</option>
                            <option value="50_200">50 – 200 tỷ</option>
                            <option value="over_200">Trên 200 tỷ</option>
                          </select>
                        </div>
                      )}

                      {/* Note */}
                      <div>
                        <label htmlFor="note" className={labelCls}>
                          Ghi chú thêm
                        </label>
                        <textarea
                          id="note"
                          {...register("note")}
                          placeholder="Thông tin bổ sung bạn muốn chia sẻ..."
                          rows={3}
                          className={`${inputCls} resize-none`}
                        />
                        {errors.note && (
                          <p className={errorCls}>{errors.note.message}</p>
                        )}
                      </div>

                      {/* Error */}
                      {submitStatus === "error" && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                          {errorMsg}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={submitStatus === "loading"}
                        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3.5 rounded-xl font-bold text-base transition-colors duration-150 cursor-pointer mt-2"
                      >
                        {submitStatus === "loading" ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Đang gửi...
                          </>
                        ) : (
                          "Gửi đăng ký →"
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Trust signals */}
          {!success && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-orange-100 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Thông tin bảo mật tuyệt đối</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Liên hệ trong vòng 24 giờ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>5,000+ xe đã tham gia</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
