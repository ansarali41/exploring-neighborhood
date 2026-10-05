import type { Metadata } from "next";
import { newsCategories, sortedStories } from "@/data/news";
import { StoryList } from "@/components/sections/StoryList";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "News & Stories",
  description: "Species of the month, field notes, citizen scientist spotlights and nature stories from Exploring Neighbourhood.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Stories"
        title="Stories from the field"
        lead="Species, discoveries and the people helping document biodiversity around us."
        image={images.tree}
        breadcrumbs={[{ label: "News & Stories" }]}
      />

      <Section tone="cream">
        <StoryList stories={sortedStories} categories={newsCategories.map((c) => c.name)} />
      </Section>

      <CtaBand
        eyebrow="Share your story"
        title="Seen something interesting?"
        text="We love hearing about your observations and discoveries. Share yours and it could appear here."
        image={images.frog2}
      >
        <ButtonLink href="/contact" variant="gold" size="lg" arrow>
          Share Your Observation
        </ButtonLink>
      </CtaBand>
    </>
  );
}
