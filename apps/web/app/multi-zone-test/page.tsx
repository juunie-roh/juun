import Link from "next/link";

export default function MultiZoneTestPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Next.js Multi-Zone Test</h1>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Host Application</h2>
        <p className="text-gray-600">
          This page is served from the main web app (localhost:3000)
        </p>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Zone Routing</h2>
        <p className="mb-4 text-gray-600">
          Click the link below to navigate to the Cesium zone:
        </p>

        <Link
          href="/multi-zone"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Go to Cesium Zone →
        </Link>
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold">How Multi-Zone Works:</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Main app (localhost:3000) handles all routes by default</li>
          <li>
            • Routes matching <code>/cesium/*</code> are rewritten to
            localhost:3001
          </li>
          <li>
            • Each zone is a separate Next.js app with its own build and
            deployment
          </li>
          <li>• Seamless navigation between zones for users</li>
        </ul>
      </div>
    </div>
  );
}
