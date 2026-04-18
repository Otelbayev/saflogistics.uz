"use client";

import type { Dictionary } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

type Props = { dict: Dictionary };

const rows: {
  key: keyof Dictionary["services"]["compareTable"]["rows"];
  standard: string | "yes" | "no";
  express: string | "yes" | "no";
}[] = [
  { key: "delivery", standard: "25–35", express: "7–14" },
  { key: "tracking", standard: "yes", express: "yes" },
  { key: "manager", standard: "no", express: "yes" },
  { key: "customs", standard: "yes", express: "yes" },
  { key: "insurance", standard: "yes", express: "yes" },
  { key: "priority", standard: "no", express: "yes" },
];

function Cell({ value }: { value: string }) {
  if (value === "yes")
    return (
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-white shadow-[var(--shadow-soft)]">
        <Icon.Check size={18} />
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted">
        <Icon.X size={18} />
      </span>
    );
  return (
    <span className="text-lg font-semibold text-foreground">{value}</span>
  );
}

export function CompareTable({ dict }: Props) {
  const t = dict.services.compareTable;
  return (
    <section className="py-24">
      <Container>
        <SectionHeading title={dict.services.compare} />
        <Reveal className="mt-14 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[var(--shadow-elevated)]">
          <table className="w-full text-left">
            <thead className="bg-surface-2 text-foreground">
              <tr>
                <th className="px-8 py-6 text-sm font-semibold uppercase tracking-widest">
                  {t.feature}
                </th>
                <th className="px-8 py-6 text-sm font-semibold uppercase tracking-widest">
                  {t.standard}
                </th>
                <th className="px-8 py-6 text-sm font-semibold uppercase tracking-widest">
                  <span className="inline-flex items-center gap-2">
                    {t.express}
                    <span className="inline-flex items-center gap-1 rounded-full border border-brand-500/40 bg-brand-500/10 px-2 py-0.5 text-[10px] font-medium text-brand-600 dark:text-brand-200">
                      <Icon.Lightning size={10} />
                      fast
                    </span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr
                  key={r.key}
                  className={`border-t border-border transition-colors hover:bg-surface-2/60 ${idx % 2 === 0 ? "" : "bg-background"}`}
                >
                  <td className="px-8 py-6 text-base font-medium text-foreground">
                    {t.rows[r.key]}
                  </td>
                  <td className="px-8 py-6">
                    <Cell value={r.standard} />
                  </td>
                  <td className="px-8 py-6">
                    <Cell value={r.express} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}
