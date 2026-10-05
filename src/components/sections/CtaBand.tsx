import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { images } from "@/lib/images";

/** Closing call-to-action used at the bottom of most pages (the conversion step of the user journey). */
export function CtaBand({
  eyebrow = "Get involved",
  title = "Become part of the journey.",
  text = "You don't need to be an expert to become an explorer. Join a walk, look through a telescope or share your first observation.",
  image = images.mistyForest,
  children,
}: {
  eyebrow?: string;
  title?: ReactNode;
  text?: ReactNode;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-forest-900 px-6 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
          <Image src={image} alt="" fill sizes="(min-width: 1280px) 1152px, 100vw" className="-z-20 object-cover opacity-40" />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-950 via-forest-950/85 to-forest-950/40" />
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-300">{eyebrow}</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-4 text-lg text-white/80">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {children ?? (
                <>
                  <ButtonLink href="/join-us" variant="gold" size="lg" arrow>
                    Join Us
                  </ButtonLink>
                  <ButtonLink href="/volunteer" variant="outline-light" size="lg">
                    Volunteer
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
