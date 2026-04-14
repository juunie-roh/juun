import { Metadata } from "next";
import { notFound } from "next/navigation";

import { validateParams } from "@/utils/server/validate";

import { ResizableViewerController } from "../_components";
import { API_KEYS, getApiMetadata } from "../_data";

export default async function CesiumApiPage({
  params,
}: PageProps<"/[locale]/cesium-utils/[api]">) {
  const validated = await validateParams(params);

  // Check if the slug is valid
  if (!validated) {
    notFound();
  }

  const { api } = validated;

  return <ResizableViewerController api={api} />;
}

export async function generateStaticParams() {
  return API_KEYS.map((api) => ({
    api,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cesium-utils/[api]">): Promise<Metadata> {
  const validated = await validateParams(params);

  if (!validated) {
    return {
      title: "Not Found",
      description: "The requested Cesium API demo was not found.",
    };
  }

  const { api } = validated;

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
