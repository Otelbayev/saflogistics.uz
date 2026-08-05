"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useQuoteModal } from "@/components/ui/QuoteModal";
import { CountUp } from "@/components/ui/CountUp";
import { siteConfig, tariffKeys, tariffs, type TariffKey } from "@/lib/site";

type Props = { dict: Dictionary };

const NUMBER = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const DECIMAL = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

type Calculation =
  | { state: "invalid" }
  | { state: "tooFast" }
  | {
      state: "ok";
      savedDays: number;
      profitPerBatch: number;
      turnsWithout: number;
      turnsWith: number;
      extraTurns: number;
      extraProfit: number;
    };

/**
 * Cycle savings model from the TZ: shortening the purchase→sale cycle by the
 * days SAF saves raises the number of capital turns per year, and every extra
 * turn earns one more batch margin — without any extra investment.
 */
function calculate(
  investment: number,
  marginPercent: number,
  currentCycle: number,
  tariff: TariffKey,
): Calculation {
  if (
    !Number.isFinite(investment) ||
    !Number.isFinite(marginPercent) ||
    !Number.isFinite(currentCycle) ||
    investment <= 0 ||
    marginPercent <= 0 ||
    currentCycle <= 0
  ) {
    return { state: "invalid" };
  }

  const safCycle = tariffs[tariff].max;
  // Nothing to gain when the client already ships faster than the tariff.
  if (currentCycle <= safCycle) return { state: "tooFast" };

  const savedDays = currentCycle - safCycle;
  const profitPerBatch = (investment * marginPercent) / 100;
  const turnsWithout = 365 / currentCycle;
  const turnsWith = 365 / safCycle;
  const extraTurns = turnsWith - turnsWithout;

  return {
    state: "ok",
    savedDays,
    profitPerBatch,
    turnsWithout,
    turnsWith,
    extraTurns,
    extraProfit: extraTurns * profitPerBatch,
  };
}

function Field({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  suffix,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  min: number;
  max: number;
  suffix: string;
}) {
  const hintId = useId();
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hintId}
          className="w-full rounded-xl border border-border bg-background px-4 py-3.5 pr-16 text-base font-medium text-foreground outline-none transition focus:border-brand-500 focus:bg-surface focus:ring-2 focus:ring-brand-500/30"
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-muted">
          {suffix}
        </span>
      </div>
      <span id={hintId} className="mt-1.5 block text-xs text-muted">
        {hint}
      </span>
    </label>
  );
}

function Result({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        emphasis
          ? "border-brand-500/40 bg-brand-500/10"
          : "border-border bg-background/60 dark:border-white/10 dark:bg-white/5"
      }`}
    >
      <div className="text-xs font-medium uppercase tracking-widest text-muted">
        {label}
      </div>
      <div
        className={`mt-1.5 font-semibold text-foreground ${
          emphasis ? "text-3xl sm:text-4xl" : "text-2xl"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export function ProfitCalculator({ dict }: Props) {
  const { open: openQuote } = useQuoteModal();
  const [investment, setInvestment] = useState("50000");
  const [margin, setMargin] = useState("20");
  const [cycle, setCycle] = useState("45");
  const [tariff, setTariff] = useState<TariffKey>("express");

  const t = dict.calculator;

  const result = useMemo(
    () =>
      calculate(
        Number.parseFloat(investment),
        Number.parseFloat(margin),
        Number.parseFloat(cycle),
        tariff,
      ),
    [investment, margin, cycle, tariff],
  );

  // Format with a fixed locale, never the user's: Node and browser ICU disagree
  // on uz-UZ/ru-RU currency output ("$ 10,000" vs "10 000 US$"), which makes the
  // server and client markup differ and trips a hydration error.
  const money = (n: number) => `$${NUMBER.format(Math.round(n))}`;
  const decimal = (n: number) => DECIMAL.format(n);

  return (
    <section id="calculator" className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 50% at 80% 30%, color-mix(in oklab, var(--color-brand-500) 12%, transparent), transparent 70%)",
        }}
      />
      <Container>
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          subtitle={t.description}
        />

        <Reveal
          from="zoom"
          className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-4xl border border-border bg-surface p-6 shadow-(--shadow-elevated) sm:p-10 xl:max-w-7xl"
        >
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Inputs */}
            <div className="space-y-5">
              <Field
                label={t.inputs.investment}
                hint={t.inputs.investmentHint}
                value={investment}
                onChange={setInvestment}
                min={0}
                max={100000000}
                suffix="$"
              />
              <Field
                label={t.inputs.margin}
                hint={t.inputs.marginHint}
                value={margin}
                onChange={setMargin}
                min={0}
                max={100}
                suffix="%"
              />
              <Field
                label={t.inputs.cycle}
                hint={t.inputs.cycleHint}
                value={cycle}
                onChange={setCycle}
                min={0}
                max={365}
                suffix={t.results.days}
              />

              <div>
                <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                  {t.inputs.tariff}
                </span>
                <div
                  role="radiogroup"
                  aria-label={t.inputs.tariff}
                  className="grid grid-cols-3 gap-2"
                >
                  {tariffKeys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={tariff === key}
                      onClick={() => setTariff(key)}
                      className={`rounded-xl border px-3 py-3 text-center transition ${
                        tariff === key
                          ? "border-brand-500 bg-brand-500/10 text-foreground ring-1 ring-brand-500/30"
                          : "border-border bg-background text-muted hover:border-brand-500/40 hover:text-foreground"
                      }`}
                    >
                      <span className="block text-sm font-semibold">
                        {dict.services[key].name}
                      </span>
                      <span className="mt-0.5 block text-xs">
                        {tariffs[key].min}–{tariffs[key].max}{" "}
                        {dict.services.daysLabel}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-muted">
                {t.results.title}
              </h3>

              {result.state !== "ok" ? (
                <div
                  role="status"
                  className="mt-4 flex flex-1 items-center rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 text-sm leading-relaxed text-amber-900 dark:text-amber-100"
                >
                  {result.state === "invalid"
                    ? t.warning.invalid
                    : t.warning.tooFast}
                </div>
              ) : (
                <>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Result
                      label={t.results.saved}
                      value={
                        <CountUp
                          value={result.savedDays}
                          format={decimal}
                          suffix={` ${t.results.days}`}
                        />
                      }
                    />
                    <Result
                      label={t.results.perBatch}
                      value={
                        <CountUp value={result.profitPerBatch} format={money} />
                      }
                    />
                    <Result
                      label={t.results.turnsWithout}
                      value={
                        <CountUp
                          value={result.turnsWithout}
                          format={decimal}
                          suffix={` ${t.results.turns}`}
                        />
                      }
                    />
                    <Result
                      label={t.results.turnsWith}
                      value={
                        <CountUp
                          value={result.turnsWith}
                          format={decimal}
                          suffix={` ${t.results.turns}`}
                        />
                      }
                    />
                    <Result
                      label={t.results.extraTurns}
                      value={
                        <CountUp
                          value={result.extraTurns}
                          format={decimal}
                          prefix="+"
                          suffix={` ${t.results.turns}`}
                        />
                      }
                    />
                    <Result
                      label={t.results.extraProfit}
                      value={
                        <CountUp
                          value={result.extraProfit}
                          format={money}
                          prefix="+"
                          duration={1200}
                        />
                      }
                      emphasis
                    />
                  </div>

                  <p className="mt-5 text-sm font-medium leading-relaxed text-brand-700 dark:text-brand-200">
                    {t.results.emphasis}
                  </p>
                </>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button onClick={openQuote} className="w-full sm:w-auto">
                  {t.cta}
                  <Icon.ArrowRight size={16} />
                </Button>
                <Button
                  href={`tel:${siteConfig.phones[0]}`}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Icon.Phone size={16} />
                  {t.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
