import { CodeBlock } from "@pkg/ui/code-block";

export default function HighlightDescription() {
  return (
    <div className="prose text-primary max-w-none">
      <h2 className="text-primary mb-2 tracking-tight">Highlight</h2>
      <p>
        A lightweight multiton highlight manager for Cesium using flyweight
        pattern that provides unified highlighting for both 2D surface and 3D
        objects.
      </p>

      <h3 className="text-primary mb-2 tracking-tight">About</h3>
      <ul>
        <li>
          <b>Supports</b>: Ground-clamped{" "}
          <code className="text-primary">Entity</code> instances, (polygon,
          polyline, rectangle),{" "}
          <code className="text-primary">GroundPrimitive</code> instances,{" "}
          <code className="text-primary">Cesium3DTileFeature</code>,{" "}
          <code className="text-primary">Entity</code> with model graphics
        </li>
        <li>
          <b>Highlighting modes</b>: Fill mode (default) and outline mode for
          surface objects, outline mode for 3D objects
        </li>
        <li>
          <b>Architecture</b>: Multiton pattern for multi-viewer scenarios,
          flyweight pattern for memory efficiency
        </li>
        <li>
          <b>Features</b>: Automatic object type detection and routing,
          customizable colors and styles, single entity reuse for surface
          highlights
        </li>
        <li>
          <b>Memory efficient</b>: Uses one highlight entity per viewer
          instance, reuses entities across different highlights
        </li>
      </ul>

      <h3 className="text-primary mb-2 tracking-tight">Usage</h3>
      <p>
        You can either use the unified highlight manager{" "}
        <code className="text-primary">Highlight</code> which automatically
        handles object type detection and routing, or implement separate control
        with <code className="text-primary">SurfaceHighlight</code> and{" "}
        <code className="text-primary">SilhouetteHighlight</code>
        for more granular control.
      </p>

      <details>
        <summary>Using Highlight Manager</summary>
        <CodeBlock
          className="my-4"
          fileName="typescript"
          code={`import { Highlight } from "@juun-roh/cesium-utils/highlight";
import { Color } from "cesium";

// Get highlight instance for a viewer (multiton pattern)
const viewer = new Viewer('cesiumContainer');
const highlighter = Highlight.getInstance(viewer);

// Highlight different object types automatically
const entity = viewer.entities.add(new Entity({
  polygon: {
    hierarchy: Cartesian3.fromDegreesArray([-75, 35, -74, 35, -74, 36, -75, 36]),
    material: Color.BLUE
  }
}));

// Highlight with custom options
highlighter.show(entity, { 
  color: Color.RED, 
  outline: true, 
  width: 3 
});

// Works with picked objects from scene.pick()
viewer.canvas.addEventListener('click', (event) => {
  const picked = viewer.scene.pick(new Cartesian2(event.clientX, event.clientY));
  if (picked) {
    highlighter.show(picked, { color: Color.YELLOW });
  }
});

// Clear highlight
highlighter.hide();

// Clean up when done with viewer
Highlight.releaseInstance(viewer);`}
        />
      </details>
      <details>
        <summary>Separate Implementation</summary>
        <CodeBlock
          className="mt-4"
          fileName="typescript"
          code={`import { SurfaceHighlight, SilhouetteHighlight } from "@juun-roh/cesium-utils/highlight";
import { Color } from "cesium";

const viewer = new Viewer('cesiumContainer');

// Create separate highlight instances for manual control
const surfaceHighlight = new SurfaceHighlight(viewer);
const silhouetteHighlight = new SilhouetteHighlight(viewer);

// Manually handle 2D surface objects
const entity2D = viewer.entities.add(new Entity({
  rectangle: {
    coordinates: Rectangle.fromDegrees(-100, 20, -90, 30),
    material: Color.BLUE
  }
}));

surfaceHighlight.show(entity2D, { 
  color: Color.GREEN, 
  outline: false 
});

// Manually handle 3D objects
const entity3D = viewer.entities.add(new Entity({
  position: Cartesian3.fromDegrees(-75, 40, 100),
  model: {
    uri: 'path/to/model.glb'
  }
}));

silhouetteHighlight.show(entity3D, { 
  color: Color.ORANGE, 
  width: 4 
});

// Manual cleanup
surfaceHighlight.destroy();
silhouetteHighlight.destroy();`}
        />
      </details>
    </div>
  );
}
