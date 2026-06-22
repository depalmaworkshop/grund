import type { MetadataRoute } from "next";

// Development surface — disallow all crawlers. Paired with the `noindex` robots
// meta tag (layout.tsx) and the X-Robots-Tag header (next.config.ts).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
