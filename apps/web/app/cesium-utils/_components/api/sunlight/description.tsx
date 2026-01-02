import { TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CodeBlock } from "@/components/ui/code-block";
import { Prose } from "@/components/ui/prose";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SunlightDescription() {
  return (
    <ScrollArea className="min-w-none size-full">
      <Prose>
        <h2>Sunlight</h2>
        <p>
          A point-based sunlight analysis utility for shadow calculations in 3D
          geospatial environments. Determines whether sunlight reaches a
          specific point at a given time by casting rays from the sun&apos;s
          position and detecting occlusions from terrain and 3D models.
        </p>

        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Experimental Feature</AlertTitle>
          <AlertDescription>
            This utility uses Cesium&apos;s internal APIs which are not part of
            the public interface. These APIs may change or break in future
            versions. Minimum version: Cesium 1.133.0. Use in production at your
            own risk.
          </AlertDescription>
        </Alert>

        <h3>How It Works</h3>
        <ol>
          <li>
            <b>Virtual Sun Positioning</b>: Creates a virtual sun position at a
            configurable distance (default 10km) from the target point to reduce
            computational overhead while maintaining accurate ray directions
          </li>
          <li>
            <b>Ray Casting</b>: Casts a ray from the virtual sun position toward
            the target point using Cesium&apos;s internal{" "}
            <code>pickFromRayMostDetailed</code> method
          </li>
          <li>
            <b>Collision Detection</b>: Detects intersections with terrain, 3D
            tilesets (buildings, structures), and other scene objects along the
            ray path
          </li>
          <li>
            <b>Result Analysis</b>: Determines if the first intersection is the
            target point itself (sunlight reaches) or an occluding object
            (shadow cast)
          </li>
        </ol>

        <h3>Key Features</h3>
        <ul>
          <li>
            <b>Single Time Analysis</b>: Analyze sunlight at a specific moment
            using <code>JulianDate</code>
          </li>
          <li>
            <b>Time Range Analysis</b>: Analyze sunlight patterns over a period
            with configurable step intervals (e.g., hourly throughout a day or
            season)
          </li>
          <li>
            <b>Debug Visualization</b>: Optional visualization of sun rays
            (polylines) and collision points for development and verification
          </li>
          <li>
            <b>Error Boundary System</b>: Configurable tolerance sphere around
            target points to account for picking precision limitations
          </li>
          <li>
            <b>State Management</b>: Automatically manages and restores viewer
            clock state during analysis
          </li>
          <li>
            <b>Object Exclusion</b>: Ability to exclude specific objects from
            ray collision detection
          </li>
        </ul>

        <h3>Usage</h3>
        <details>
          <summary>Basic Setup & Single Time Analysis</summary>
          <CodeBlock
            className="my-4"
            fileName="typescript"
            code={`import { Sunlight } from "@juun-roh/cesium-utils/experimental";
import * as Cesium from "cesium";

const viewer = new Cesium.Viewer('cesiumContainer');

// Initialize Sunlight utility
const sunlight = new Sunlight(viewer);

// Set target point with error boundary
const targetPosition = Cesium.Cartesian3.fromDegrees(
  -74.01881302800248,  // longitude (New York)
  40.69114333714821,   // latitude
  50                   // height in meters
);

// Create detection ellipsoid at target point
sunlight.setTargetPoint(
  targetPosition,
  true,  // show the point entity
  10,    // error boundary radius in pixels
  Cesium.Color.LIMEGREEN.withAlpha(0.8)  // optional color
);

// Analyze at specific time
const result = await sunlight.analyze(
  targetPosition,
  Cesium.JulianDate.now(),
  {
    errorBoundary: 10,
    debugShowRays: true,      // visualize sun rays
    debugShowPoints: true,    // show collision points
  }
);

console.log(\`Sunlight reached: \${result.result}\`);
console.log(\`Timestamp: \${result.timestamp}\`);

// Cleanup debug visuals
sunlight.clear();`}
          />
        </details>

        <details>
          <summary>Time Range Analysis</summary>
          <CodeBlock
            className="my-4"
            fileName="typescript"
            code={`// Analyze sunlight over a full day (6 AM to 6 PM)
const timeRange = {
  start: Cesium.JulianDate.fromIso8601("2024-06-21T06:00:00Z"),
  end: Cesium.JulianDate.fromIso8601("2024-06-21T18:00:00Z"),
  step: 3600  // 1 hour in seconds
};

const results = await sunlight.analyze(
  targetPosition,
  timeRange,
  { errorBoundary: 10 }
);

// Process results
results.forEach(r => {
  const time = new Date(r.timestamp).toLocaleTimeString();
  const status = r.result ? '☀️ Sunlit' : '🌑 Shadow';
  console.log(\`\${time}: \${status}\`);
});

// Calculate sun exposure percentage
const sunlitHours = results.filter(r => r.result).length;
const totalHours = results.length;
const exposurePercent = (sunlitHours / totalHours) * 100;
console.log(\`Sun exposure: \${exposurePercent.toFixed(1)}%\`);`}
          />
        </details>

        <details>
          <summary>Object Exclusion & Error Handling</summary>
          <CodeBlock
            className="my-4"
            fileName="typescript"
            code={`// Exclude specific objects from collision detection
const transparentGlass = viewer.entities.add({
  // ... glass entity configuration
});

try {
  const result = await sunlight.analyze(
    targetPosition,
    Cesium.JulianDate.now(),
    {
      objectsToExclude: [transparentGlass],  // Ignore glass in analysis
      errorBoundary: 15  // Larger boundary for complex geometry
    }
  );

  console.log('Analysis complete:', result);
} catch (error) {
  console.error('Analysis failed:', error.message);
  // Common error: Target point not set
  // Solution: Call setTargetPoint() before analyze()
}

// Check if analysis is in progress
if (sunlight.isAnalyzing) {
  console.log('Analysis already running...');
}`}
          />
        </details>

        <h3>Performance Characteristics</h3>
        <ul>
          <li>
            <b>Single time analysis</b>: ~50-200ms depending on scene complexity
            and 3D tileset detail
          </li>
          <li>
            <b>Time range analysis</b>: Linear with number of time steps (n ×
            single analysis time)
          </li>
          <li>
            <b>Virtual sun calculation</b>: O(1), minimal overhead
          </li>
          <li>
            <b>Ray casting</b>: Most expensive operation, depends on scene
            geometry and ray length
          </li>
          <li>
            <b>Recommendation</b>: For time ranges, use larger step intervals
            (≥30min) for better performance. Consider running analysis in
            background for UI responsiveness
          </li>
          <li>
            <b>3D Tilesets</b>: Ensure tiles are fully loaded before analysis
            for accurate results
          </li>
        </ul>

        <h3>Limitations & Considerations</h3>
        <ul>
          <li>
            <b>Error Boundary System</b>: Results depend on error boundary size.
            The ellipsoid entity created by `setTargetPoint` is to complement
            cesium's native click event accuracy.
          </li>
          <li>
            <b>Scene State</b>: The viewer&apos;s clock is temporarily modified
            during analysis and automatically restored. Avoid concurrent time
            manipulation
          </li>
          <li>
            <b>3D Tile Loading</b>: Analysis accuracy requires fully loaded
            tilesets.
          </li>
          <li>
            <b>Atmospheric Effects</b>: Does not account for atmospheric
            scattering, refraction, or diffuse lighting—only direct sunlight
            occlusion
          </li>
          <li>
            <b>Memory Usage</b>: Debug visualization (rays and points) can
            accumulate. Call <code>clear()</code> regularly to free resources
          </li>
          <li>
            <b>API Stability</b>: Breaking changes in Cesium&apos;s internal
            APIs may occur without notice. Pin Cesium version in production if
            stability is critical
          </li>
        </ul>
      </Prose>
    </ScrollArea>
  );
}
