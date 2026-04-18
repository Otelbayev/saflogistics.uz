import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/site";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border bg-surface">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 0%, color-mix(in oklab, var(--color-brand-800) 25%, transparent), transparent), radial-gradient(40% 40% at 100% 100%, color-mix(in oklab, var(--color-brand-500) 18%, transparent), transparent)",
        }}
      />
      <Container className="relative grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <span className="relative inline-flex h-11 w-11 overflow-hidden rounded-xl bg-brand-950">
              <Image
                src="/images/logo.jpg"
                alt={dict.site.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <div>
              <div className="text-lg font-semibold">{dict.site.name}</div>
              <div className="text-xs uppercase tracking-widest text-muted">
                {dict.site.tagline}
              </div>
            </div>
          </Link>
          <p className="mt-5 max-w-md text-sm text-muted">{dict.footer.about}</p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-brand-800 hover:text-white"
            >
              <Icon.Instagram size={18} />
            </a>
            {siteConfig.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 text-sm text-foreground transition hover:bg-surface-2"
              >
                <Icon.Phone size={16} />
                <span>{p}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
            {dict.footer.quickLinks}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <Link href={`/${locale}`} className="hover:text-foreground">
                {dict.nav.home}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/services`}
                className="hover:text-foreground"
              >
                {dict.nav.services}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/contact`}
                className="hover:text-foreground"
              >
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground">
            {dict.footer.contacts}
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <Icon.MapPin size={16} />
              <span>{dict.contact.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon.Clock size={16} />
              <span>{dict.contact.hoursWeek}</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon.Clock size={16} />
              <span>{dict.contact.hoursSun}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <span>
            © {year} {dict.site.name}. {dict.footer.rights}
          </span>
          <span>{dict.footer.madeWith} · SAF Logistics</span>
        </Container>
      </div>
    </footer>
  );
}
