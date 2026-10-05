import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FlaskConical, Leaf, MapPin, Microscope, NotebookPen, Sparkles, type LucideIcon } from "lucide-react";
import { getProject, projects } from "@/data/research";
import { ProjectCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Badge, Section, SectionHeading } from "@/components/ui/Section";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/research/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.name, description: project.question } : {};
}

function Fact({ icon: IconCmp, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-line py-5 last:border-0">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-leaf-100 text-forest-600">
        <IconCmp size={20} aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-bold tracking-wide text-forest-600 uppercase">{label}</p>
        <div className="mt-1 text-forest-800">{children}</div>
      </div>
    </div>
  );
}

export default async function ProjectPage({ params }: PageProps<"/research/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <PageHero
        eyebrow={project.theme}
        title={project.name}
        image={project.image}
        breadcrumbs={[{ label: "Research", href: "/research" }, { label: project.name }]}
      >
        <Badge className="bg-white/15 text-white">{project.status}</Badge>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Research question</p>
            <h2 className="mt-3 text-2xl leading-snug font-bold sm:text-3xl">{project.question}</h2>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
              <Image src={project.image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
            <h3 className="mt-10 text-xl font-bold">What we are learning</h3>
            <p className="mt-3 text-lg text-muted">{project.learning}</p>
            <h3 className="mt-10 text-xl font-bold">Results & publications</h3>
            <p className="mt-3 text-muted">{project.results}</p>
          </div>

          <aside className="h-fit rounded-3xl border border-line bg-cream px-7 py-3 lg:sticky lg:top-28">
            <Fact icon={MapPin} label="Location">
              {project.location}
            </Fact>
            <Fact icon={Leaf} label="Species / ecosystem">
              {project.species}
            </Fact>
            <Fact icon={Microscope} label="Theme">
              {project.theme}
            </Fact>
            <Fact icon={FlaskConical} label="Methods">
              <ul className="list-inside list-disc space-y-1 marker:text-forest-600">
                {project.methods.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </Fact>
            <Fact icon={NotebookPen} label="Status">
              {project.status}
            </Fact>
            <div className="pt-2 pb-5">
              <ButtonLink href="/volunteer" className="w-full" arrow>
                <Sparkles size={16} aria-hidden="true" /> Help with this project
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>

      {others.length > 0 && (
        <Section tone="soft">
          <SectionHeading eyebrow="More research" title="Other projects" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
