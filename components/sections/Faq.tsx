import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { topicByKey, topicPath } from "@/lib/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

type Props = { locale: Locale; dict: Dictionary };

/**
 * The landing page's FAQ, and the reason it is a server component built on
 * native `<details>`/`<summary>`: this block exists to be read by AI search —
 * ChatGPT, Perplexity, Google's AI Overview — which take the initial HTML and
 * do not run our JavaScript. Every answer therefore ships inside the document,
 * collapsed by CSS alone, rather than behind a `useState`. Keyboard support and
 * the screen-reader expand/collapse announcement come free with the element.
 *
 * The answers are mirrored into `FAQPage` JSON-LD by `HomePageJsonLd`; the two
 * must stay in sync, which is why both read the same `dict.faq.items`.
 */
export function Faq({ locale, dict }: Props) {
  const t = dict.faq;
  const topic = topicByKey.get("faq");

  return (
    <section id="faq" className="relative py-16 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
          {t.items.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i, 4) * 0.06} className="mb-3">
              <details className="group rounded-2xl border border-border bg-surface transition-colors duration-300 open:border-brand-500/40 hover:border-brand-500/30">
                <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <span className="mt-0.5 text-xs font-semibold tabular-nums text-brand-600 dark:text-brand-300">
                    0{i + 1}
                  </span>
                  <h3 className="min-w-0 flex-1 text-base font-semibold text-foreground sm:text-lg">
                    {item.q}
                  </h3>
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted transition-all duration-300 group-open:rotate-180 group-open:bg-brand-800 group-open:text-white"
                  >
                    <Icon.ChevronDown size={15} />
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6 sm:pl-14 sm:text-base">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}

          {/* Into the topic cluster: the standalone FAQ page carries the long
              form of these answers and must not be reachable only via sitemap. */}
          {topic ? (
            <Reveal delay={0.1} className="mt-6 text-center">
              <Link
                href={topicPath(topic, locale)}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 underline-offset-4 transition-colors hover:underline dark:text-brand-200"
              >
                {t.moreLabel}
                <Icon.ArrowRight size={15} />
              </Link>
            </Reveal>
          ) : null}

          <Reveal
            delay={0.15}
            className="mt-10 rounded-3xl border border-border bg-surface p-6 text-center sm:p-8"
          >
            <h3 className="text-balance text-xl font-semibold text-foreground sm:text-2xl">
              {t.ctaTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
              {t.ctaText}
            </p>
            <div className="mt-6">
              <Button href={`/${locale}#contact`}>
                {t.ctaLabel}
                <Icon.ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
