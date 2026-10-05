import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SocialLinks } from "@/components/layout/Header";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a question, want to join an activity, volunteer or collaborate? Get in touch with Exploring Neighbourhood.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Explore Together"
        lead="Have a question, want to join an activity, volunteer with us, collaborate on a project or simply share an interesting observation?"
        image={images.hills}
        breadcrumbs={[{ label: "Contact" }]}
      />

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">We would love to hear from you.</h2>
              <p className="mt-3 text-muted">Send us a message and we&apos;ll reply as soon as we can.</p>
            </div>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${site.email}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-card">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-forest-600">
                    <Mail size={22} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-muted">Email</span>
                    <span className="block font-semibold break-all group-hover:text-forest-600">{site.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-leaf-100 text-forest-600">
                  <MapPin size={22} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-muted">Location</span>
                  <span className="block font-semibold">{site.location}</span>
                </span>
              </li>
            </ul>
            <div>
              <p className="text-sm font-semibold text-muted">Follow us</p>
              <div className="mt-3 flex gap-2">
                <SocialLinks />
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Map of Bangladesh"
                src="https://www.google.com/maps?q=Bangladesh&z=6&output=embed"
                className="block h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="h-fit rounded-3xl border border-line bg-white p-7 shadow-card-hover sm:p-10">
            <h2 className="text-2xl font-bold">Send a message</h2>
            <p className="mt-1 mb-7 text-muted">Fields marked * are required.</p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
