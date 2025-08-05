export default function TerrainDescription() {
  return (
    <div className="prose prose-zinc dark:prose-invert prose-headings:tracking-tight max-w-none">
      <h2 className="mb-2">HybridTerrainProvider</h2>
      <p>
        Provides terrain by delegating requests to different terrain providers
        based on geographic regions and zoom levels, allowing combining multiple
        terrain sources into a single seamless terrain.
      </p>
    </div>
  );
}
