import type { Metadata } from "next";
import { volunteerRoles } from "@/data/volunteer";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Bring your curiosity. Volunteer with Exploring Neighbourhood in the field, in education, science, communications or events.",
};

const steps = [
  { title: "Tell us about you", text: "Fill in the short form below with your interests and availability." },
  { title: "Meet the team", text: "We'll get in touch for a friendly chat and find the right role for you." },
  { title: "Start exploring", text: "Join your first activity — training and support are provided." },
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer"
        title="Bring Your Curiosity"
        lead="We are looking for people who would like to contribute their time, skills and enthusiasm."
        image={images.waterfall}
        breadcrumbs={[{ label: "Get Involved" }, { label: "Volunteer" }]}
      >
        <ButtonLink href="#apply" variant="gold" arrow>
          Become a Volunteer
        </ButtonLink>
      </PageHero>

      <Section tone="white">
        <SectionHeading eyebrow="Volunteer areas" title="Find your role" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {volunteerRoles.map((role, i) => (
            <li key={role.title} className="rounded-2xl border border-line bg-cream p-7 transition-shadow hover:shadow-card">
              <IconBadge name={role.icon} tone={i % 2 ? "gold" : "forest"} />
              <h3 className="mt-5 text-lg font-bold">{role.title}</h3>
              <p className="mt-2 text-[15px] text-muted">{role.description}</p>
            </li>
          ))}
          <li className="flex flex-col justify-center rounded-2xl bg-forest-900 p-7 text-white">
            <h3 className="text-lg font-bold">Not sure where you fit?</h3>
            <p className="mt-2 text-[15px] text-white/75">Tell us what you enjoy and we&apos;ll help you find a role.</p>
            <ButtonLink href="#apply" variant="gold" size="sm" className="mt-5 self-start" arrow>
              Apply now
            </ButtonLink>
          </li>
        </ul>
      </Section>

      <Section tone="soft">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold sm:text-4xl">Three steps to get started</h2>
            <ol className="mt-8 space-y-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-forest-600 font-heading font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-1 text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div id="apply" className="scroll-mt-28 rounded-3xl border border-line bg-white p-7 shadow-card-hover sm:p-10">
            <h2 className="text-2xl font-bold">Become a Volunteer</h2>
            <p className="mt-1 mb-7 text-muted">It only takes a minute.</p>
            <VolunteerForm />
          </div>
        </div>
      </Section>
    </>
  );
}
