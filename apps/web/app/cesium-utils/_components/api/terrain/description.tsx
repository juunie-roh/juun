import { Prose } from "@/components/ui/prose";

export default function TerrainDescription() {
  return (
    <Prose>
      <h2>HybridTerrainProvider</h2>
      <p>
        Provides terrain by delegating requests to different terrain providers
        based on geographic regions and zoom levels, allowing combining multiple
        terrain sources into a single seamless terrain.
      </p>
    </Prose>
  );
}
