import { images } from "@/lib/images";

export const newsCategories = [
  {
    name: "Species of the Month",
    description: "Introduce an interesting species and explain its ecology, behaviour and conservation significance.",
  },
  {
    name: "Field Notes",
    description: "Stories and observations from nature walks, surveys and research activities.",
  },
  {
    name: "Citizen Scientist Spotlight",
    description: "Highlight people contributing observations and helping document biodiversity.",
  },
  {
    name: "Nature Stories",
    description: "Interesting stories about wildlife, plants, landscapes and science.",
  },
] as const;

export type NewsCategory = (typeof newsCategories)[number]["name"];

export type Story = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  /** Paragraphs of the article body */
  body: string[];
};

/*
 * SAMPLE STORIES — placeholder content to show the blog layout.
 * Replace with real articles. Newest first is handled automatically.
 */
export const stories: Story[] = [
  {
    slug: "species-of-the-month-indian-roller",
    title: "Species of the Month: The Indian Roller",
    category: "Species of the Month",
    date: "2026-09-12",
    author: "Exploring Neighbourhood",
    excerpt:
      "Often seen perched on wires beside fields, this bird hides a flash of brilliant blue that only shows in flight.",
    image: images.roller,
    body: [
      "The Indian Roller is one of the most familiar birds of open country in Bangladesh. Perched quietly on a wire or a bare branch, it can look rather plain — until it takes off and reveals bands of electric blue on its wings.",
      "Rollers hunt from a perch, dropping to the ground to catch grasshoppers, beetles and other large insects. That makes them useful neighbours for farmers and a good indicator of healthy, insect-rich farmland.",
      "Next time you pass open fields, look for a stocky bird sitting upright on a wire. Note the time, place and what it was doing — and share your observation on a citizen-science platform so your sighting becomes part of the bigger picture.",
    ],
  },
  {
    slug: "field-notes-listening-after-the-rain",
    title: "Field Notes: Listening After the Rain",
    category: "Field Notes",
    date: "2026-08-28",
    author: "Field Team",
    excerpt: "An evening frog walk turned into a lesson in patience, torchlight and learning to tell calls apart.",
    image: images.frogs,
    body: [
      "The rain stopped just before sunset, and by the time we reached the edge of the wetland the chorus had already begun. Within minutes we could pick out at least three different calls.",
      "We walked slowly, torches pointed low, and stopped every few metres to listen. Participants recorded short audio clips on their phones — recordings that can help confirm species later.",
      "By the end of the evening, everyone had photographed at least one frog without handling it, and learned how to note habitat, time and weather alongside each observation.",
    ],
  },
  {
    slug: "citizen-scientist-spotlight-first-100-observations",
    title: "Citizen Scientist Spotlight: 100 Observations and Counting",
    category: "Citizen Scientist Spotlight",
    date: "2026-08-10",
    author: "Exploring Neighbourhood",
    excerpt: "How one student turned daily walks around the neighbourhood into a growing record of local biodiversity.",
    image: images.forestPath,
    body: [
      "It started with a single photo of a butterfly on the way to class. A few months later, that curiosity had grown into more than a hundred recorded observations — birds, insects, plants and a surprise frog in a flower pot.",
      "The secret, they say, is consistency: the same route, looked at carefully, again and again. Every season brings something new.",
      "You don't need special equipment to start. A phone camera, a notebook and a little patience are enough to contribute real data to science.",
    ],
  },
  {
    slug: "nature-stories-why-wetlands-matter",
    title: "Why Our Wetlands Matter",
    category: "Nature Stories",
    date: "2026-07-22",
    author: "Exploring Neighbourhood",
    excerpt: "Wetlands filter water, store floods and shelter countless species. Here is why they deserve our attention.",
    image: images.lake,
    body: [
      "Bangladesh is a land shaped by water. Its wetlands — from village ponds to vast haors — provide fish, clean water and flood protection, and support an extraordinary diversity of birds, frogs, fish and plants.",
      "These ecological services often go unnoticed until they are lost. Learning to observe and record wetland wildlife is one of the simplest ways communities can help track how these places are changing.",
      "Join one of our walks to explore a wetland near you and discover the life it supports.",
    ],
  },
  {
    slug: "sky-watch-a-night-with-the-moon",
    title: "A Night with the Moon",
    category: "Field Notes",
    date: "2026-06-30",
    author: "Sky Watch Team",
    excerpt: "Craters, mountains and a lot of excited gasps — highlights from our family sky-watch session.",
    image: images.sky,
    body: [
      "For many participants it was their first look through a telescope. The Moon's craters, sharp along the line between light and shadow, drew gasps from children and adults alike.",
      "Between turns at the eyepiece, we practised finding constellations with the naked eye and talked about why the Moon shows phases.",
      "Sky Watch sessions run throughout the year when skies are clear. Keep an eye on our events page for the next one.",
    ],
  },
];

export const sortedStories = [...stories].sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
