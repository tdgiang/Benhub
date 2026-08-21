"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock3, Loader2, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";

type SubmitState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100";
const labelClass = "mb-2 block text-sm font-bold text-slate-800";
const errorClass = "mt-1.5 text-xs font-medium text-red-500";

export function PartnerSignupForm() {
  const t = useTranslations("PartnerForm");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const schema = z.object({
    companyName: z.string().min(2, t("err_company_min")),
    taxCode: z
      .string()
      .min(1, t("err_taxcode_required"))
      .regex(/^(\d{10}|\d{13})$/, t("err_taxcode_format")),
    address: z.string().min(5, t("err_address_min")),
    representative: z.string().min(2, t("err_representative_min")),
    phone: z.string().regex(/^0[0-9]{9}$/, t("err_phone")),
    email: z.string().email(t("err_email")),
    username: z
      .string()
      .min(1, t("err_username_required"))
      .max(32, t("err_username_max"))
      .regex(/^[a-zA-Z0-9]+$/, t("err_username_format")),
  });

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setSubmitState("loading");
    setErrorMessage("");

    try {
      const apiBase =
        process.env.NEXT_PUBLIC_PARTNER_API_BASE_URL ??
        "https://api-mine.benhub.vn";
      const response = await fetch(`${apiBase}/api/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PARTNER_API_TOKEN}`,
        },
        body: JSON.stringify({
          companyName: values.companyName,
          taxCode: values.taxCode,
          address: values.address,
          representative: values.representative,
          phone: values.phone,
          email: values.email,
          username: values.username,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setErrorMessage(body.message ?? t("err_server"));
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
      <div
        id="partner-form"
        className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-2xl shadow-emerald-950/10 md:p-8"
      >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-200">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-950">
          {t("success_title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {t("success_desc")}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://cms-mine.benhub.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-black text-white transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-200"
          >
            {t("success_cms_cta")}
          </a>
          <button
            type="button"
            onClick={() => setSubmitState("idle")}
            className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
          >
            {t("submit_another")}
          </button>
        </div>
      </div>
    );
  }

  /* ─── Form ─── */
  return (
    <form
      id="partner-form"
      onSubmit={handleSubmit(onSubmit)}
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
            {t("badge_response")}
          </span>
        </div>
        <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">
          {t("heading")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {t("sub")}
        </p>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          {([t("shield_1"), t("shield_2"), t("shield_3")] as string[]).map(
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
        {/* ── Section 1: Organisation info ── */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
            1
          </span>
          <p className="font-black text-slate-950">{t("section_1")}</p>
        </div>

        <div>
          <label htmlFor="companyName" className={labelClass}>
            {t("label_company")}
          </label>
          <input
            id="companyName"
            {...register("companyName")}
            className={inputClass}
            placeholder={t("placeholder_company")}
          />
          {errors.companyName && (
            <p className={errorClass}>{errors.companyName.message}</p>
          )}
        </div>

        <div className="grid gap-5">
          <div>
            <label htmlFor="taxCode" className={labelClass}>
              {t("label_taxcode")}
            </label>
            <input
              id="taxCode"
              {...register("taxCode")}
              className={inputClass}
              placeholder={t("placeholder_taxcode")}
            />
            {errors.taxCode && (
              <p className={errorClass}>{errors.taxCode.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className={labelClass}>
              {t("label_address")}
            </label>
            <input
              id="address"
              {...register("address")}
              className={inputClass}
              placeholder={t("placeholder_address")}
            />
            {errors.address && (
              <p className={errorClass}>{errors.address.message}</p>
            )}
          </div>
        </div>

        {/* ── Section 2: Representative ── */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3 pt-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
            2
          </span>
          <p className="font-black text-slate-950">{t("section_2")}</p>
        </div>

        <div>
          <label htmlFor="representative" className={labelClass}>
            {t("label_representative")}
          </label>
          <input
            id="representative"
            {...register("representative")}
            className={inputClass}
            placeholder={t("placeholder_representative")}
          />
          {errors.representative && (
            <p className={errorClass}>{errors.representative.message}</p>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
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
            {errors.phone && (
              <p className={errorClass}>{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              {t("label_email")}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={inputClass}
              placeholder={t("placeholder_email")}
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="username" className={labelClass}>
            {t("label_username")}
          </label>
          <input
            id="username"
            {...register("username")}
            className={inputClass}
            placeholder={t("placeholder_username")}
            autoCapitalize="none"
            autoCorrect="off"
          />
          {errors.username && (
            <p className={errorClass}>{errors.username.message}</p>
          )}
        </div>

        {/* Consent */}
        {/* <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 transition hover:border-orange-200 hover:bg-orange-50/40">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 h-5 w-5 rounded border-slate-300 text-orange-500 focus:ring-orange-200"
          />
          <span>{t("consent")}</span>
        </label>
        {errors.consent && (
          <p className={errorClass}>{errors.consent.message}</p>
        )} */}

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

        <div className="mt-4 text-center text-sm text-slate-600 ">
          <a
            href="https://cms-mine.benhub.vn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Đã có tài khoản?{" "}
            <span
              style={{
                textDecoration: "underline",
                color: "#f97316",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Đăng nhập
            </span>
          </a>
        </div>
      </div>
    </form>
  );
}
