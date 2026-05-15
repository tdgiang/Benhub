"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";

type SubmitState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100";
const labelClass = "mb-2 block text-sm font-bold text-slate-800";
const errorClass = "mt-1.5 text-xs font-medium text-red-500";

export function DriverSignupForm() {
  const t = useTranslations("DriverForm");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /* ─── Dropdown options (translated) ─── */
  const experienceLevels = useMemo(
    () => ({
      under_1: t("experience_under1"),
      one_to_three: t("experience_1to3"),
      three_to_five: t("experience_3to5"),
      over_5: t("experience_over5"),
    }),
    [t],
  );

  const availabilityOptions = useMemo(
    () => ({
      full_time: t("avail_fulltime"),
      project_based: t("avail_project"),
      weekend: t("avail_weekend"),
      discuss: t("avail_discuss"),
    }),
    [t],
  );

  /* ─── Zod schema (translated validation messages) ─── */
  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().min(2, t("err_name_min")),
        phone: z.string().regex(/^0[0-9]{9}$/, t("err_phone")),
        licensePlate: z
          .string()
          .min(5, t("err_plate_min"))
          .max(20, t("err_plate_max")),
        province: z.string().min(2, t("err_province")),
        experience: z.enum(["under_1", "one_to_three", "three_to_five", "over_5"]),
        availability: z.enum(["full_time", "project_based", "weekend", "discuss"]),
        note: z.string().max(240, t("err_note_max")).optional(),
        consent: z.literal(true, {
          errorMap: () => ({ message: t("err_consent") }),
        }),
      }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

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
      `Experience: ${experienceLevels[values.experience]}`,
      `Availability: ${availabilityOptions[values.availability]}`,
      `Note: ${values.note?.trim() || "-"}`,
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
        setErrorMessage(body.message ?? t("err_server"));
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      reset({ experience: "one_to_three", availability: "full_time" });
    } catch {
      setErrorMessage(t("err_network"));
      setSubmitState("error");
    }
  }

  /* ─── Success state ─── */
  if (submitState === "success") {
    return (
      <div
        id="driver-form"
        className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-2xl shadow-emerald-950/10 md:p-8"
      >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-950">{t("success_title")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{t("success_desc")}</p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="mt-6 cursor-pointer rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
        >
          {t("submit_another")}
        </button>
      </div>
    );
  }

  /* ─── Form ─── */
  return (
    <form
      id="driver-form"
      onSubmit={handleSubmit(onSubmit)}
      className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
    >
      {/* Header */}
      <div className="border-b border-slate-200 bg-linear-to-br from-white via-orange-50/50 to-slate-50 p-6 md:p-8">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">
          <Send className="h-3.5 w-3.5" />
          {t("badge")}
        </div>
        <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
          {t("heading")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{t("sub")}</p>
      </div>

      {/* Fields */}
      <div className="grid gap-6 p-6 md:p-8">
        {/* Row 1: name + phone */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              {t("label_fullname")}
            </label>
            <input
              id="fullName"
              {...register("fullName")}
              className={inputClass}
              placeholder={t("placeholder_name")}
            />
            {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              {t("label_phone")}
            </label>
            <input
              id="phone"
              type="tel"
              {...register("phone")}
              className={inputClass}
              placeholder={t("placeholder_phone")}
            />
            {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
          </div>
        </div>

        {/* Row 2: plate + province */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="licensePlate" className={labelClass}>
              {t("label_plate")}
            </label>
            <input
              id="licensePlate"
              {...register("licensePlate")}
              className={inputClass}
              placeholder={t("placeholder_plate")}
            />
            {errors.licensePlate && (
              <p className={errorClass}>{errors.licensePlate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="province" className={labelClass}>
              {t("label_province")}
            </label>
            <input
              id="province"
              {...register("province")}
              className={inputClass}
              placeholder={t("placeholder_province")}
            />
            {errors.province && <p className={errorClass}>{errors.province.message}</p>}
          </div>
        </div>

        {/* Row 3: experience + availability */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="experience" className={labelClass}>
              {t("label_experience")}
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
              {t("label_availability")}
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

        {/* Note */}
        <div>
          <label htmlFor="note" className={labelClass}>
            {t("label_note")}
          </label>
          <textarea
            id="note"
            {...register("note")}
            rows={4}
            className={inputClass}
            placeholder={t("placeholder_note")}
          />
          {errors.note && <p className={errorClass}>{errors.note.message}</p>}
        </div>

        {/* Consent */}
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 transition hover:border-orange-200 hover:bg-orange-50/40">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-orange-500 focus:ring-orange-200"
          />
          <span>{t("consent")}</span>
        </label>
        {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}

        {/* Privacy note */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
            <p className="text-sm leading-relaxed text-slate-600">{t("privacy_note")}</p>
          </div>
        </div>

        {/* API error */}
        {submitState === "error" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {errorMessage}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitState === "loading"}
          className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {submitState === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            <>
              {t("submit")}
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
