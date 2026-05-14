"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const experienceLevels = {
  under_1: "Dưới 1 năm",
  one_to_three: "1-3 năm",
  three_to_five: "3-5 năm",
  over_5: "Trên 5 năm",
} as const;

const availabilityOptions = {
  full_time: "Sẵn sàng chạy hằng ngày",
  project_based: "Theo dự án / theo ca",
  weekend: "Cuối tuần hoặc ngoài giờ",
  discuss: "Trao đổi thêm",
} as const;

const schema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .regex(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)"),
  licensePlate: z
    .string()
    .min(5, "Vui lòng nhập biển số xe")
    .max(20, "Biển số tối đa 20 ký tự"),
  province: z.string().min(2, "Vui lòng nhập khu vực hoạt động"),
  experience: z.enum(["under_1", "one_to_three", "three_to_five", "over_5"]),
  availability: z.enum(["full_time", "project_based", "weekend", "discuss"]),
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

export function DriverSignupForm() {
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
      experience: "one_to_three",
      availability: "full_time",
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitState("loading");
    setErrorMessage("");

    const detailNote = [
      `Kinh nghiem: ${experienceLevels[values.experience]}`,
      `Thoi gian san sang: ${availabilityOptions[values.availability]}`,
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
          segment: "driver",
          fullName: values.fullName,
          phone: values.phone,
          province: values.province,
          licensePlate: values.licensePlate.toUpperCase(),
          source: "driver_signup_page",
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
        experience: "one_to_three",
        availability: "full_time",
      });
    } catch {
      setErrorMessage("Không kết nối được máy chủ. Vui lòng thử lại sau.");
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div
        id="driver-form"
        className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-2xl shadow-emerald-950/10 md:p-8"
      >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          BenHub đã nhận thông tin đăng ký.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Đội ngũ vận hành sẽ liên hệ lại để xác nhận khu vực chạy xe, loại xe
          và các chuyến phù hợp.
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
      id="driver-form"
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
    >
      <div className="border-b border-slate-200 bg-linear-to-br from-white via-orange-50/50 to-slate-50 p-6 md:p-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">
          <Send className="h-3.5 w-3.5" />
          Đăng ký tài xế
        </div>
        <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
          Để lại thông tin để BenHub kết nối chuyến phù hợp.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Form chỉ mất khoảng 2 phút. BenHub dùng thông tin này để xác nhận khu
          vực, xe và lịch chạy, không yêu cầu mật khẩu hay giấy tờ nhạy cảm.
        </p>
      </div>

      <div className="grid gap-6 p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Họ tên tài xế *
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
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="licensePlate" className={labelClass}>
              Biển số xe *
            </label>
            <input
              id="licensePlate"
              {...register("licensePlate")}
              className={inputClass}
              placeholder="51C-12345"
            />
            {errors.licensePlate && (
              <p className={errorClass}>{errors.licensePlate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="province" className={labelClass}>
              Khu vực hoạt động *
            </label>
            <input
              id="province"
              {...register("province")}
              className={inputClass}
              placeholder="TP.HCM, Đồng Nai, Bình Dương..."
            />
            {errors.province && (
              <p className={errorClass}>{errors.province.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="experience" className={labelClass}>
              Kinh nghiệm lái xe ben *
            </label>
            <select
              id="experience"
              {...register("experience")}
              className={`${inputClass} cursor-pointer`}
            >
              {Object.entries(experienceLevels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="availability" className={labelClass}>
              Thời gian sẵn sàng chạy *
            </label>
            <select
              id="availability"
              {...register("availability")}
              className={`${inputClass} cursor-pointer`}
            >
              {Object.entries(availabilityOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
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
            placeholder="Loại xe, tải trọng, tuyến quen thuộc hoặc thời gian có thể nhận chuyến..."
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
            Tôi đồng ý để BenHub liên hệ lại qua điện thoại nhằm xác nhận thông
            tin đăng ký và chuyến xe phù hợp.
          </span>
        </label>
        {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
            <p className="text-sm leading-relaxed text-slate-600">
              BenHub chỉ dùng thông tin để liên hệ vận hành. Không yêu cầu đóng
              phí đăng ký qua form này.
            </p>
          </div>
        </div>

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
              Gửi đăng ký tài xế
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
