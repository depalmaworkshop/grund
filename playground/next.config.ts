import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The playground lives inside the Grund repo and imports tokens from one
  // level up (`../src/tokens`). `externalDir` lets Next resolve & transpile
  // source files outside the playground's own root.
  experimental: {
    externalDir: true,
  },
  // Development surface — block indexing on every response (HTML and non-HTML),
  // not just the pages that carry the robots meta tag.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default nextConfig;
