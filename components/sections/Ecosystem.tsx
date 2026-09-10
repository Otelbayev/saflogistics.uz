import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

type Props = { dict: Dictionary };

/**
 * The mini-app's own screens, in the order a client meets them. The keys match
 * `dict.ecosystem.screens` and the filenames under `/images/app`, so a screen
 * is added by dropping in one image and one dictionary entry.
 *
 * The captures are Russian-language because the app is; the caption under each
 * one is translated, which is what carries the meaning for uz and en readers.
 */
const screenKeys = ["home", "lcl", "ftl", "map", "exchange"] as const;

/** Every capture is 450px wide and 388–406px tall. One shared ratio keeps the
 *  cards on a row the same height; `object-contain` then letterboxes the few
 *  pixels of difference instead of cropping the bot handle off the bottom. */
const SHOT_W = 450;
const SHOT_H = 396;

export function Ecosystem({ dict }: Props) {
  const t = dict.ecosystem;

  return (
    <section id="ecosystem" className="relative py-16 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* Five screens plus the tracking card fill a 3×2 grid exactly. */}
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {screenKeys.map((key, i) => (
            <Reveal
              key={key}
              delay={Math.min(i, 4) * 0.06}
              className="flex h-full flex-col rounded-3xl border border-border bg-surface p-5 transition duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-(--shadow-glow)"
            >
              {/* The capture is of a light-themed app, so its frame stays light
                  in both themes — a white rectangle floating on the navy dark
                  mode would read as a rendering fault rather than a screenshot. */}
              <div className="relative overflow-hidden rounded-xl border border-border bg-white p-2">
                <Image
                  src={`/images/app/${i + 1}.png`}
                  alt={t.screens[key].title}
                  width={SHOT_W}
                  height={SHOT_H}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full rounded-lg object-contain"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {t.screens[key].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t.screens[key].desc}
              </p>
              {/* The disclaimer belongs beside the screen it describes. */}
              {key === "map" ? (
                <p className="mt-3 border-t border-border pt-3 text-xs leading-relaxed text-muted">
                  {t.mapNote}
                </p>
              ) : null}
            </Reveal>
          ))}

          <Reveal
            delay={0.3}
            className="relative flex h-full flex-col justify-center overflow-hidden rounded-3xl border border-brand-500/30 bg-linear-to-br from-brand-900 via-brand-800 to-brand-950 p-6 text-white shadow-(--shadow-elevated)"
          >
            <div aria-hidden className="absolute inset-0 bg-grid opacity-15" />
            <div className="relative">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                <Icon.Radar size={20} />
              </span>
              <h3 className="mt-4 text-lg font-semibold sm:text-xl">
                {t.aiTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                {t.aiDesc}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.1}
          className="mt-10 flex flex-col items-center gap-3 text-center"
        >
          <Button
            href={siteConfig.telegramBot}
            target="_blank"
            rel="noreferrer noopener"
            size="lg"
          >
            <Icon.Telegram size={18} />
            {t.ctaLabel}
          </Button>
          <span className="text-xs text-muted">
            {siteConfig.telegramBotHandle}
          </span>
        </Reveal>
      </Container>
    </section>
  );
}
