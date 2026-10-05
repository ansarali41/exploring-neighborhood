import type { Metadata } from "next";
import { projects, researchThemes } from "@/data/research";
import { ProjectCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Research & Monitoring",
  description:
    "Exploring Neighbourhood supports practical biodiversity research and ecological monitoring — acoustic, bird, biodiversity and agricultural landscapes.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research & Monitoring"
        title="Learning from the Living World"
        lead="Exploring Neighbourhood supports practical biodiversity research and ecological monitoring that helps us better understand the natural world."
        image={images.lake}
        breadcrumbs={[{ label: "Science" }, { label: "Research & Monitoring" }]}
      />

      <Section tone="white">
        <SectionHeading eyebrow="Research themes" title="What we study" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {researchThemes.map((theme, i) => (
            <li key={theme.title} className="rounded-2xl border border-line bg-cream p-7">
              <IconBadge name={theme.icon} tone={i % 2 ? "sky" : "forest"} />
              <h3 className="mt-5 text-lg font-bold">{theme.title}</h3>
              <p className="mt-2 text-[15px] text-muted">{theme.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft">
        <SectionHeading
          eyebrow="Projects"
          title="Research projects"
          lead="Current and upcoming projects. New projects are added here as our work grows."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Collaborate"
        title="Interested in working with us?"
        text="We welcome partnerships with researchers, universities and conservation organisations."
        image={images.seedlings}
      >
        <ButtonLink href="/contact" variant="gold" size="lg" arrow>
          Contact Us
        </ButtonLink>
        <ButtonLink href="/volunteer" variant="outline-light" size="lg">
          Become a Science Volunteer
        </ButtonLink>
      </CtaBand>
    </>
  );
}
