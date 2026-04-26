import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { defaultLocale, type Locale } from "@/lib/locales";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const safe: Locale = hasLocale(locale) ? locale : defaultLocale;
  const dict = await getDictionary(safe);
  return {
    title: dict.contact.title,
    description: dict.contact.description,
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.contact.subtitle}
        title={dict.contact.title}
        description={dict.contact.description}
        imageSrc="/images/truck-logistics-operations-dusk.jpg"
        imageAlt="Logistics operations at dusk"
        videoSrc="/videos/15373444_3840_2160_25fps.mp4"
      />

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <InfoCard
              icon={<Icon.Phone size={18} />}
              title={dict.contact.phoneLabel}
            >
              <ul className="space-y-1">
                {siteConfig.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={`tel:${p}`}
                      className="text-lg font-medium text-foreground hover:text-brand-700 dark:hover:text-brand-200"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard
              icon={<Icon.Clock size={18} />}
              title={dict.contact.hoursLabel}
            >
              <p className="text-foreground">{dict.contact.hoursWeek}</p>
              <p className="text-muted">{dict.contact.hoursSun}</p>
            </InfoCard>

            <InfoCard
              icon={<Icon.MapPin size={18} />}
              title={dict.contact.addressLabel}
            >
              <p className="text-foreground">{dict.contact.address}</p>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex items-center gap-2 text-sm text-brand-700 hover:underline dark:text-brand-200"
              >
                Google Maps <Icon.ArrowRight size={14} />
              </a>
            </InfoCard>

            <InfoCard
              icon={<Icon.Instagram size={18} />}
              title={dict.contact.socialLabel}
            >
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-foreground hover:text-brand-700 dark:hover:text-brand-200"
              >
                @farrukh_mashanpin
                <Icon.ArrowRight size={14} />
              </a>
            </InfoCard>
          </div>

          <div className="lg:col-span-3">
            <ContactForm dict={dict} />
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)]">
            <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-800 text-white">
                  <Icon.MapPin size={16} />
                </span>
                <span className="text-sm font-medium text-foreground">
                  {dict.contact.mapTitle}
                </span>
              </div>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-brand-700 hover:underline dark:text-brand-200"
              >
                Google Maps
              </a>
            </div>
            <iframe
              title="SAF Logistics on Google Maps"
              src={siteConfig.mapEmbed}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-800 text-white">
          {icon}
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground">
          {title}
        </h3>
      </div>
      <div className="mt-4 text-sm">{children}</div>
    </div>
  );
}
