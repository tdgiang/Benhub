"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock3, Loader2, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const partnerTypes = {
  contractor: "Chủ đầu tư / Tổng thầu",
  materials: "Mỏ vật liệu / Nhà cung ứng",
  fleet: "Đội xe địa phương",
  finance: "Tài chính / Bảo hiểm",
  technology: "Công nghệ / Tích hợp dữ liệu",
  investor: "Nhà đầu tư chiến lược",
  other: "Đối tác khác",
} as const;

const cooperationNeeds = {
  pilot: "Chạy pilot cho dự án",
  fleet_network: "Kết nối mạng lưới đội xe",
  material_supply: "Kết nối vật liệu / mỏ",
  finance: "Hợp tác tài chính",
  investment: "Trao đổi đầu tư",
  other: "Trao đổi mô hình khác",
} as const;

const schema = z.object({
  companyName: z.string().min(2, "Tên đơn vị phải có ít nhất 2 ký tự"),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  role: z.string().max(80, "Tối đa 80 ký tự").optional(),
  phone: z
    .string()
    .regex(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)"),
  email: z.string().email("Email không hợp lệ"),
  province: z.string().max(80, "Tối đa 80 ký tự").optional(),
  partnerType: z.enum([
    "contractor",
    "materials",
    "fleet",
    "finance",
    "technology",
    "investor",
    "other",
  ]),
  cooperationNeed: z.enum([
    "pilot",
    "fleet_network",
    "material_supply",
    "finance",
    "investment",
    "other",
  ]),
  note: z.string().max(240, "Tối đa 240 ký tự").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Vui lòng xác nhận để BenHub liên hệ lại" }),
  }),
});

type FormValues = z.infer<typeof schema>;

type SubmitState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100";
const labelClass = "mb-2 block text-sm font-bold text-slate-800";
const errorClass = "mt-1.5 text-xs font-medium text-red-500";

function optionalText(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "Chưa cung cấp";
}

export function PartnerSignupForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      partnerType: "contractor",
      cooperationNeed: "pilot",
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitState("loading");
    setErrorMessage("");

    const detailNote = [
      `Loai doi tac: ${partnerTypes[values.partnerType]}`,
      `Vai tro nguoi lien he: ${optionalText(values.role)}`,
      `Nhu cau hop tac: ${cooperationNeeds[values.cooperationNeed]}`,
      `Ghi chu: ${optionalText(values.note)}`,
    ]
      .join("\n")
      .slice(0, 500);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
      const response = await fetch(`${apiUrl}/api/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segment: "partner",
          fullName: values.fullName,
          phone: values.phone,
          email: values.email,
          province: values.province,
          companyName: values.companyName,
          projectScale: cooperationNeeds[values.cooperationNeed],
          source: "partner_page",
          note: detailNote,
        }),
      });

      if (!response.ok && response.status !== 201) {
        const body = await response.json().catch(() => ({}));
        setErrorMessage(body.message ?? "Không thể gửi đăng ký. Vui lòng thử lại.");
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      reset({
        partnerType: "contractor",
        cooperationNeed: "pilot",
      });
    } catch {
      setErrorMessage("Không kết nối được máy chủ. Vui lòng thử lại sau.");
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div
        id="partner-form"
        className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-2xl shadow-emerald-950/10 md:p-8"
      >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          BenHub đã nhận thông tin đăng ký.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Đội ngũ phát triển đối tác sẽ liên hệ lại để xác nhận nhu cầu, khu vực
          triển khai và bước trao đổi tiếp theo.
        </p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="mt-6 cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
        >
          Gửi thêm đăng ký khác
        </button>
      </div>
    );
  }

  return (
    <form
      id="partner-form"
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
    >
      <div className="border-b border-slate-200 bg-linear-to-br from-white via-orange-50/50 to-slate-50 p-6 md:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">
            <Send className="h-3.5 w-3.5" />
            Đăng ký đối tác
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
            <Clock3 className="h-3.5 w-3.5 text-orange-500" />
            Phản hồi trong 1 ngày làm việc
          </span>
        </div>
        <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
          Cho BenHub biết bạn muốn hợp tác theo hướng nào.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Form chỉ mất khoảng 2 phút. Các trường có dấu * là bắt buộc để đội ngũ
          BenHub có thể phân loại và liên hệ đúng người phụ trách.
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {["Không cần tài khoản", "Không yêu cầu tài liệu nhạy cảm", "Dữ liệu dùng để liên hệ"].map(
            (item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
              >
                <ShieldCheck className="h-4 w-4 shrink-0 text-orange-500" />
                {item}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="grid gap-6 p-6 md:p-8">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
            1
          </span>
          <p className="font-black text-slate-950">Thông tin đơn vị</p>
        </div>

        <div>
          <label htmlFor="companyName" className={labelClass}>
            Tên công ty / đơn vị *
          </label>
          <input
            id="companyName"
            {...register("companyName")}
            className={inputClass}
            placeholder="Công ty Cổ phần..."
          />
          {errors.companyName && (
            <p className={errorClass}>{errors.companyName.message}</p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Người liên hệ *
            </label>
            <input
              id="fullName"
              {...register("fullName")}
              className={inputClass}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && (
              <p className={errorClass}>{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className={labelClass}>
              Chức vụ
            </label>
            <input
              id="role"
              {...register("role")}
              className={inputClass}
              placeholder="Giám đốc dự án, Founder..."
            />
            {errors.role && <p className={errorClass}>{errors.role.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClass}>
              Số điện thoại *
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className={inputClass}
              placeholder="0912345678"
            />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={inputClass}
              placeholder="partner@company.vn"
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 pt-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
            2
          </span>
          <p className="font-black text-slate-950">Mô hình hợp tác</p>
        </div>

        <div>
          <label htmlFor="province" className={labelClass}>
            Khu vực triển khai
          </label>
          <input
            id="province"
            {...register("province")}
            className={inputClass}
            placeholder="Hồ Chí Minh, Đồng Nai, Bình Dương..."
          />
          {errors.province && (
            <p className={errorClass}>{errors.province.message}</p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="partnerType" className={labelClass}>
              Loại đối tác *
            </label>
            <select
              id="partnerType"
              {...register("partnerType")}
              className={`${inputClass} cursor-pointer`}
            >
              {Object.entries(partnerTypes).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.partnerType && (
              <p className={errorClass}>{errors.partnerType.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="cooperationNeed" className={labelClass}>
              Nhu cầu hợp tác *
            </label>
            <select
              id="cooperationNeed"
              {...register("cooperationNeed")}
              className={`${inputClass} cursor-pointer`}
            >
              {Object.entries(cooperationNeeds).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {errors.cooperationNeed && (
              <p className={errorClass}>{errors.cooperationNeed.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="note" className={labelClass}>
            Ghi chú thêm
          </label>
          <textarea
            id="note"
            {...register("note")}
            rows={4}
            className={inputClass}
            placeholder="Mô tả ngắn về dự án, đội xe, nguồn vật liệu hoặc mục tiêu hợp tác..."
          />
          {errors.note && <p className={errorClass}>{errors.note.message}</p>}
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 transition hover:border-orange-200 hover:bg-orange-50/40">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-orange-500 focus:ring-orange-200"
          />
          <span>
            Tôi đồng ý để BenHub liên hệ lại qua điện thoại/email nhằm trao đổi
            về nhu cầu hợp tác.
          </span>
        </label>
        {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}

        {submitState === "error" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={submitState === "loading"}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {submitState === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang gửi thông tin...
            </>
          ) : (
            <>
              Gửi thông tin hợp tác
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
