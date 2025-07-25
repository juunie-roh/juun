import CesiumDemo from "../components/CesiumDemo";

export default function Page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Multi Zone (App Router)</h1>
      <p className="mb-6 text-gray-600">
        This page is served from the multi-zone app on port 3001 and accessed
        via /cesium route.
      </p>
      <CesiumDemo />
    </div>
  );
}
