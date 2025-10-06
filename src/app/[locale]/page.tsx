"use client";

import { useTranslations } from "next-intl";
import { Link } from "next-intl/client";
import { Button } from "@/components/ui/button";

export default function Home() {
  const t = useTranslations("Homepage");

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          {t("subtitle")}
        </p>
      </div>
      <div className="mx-auto flex gap-4">
        <Link href="/tutorials">
          <Button>Start Learning</Button>
        </Link>
      </div>
    </section>
  );
}