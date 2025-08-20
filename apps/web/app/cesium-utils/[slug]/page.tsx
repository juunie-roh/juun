import { Metadata } from "next";
import { notFound } from "next/navigation";

import ResizableViewerController from "@/components/cesium/demo/resizable-viewer-controller";

// Define the available API routes
const VALID_SLUGS = ["terrain", "collection", "highlight", "viewer"] as const;

type ValidSlug = (typeof VALID_SLUGS)[number];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CesiumApiPage({ params }: PageProps) {
  const { slug } = await params;

  // Check if the slug is valid
  if (!VALID_SLUGS.includes(slug as ValidSlug)) {
    notFound();
  }

  return <ResizableViewerController />;
}

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const apiTitles: Record<ValidSlug, string> = {
    terrain: "Terrain API",
    collection: "Collection API",
    highlight: "Highlight API",
    viewer: "Viewer API",
  };

  const apiDescriptions: Record<ValidSlug, string> = {
    terrain:
      "Demonstration of Cesium terrain utilities and hybrid terrain functionality",
    collection: "Demonstration of Cesium collection management utilities",
    highlight: "Demonstration of Cesium entity highlighting and visual effects",
    viewer:
      "Demonstration of Cesium viewer configuration and management utilities",
  };

  if (!VALID_SLUGS.includes(slug as ValidSlug)) {
    return {
      title: "Not Found",
      description: "The requested Cesium API demo was not found.",
    };
  }

  const validSlug = slug as ValidSlug;

  return {
    title: `${apiTitles[validSlug]} - Cesium Utils`,
    description: apiDescriptions[validSlug],
    keywords: [
      "Cesium",
      "CesiumJS",
      "npm",
      "library",
      "utility",
      "GIS",
      "3D",
      slug,
    ],
    openGraph: {
      type: "website",
      title: `${apiTitles[validSlug]} - Cesium Utils`,
      description: apiDescriptions[validSlug],
      images: "https://cesium.com/logo-kit/cesium/Cesium_dark_color.svg",
      siteName: "Cesium Utils Demonstration",
      url: `https://juun.vercel.app/cesium-utils/${slug}`,
    },
  };
}
