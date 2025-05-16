export const metadata = {
  title: 'Cesium Utils',
  description:
    'A utility library for CesiumJS that simplifies working with Cesium instances.',
  keywords: ['Cesium', 'CesiumJS', 'npm', 'library', 'utility', 'GIS', '3D'],
  openGraph: {
    type: 'website',
    title: 'Cesium Utils',
    description:
      'A utility library for CesiumJS that simplifies working with Cesium instances.',
    images: 'https://cesium.com/logo-kit/cesium/Cesium_dark_color.svg',
    siteName: 'Cesium Utils Demonstration',
    url: 'https://juun.vercel.app/cesium-utils',
  },
};

export default function CesiumUtilsDemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="h-[calc(100vh-4.5rem)] w-full p-8 xl:h-[calc(100vh-5rem)]">
      {children}
    </main>
  );
}
