import { Abbr } from "@juun/ui/abbr";
import { AspectRatio } from "@juun/ui/aspect-ratio";
import { CodeBlock } from "@juun/ui/code-block";
import { Prose } from "@juun/ui/prose";
import { Skeleton } from "@juun/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@juun/ui/table";
import { ExternalLink, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";

import { BlogHeader, BlogHeaderSkeleton } from "@/components/blog/header";

export const metadata = {
  title: "Bundle Optimization",
  description:
    "Module bundle optimization using various methods. Such as Next bundle analyzer, React lazy, dynamic import, lightweight library variant, and separate module imports.",
  date: "2025-06-23",
  tags: [
    "bundle",
    "optimization",
    "npm",
    "performance",
    "analyzer",
    "NextJS",
    "module",
    "bundler",
    "webpack",
    "vite",
    "tree-shaking",
  ],
  image: "/images/logo/webpack-light.svg",
};

export default function BundleOptimization() {
  return (
    <Fragment>
      <Suspense fallback={<BlogHeaderSkeleton />}>
        <BlogHeader metadata={metadata} />
      </Suspense>
      {metadata.image && (
        <AspectRatio
          ratio={16 / 9}
          className="mb-8 size-full rounded-lg bg-gray-100"
        >
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src={metadata.image}
              alt={metadata.title}
              className="size-full object-contain"
              fill
            />
          </Suspense>
        </AspectRatio>
      )}

      <Prose className="mt-8">
        <h2>What is Module Bundler?</h2>
        <p>
          <code>html</code> 에서 기능 구현에 필요한 JavaScript 파일을 직접
          불러와 사용하는 방식은 <code>defer</code>, <code>async</code> 와 같은
          옵션을 통해 스크립트를 불러오는 방법을 조절하거나, 스크립트의 위치를
          바꿔 불러오는 시점을 조절할 수는 있지만, module 자체를 경량화하는
          것과는 거리가 멀다. 이는 module 의 불필요한 모든 부분까지
          전송/다운로드 과정을 거쳐야 하는 문제를 발생시키며, 사용자 경험의
          척도가 되는{" "}
          <Link href="https://web.dev/articles/fcp?hl=ko">
            First Contentful Paint (FCP)
          </Link>{" "}
          시간이 늘어나는 결과를 초래한다.
        </p>
        <p>
          <Link href="https://webpack.kr">webpack</Link> 과{" "}
          <Link href="https://ko.vite.dev">vite</Link> 로 대표되는 module
          bundler 는 몇 가지 방법을 통해 이 문제를 해결해준다.
        </p>

        <h3>1. Dependency Graph Construction</h3>
        <CodeBlock
          code={`// Starts from the entry point
import { Button } from './components/button'  // -> finds button.tsx
import { Card } from '@juun/ui';               // -> finds ui/index.ts
import { useState } from 'react';             // -> finds react in node_modules`}
        />
        <p>
          모든 <code>import</code> 를 확인해 dependency map 을 생성한다.
        </p>

        <h3 id="barrel">2. Tree Shaking & Dead Code Elimination</h3>
        <CodeBlock
          code={`// You import this:
import { Button } from '@juun/ui';

// but @juun/ui exports a lot of components:
export { Button, Card, Calendar, CodeBlock, ... };

// Tree shaking should eliminate unused exports
// BUT: Barrel exports can break this!`}
        />
        <p>
          생성된 dependency map 을 토대로 module 중 사용되지 않은 export 를 모두
          제거한다.
        </p>

        <h3>3. Code Splitting & Chunking</h3>
        <p>
          Tree Shaking 된 코드를 나누어 스크립트를 생성한다. 나누어진 스크립트를
          실제 html 에서 불러오게 되며, 이를 chunk 단위로 구분한다.
        </p>
        <ul>
          <li>
            <b>Main chunks</b>: Framework code + essential components
          </li>
          <li>
            <b>Route chunks</b>: Page-specific code
          </li>
          <li>
            <b>Vendor chunks</b>: Third-party libraries
          </li>
          <li>
            <b>Dynamic chunks</b>: Lazy-loaded components
          </li>
        </ul>

        <h3>4. Bundle Generation</h3>
        <p>
          위의 과정을 거친 JavaScript 파일들에 다음과 같은 처리를 하여 최종
          번들을 생성한다:
        </p>
        <ul>
          <li>Minify</li>
          <li>Source maps for debugging</li>
          <li>Asset fingerprinting for caching</li>
        </ul>

        <p>
          이를 통해 서비스 제공에 필요한 최소한의 스크립트 파일을 생성하는 것을
          번들링이라고 부른다. 번들링은 많은 부분의 최적화를 진행해주지만,
          확실한 효과를 보기 위해서는 알아두어야 할 부분과 추가적으로 작업해야
          할 부분이 있다.
        </p>

        <h2>Bundle Analyzer</h2>
        <p>
          module bundler 가 생성한 번들은 minify 등의 경량화 처리 때문에 직접 그
          구성을 확인하기가 어렵다. 때문에 각 bundler 에는 번들을 시각화해주는
          개발 지원 도구들(
          <Link href="https://npmjs.com/package/webpack-bundle-analyzer">
            webpack-bundle-analyzer
          </Link>
          {", "}
          <Link href="https://npmjs.com/package/vite-bundle-visualizer">
            vite-bundle-visualizer
          </Link>
          )이 존재한다.
        </p>

        <AspectRatio
          ratio={908 / 547}
          className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
        >
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src="/images/blog/bundle-analyzer-example.gif"
              alt="Bundle Analyzer Example"
              className="mt-0"
              fill
              unoptimized
            />
          </Suspense>
        </AspectRatio>
        <p className="mt-2 text-right text-sm">Bundle Analyzer Example</p>
        <p className="mt-2">
          위와 같이 생성된 번들의 구성과 크기 등을 확인해볼 수 있다.
        </p>

        <h3>Next Bundle Analyzer</h3>
        <p>
          이 프로젝트에서 사용하고 있는{" "}
          <Link href="https://www.npmjs.com/package/@next/bundle-analyzer">
            @next/bundle-analyzer
          </Link>{" "}
          는 큰 설정 변화 없이 추가 가능하다.
        </p>
        <CodeBlock
          fileName="bash"
          code={`# install package
npm install -D @next/bundle-analyzer cross-env`}
        />
        <p>
          <code>cross-env</code> 는 OS와 상관 없이 환경 변수를 지정할 수 있도록
          도와주는 패키지이다.
        </p>
        <CodeBlock
          fileName="next.config.js"
          code={`import NextBundleAnalyzer from "@next/bundle-analyzer";

// No need to adjust your existing configuration.
/** @type {import('next').NextConfig} */
const nextConfig = { ... };

const analyze = process.env.ANALYZE === "true";
const withBundleAnalyzer = NextBundleAnalyzer({ enabled: analyze });

export default analyze ? withBundleAnalyzer(nextConfig) : nextConfig;`}
        />
        <p>
          위와 같이, flag 로 사용할 환경 변수 값에 따라 bundle analyzer 포함
          여부를 결정해준다. 조건을 걸어주지 않으면 build 할 때마다 bundle
          analyzer 가 작동하게 된다.
        </p>
        <CodeBlock
          fileName="package.json"
          code={`{
  ...
  "scripts": {
    ...,
    "analyze": "cross-env ANALYZE=true next build",
  },
  ...
}`}
        />
        <p>
          마지막으로, 걸어둔 조건에 맞춰 실행시키는 스크립트를{" "}
          <code>package.json</code> 에 추가해주면 번들을 확인하고자 할 때만
          선택적으로 bundle analyzer 를 포함시켜 build 하는 프로세스를 만들 수
          있다. 지정한 스크립트를 실행하면, <code>.next/analyze/</code> 디렉토리
          아래에 세 개의 파일이 생성된다.
        </p>
        <ul>
          <li>
            <b>nodejs</b>: Node.js Runtime 에서 실행되는 모든 Server-side 코드의
            번들
          </li>
          <li>
            <b>client</b>: 브라우저에서 실행되는 코드의 번들
          </li>
          <li>
            <b>edge</b>: Edge Runtime 에 실행되는 모든 코드의 번들
          </li>
        </ul>
        <AspectRatio
          ratio={3456 / 1894}
          className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
        >
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src="/images/blog/bundle-analyzer-result-client.png"
              alt="Bundle Analyzer Result: Client"
              className="mt-0"
              fill
            />
          </Suspense>
        </AspectRatio>
        <p className="mt-2 text-right text-sm">
          @next/bundle-analyzer result: client.html
        </p>
        <p className="mt-2">
          <code>client.html</code> 은 브라우저에서 실행되는 코드 번들을 페이지의
          route 에 따라 나눠 확인할 수 있다.
        </p>

        <h2>Optimization Methods</h2>
        <p>
          Module Bundler 는 앞서 언급했듯 자체적으로 스크립트의 크기를
          줄여주지만, 그럼에도 스크립트 크기가 크거나 여전히 불필요한 스크립트가
          남아있을 수 있다. 이 글을 호스트하는{" "}
          <Link href="https://github.com/juunie-roh/juun">웹 프로젝트</Link>는
          웹 3D 데모(
          <Link href="/cesium-utils">Cesium Utils</Link>,{" "}
          <Link href="/portfolio/cannon-raycast-vehicle">Three.js</Link>) 를
          겸하고 있는데, 해당 페이지를 방문하지 않는 사용자도 관련 코드 번들을
          다운받게 되는 등의 문제가 발생했다. 이런 추가적인 문제들을 해결하는
          방법에는 크게 세 종류가 존재한다.
        </p>

        <h3>1. React.lazy & Dynamic Import</h3>
        <p>
          그 첫 번째 방법으로는{" "}
          <Link href="https://ko.react.dev/reference/react/lazy">
            React.lazy
          </Link>{" "}
          와{" "}
          <Link href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import">
            Dynamic Import
          </Link>{" "}
          가 있다. React.lazy 는 parameter 로 받은 코드의 실행을 컴포넌트 로드
          전까지 지연시키는,{" "}
          <Link href="https://ko.react.dev/reference/react/Suspense">
            Suspense
          </Link>{" "}
          와 함께 사용되는 React API 이다. Dynamic Import 는 파일 최상단에
          선언하는 import 와 달리, module 을 비동기 및 동적으로 로드할 수 있도록
          하는 문법이다.
        </p>
        <blockquote className="text-primary">
          <Quote />
          Dynamic imports allow one to circumvent the syntactic rigidity of
          import declarations and load a module conditionally or on demand. -
          mdn web docs
        </blockquote>
        <p>
          설명으로 짐작할 수 있는데, 이 둘의 조합은{" "}
          <b>
            <i>컴포넌트 로드 전까지 module import 를 지연</i>
          </b>
          시키는 결과를 가져온다. 특정 컴포넌트에 포함된 module 의 로드를
          지연시킬 수 있는 것이다.
        </p>

        <CodeBlock
          fileName="viewer.tsx"
          code={`'use client';

import 'public/cesium/Widgets/widgets.css';
import 'public/cesium/Widgets/lighter.css';

import {
  CameraEventType,
  KeyboardEventModifier,
  Terrain,
  Viewer,
} from 'cesium';
import { Fragment, useEffect } from 'react';
import {
  useCesium,
  Viewer as RViewer,
  ViewerProps as RViewerProps,
} from 'resium';

import useViewerStore from '@/stores/slices/viewer';

export interface ViewerProps extends Omit<RViewerProps, 'className'> { ... }

function ViewerContent(props: ViewerProps) {
  const { viewer } = useCesium();
  const { setViewer, removeViewer, setIsFlying } = useViewerStore();

  useEffect(() => {
    ... // initialize viewer
  }, []);
}
  
export default function LazyViewer(props: ViewerProps) {
  return (
    <RViewer {...props}>
      <ViewerContent {...props} />
    </RViewer>
  )
}`}
        />
        <p>
          위는 간략하게 표시한 cesium 과 resium 을 사용하는 viewer 컴포넌트이다.
          이 둘은 개별 module 의 번들 크기가 상당한데, 이를 static page(NextJS
          기준)에서 import 하게 되면 어떤 페이지를 보든 module 을 모두 다운 받게
          된다.
        </p>
        <CodeBlock
          fileName="index.tsx"
          code={`import { lazy, Suspense } from 'react';

import type { ViewerProps } from './viewer';

const LazyViewer = lazy(() => import('./viewer'));

export default function Viewer(props: ViewerProps) {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <LazyViewer {...props} />
    </Suspense>
  );
}

export type { ViewerProps };`}
        />
        <p>
          여기서 <code>index.tsx</code> 라는 entry point 를 만들고, viewer
          컴포넌트를 lazy import 한다. cesium 과 resium module 을 viewer
          컴포넌트가 로드될 때야 비로소 불러오게 되는 것이다. import type 은
          runtime 코드에 포함되지 않기 때문에 신경쓰지 않아도 된다.
        </p>
        <p>
          <b>주의</b>: 특정 module 을 분리하려면 모든 static page 에서 direct
          import 가 없어야 한다. 즉, 해당 module 을 사용하는{" "}
          <b>
            <i>모든 컴포넌트</i>
          </b>
          를 lazy import 형식으로 만들어야 한다.
        </p>

        <h3>2. Barrel Exports</h3>
        <p>
          다음은 <Link href="#barrel">위</Link>
          에서 잠깐 언급했던 barrel exports 이다. 먼저 barrel exports 란, 여러
          파일에 흩어져있는 export 를 <code>{"index"}</code> 라는 이름을 갖는
          entry point 에 모아 한 번에 관리하는 것을 말한다. Barrel exports 를
          사용하면 코드 가독성을 높일 수 있는 장점이 있지만 번들 크기 측면에서는
          치명적일 수 있다. 번들은 entry point 에서 import 하는 모든 module 을
          포함해 생성되기 때문이다. 그 예로, 아래의 entry point 에서 Button 만
          import 해서 사용해도, 번들은 Button, CodeBlock, Popover 등을 모두
          포함한 상태로 생성된다.
        </p>
        <CodeBlock
          fileName="index.ts"
          code={`import { Button } from './src/components/button.tsx';
import { CodeBlock } from './src/components/code-block.tsx';
import { 
  Popover,
  PopoverAnchor,
  PopoverContent, 
  PopoverTrigger,
} from './src/components/popover.tsx';

export {
  Button,
  CodeBlock,
  Popover,
  PopoverAnchor,
  PopoverContent, 
  PopoverTrigger,
};`}
        />
        <p>
          이 프로젝트에서는 monorepo 구조로 기본 ui 컴포넌트를 분리해놓았는데,
          모든 컴포넌트를 Barrel Exports 로 정리했더니 모든 페이지의{" "}
          <Abbr title="최초 로드에 필요한 JavaScript">First Load JS</Abbr>{" "}
          용량이 2MB 를 넘어가는 상황이 발생했다. 실제로 entry point 를 거치지
          않고 컴포넌트를 개별로 import 했더니 홈페이지(<code>/</code>)의 First
          Load JS 크기가 2.53MB → 853kB, 66% 감소한 것을 확인할 수 있었다.
        </p>

        <h3>3. Using Lightweight Library Variants</h3>
        <p>
          프로젝트의 ui 컴포넌트 중 <code>CodeBlock</code> 에서 사용한{" "}
          <Link href="https://www.npmjs.com/package/react-syntax-highlighter">
            <code>react-syntax-highlighter</code>
          </Link>{" "}
          는 지원하는 프로그래밍 언어가 약 200 개를 넘어가며 First Load JS 에서
          큰 부분을 차지하고 있었다. 10 개 남짓을 사용하고 있는 본
          프로젝트에서는 그렇게 많은 언어를 모두 포함할 필요는 없다. 마침 해당
          라이브러리는 필요한 언어를 직접 등록해 사용할 수 있도록 언어가
          포함되지 않은 Light module 과 함께, 언어를 variants 형태로 제공하고
          있다.
        </p>
        <CodeBlock
          fileName="code-block.tsx"
          code={`// Before:
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// After:
import { PrismLight SyntaxHighlighter } from 'react-syntax-highlighter';
...
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
...

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('tsx', tsx);
...
`}
        />
        <p>
          이처럼 필요한 언어만 선택, Lightweight library variants 를 적용한
          결과, <code>CodeBlock</code> 을 사용하는 페이지의 First Load JS 크기도
          1.82MB → 1.1MB, 약 40% 가량 감소시킬 수 있었다. 이렇게 module 의
          경량화 버전을 제공하는 라이브러리는 그 활용에 따라 번들 크기를 크게
          줄일 수 있다.
        </p>

        <h3>Results</h3>
        <p>나열한 방법들을 통해 본 프로젝트에서 얻은 결과는 다음과 같다.</p>
        <div className="flex gap-2">
          <AspectRatio
            ratio={(1120 / 438) * 2}
            className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
          >
            <Suspense fallback={<Skeleton className="size-full" />}>
              <Image
                src="/images/blog/before-optimization.png"
                alt="Before Module Bundle Optimization"
                className="mt-0"
                fill
              />
            </Suspense>
          </AspectRatio>
          <AspectRatio
            ratio={(920 / 406) * 2}
            className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
          >
            <Suspense fallback={<Skeleton className="size-full" />}>
              <Image
                src="/images/blog/after-optimization.png"
                alt="After Module Bundle Optimization"
                className="mt-0"
                fill
              />
            </Suspense>
          </AspectRatio>
        </div>
        <p className="mt-2 text-right text-sm">
          Next build result: before and after the optimization
        </p>

        <Table className="mt-4">
          <TableCaption>
            Total Impact Summary of Bundle Optimization
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead>Before</TableHead>
              <TableHead>After</TableHead>
              <TableHead>Reduction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>home</TableCell>
              <TableCell>2.53MB</TableCell>
              <TableCell>853kB</TableCell>
              <TableCell>66%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>blog posts</TableCell>
              <TableCell>2.55MB</TableCell>
              <TableCell>1.1MB</TableCell>
              <TableCell>57%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>about, portfolio</TableCell>
              <TableCell>~ 2.5MB</TableCell>
              <TableCell>~ 700kB</TableCell>
              <TableCell>72%</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p>
          모든 경로에서 First Load JS 의 크기가 큰 폭으로 감소한 것을 확인할 수
          있다.
        </p>

        <h2>cf. Modular Exports</h2>
        <p>
          Module bundle optimization 에는 프로젝트 수준의 최적화 기법도 물론
          영향을 미치지만, 그에 못지 않게 사용한 패키지가 최적화를 고려하고
          있는지 또한 매우 중요한 것을 확인할 수 있다. npm 에 패키지를 publish
          하거나, 여기에서와 같이 monorepo 구조를 통해 사용할 module 을 패키지
          형태로 직접 관리할 때 염두에 두어야 할 것이 바로 modular export 이다.
          Modular export 는 패키지의 사용자들이 필요한 기능만 import 하여 사용할
          수 있도록 패키지를 기능 단위로 묶은 entry point 를 제공하는 것을
          말한다.
        </p>
        <CodeBlock
          fileName="package.json"
          code={`{
  ...
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    },
    "./collection": {
      "types": "./dist/collection/index.d.ts",
      "import": "./dist/collection/index.js",
      "require": "./dist/collection/index.cjs"
    },
    "./highlight": {
      "types": "./dist/highlight/index.d.ts",
      "import": "./dist/highlight/index.js",
      "require": "./dist/highlight/index.cjs"
    },
    "./terrain": {
      "types": "./dist/terrain/index.d.ts",
      "import": "./dist/terrain/index.js",
      "require": "./dist/terrain/index.cjs"
    },
    "./utils": {
      "types": "./dist/utils/index.d.ts",
      "import": "./dist/utils/index.js",
      "require": "./dist/utils/index.cjs"
    },
    "./viewer": {
      "types": "./dist/viewer/index.d.ts",
      "import": "./dist/viewer/index.js",
      "require": "./dist/viewer/index.cjs"
    }
}`}
        />
        <p className="mt-2 text-right">
          <small>
            <Link
              href="https://www.npmjs.com/package/@juun-roh/cesium-utils"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline gap-1"
            >
              <ExternalLink size={12} />
              @juun-roh/cesium-utils
            </Link>{" "}
            package.json: exports
          </small>
        </p>
        <p className="mt-2">
          기능에 필요한 module 만 import 하게끔 entry point 를 생성하고,{" "}
          <Link href="/blog/npm-packages#package-json-structure">
            package.json 구조
          </Link>{" "}
          중에서 exports 의 경로를 구체적으로 명시하는 것으로 modular export 를
          달성할 수 있다.
        </p>

        <h2>Closing</h2>
        <p>
          Cesium 컴포넌트를 lazy import 로 변경하면서 실제로 효과가 있는지
          확인해보려고 시작한 여정이 예상보다 길어졌다. 본 프로젝트에서 Bundle
          분석 도구로 First Load JS 크기를 확인하기 시작한 것은 이미 lazy import
          를 도입하고 난 뒤여서 이에 대한 영향을 체감할 수 없었다는 건 아쉽지만,
          barrel exports 사용의 주의점이나 라이브러리의 경량 버전을 사용하는
          것이 번들 크기에 큰 영향을 준다는 점은 UX 를 위한 최적화에 중요한
          관점을 제공해주었다.
        </p>
        <p>
          <code>@juun-roh/cesium-utils</code> 패키지를 publish 하면서는 그저
          추천을 따라 진행했을 뿐인 modular exports 도 그 중요성을 알게 됐다는
          점에서 큰 의미가 있는 작업이었다.
        </p>
      </Prose>
    </Fragment>
  );
}
