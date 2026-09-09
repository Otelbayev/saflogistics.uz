import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import {
  formatTokens,
  rewardKeys,
  rewards,
  tokenTierKeys,
  tokenTiers,
} from "@/lib/tokens";

type Props = { dict: Dictionary };

const rewardIcons = {
  discount100: Icon.Tag,
  express: Icon.Lightning,
  insurance: Icon.Shield,
  discount10000: Icon.Gift,
} as const;

/** Platinum is the aspirational row, highlighted the way `tariffs.express` is
 *  in the tariff comparison. */
const isTopTier = (key: (typeof tokenTierKeys)[number]) => key === "platinum";

export function Tokens({ dict }: Props) {
  const t = dict.tokens;

  /** Bronze has no threshold to state — it is where everyone starts. */
  const threshold = (key: (typeof tokenTierKeys)[number]) =>
    tokenTiers[key].from === 0
      ? t.entryLabel
      : `${tokenTiers[key].from}+ ${t.shipmentsLabel}`;

  return (
    <section
      id="tokens"
      className="relative overflow-hidden border-y border-border bg-surface py-16 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dots opacity-30"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* How it works — three steps, numbered like the guarantees list. */}
        <div className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3">
          {t.how.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 0.08}
              className="rounded-3xl border border-border bg-background p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-brand-700 to-brand-900 text-white shadow-(--shadow-soft)">
                  <Icon.Coin size={19} />
                </span>
                <span className="text-xs font-semibold tabular-nums text-brand-600 dark:text-brand-300">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Tiers. Same two-rendering approach as the tariff comparison: a
            stacked list on phones, a real table from `sm` up, so nothing has to
            scroll sideways. */}
        <h3 className="mt-14 text-center text-sm font-semibold uppercase tracking-widest text-muted sm:mt-20">
          {t.tiersTitle}
        </h3>

        <Reveal
          from="zoom"
          className="mt-6 overflow-hidden rounded-3xl border border-border bg-background shadow-(--shadow-soft)"
        >
          <div className="sm:hidden">
            {tokenTierKeys.map((key) => (
              <div
                key={key}
                className={`border-b border-border px-4 py-3.5 last:border-b-0 ${
                  isTopTier(key) ? "bg-brand-500/10" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold text-foreground">
                    {t.tiers[key].name}
                  </span>
                  <span className="text-xs font-medium tabular-nums text-brand-700 dark:text-brand-200">
                    {threshold(key)}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-snug text-muted">
                  {t.tiers[key].perks}
                </p>
              </div>
            ))}
          </div>

          <table className="hidden w-full table-fixed text-left sm:table">
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[22%]" />
              <col className="w-[60%]" />
            </colgroup>
            <thead className="bg-surface-2 text-foreground">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest">
                  {t.cols.tier}
                </th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-widest">
                  {t.cols.threshold}
                </th>
                <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-widest">
                  {t.cols.perks}
                </th>
              </tr>
            </thead>
            <tbody>
              {tokenTierKeys.map((key) => (
                <tr
                  key={key}
                  className={`border-t border-border transition-colors hover:bg-surface-2/60 ${
                    isTopTier(key) ? "bg-brand-500/5" : ""
                  }`}
                >
                  <td className="px-6 py-3.5 text-sm font-semibold text-foreground">
                    {t.tiers[key].name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-sm font-medium tabular-nums text-brand-700 dark:text-brand-200">
                    {threshold(key)}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted">
                    {t.tiers[key].perks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Rewards, priced exactly as the mini-app's exchange screen prices them. */}
        <h3 className="mt-14 text-center text-sm font-semibold uppercase tracking-widest text-muted sm:mt-20">
          {t.rewardsTitle}
        </h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rewardKeys.map((key, i) => {
            const Ico = rewardIcons[key];
            return (
              <Reveal
                key={key}
                delay={i * 0.06}
                className="group flex h-full flex-col rounded-3xl border border-border bg-background p-5 transition duration-500 hover:-translate-y-1 hover:border-brand-500/30 hover:shadow-(--shadow-glow)"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-800 text-white shadow-(--shadow-soft)">
                  <Ico size={20} />
                </span>
                <p className="mt-4 flex-1 text-sm font-medium leading-snug text-foreground">
                  {t.rewards[key].name}
                </p>
                <p className="mt-4 text-lg font-semibold tabular-nums text-brand-700 dark:text-brand-200">
                  {formatTokens(rewards[key].price)}{" "}
                  <span className="text-xs font-medium uppercase tracking-widest text-muted">
                    {t.unit}
                  </span>
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={0.1}
          className="mt-10 flex flex-col items-center gap-3 text-center"
        >
          <h3 className="text-balance text-xl font-semibold text-foreground sm:text-2xl">
            {t.ctaTitle}
          </h3>
          <Button
            href={siteConfig.telegramBot}
            target="_blank"
            rel="noreferrer noopener"
            size="lg"
          >
            <Icon.Telegram size={18} />
            {t.ctaLabel}
          </Button>
          <span className="text-xs text-muted">{t.ctaNote}</span>
        </Reveal>
      </Container>
    </section>
  );
}
