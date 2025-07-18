export default function TerrainDescription() {
  return (
    <div className="prose text-primary max-w-none">
      <h2 className="text-primary mb-2 tracking-tight">
        HybridTerrainProvider
      </h2>
      <p>
        Provides terrain by delegating requests to different terrain providers
        based on geographic regions and zoom levels, allowing combining multiple
        terrain sources into a single seamless terrain.
      </p>
    </div>
  );
}
