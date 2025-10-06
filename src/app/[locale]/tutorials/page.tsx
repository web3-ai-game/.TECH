import { getSortedPostsData } from "@/lib/tutorials";
import { Link } from "next-intl/client";
import { useTranslations } from "next-intl";

export default function TutorialsPage() {
  const allPostsData = getSortedPostsData();
  const t = useTranslations("TutorialsPage");

  return (
    <div className="container max-w-screen-lg py-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">{t('title')}</h1>
      <div className="grid gap-8">
        {allPostsData.map(({ slug, title, description, date }) => (
          <article key={slug}>
            <Link href={`/tutorials/${slug}`} className="block rounded-lg border p-6 hover:bg-accent">
              <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
              <p className="mb-3 text-muted-foreground">{description}</p>
              <time dateTime={date} className="text-sm text-muted-foreground">
                {new Date(date).toLocaleDateString()}
              </time>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}