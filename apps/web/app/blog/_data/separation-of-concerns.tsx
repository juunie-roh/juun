import { AspectRatio } from "@juun/ui/aspect-ratio";
import { CodeBlock } from "@juun/ui/code-block";
import { Skeleton } from "@juun/ui/skeleton";
import { Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";

export const metadata = {
  title: "Separation of Concerns in Frontend Development",
  description:
    "Exploring the principle of Separation of Concerns in frontend development and its impact on code maintainability and scalability.",
  category: "case",
  date: "2025-10-01",
  tags: [
    "frontend",
    "architecture",
    "separation-of-concern",
    "SoC",
    "web-development",
  ],
  image: "/images/blog/separation-of-concerns.png",
};

export default function Data() {
  return (
    <Fragment>
      <h2>The Concern</h2>
      <blockquote>
        <Quote />
        <p>
          In computer science, separation of concerns (SoC) is the design
          principle of organizing a codebase into distinct sections - each
          addressing a single concern.
        </p>
        -{" "}
        <Link
          href="https://en.wikipedia.org/wiki/Separation_of_concerns"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia
        </Link>
      </blockquote>
      <p>
        SoC (Separation of Concerns) 는 소프트웨어 설계 원칙 중 하나로,
        코드베이스를 서로 다른 관심사(Concerns)로 나누어 각 부분이 독립적으로
        관리되고 개발될 수 있도록 하는 것을 의미한다. SRP(Single Responsibility
        Principle)와도 유사한 개념이기 때문에 혼동할 수 있지만, SoC 의 분리
        기준인 <b>Concern</b> 은 흔히 <i>기능</i> 단위로 통용되는 SRP 의{" "}
        <i>책임</i> 보다 훨씬 넓은 개념을 포괄적으로 다룬다. 이 글에서는 Next.js
        프론트엔드 프로젝트에서 SoC 를 어떻게 적용했는지를 중심으로
        이야기해보고자 한다.
      </p>

      <h3>What Is Concern?</h3>
      <p>
        그래서 concern 이란 무엇일까. 좁은 의미에서는 관련된 Building Block
        (module, class, component, function 등) 이 담당하는 기능 단위로 볼 수
        있다. 하지만 하나의 Building Block 은 여러 concern 을 가질 수 있다.
        예컨데, 비즈니스 로직을 담당함과 동시에 modularity 달성이라는 목적도
        내포할 수 있는 것이다. 여기서 modularity 달성은 Building Block 의
        이식성(portability), 재사용성(reusability) 등 기능 외적인 측면에 대한
        concern 이다. 이는 organizational concern(조직 관심사), 또는 quality
        concern(품질 관심사) 로 분류할 수 있다. 이처럼 concern 은 기능적인
        측면과 비기능적인 측면 모두를 포괄하는 넓은 개념이다.
      </p>

      <h3>Why it Matters</h3>
      <p>
        Concern 은 building block 을 바라보는 시각, view point 에 따라 범위와
        성격이 달라지며, 이에 따라 분리의 기준도 변화한다. building block 에
        어떤 concern 을 부여할 것인지, 그리고 그 concern 에 따라 building block
        을 어떻게 나눌 것인지가 결정되고, 관련된 concern 들을 조율해나가며
        building block 의 형태가 구체화된다. 이는 곧 software 의 전체적인
        architecture 에 영향을 미친다. SoC 는 결국, concern 을 정의하고
        구체화하는 과정에서 자연스레 발생하는 작업인 것이다.
      </p>

      <h2>Frontend-Specific Concerns</h2>
      <p>
        언급한 바와 같이, concern 은 관점에 따라 다양한 형태로 나타날 수 있으며,
        여기에는 framework 또는 domain-specific concern 도 포함된다. 여기서는
        frontend, 그 중에서도 Next.js 환경에서 고려해야 할 concern 에 대해
        살펴보고자 한다. 아래에서 다루는 concern 의 명칭은 본인이 임의로 부여한
        것이며, concern 은 정의하기 나름이라는 것을 명심하자.
      </p>

      <h3>Layout Concerns</h3>
      <p>
        전통적인 웹 애플리케이션에서는 페이지의 시각적, 개념적 구조를 정의하는
        layout 이 <code>html</code> 및 <code>css</code> 가 담당하여, Accordion
        의 토글 상태, Modal 의 열림/닫힘 상태 등과 같은 UI 상태는 css class,
        또는 data attribute 를 통해 관리되었다. 그러나 React 와 같은
        component-based framework 는 UI 의 상태를 함께 관리하게 되면서, 분리
        되어있던 layout concern 이 결합된 양상을 띠게 되었다. Headless UI 와
        같이 로직과 스타일을 분리하려는 시도가 있지만, 컴포넌트의 구조적
        계층이나 상태의 시각적 표현 방식 등은 여전히 개발자가 결정해야 하는
        영역으로 남으며, 이는 frontend 구성에 영향을 주는 influence factor 로
        작용하여 layout concern 에 대한 고려가 추가로 필요해졌다.
      </p>

      <h3>State Concerns</h3>
      <p>
        상태에 대한 변화를 감지하는 Observer Pattern 을 기반으로 하는 React
        framework 에서는 상태 관리(state management) 가 중요한 concern 중
        하나이다. 하나의 상태가 여러 컴포넌트에 영향을 미칠 수도 있고,
        애플리케이션 전체에 영향을 줄 수도 있지만, 반대로 어떤 컴포넌트는 상태를
        전달 받아 표시만 하고, 변경하는 역할을 하지 않을 수도 있다. State 의
        관리 방법, 범위 설정 등에 따라 컴포넌트의 구성이 달라지고, 어느
        컴포넌트가 layout concern 을 담당할지에 대한 결정에도 영향을 미친다.
        State concern 은 비즈니스 로직과도 관련되고, 다른 범위의 concern
        (quality, organizational) 도 내포할 수 있기 때문에, state concerns 의
        정의가 frontend concerns 의 핵심 중 하나라고 볼 수 있다.
      </p>

      <h3>Other Concerns</h3>
      <p>
        이외에도 다양한 concern 이 존재한다. 그 중 하나는 위에서 살펴본 React
        framework 처럼, 사용하는 framework 나 기술 스택이 그 자체로 concern 이
        되는 경우이다. Framework 또는 API, Library 등을 사용하기 위한 인터페이스
        자체가 고려대상이 되는 경우로, 다양한 npm packages 로 구성되는 현재
        frontend 생태계에서는 고려하지 않을 수 없는 부분들이다. 이는 contract
        interface 의 특성에 따라 또다른 concern (e.g. performance) 을
        발생시키기도 한다.
      </p>
      <p>
        또 다른 concern 으로는, web design 및 cooperation concerns 가 있다. 웹
        디자인의 적용 및 디자이너와의 협업 프로세스도 architecture 에 반영될 수
        있는 요소로 간주하고 고려되어야 한다.
      </p>

      <h2>Case Study</h2>
      <p>
        이 글을 호스팅하는 프로젝트 페이지 중, <code>cesium-utils</code>{" "}
        패키지의 <Link href="/cesium-utils">feature demo</Link> 페이지에 대한
        리팩토링 과정을 통해 frontend 에서 발생할 수 있는 concern 을 소개한다.
      </p>

      <p>
        <i>
          다시 한 번 강조하지만, 이는 본인이 적용한 concern 일 뿐이며, 상황에
          따라, 환경에 따라 concern 의 정의는 달라질 수 있다.
        </i>
      </p>

      <h3>Cesium Utils Refactoring</h3>
      <p>
        리팩토링 이전의 구조는 보편적인 Next.js (React) 프로젝트의 구조를 따르고
        있었다. 컴포넌트의 기능적인 역할에 따라 폴더 트리를 생성하고, router 를
        담당하는 <code>app</code> 폴더는 <code>page</code> 와{" "}
        <code>layout</code> 등만 포함하는 구조였다.
      </p>

      <CodeBlock
        fileName="text"
        code={`apps/web/
├── app/
│   ├── cesium-utils/
│   │   ├── page.tsx              # Router - main page
│   │   └── layout.tsx            # Router - layout only
│   └── ...
├── components/
│   ├── cesium/
│   │   ├── viewer.tsx            # Cesium viewer component
│   │   ├── api-combobox.tsx      # API select ui
│   │   └── ...
│   └── ...
├── contexts/
│   └── ...
├── lib/
│   ├── stores                    # Zustand stores, global state management
└── utils/
│   └── ...                       # Utilities
└── ...`}
      />

      <p>
        Cesium 의 <code>viewer</code> 는 Zustand store 에 등록하여 접근하며,{" "}
        <code>app</code> 하위의 폴더에서 필요한 컴포넌트들을 사용하는 일반적인
        구조이다. 이 구조에 대해서는, 컴포넌트들의 grouping 을 위해{" "}
        <code>components</code> 폴더 아래에 route 폴더와 중복되는 이름이 생길 수
        밖에 없는 한계를 느끼고 있었다.
      </p>

      <CodeBlock
        fileName="text"
        code={`apps/web/
└── app/
    └── cesium-utils/
        ├── _components/
        │   └── viewer/
        │       └── index.tsx     # Lazy imported viewer
        │       └── viewer.tsx    # Isolated Cesium viewer
        │   └── ...
        ├── _contexts/
        │   └── provider.tsx      # Route-scoped context
        ├── _layouts/
        │   └── sidebar.tsx       # Layout component
        ├── _utils/
        │   └── api.ts            # Business logic - centralized API config
        ├── [api]
        │   └── page.tsx          # Dynamic Router - pages for each APIs
        ├── page.tsx              # Router - main landing page
        └── layout.tsx            # Router - provides context to children`}
      />

      <p>
        리팩토링 후 변경된 구조는 위와 같다. 가장 큰 변화는, route 에서 사용되는
        컴포넌트들을 해당 폴더로 모아 응집성을 높였다는 점(High Cohesion)이다.
        리팩토링에 영향을 준 concerns 는 다음과 같다.
      </p>

      <ol>
        <li>
          <h4>Framework Concerns</h4>
          <p>
            Next.js 의{" "}
            <Link
              href="https://nextjs.org/docs/app/getting-started/project-structure#private-folders"
              target="_blank"
              rel="noopener noreferrer"
            >
              private folder pattern
            </Link>
            , 폴더 명이 언더스코어(<code>_</code>
            )로 시작하면 <code>app</code> router 폴더 내에 있어도 URL Path 로
            노출되지 않는 특수 패턴을 활용했다. 이를 통해 route-specific
            컴포넌트들을 모아 폴더 이름 중복을 해결했다. 기존{" "}
            <code>components</code> 폴더는 여러 route 에서 사용되는
            application-specific 컴포넌트들의 집합으로 그 역할을 변경했다.
          </p>
        </li>
        <li>
          <h4>Organizational Concerns</h4>
          <p>
            업무 중, 서비스의 portability 를 확보하라는 조직에서의 요구사항을
            충족시키기 위한 prototype 을 적용했다. 같은 framework, 동일한 개발
            환경이라면 route 에 구현된 서비스를 그대로 사용할 수 있게끔 하기
            위해 state concerns 를 재정의하고, 필요한 모든 기능을 route 폴더가
            담을 수 있도록 했다. 이를 위해서 DRY(Don't Repeat Yourself) 원칙을
            다소 위배하더라도 코드베이스를 복사하여 분산시킬 필요가 있었다.
            다소의 중복을 허용하면서, 관련 컴포넌트들의 참조를 route 내에서
            일어나게 하여, 해당 폴더 내의 변화가 다른 route 의 서비스에 영향을
            미치지 않도록 분리했다.
          </p>
        </li>
        <li>
          <h4>State Concerns</h4>
          <p>
            <code>viewer</code> 는 그 특성 상, 관련 route 내에서만 상태 정보에
            대한 접근을 요구했다. 이에 따라 zustand 를 사용하던 기존 방식에서,
            route-scoped context 로 전환했다. 또한 cesium-utils 패키지에 대한
            demonstration 을 보여주는 route 의 기능 특성을 반영하여, API 추가 및
            관리가 용이하도록 API State (Configuration) 의 centralize 를
            진행했다. 현재 관련 컴포넌트들은 기존의 각각 API 목록을 갖고 있던
            방식에서 <code>_utils</code> 에서 선언된 API & Feature Configuration
            에 따라 목록 표시 및 기능을 수행하는 형태로 변경됐다. API 목록에
            대한 상태 관리를 위임한 것이다.
          </p>
        </li>
        <li>
          <h4>Layout Concerns</h4>
          <p>
            이 부분은 최근에 들어서야 분리할 필요성을 느꼈다. sidebar 와 같은
            페이지의 구조를 책임지는 컴포넌트를 식별하고, SSR (Server Side
            Rendering) 구성이 가능한, state concerns 에서 벗어날 수 있는
            컴포넌트들로 구성했다.
          </p>
        </li>
        <li>
          <h4>Performance Concerns</h4>
          <p>
            Cesium 은 Web 3D geospatial 엔진으로, 그 상당한 번들 크기 때문에
            First Load JS 에 큰 영향을 준다. 이 route 에 접근하지 않는 사용자는
            해당 번들이 전혀 필요가 없는데도 불구하고, static import 로 선언된
            번들은 모든 사용자가 받아야 하기 때문에 비효율적이라고 느껴졌다.
            실제로 기록된 metric 에서도 First Contentful Paint 가 나타나기까지의
            시간이 오래 걸리는 문제가 발생했다. 이는{" "}
            <Link href="/blog/bundle-optimization">Bundle Optimization</Link> 을
            통해 해당 route 에서의 모든 Cesium 관련 컴포넌트들을 Lazy Import
            처리함과 동시에 private folder pattern 으로 모아서 High Cohesion 을
            달성할 수 있었다.
          </p>
        </li>
      </ol>

      <p>
        이 과정에서, separation 은 크게 중요하지 않았다. 각 building block 에
        관련된 concern 들을 선별하고 구체화하는 과정에서 SoC 는 자연스럽게
        발생했을 뿐, 분리 그 자체가 목적인 과정은 아니었다.
      </p>

      <h3>State Flow Diagram</h3>
      <p>
        더 자세한 구현 과정을 <code>react-query</code> 를 사용하는 API 응답 결과
        표시 컴포넌트에서의 state 흐름 및 SoC 적용을 공유하기 위해 그렸던
        diagram 으로 살펴보자.
      </p>
      <AspectRatio
        ratio={16 / 9}
        className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
      >
        <Suspense fallback={<Skeleton className="size-full" />}>
          <Image
            src="/images/blog/state-flow-diagram-1.jpg"
            alt="State flow diagram - the wrapper component"
            className="mt-0 size-full object-contain"
            fill
          />
        </Suspense>
      </AspectRatio>
      <p>
        Wrapper Component 는 API 에 대한 요청 및 응답에만 관여한다. 이는 하위
        (Rendering) 컴포넌트들에 대한 state 값을 조절해준다는 의미에서 State
        Coordinator 라고 표시했다. 해당 컴포넌트가 API Request 에 필요한
        Parameters 의 초기 값을 props 형태로 전달 받고, 가변 값으로 설정한
        parameter 를 state 로 감싸 하위 컴포넌트로 전달한다.
      </p>
      <AspectRatio
        ratio={16 / 9}
        className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
      >
        <Suspense fallback={<Skeleton className="size-full" />}>
          <Image
            src="/images/blog/state-flow-diagram-2.jpg"
            alt="State flow diagram - react query data flow"
            className="mt-0 size-full object-contain"
            fill
          />
        </Suspense>
      </AspectRatio>
      <p>
        하위 (rendering) 컴포넌트 들은 state 값과 set state action 을 모두 전달
        받아 사용하고,{" "}
        <b>이 컴포넌트들 사이에는 state 의 영향이 전혀 없도록 구성</b>한다. 이
        구성은 SoC 와 동시에, SRP 도 함께 달성했다고도 볼 수 있다.
      </p>

      <h3>Real-World Implementation</h3>
      <p>
        하지만 위의 diagram 은 실제 구현 이전에 그려진 스케치에 불과하다. 실제
        구현에는 더 정교한 SoC 가 적용됐다.
      </p>
      <CodeBlock
        fileName="data-table.tsx"
        code={`export default DataTable({
// Immutable initial parameters
...props
}) {
  // Mutable UI state
  const [pageNo, setPageNo] = React.useState(props.pageNo);
  const [numOfRows, setNumOfRows] = React.useState(props.numOfRows);

  // API integration with react-query
  const { data } = useQuery({
    queryFn: () => api.fetch({
      ...props, // spread immutable
      pageNo, // override with mutable
    })
  });

  // Derived state from data
  const columns = React.useMemo(() => createColumns(data), [data]);

  // Orchestrated state updates
  const handleRowsChange = (rows) => {
    setNumOfRows(rows);
    setPageNo(1); // Side effect coordination
  };

  return (
    <React.Fragment>
      {/* Rendering Component */}
      <ViewTable data={data?.result.resultList} columns={columns} />
      {/* Rendering Component */}
      <Pagination
        pageInfo={data?.result.pageInfo}
        onPageNoChange={setPageNo}
        onNumOfRowsChange={handleRowsChange}
      />
    </React.Fragment>
  )
}`}
      />
      <p>
        실제 구현에서는 다음과 같은 SoC 가 추가로 발생한 것을 확인할 수 있다.
      </p>
      <ul>
        <li>
          <b>Data Fetching</b>: <code>useQuery</code> 가 담당
        </li>
        <li>
          <b>UI(Mutable) State</b>: local state 로 관리
        </li>
        <li>
          <b>Data Transformation</b>: <code>useMemo</code>를 통해{" "}
          <code>react-table</code> 에 호환 가능한 형태로 변환 및 memoization
        </li>
        <li>
          <b>State Coordination</b>: Immutable / Mutable Parameters 의 merge 및
          override 처리를 wrapper 에서 담당
        </li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        여기까지, SoC 의 기준이 되는 concern 과 적용 사례를 소개해봤다. 계속
        언급했던 내용처럼, 소개한 것은 본인 사례에 국한된 concern 이며,{" "}
        <b>concern 은 정의하기 나름</b>이다. 이를 구체화하는 과정에서 SoC 가
        일어나기도 하고, 소프트웨어 전반에 걸쳐 영향을 주는 Cross-Cutting
        Concern 이 발견되기도 한다. 어떻게 정의하고 무엇을 적용하느냐에 따라
        완전히 다른 결과물이 나올 수도 있고, 전혀 다른 concern 으로부터 출발해{" "}
        <Link href="/blog/cloud-native">비슷한 결실을 맺는 경우</Link>-
        <i>
          예를 들어, Cloud Native와 Android OS는 서로 다른 목적(확장성 vs Device
          최적화)에서 출발했지만 유사한 분산 아키텍처로 수렴했다
        </i>
        -도 있다. 역설적이게도, concerns 를 정의하는 자체는 중요하지 않을 수
        있다. 이는 설계 과정에서 식별할 수 있는 concern 과 구현 과정에서
        발생하는 concern 이 다를 수 있기 때문이다. 하지만 concerns 자체가
        architecture 에 영향을 주는 것은 분명하기에,{" "}
        <b>
          이미 식별된 concerns 는 구성원들 사이에서 충분한 이해를 바탕으로
          공유되어야 한다
        </b>
        고 생각한다.
      </p>
    </Fragment>
  );
}
