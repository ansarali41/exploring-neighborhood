/**
 * Central image registry.
 *
 * These are placeholder photos (from the original design + Unsplash).
 * The brief asks for real Bangladesh biodiversity photography — to swap one,
 * drop the file into /public/images and change the value here, e.g.
 *   birds: "/images/birds.jpg",
 */
const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop`;

export const images = {
  logo: "/images/logo.png",

  hero: unsplash("1441974231531-c6227db76b6e"), // sunlit forest (original hero)
  about: unsplash("1513836279014-a89f7a76ae86"), // trees (original about photo)
  birds: unsplash("1444464666168-49d633b86797"), // original bird photo
  roller: unsplash("1535083783855-76ae62b2914e"), // Indian roller
  frogs: unsplash("1551189014-fe516aed0e9e"), // tree frog
  frog2: unsplash("1579380656108-f98e4df8ea62"),
  sky: unsplash("1519681393784-d120267933ba"), // original sky photo
  milkyWay: unsplash("1419242902214-272b3f66ee7a"),
  stars: unsplash("1506318137071-a8e063b4bec0"),
  mistyForest: unsplash("1509316975850-ff9c5deb0cd9"),
  forestPath: unsplash("1516214104703-d870798883c5"),
  tree: unsplash("1502082553048-f009c37129b9"),
  lake: unsplash("1497436072909-60f360e1d4b1"),
  seedlings: unsplash("1523348837708-15d4a09cfac2"),
  hills: unsplash("1500534314209-a25ddb2bd429"),
  waterfall: unsplash("1433086966358-54859d0ed716"),
} as const;
