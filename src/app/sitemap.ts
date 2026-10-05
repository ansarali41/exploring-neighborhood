import type { MetadataRoute } from "next";
import { activityPages } from "@/data/activities";
import { events } from "@/data/events";
import { stories } from "@/data/news";
import { projects } from "@/data/research";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/activities",
    "/citizen-science",
    "/research",
    "/events",
    "/news",
    "/resources",
    "/join-us",
    "/volunteer",
    "/contact",
  ];

  return [
    ...staticRoutes.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "weekly" as const, priority: path ? 0.8 : 1 })),
    ...activityPages.map((a) => ({ url: `${site.url}${a.href}`, priority: 0.7 })),
    ...events.map((e) => ({ url: `${site.url}/events/${e.slug}`, priority: 0.6 })),
    ...stories.map((s) => ({ url: `${site.url}/news/${s.slug}`, lastModified: s.date, priority: 0.6 })),
    ...projects.map((p) => ({ url: `${site.url}/research/${p.slug}`, priority: 0.6 })),
  ];
}
