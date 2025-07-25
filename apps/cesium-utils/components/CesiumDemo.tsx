export default function CesiumDemo() {
  return (
    <div className="rounded-lg border bg-blue-50 p-6">
      <h2 className="mb-4 text-2xl font-bold text-blue-900">
        Cesium Demo (Multi-Zone)
      </h2>
      <p className="text-blue-700">
        This is the Cesium demo component served from the cesium zone (port
        3001) and proxied through the main app via Next.js Multi-Zone
        configuration.
      </p>
      <div className="mt-4 rounded border bg-white p-4">
        <p className="text-sm text-gray-600">
          Status: Successfully loaded via Next.js Multi-Zone
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Zone: /cesium/* → localhost:3001
        </p>
      </div>
    </div>
  );
}
