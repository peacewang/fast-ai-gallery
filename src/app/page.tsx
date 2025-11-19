import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { getDemoList } from "@/lib/demo-registry";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCurrentLocale } from "@/lib/i18n/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const locale = await getCurrentLocale();
  const dict = getDictionary(locale);
  const workflowSteps = dict.workflow.steps;
  const demos = await getDemoList();

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-zinc-50 to-white px-4 py-12 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-zinc-900 dark:text-zinc-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="rounded-[28px] border border-zinc-200 bg-white/80 p-10 shadow-xl shadow-zinc-200/60 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/40">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400">
            <Sparkles size={16} />
            <span>AI Gallery</span>
            <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[11px] text-white dark:bg-zinc-100 dark:text-zinc-900">
              {demos.length} {dict.hero.counterSuffix}
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="lg:max-w-3xl">
              <h1 className="text-4xl font-semibold leading-tight text-zinc-900 dark:text-white">
                {dict.hero.title}
              </h1>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">{dict.hero.description}</p>
            </div>
            <div className="flex flex-wrap gap-3" />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400">
                {dict.gallery.label}
              </p>
              <h2 className="text-2xl font-semibold">{dict.gallery.title}</h2>
            </div>
          </div>

          {demos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/80 p-10 text-center text-sm text-zinc-500 shadow-inner dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
              {dict.gallery.emptyPrefix}
              <code>{dict.gallery.templatePath}</code>
              {dict.gallery.emptyMiddle}
              <code>{dict.gallery.configFile}</code>
              {dict.gallery.emptySuffix}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {demos.map((demo) => (
                <Link
                  key={demo.slug}
                  href={demo.href}
                  className="group flex h-full flex-col rounded-3xl border border-transparent bg-white/90 p-4 shadow-lg shadow-zinc-200/60 transition hover:-translate-y-1 hover:border-zinc-900/40 hover:shadow-xl dark:bg-zinc-900/80 dark:shadow-black/30"
                >
                  <div className="relative h-56 overflow-hidden rounded-2xl">
                    <img
                      src={demo.coverImage}
                      alt={demo.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
                      <p className="text-xs uppercase tracking-[0.3em] opacity-80">{demo.href}</p>
                      <p className="text-lg font-semibold">{demo.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm text-zinc-600 dark:text-zinc-400">{demo.description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm font-semibold text-zinc-900 transition group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-white">
                    <span>{dict.gallery.cardCta}</span>
                    <ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-lg shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-black/30">
          <h3 className="text-xl font-semibold">{dict.workflow.title}</h3>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{dict.workflow.intro}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-stretch">
            {workflowSteps.map((step) => (
              <div
                key={step.title}
                className="flex h-full flex-col rounded-2xl border border-zinc-200/60 bg-white/90 p-5 text-sm shadow-sm dark:border-zinc-700 dark:bg-zinc-950/40"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{step.title}</p>
                <pre className="mt-3 flex-1 whitespace-pre-wrap rounded-xl bg-zinc-950/90 px-3 py-3 font-mono text-xs text-zinc-100 dark:bg-black/60">
                  {step.body}
                </pre>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
