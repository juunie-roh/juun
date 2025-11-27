import { MetadataRoute } from "next";

import { BASE_URL } from "@/constants";

import { TIMELINE_ITEMS } from "./_data";

export default function sitemap(): MetadataRoute.Sitemap {
  return TIMELINE_ITEMS.map((item) => ({
    url: `${BASE_URL}/timeline/${item.id}`,
    lastModified: item.date,
  }));
}
