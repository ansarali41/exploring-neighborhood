import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/lib/images";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This trail doesn't lead anywhere."
      lead="The page you're looking for may have moved. Let's get you back on the path."
      image={images.mistyForest}
    >
      <ButtonLink href="/" variant="gold" arrow>
        Back to home
      </ButtonLink>
      <ButtonLink href="/activities" variant="outline-light">
        Explore Activities
      </ButtonLink>
    </PageHero>
  );
}
