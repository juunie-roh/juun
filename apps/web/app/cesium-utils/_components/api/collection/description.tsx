import { CodeBlock } from "@juun/ui/code-block";
import { Prose } from "@juun/ui/prose";
import { ScrollArea } from "@juun/ui/scroll-area";

export default function CollectionDescription() {
  return (
    <ScrollArea className="min-w-none size-full">
      <Prose>
        <h2>Collection</h2>
        <p>
          A type-safe wrapper that abstracts <b>common behaviors</b> of
          Cesium&apos;s native collection objects (EntityCollection,
          PrimitiveCollection, DataSourceCollection, ImageryLayerCollection)
          with a powerful tagging and grouping system. It provides a unified API
          for batch operations, filtering, and event handling.
        </p>
        <p className="text-sm text-muted-foreground">
          <b>Note:</b> This wrapper is designed for common use cases. For
          specific or advanced operations unique to individual collection types,
          use the native Cesium collection APIs directly.
        </p>

        <h3>Core Problems It Solves</h3>
        <ul>
          <li>
            <b>Organization Challenge</b>: Cesium collections lack built-in
            grouping mechanisms. Collection uses symbol-based tagging to
            organize items into logical groups without modifying objects.
          </li>
          <li>
            <b>Batch Operations</b>: Managing visibility and properties of item
            groups requires manual iteration. Collection enables tag-based
            operations like <code>show(&apos;buildings&apos;)</code>,{" "}
            <code>hide(&apos;temp&apos;)</code>, and{" "}
            <code>forEach(fn, &apos;landmarks&apos;)</code>.
          </li>
          <li>
            <b>Performance</b>: Repeated filtering and lookups can be slow for
            large collections. Collection provides O(1) tag lookups via internal
            Map and cached values array with event-driven invalidation.
          </li>
          <li>
            <b>API Consistency</b>: Different Cesium collections have
            inconsistent APIs. Collection provides a unified interface across
            EntityCollection, PrimitiveCollection, DataSourceCollection, and
            ImageryLayerCollection.
          </li>
        </ul>

        <h3>Supported Collection Types</h3>
        <ul>
          <li>
            <code>EntityCollection</code> - Manages Entity instances
          </li>
          <li>
            <code>PrimitiveCollection</code> - Manages Primitive objects
          </li>
          <li>
            <code>DataSourceCollection</code> - Manages DataSource instances
          </li>
          <li>
            <code>ImageryLayerCollection</code> - Manages ImageryLayer objects
          </li>
        </ul>

        <h3>Key Features</h3>
        <ul>
          <li>
            <b>Tagging System</b>: Organize items with string or numeric tags
            using Symbol-based storage to avoid property conflicts
          </li>
          <li>
            <b>Batch Visibility Control</b>: Show/hide entire groups with{" "}
            <code>show(tag)</code>, <code>hide(tag)</code>,{" "}
            <code>toggle(tag)</code>
          </li>
          <li>
            <b>Array-like Operations</b>: Use <code>filter()</code>,{" "}
            <code>map()</code>, <code>find()</code>, <code>forEach()</code> with
            optional tag filtering
          </li>
          <li>
            <b>Event System</b>: Listen to <code>add</code>, <code>remove</code>
            , <code>update</code>, and <code>clear</code> events with item
            details
          </li>
          <li>
            <b>Type Safety</b>: Fully typed with generic constraints ensuring
            collection-item compatibility
          </li>
          <li>
            <b>Performance Optimization</b>: Lazy cache building, event-driven
            updates, O(1) tag lookups
          </li>
        </ul>

        <h3>Usage</h3>
        <details>
          <summary>Basic Tagging & Batch Operations</summary>
          <CodeBlock
            className="my-4"
            fileName="typescript"
            code={`import { Collection } from "@juun-roh/cesium-utils";
import { Viewer } from "cesium";

const viewer = new Viewer('cesiumContainer');

// Create a Collection wrapper
const collection = new Collection({
  collection: viewer.entities,
  tag: 'default'  // Optional default tag
});

// Add items with tags
collection.add(building1, 'buildings');
collection.add([road1, road2, road3], 'infrastructure');

// Batch visibility control
collection.show('buildings');        // Show all buildings
collection.hide('infrastructure');   // Hide infrastructure
collection.toggle('debug-markers');  // Toggle visibility

// Get items by tag
const allBuildings = collection.get('buildings');       // Returns Entity[]
const firstBuilding = collection.first('buildings');    // Returns first Entity

// Check tag existence
if (collection.contains('landmarks')) {
  console.log('Landmarks exist');
}

// Update tags
collection.update('temp', 'permanent');  // Move items from 'temp' to 'permanent' tag

// Cleanup
collection.remove('debug-markers');  // Remove all debug markers
collection.removeAll();              // Clear entire collection
collection.destroy();                // Cleanup and remove event listeners`}
          />
        </details>

        <details>
          <summary>Array-like Operations & Filtering</summary>
          <CodeBlock
            className="my-4"
            fileName="typescript"
            code={`// All methods support optional tag filtering
const tallBuildings = collection.filter(
  entity => entity.properties?.height > 100,
  'buildings'  // Only filter items with 'buildings' tag
);

const buildingNames = collection.map(
  entity => entity.name,
  'buildings'
);

const targetBuilding = collection.find(
  entity => entity.id === 'tower-1'
);

// Iterate with forEach (supports tag filtering)
collection.forEach((entity, index) => {
  console.log(\`Building \${index}: \${entity.name}\`);
}, 'buildings');

// Iterator protocol support
for (const entity of collection) {
  console.log(entity.name);
}

// Convert to array
const array = [...collection];`}
          />
        </details>

        <details>
          <summary>Event System</summary>
          <CodeBlock
            className="my-4"
            fileName="typescript"
            code={`// Listen to collection changes
collection.addEventListener('add', (event) => {
  console.log('Added items:', event.items);
  console.log('With tag:', event.tag);
});

collection.addEventListener('remove', (event) => {
  console.log('Removed items:', event.items);
});

collection.addEventListener('update', (event) => {
  console.log('Updated items:', event.items);
  console.log('New tag:', event.tag);
});

collection.addEventListener('clear', () => {
  console.log('Collection cleared');
});

// Remove event listener
const handler = (event) => { /* ... */ };
collection.addEventListener('add', handler);
collection.removeEventListener('add', handler);`}
          />
        </details>

        <details>
          <summary>Advanced Patterns</summary>
          <CodeBlock
            className="my-4"
            fileName="typescript"
            code={`// Single tag per item - each item can only belong to one tag
// Adding the same item with a different tag will reassign it
collection.add(building, 'buildings');
collection.add(building, 'critical');  // Now tagged as 'critical', removed from 'buildings'

// For multi-category organization, use separate collections or composite tags
collection.add(building, 'buildings-critical');  // Composite tag approach

// Or use filtering for cross-cutting concerns
const criticalBuildings = collection.filter(
  entity => entity.properties?.priority === 'critical',
  'buildings'
);

// Hierarchical organization with numeric tags
collection.add(layer0Items, 0);  // Level 0
collection.add(layer1Items, 1);  // Level 1
collection.add(layer2Items, 2);  // Level 2

// Method chaining
collection
  .add([entity1, entity2], 'group1')
  .show('group1')
  .hide('debug');

// Complex filtering (combine tags + predicates)
const filteredItems = collection.filter(
  entity => entity.properties?.height > 100 && entity.show,
  'buildings'
);

// Scene organization pattern
class SceneManager {
  private entities: Collection<EntityCollection, Entity>;

  constructor(viewer: Viewer) {
    this.entities = new Collection({
      collection: viewer.entities,
      tag: 'default'
    });
  }

  showLayer(name: string) { this.entities.show(name); }
  hideLayer(name: string) { this.entities.hide(name); }
  clearLayer(name: string) { this.entities.remove(name); }

  cleanup() { this.entities.destroy(); }
}`}
          />
        </details>
        <details>
          <summary>Property Manipulation</summary>
          <CodeBlock
            className="my-4"
            fileName="typescript"
            code={`// Set properties on all items with a tag
collection.setProperty('name', 'Building A', 'buildings');
collection.setProperty('show', false, 'debug-markers');

// Nested property paths with dot notation (up to 3 levels deep)
collection.setProperty('metadata.priority', 5, 'buildings');
collection.setProperty('config.display.scale', 2.5, 'markers');

// Uses default tag if not specified
collection.setProperty('name', 'Default Name');

// Type-safe: TypeScript will catch invalid paths and value types
// collection.setProperty('invalid.path', value);  // Type error

// Security: Prototype pollution attempts are blocked
// collection.setProperty('__proto__.polluted', 'bad');  // Silently ignored`}
          />
        </details>

        <h3>Performance Characteristics</h3>
        <ul>
          <li>
            <b>Add</b>: O(1) amortized
          </li>
          <li>
            <b>Remove by item</b>: O(1) for tag cleanup; underlying collection
            removal complexity varies by type
          </li>
          <li>
            <b>Remove by tag</b>: O(n) where n = items with that tag
          </li>
          <li>
            <b>Get by tag</b>: O(1) lookup, O(k) copy where k = matching items
          </li>
          <li>
            <b>Contains tag</b>: O(1)
          </li>
          <li>
            <b>Values getter</b>: O(1) if cached, O(n) to build cache
          </li>
          <li>
            <b>Filter/Map/Find</b>: O(n) or O(k) if tag specified
          </li>
        </ul>

        <h3>Important Notes</h3>
        <ul>
          <li>
            Always call <code>destroy()</code> when done to cleanup event
            listeners and prevent memory leaks
          </li>
          <li>
            Tags are stored as Symbol properties on items with minimal memory
            overhead
          </li>
          <li>
            Cache is automatically invalidated on add/remove/clear operations
            and external collection changes
          </li>
          <li>
            Each item belongs to <b>one tag at a time</b>. Adding an item with a
            new tag reassigns it from the previous tag. For multi-category
            organization, use composite tags (e.g.,{" "}
            <code>'buildings-critical'</code>) or filtering predicates.
          </li>
          <li>
            Type system ensures collection-item compatibility at compile time
          </li>
        </ul>
      </Prose>
    </ScrollArea>
  );
}
