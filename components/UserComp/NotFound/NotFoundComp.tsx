"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiMail } from "react-icons/fi";

interface TranslationDictionary {
  code: string;
  title: string;
  subtitle: string;
  btnHome: string;
  btnContact: string;
}

const TRANSLATIONS: Record<string, TranslationDictionary> = {
  en: {
    code: "404",
    title: "Wandered Off the Trail?",
    subtitle: "The page you are looking for has vanished into the desert sands. Let us guide you back to our top excursions and experiences.",
    btnHome: "Return to Homepage",
    btnContact: "Contact Concierge",
  },
  ru: {
    code: "404",
    title: "Сбились с пути?",
    subtitle: "Страница, которую вы ищете, затерялась в бескрайних песках. Позвольте направить вас обратно к лучшим экскурсиям.",
    btnHome: "На главную страницу",
    btnContact: "Связаться с нами",
  },
  de: {
    code: "404",
    title: "Vom Weg abgekommen?",
    subtitle: "Die gesuchte Seite ist im Wüstensand verschollen. Lassen Sie sich zurück zu unseren besten Erlebnissen führen.",
    btnHome: "Zur Startseite",
    btnContact: "Kontakt aufnehmen",
  },
  fr: {
    code: "404",
    title: "Égaré dans les dunes ?",
    subtitle: "La page que vous recherchez s'est évaporée dans les sables du désert. Laissez-nous vous guider vers nos meilleures expériences.",
    btnHome: "Retour à l'accueil",
    btnContact: "Contacter le concierge",
  },
};

export function NotFoundComp({ locale }: { locale?: string }) {
  const pathname = usePathname() || "";
  const detectedLocale = locale || pathname.split("/")[1] || "en";
  const activeLocale = TRANSLATIONS[detectedLocale] ? detectedLocale : "en";
  const t = TRANSLATIONS[activeLocale];
  const homeHref = `/${activeLocale}`;
  const contactHref = `/${activeLocale}/Contact`;

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gradient-to-br from-[#D48C2818] to-[#0E4A6812] blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[#08395208] blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        {/* Massive 404 Headline */}
        <div className="relative select-none">
          <span className="font-montserrat text-8xl font-black tracking-tight sm:text-9xl lg:text-[11rem] leading-none bg-gradient-to-r from-[#083952] via-[#0E4A68] to-[#D48C28] bg-clip-text text-transparent">
            {t.code}
          </span>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-[#D48C28] to-transparent opacity-80" />
        </div>

        {/* Title & Subtitle */}
        <h1 className="mt-8 text-2xl font-bold tracking-tight text-[#083952] sm:text-3xl lg:text-4xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#64748B] sm:text-base">
          {t.subtitle}
        </p>

        {/* Primary CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={homeHref}
            className="inline-flex items-center gap-2 rounded-xl bg-[#083952] px-7 py-3.5 text-sm font-semibold text-[#FFFFFF] shadow-lg shadow-[#08395225] transition-all duration-200 hover:bg-[#0A374E] hover:-translate-y-0.5 cursor-pointer"
          >
            <FiHome className="h-4 w-4" />
            <span>{t.btnHome}</span>
          </Link>
          <Link
            href={contactHref}
            className="inline-flex items-center gap-2 rounded-xl border border-[#08395230] bg-[#FFFFFF]/80 px-7 py-3.5 text-sm font-semibold text-[#083952] shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-[#D48C28] hover:bg-[#FFFFFF] hover:text-[#D48C28] hover:-translate-y-0.5 cursor-pointer"
          >
            <FiMail className="h-4 w-4" />
            <span>{t.btnContact}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundComp;
