import type { Metadata } from "next";
import { resources } from "@/data/resources";
import { ResourceLibrary } from "@/components/sections/ResourceLibrary";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Identification guides, citizen-science how-tos, astronomy, conservation and research publications — a growing library for nature explorers.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="A growing library for explorers"
        lead="PDFs • Guides • Links • Videos • Identification resources • Publications"
        image={images.seedlings}
        breadcrumbs={[{ label: "Resources" }]}
      />
      <Section tone="cream">
        <ResourceLibrary resources={resources} />
      </Section>
    </>
  );
}
