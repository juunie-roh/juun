import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResizableViewerController } from "../_components";
import { API_KEYS, getApiMetadata, isValidApi } from "../_utils";
interface PageProps {
  params: Promise<{ api?: string }>;
}

export default async function CesiumApiPage({ params }: PageProps) {
  const { api } = await params;

  // Check if the slug is valid
  if (!api || !isValidApi(api)) {
    notFound();
  }

  return <ResizableViewerController />;
}

export async function generateStaticParams() {
  return API_KEYS.map((api) => ({
    api,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { api } = await params;

  if (!api || !isValidApi(api)) {
    return {
      title: "Not Found",
      description: "The requested Cesium API demo was not found.",
    };
  }

  const metadata = getApiMetadata(api);
  if (!metadata) {
    return {
      title: "Not Found",
      description: "The requested Cesium API demo was not found.",
    };
  }

  return {
    title: `${metadata.title} - Cesium Utils`,
    description: metadata.description,
    keywords: [
      "Cesium",
      "CesiumJS",
      "npm",
      "library",
      "utility",
      "GIS",
      "3D",
      api,
    ],
    openGraph: {
      type: "website",
      title: `${metadata.title} - Cesium Utils`,
      description: metadata.description,
      images: "https://cesium.com/logo-kit/cesium/Cesium_dark_color.svg",
      siteName: "Cesium Utils Demonstration",
      url: `https://juun.vercel.app/cesium-utils/${api}`,
    },
  };
}
