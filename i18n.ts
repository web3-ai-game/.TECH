import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "zh-CN", "zh-TW", "ms", "hi"];
export const localeNames: { [key: string]: string } = {
    en: "English",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
    ms: "Bahasa Malaysia",
    hi: "हिंदी",
};


export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});