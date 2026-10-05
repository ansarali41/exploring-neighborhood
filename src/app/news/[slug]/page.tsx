import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getStory, sortedStories, stories } from "@/data/news";
import { StoryCard } from "@/components/sections/cards";
import { ButtonLink } from "@/components/ui/Button";
import { Badge, Container, Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const story = getStory((await params).slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: { type: "article", publishedTime: story.date, images: [{ url: story.image }] },
  };
}

export default async function StoryPage({ params }: PageProps<"/news/[slug]">) {
  const story = getStory((await params).slug);
  if (!story) notFound();
  const related = sortedStories.filter((s) => s.slug !== story.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    datePublished: story.date,
    image: story.image,
    author: { "@type": "Organization", name: story.author },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="bg-forest-900 pt-32 pb-40 text-white sm:pt-40">
          <Container size="narrow">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" /> All stories
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <Badge className="bg-gold-500 text-forest-900">{story.category}</Badge>
              <time dateTime={story.date}>{formatDate(story.date)}</time>
              <span aria-hidden="true">•</span>
              <span>{story.author}</span>
            </div>
            <h1 className="mt-5 text-4xl leading-tight font-bold sm:text-5xl">{story.title}</h1>
            <p className="mt-5 text-xl text-white/80">{story.excerpt}</p>
          </Container>
        </header>

        <Container size="narrow" className="-mt-28">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-card-hover">
            <Image src={story.image} alt="" fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>
          <div className="prose-story py-12">
            {story.body.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-heading first-letter:text-6xl first-letter:leading-none first-letter:font-bold first-letter:text-forest-600" : undefined}>
                {p}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-8">
            <p className="font-semibold">Seen something similar? Share your observation.</p>
            <ButtonLink href="/contact" arrow>
              Share Your Observation
            </ButtonLink>
          </div>
        </Container>
      </article>

      <Section tone="soft">
        <SectionHeading eyebrow="Keep reading" title="More stories" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </Section>
    </>
  );
}
