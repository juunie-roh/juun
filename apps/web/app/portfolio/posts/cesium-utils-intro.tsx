'use client';

import 'public/cesium/Widgets/widgets.css';
import 'public/cesium/Widgets/lighter.css';

import {
  AspectRatio,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CodeBlock,
  Skeleton,
} from '@pkg/ui';
import {
  CameraEventType,
  Cartesian3,
  Color,
  HeightReference,
  KeyboardEventModifier,
  Math as CMath,
  Terrain,
  Viewer as CViewer,
} from 'cesium';
import { ChevronRight, Code, ExternalLink, Package } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { CesiumComponentRef, Entity } from 'resium';

import Viewer from '@/components/cesium/viewer';

export const metadata = {
  title: 'Cesium Utils',
  description:
    'A utility library for CesiumJS that simplifies working with Cesium instances.',
  date: '2025-05-13',
  tags: ['CesiumJS', '3D', 'GIS', 'npm'],
  image: 'https://cesium.com/logo-kit/cesium/Cesium_dark_color.svg',
};

// Example code snippets for usage demonstration
const installationCode = `npm install @juun-roh/cesium-utils`;

export default function CesiumUtilsIntro() {
  const terrain = Terrain.fromWorldTerrain();
  const initialized = useRef<boolean>(false);
  const [viewer, setViewer] = useState<CViewer | undefined>(undefined);

  // The callback ref for the Cesium viewer
  const ref = useCallback((node: CesiumComponentRef<CViewer> | null) => {
    if (node?.cesiumElement && !initialized.current) {
      console.log('🚀 ~ :', 'Cesium viewer obtained successfully');
      setViewer(node.cesiumElement);

      initialized.current = true;
    }
  }, []);

  // Effect that runs when viewer is available
  useEffect(() => {
    if (!viewer || !initialized.current) return;
    // Remove the credits area
    viewer.bottomContainer.remove();
    // Set tilt event type as RIGHT_DRAG
    viewer.scene.screenSpaceCameraController.tiltEventTypes = [
      CameraEventType.RIGHT_DRAG,
      CameraEventType.PINCH,
      {
        eventType: CameraEventType.LEFT_DRAG,
        modifier: KeyboardEventModifier.CTRL,
      },
      {
        eventType: CameraEventType.RIGHT_DRAG,
        modifier: KeyboardEventModifier.CTRL,
      },
    ];
    // Set zoom event type as MIDDLE_DRAG
    viewer.scene.screenSpaceCameraController.zoomEventTypes = [
      CameraEventType.MIDDLE_DRAG,
      CameraEventType.WHEEL,
      CameraEventType.PINCH,
    ];

    // Fly to Tokyo
    viewer.camera.flyTo({
      destination: new Cartesian3(
        -3964624.632297504,
        3356819.574895879,
        3696707.310427818,
      ),
      orientation: {
        heading: CMath.toRadians(0),
        pitch: CMath.toRadians(-50),
        roll: 0.0,
      },
    });
  }, [viewer]);

  useEffect(() => {
    if (!viewer || !initialized.current || !terrain.ready) return;
    viewer.terrainProvider = terrain.provider;
  }, [viewer, terrain]);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tighter">Cesium Utils</h1>
        <p className="mt-2 text-xl text-muted-foreground">
          A comprehensive utility library for CesiumJS that simplifies working
          with 3D geo-spatial visualizations
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {metadata.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <AspectRatio
            ratio={16 / 9}
            className="overflow-hidden rounded-md border shadow-sm"
          >
            <Suspense fallback={<Skeleton className="size-full" />}>
              <Viewer ref={ref}>
                <Entity
                  position={Cartesian3.fromDegrees(139.7454, 35.6586, 250)}
                  box={{
                    dimensions: new Cartesian3(50.0, 50.0, 333.0),
                    material: Color.RED.withAlpha(0.8),
                    outline: true,
                    outlineColor: Color.WHITE,
                    heightReference: HeightReference.CLAMP_TO_GROUND,
                  }}
                />
              </Viewer>
            </Suspense>
          </AspectRatio>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package size={20} />
                Library Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  License
                </p>
                <p>MIT</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Dependencies
                </p>
                <ul className="list-inside list-disc">
                  <li>cesium ^1</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full" variant="link">
                <Link
                  href="/cesium-utils"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 size-4" />
                  See Demonstration
                </Link>
              </Button>
              <Button asChild className="w-full" variant="link">
                <Link
                  href="https://www.npmjs.com/package/@juun-roh/cesium-utils"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Package className="mr-2 size-4" />
                  View on NPM
                </Link>
              </Button>
              <Button asChild variant="link" className="w-full">
                <Link
                  href="https://github.com/juunie-roh/cesium-utils"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="mr-2 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub Repository
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="prose mt-8 max-w-none text-primary">
        <h2 className="text-2xl font-bold tracking-tight">
          What is Cesium Utils?
        </h2>
        <p>
          <code>@juun-roh/cesium-utils</code> is a utility library that extends{' '}
          <Link href="https://cesium.com">CesiumJS</Link> with abstractions and
          helper functions. It simplifies common tasks when building 3D
          geo-spatial applications, addressing pain points that I've encountered
          when working with Cesium.
        </p>

        <p>
          This library is designed to complement CesiumJS, not to replace it. It
          works alongside the existing Cesium code and provides solutions to
          common challenges while maintaining the familiar Cesium paradigms. The
          project follows modern TypeScript practices and has comprehensive type
          definitions.
        </p>

        <h3 className="mt-8 text-xl font-bold tracking-tight">
          Why I Built This
        </h3>
        <p>
          Working extensively with CesiumJS, I found myself writing similar
          utility functions across multiple codebases. While CesiumJS is
          incredibly powerful, many common workflows require repetitive
          boilerplate code.
        </p>

        <p>
          I created this library to encapsulate best practices, simplify complex
          operations, and provide a more developer-friendly experience when
          working with CesiumJS. The goal was to reduce cognitive load and
          accelerate development without sacrificing the flexibility and power
          of the underlying engine.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        <div className="prose max-w-none text-primary">
          <h2 className="text-2xl font-bold tracking-tight">Key Features</h2>
          <p>
            The library provides specialized utilities to solve common
            challenges in CesiumJS development:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Collection Management</CardTitle>
              <CardDescription>
                Unified API for managing different Cesium collection types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>
                    Tag-based organization for entities, primitives, and data
                    sources
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>
                    Bulk operations on collections (show/hide, style, remove)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>
                    Simplified querying by properties, spatial extent, or custom
                    functions
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terrain Handling</CardTitle>
              <CardDescription>
                Advanced terrain management across multiple sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>
                    Priority-based terrain compositing from multiple sources
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>Geographical bounds for terrain source selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>Smooth transitions between terrain sources</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Multi-Viewer Coordination</CardTitle>
              <CardDescription>
                Synchronize multiple Cesium instances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>Camera synchronization across multiple viewers</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>
                    Copying existing viewer by inheriting it's properties
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Highlighting</CardTitle>
              <CardDescription>
                Advanced highlighting and selection utilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>Consistent highlighting across entity types</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>Customizable highlight styles with transitions</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <div className="prose max-w-none text-primary">
          <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
          <p>
            Follow these steps to integrate <code>@juun-roh/cesium-utils</code>{' '}
            into your project and start using its features.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-xl font-semibold">Installation</h3>
            <CodeBlock language="bash" code={installationCode} />
          </div>

          <div>
            <h3 className="mb-3 text-xl font-semibold">Prerequisites</h3>
            <p className="mb-4 text-muted-foreground">
              The library requires CesiumJS as a peer dependency. Make sure you
              have it properly installed in your project:
            </p>
            <CodeBlock language="bash" code="npm install cesium" />
            <p className="mt-4 text-muted-foreground">
              You'll also need to ensure that CesiumJS assets are properly
              loaded in your application. Follow the{' '}
              <Link
                href="https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/"
                className="text-primary hover:underline"
              >
                official CesiumJS setup guide
              </Link>{' '}
              if you haven't already set up CesiumJS.
            </p>
          </div>

          <div className="rounded-lg bg-muted p-6">
            <h3 className="mb-3 text-xl font-semibold">Resources</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <Code size={20} />
                </div>
                <div>
                  <h4 className="font-medium">API Documentation</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete documentation for all classes and methods
                  </p>
                  <Link
                    href="https://juunie-roh.github.io/cesium-utils/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    View Docs <ExternalLink size={12} />
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">GitHub Repository</h4>
                  <p className="text-sm text-muted-foreground">
                    Source code, issues, and feature requests
                  </p>
                  <Link
                    href="https://github.com/juunie-roh/cesium-utils"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    View Repository <ExternalLink size={12} />
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <Package size={20} />
                </div>
                <div>
                  <h4 className="font-medium">NPM Package</h4>
                  <p className="text-sm text-muted-foreground">
                    Package information and download statistics
                  </p>
                  <Link
                    href="https://www.npmjs.com/package/@juun-roh/cesium-utils"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    View Package <ExternalLink size={12} />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
