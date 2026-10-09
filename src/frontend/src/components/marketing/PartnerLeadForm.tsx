"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock3, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";

type SubmitState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100";
const labelClass = "mb-2 block text-sm font-bold text-slate-800";
const errorClass = "mt-1.5 text-xs font-medium text-red-500";

const PARTNER_TYPES = [
  "fleet",
  "investor",
  "finance",
  "tech",
  "investment",
  "other",
] as const;
type PartnerType = (typeof PARTNER_TYPES)[number];

/** Matches the `CooperationType` enum in BenHub CMS. */
const COOPERATION_TYPE: Record<PartnerType, number> = {
  fleet: 1,
  investor: 2,
  finance: 3,
  tech: 4,
  investment: 5,
  other: 99,
};

/**
 * Lead form for non-quarry partners. Submits a partner registration to
 * BenHub CMS (POST /api/partner-registration/submit); the team follows up there.
 */
export function PartnerLeadForm({ source }: { source: string }) {
  const t = useTranslations("PartnerLeadForm");
  const tPartner = useTranslations("PartnerForm");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const schema = useMemo(
    () =>
      z.object({
        companyName: z.string().trim().min(2, t("err_company_min")),
        fullName: z.string().trim().min(2, t("err_contact_min")),
        phone: z.string().regex(/^0[0-9]{9}$/, t("err_phone")),
        email: z
          .string()
          .trim()
          .email(t("err_email"))
          .optional()
          .or(z.literal("")),
        partnerType: z.enum(PARTNER_TYPES, {
          errorMap: () => ({ message: t("err_type") }),
        }),
        note: z.string().max(400, t("err_note_max")).optional(),
        // Honeypot — hidden from humans; CMS silently drops submissions that fill it.
        website: z.string().optional(),
      }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const typeLabel = (type: PartnerType) => t(`type_${type}`);

  async function onSubmit(values: FormValues) {
    setSubmitState("loading");
    setErrorMessage("");

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_CRM_API_URL || "http://localhost:5048";
      const response = await fetch(
        `${apiUrl}/api/partner-registration/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company_name: values.companyName,
            cooperation_type: COOPERATION_TYPE[values.partnerType],
            contact_name: values.fullName,
            phone: values.phone,
            email: values.email || "",
            note: values.note?.trim() || "",
            source,
            website: values.website ?? "",
          }),
        },
      );

      // CMS answers HTTP 200 even on failure; the outcome is in the body.
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.is_successful) {
        setErrorMessage(
          body?.code === 429 ? t("err_rate_limit") : t("err_server"),
        );
        setSubmitState("error");
        return;
      }

      setSubmitState("success");
      reset();
    } catch {
      setErrorMessage(t("err_network"));
      setSubmitState("error");
    }
  }

  /* ─── Success state ─── */
  if (submitState === "success") {
    return (
      <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-2xl shadow-emerald-950/10 md:p-8">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          {t("success_title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {t("success_desc")}
        </p>
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
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/20"
    >
      {/* Header */}
      <div className="border-b border-slate-200 bg-linear-to-br from-white via-orange-50/50 to-slate-50 p-6 md:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-white">
            <Send className="h-3.5 w-3.5" />
            {t("badge")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
            <Clock3 className="h-3.5 w-3.5 text-orange-500" />
            {tPartner("badge_response")}
          </span>
        </div>
        <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
          {t("heading")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {t("sub")}
        </p>
      </div>

      <div className="grid gap-6 p-6 md:p-8">
        <input
          type="text"
          {...register("website")}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-2499.75 h-px w-px opacity-0"
        />

        <div>
          <label htmlFor="lead-companyName" className={labelClass}>
            {t("label_company")}
          </label>
          <input
            id="lead-companyName"
            {...register("companyName")}
            className={inputClass}
            placeholder={t("placeholder_company")}
            aria-invalid={!!errors.companyName}
          />
          {errors.companyName && (
            <p className={errorClass}>{errors.companyName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lead-partnerType" className={labelClass}>
            {t("label_type")}
          </label>
          <select
            id="lead-partnerType"
            {...register("partnerType")}
            defaultValue=""
            className={`${inputClass} cursor-pointer`}
            aria-invalid={!!errors.partnerType}
          >
            <option value="" disabled>
              {t("type_placeholder")}
            </option>
            {PARTNER_TYPES.map((type) => (
              <option key={type} value={type}>
                {typeLabel(type)}
              </option>
            ))}
          </select>
          {errors.partnerType && (
            <p className={errorClass}>{errors.partnerType.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lead-fullName" className={labelClass}>
            {t("label_contact")}
          </label>
          <input
            id="lead-fullName"
            {...register("fullName")}
            className={inputClass}
            placeholder={t("placeholder_contact")}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className={errorClass}>{errors.fullName.message}</p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="lead-phone" className={labelClass}>
              {t("label_phone")}
            </label>
            <input
              id="lead-phone"
              type="tel"
              {...register("phone")}
              className={inputClass}
              placeholder={t("placeholder_phone")}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className={errorClass}>{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lead-email" className={labelClass}>
              {t("label_email")}
            </label>
            <input
              id="lead-email"
              type="email"
              {...register("email")}
              className={inputClass}
              placeholder={t("placeholder_email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="lead-note" className={labelClass}>
            {t("label_note")}
          </label>
          <textarea
            id="lead-note"
            rows={3}
            {...register("note")}
            className={`${inputClass} resize-none`}
            placeholder={t("placeholder_note")}
            aria-invalid={!!errors.note}
          />
          {errors.note && <p className={errorClass}>{errors.note.message}</p>}
        </div>

        {/* API error */}
        {submitState === "error" && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
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
