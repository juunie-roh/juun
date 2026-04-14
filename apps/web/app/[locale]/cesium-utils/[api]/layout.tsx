import { ViewerProvider } from "../_contexts";

export default function CesiumApiLayout({
  children,
}: LayoutProps<"/[locale]/cesium-utils/[api]">) {
  return <ViewerProvider>{children}</ViewerProvider>;
}
