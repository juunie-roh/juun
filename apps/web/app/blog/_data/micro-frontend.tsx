import { Abbr } from "@juun/ui/abbr";
import { CodeBlock } from "@juun/ui/code-block";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export const metadata = {
  title: "Micro Frontend (MFE): Common Misconceptions and Case Studies",
  description:
    "Exploring the concept of Micro Frontend (MFE), its promises, misconceptions, implementation methods, and case studies including Spotify and Facebook's BigPipe.",
  category: "analysis",
  date: "2025-08-05",
  tags: [
    "Cloud Native",
    "MFE",
    "BFF",
    "microservice",
    "shell",
    "architecture",
    "design",
  ],
  image: "/images/blog/micro-frontend.png",
};

export default function Data() {
  return (
    <Fragment>
      <Link href="https://www.linkedin.com/pulse/micro-frontend-common-misconceptions-hyungjuun-roh-x2quc/">
        English Version
      </Link>
      <h2>MFE - Micro Frontend?</h2>
      <p>
        Cloud Native 와 microservice 가 주목 받음에 따라 Frontend 에서도 유사한
        구조의 architecture 가 급부상하고 있다. Micro Frontend (MFE) 가 그
        주인공으로, 최근 이 구조를 도입하려는 시도를 심심치 않게 목격할 수 있다.
        MFE 는 무엇이고, 어떤 상황에 적합할까?
      </p>

      <blockquote>
        이 글은{" "}
        <Link href="/blog/cloud-native">Cloud Native Application and MSA</Link>{" "}
        에 대한 배경지식을 바탕으로 한다.
      </blockquote>

      <h3>Definition</h3>
      <blockquote>
        A <b>micro frontend</b> is an architectural pattern for web development,
        where independently developed frontends are composed into a greater
        whole. - wikipedia
      </blockquote>
      <p>
        MFE 는{" "}
        <b>
          <i>독립적</i>
        </b>{" "}
        으로 개발이 진행된 application 들을 하나의 domain 으로 접근 가능하도록
        제공하는 frontend architecture 이다. 이 구조는 각 서비스를 담당하는
        frontend 팀이 제각각 자율적인 <small>autonomous</small> 개발 환경을
        구축하여 복잡한 dependency 공유 체계를 거치지 않고 개발을 진행하는 것을
        가능하게 해준다. 이 덕분에 다른 framework 기반의 서비스를 연결할 수
        있다는 부가적인 효과도 생긴다.
      </p>

      <h3>MFE Promise</h3>
      <p>MFE 도입의 이점을 정리하면 다음과 같다.</p>
      <ul>
        <li>
          <b>Independent Deployment</b>: 서비스들이 분리되어 독립된 workflow 를
          가지게 되므로써 다른 서비스에 구애받지 않은 개발 및 배포 프로세스를
          확보할 수 있다.
        </li>
        <li>
          <b>Framework Flexibility</b>: Dependency 또한 분리할 수 있기에
          application 을 구성하는 framework 를 각 팀 별로 설정할 수 있으며, 각
          팀의 기술 스택 또한 독립적으로 관리할 수 있다.
        </li>
        <li>
          <b>Team Autonomy</b>: 독립된 개발 및 배포 프로세스 구축과 기술 스택의
          분리에 따라 각 서비스를 담당하는 팀이 자율성을 갖고 서비스를 관리할 수
          있다.
        </li>
        <li>
          <b>Scaling Development Teams</b>: 분리된 팀들의 규모를 필요에 따라
          조절할 수 있게 된다.
        </li>
      </ul>
      <p>하지만, 이는 MFE 의 근본적인 도입 목적에 따른 부가 효과에 불과하다.</p>

      <h2>Betrayal of MFE</h2>
      <p>
        언급한 장점들을 생각하면 MFE 를 도입하지 않을 이유가 없어 보인다. 현재
        application 생태계에서 주로 문제가 되는 dependency 문제, 버그 픽스나
        사소한 서비스 업데이트를 위한 application 전체의 재배포 과정 등을
        해결해줄 수 있는 완벽한 기술적 대안으로 보이기 때문이다. 하지만, MFE 의
        도입은 위의 장점들을 넘어{" "}
        <b>기존에 확보했던 기술적 이점들까지도 역행</b>시킨다.
      </p>

      <h3>Critical Misconceptions</h3>
      <ul>
        <li>
          <b>NOT Frontend Only</b>: 가장 흔히 지나칠 수 있는 부분으로, MFE 는
          단순한 frontend application 의 분리를 뜻하는 것이 아니다. 어떤 방법을
          택하던, MFE 는 분리된 application context 를 갖게 된다. 따라서 global
          state 를 관리하기 위한 서비스는 물론, 각 서비스의 state 들을 조율하기
          위한 orchestration layer 로 작동할{" "}
          <Abbr title="Backend For Frontend">BFF</Abbr> 까지도 별도로 구성해야
          한다. Cloud Native 환경에 맞는 Global State Manager 를 직접 구현해야
          하는 것이다.
        </li>
        <li>
          <b>Service Communication</b>: application 의 성능에 가장 큰 영향을
          미치는 부분이다. MSA 구조의 backend <small>(server)</small> 는
          분리되어도 통신 성능에 큰 영향이 없다. 이는 서비스 request 및 response
          가 JSON 형태로 이루어지고, 작업에 필요한 instance 들은 각 서비스가
          포함하고 있기 때문이다. MFE 의 경우는 다르다. Frontend 는 작업이
          Client Side 에서 이루어지기 때문에 response 에 브라우저에서의 작동을
          위한 JavaScript 코드 번들을 함께 보내야 한다. 또한 통신이 http 를
          통하기 때문에 컴퓨팅 자원과 상관 없이 속도의 한계가 정해져 있다.
        </li>
        <li>
          <b>NOT for Technical Advantages</b>: MFE 의 핵심 목적은 기술적 이점이
          아닌 조직적 문제 해결에 있다. 하지만 많은 팀들이 MFE 를 성능 향상이나
          모듈화 같은 기술적 장점을 위해 도입하려 한다. 실제로는 MFE 는{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Conway%27s_law"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conway's Law
          </Link>{" "}
          에 따른 조직 구조의 반영이며, 기술적으로는 거의 모든 측면에서 단일
          application 보다 성능이 떨어진다. Framework mixing 이나 independent
          deployment 같은 특징들은 조직적 문제 해결에 따른 부가적인 효과에
          불과하다.
        </li>
      </ul>
      <p>
        MFE 의 도입은{" "}
        <b>
          <Abbr title="Single Page Application">SPA</Abbr> 에서{" "}
          <Abbr title="Multi-Page Application">MPA</Abbr> 로의 역행
        </b>
        을 의미한다. SPA 가 가져다주는 shared application context, optimized
        bundle loading 등을 모두 져버리는 선택이기 때문이다. 이는 기술적인
        측면에서 진보는 커녕, 오히려 후퇴하는 셈이다. cross-app communication 및
        coordination 을 포함하여 복잡성이 증가할 뿐더러, 성능을{" "}
        <b>
          <i>유지</i>
        </b>{" "}
        시키기 위해 분리된 <b>모든</b> application 에{" "}
        <Link href="/blog/bundle-optimization">Bundle Optimization</Link> 에서
        다룬 최적화 기법들을 <b>전부 적용</b>해야 한다.
      </p>

      <h2>MFE Implementation</h2>
      <p>MFE 가 어떻게 적용되길래 이런 엄청난 복잡성 증가를 불러올까?</p>
      <p>MFE 를 적용하는 방법에는 크게 두 가지가 있다.</p>
      <ol>
        <li>
          <Link
            href="https://nextjs.org/docs/app/guides/multi-zones"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <b>Multi-zone</b>
          </Link>
          (aka route proxy): Shell application 의 route 접근을 다른 application
          의 remote url 로 rewrite 하여 제공하는 방법
        </li>
        <li>
          <Link
            href="https://webpack.js.org/concepts/module-federation/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>Module Federation</b>
          </Link>
          : remote entry 설정을 통해 runtime 에서 각 application 을 module
          형태로 import 하여 제공하는 방법
        </li>
      </ol>
      <p>
        두 방법 모두 단순 설명만으로는 단순하기 그지 없다. route 를 덮어써서
        서비스 접근에 연속성을 부여하거나, npm 패키지처럼 module 형태로 export
        하고 import 만 하면 되지 않는가 싶다. 하지만 문제는 보이지 않는 곳에
        숨어있다.
      </p>

      <h3>1. Multi-Zones</h3>
      <p>
        이 route 를 덮어쓰는 방식은 단순해보이지만 사실 MFE 구조를 제일 정확하게
        반영한 방법이다. Next.js 는 <code>next.config.js</code> 의{" "}
        <code>rewrites</code> 설정을 통해 이 기능을 제공한다.
      </p>
      <Image
        src="/images/blog/multi-zones.png"
        alt="Multi-zones diagram"
        className="mb-0"
        width={1600}
        height={750}
      />
      <p className="mb-0 mt-2 text-right text-sm">
        Multi-Zones Diagram, Next.js
      </p>
      <p className="mt-2">
        Multi-zone 방식은 각 application 이 독립적인 서버에서 실행되며, shell
        application 이 특정 route 패턴에 따라 요청을 해당 application 으로 proxy
        하는 구조다. 예를 들어 <code>/shop/*</code> 경로는 쇼핑 서비스로,
        <code>/admin/*</code> 경로는 관리자 서비스로 라우팅된다.
      </p>

      <CodeBlock
        fileName="next.config.js"
        code={`module.exports = {
  async rewrites() {
    return [
      {
        source: '/shop/:path*',
        destination: 'https://shop-app.example.com/:path*'
      },
      {
        source: '/admin/:path*', 
        destination: 'https://admin-app.example.com/:path*'
      }
    ]
  }
}`}
      />

      <p>
        이 방식의 핵심 문제는{" "}
        <b>page transition 마다 전체 application 을 새로 로드</b>해야한다는
        점이다. 각 서비스가 독립된 서버에서 실행되기 때문에 route 이동 시
        브라우저는 완전히 새로운 페이지를 로드하게 되고, 이는 SPA 의 핵심 장점인
        빠른 네비게이션을 포기하는 것을 의미한다. 또한 이 방법은 Component
        단위로의 서비스 분리가 불가능하다. 하지만 각 application 이 분리된
        dependency 및 life cycle 을 가짐으로써 완전한 독립성을 확보할 수 있다.
      </p>

      <h3>2. Module Federation</h3>
      <p>
        Module Federation 은 Multi-zone 의 한계를 극복하기 위해 등장한 방법이다.
        각 application 을 runtime 에서 동적으로 로드할 수 있는 module 형태로
        빌드하여, 하나의 shell application 내에서 여러 micro frontend 를
        조합하는 방식이다.
      </p>

      <p>
        Multi-zone 과의 핵심 차이점은 <b>Single Page Application 특성을 유지</b>
        한다는 것이다. 각 micro frontend 가 JavaScript module 로 동작하기 때문에
        page transition 시 전체 페이지를 새로 로드할 필요가 없고, component
        단위의 세밀한 분리도 가능하다.
      </p>

      <CodeBlock
        fileName="webpack.config.js"
        code={`// Host Application (Shell)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        shop: 'shop@http://localhost:3001/remoteEntry.js',
        admin: 'admin@http://localhost:3002/remoteEntry.js'
      }
    })
  ]
};

// Remote Application (Shop)
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shop',
      filename: 'remoteEntry.js',
      exposes: {
        './ShopApp': './src/App',
        './ProductList': './src/components/ProductList'
      }
    })
  ]
};`}
      />

      <p>하지만 이 방식도 심각한 문제점들을 안고 있다:</p>
      <ul>
        <li>
          <b>Runtime Dependency Resolution</b>: 각 module 의 dependency 충돌을
          runtime 에서 해결해야 하므로 예측하기 어려운 오류가 발생할 수 있다.
        </li>
        <li>
          <b>Bundle Size Explosion</b>: 공통 dependency 들이 중복으로
          로드되거나, shared dependency 설정의 복잡성으로 인해 bundle size 가
          급격히 증가할 수 있다.
        </li>
        <li>
          <b>Type Safety Loss</b>: TypeScript 환경에서 remote module 의 타입
          정보를 정확히 전달하기 어려워 type safety 가 크게 저하된다.
        </li>
        <li>
          <b>Development Complexity</b>: 여러 application 을 동시에 실행해야
          하고, 각각의 build 과정을 관리해야 하므로 개발 환경의 복잡성이
          기하급수적으로 증가한다.
        </li>
      </ul>
      <p>
        또한, Multi-zones 와 다르게 dependency 종속성이 생기며, 일부 모듈의
        업데이트를 동기화하여 진행하게 되어 완전한 독립성을 갖추지 못한다는 점도
        문제가 될 수 있다.
      </p>

      <p>
        두 방법 모두 JavaScript Bundle 크기의 증가를 초래하며, 상당 기간을
        세밀한 Optimization 에 할애하지 않으면 서비스의 성능이 심각하게 저하되는
        결과를 맞게 된다.
      </p>

      <p>
        두 가지 방식의 특징들을 바탕으로, 다음과 같은 형태에 MFE 를 적용하는
        것이 가장 적합하다고 판단할 수 있다:
      </p>

      <ul>
        <li>서비스 제공에 필요한 main dependency 가 명확하게 구분된 경우</li>
        <li>
          서비스 사이의 연결성을 최소화할 수 있는 경우 (serialize 가능한
          context, 납득 가능한 design transition 등)
        </li>
        <li>
          개별 서비스 또는 컴포넌트의 로드 지연이 사용자에게 큰 영향을 미치지
          않는 경우
        </li>
      </ul>

      <h3>Shell Application</h3>
      <p>
        위의 두 방법 모두에서 등장하는 <b>Shell Application</b> 의 정체는
        무엇일까? Shell Application 은 MFE 구조에서 <b>orchestrator</b> 역할을
        담당하는 중앙 집중식 application 이다. 사용자가 실제로 접근하는
        진입점이며, 각 micro frontend 들을 통합하고 관리하는 책임을 진다.
      </p>

      <p>Shell Application 의 주요 책임은 다음과 같다:</p>
      <ul>
        <li>
          <b>Routing Orchestration</b>: 사용자의 요청을 적절한 micro frontend 로
          라우팅하고, 전체적인 네비게이션 흐름을 관리한다.
        </li>
        <li>
          <b>Global State Management</b>: 여러 micro frontend 간에 공유되어야
          하는 상태(사용자 인증, 테마 설정 등)를 중앙에서 관리한다.
        </li>
        <li>
          <b>Error Boundary</b>: 개별 micro frontend 에서 발생하는 오류를
          처리하고, 전체 application 의 안정성을 보장한다.
        </li>
      </ul>

      <p>
        문제는 이 Shell Application 자체가 <b>또 하나의 복잡한 시스템</b>이
        된다는 점이다. 단순한 routing 이나 module loading 을 넘어서, 실질적으로
        분산된 시스템의 coordinator 역할을 수행해야 하므로 그 자체로 상당한
        복잡성을 갖게 된다. 결국 MFE 를 도입한다는 것은 기존의 monolithic
        frontend 에 추가로 이런 orchestration layer 를 구축하고 유지보수해야
        한다는 의미이기도 하다.
      </p>
      <blockquote>
        그런데 Shell Application 이 맡게 되는 책임을 살펴보면 이상한 점을 확인할
        수 있다. Frontend 에 속한 그 분류와는 전혀 맞지 않는 backend 성격의
        책임을 갖는 것이다. 많은 MFE 소개 글들이 Shell Application 을 Frontend
        서비스로 언급하지만, 과연 이를 Frontend 영역으로 분류하는 것이 맞을까?
      </blockquote>

      <h2>Case Studies</h2>
      <h3>
        <Link
          href="https://engineering.atspotify.com/2019/3/building-spotifys-new-web-player"
          target="_blank"
          rel="noopener noreferrer"
        >
          Spotify
        </Link>
      </h3>
      <blockquote>
        "It was very slow to iterate upon and experiment, especially when it
        came to making changes across multiple views like updating the visual
        style."
      </blockquote>
      <p>
        Spotify 는 <b>MFE 에서 벗어난</b> 사례다. 초기에 iframe 기반의 micro
        frontend 구조를 사용했지만, 2016년에 완전히 다시 작성하기로 결정했다. 그
        이유는:
      </p>
      <ul>
        <li>
          <b>Performance Issues</b>: view 간 이동할 때마다 많은 리소스를 다시
          다운로드해야 해서 로딩 시간이 길었다
        </li>
        <li>
          <b>Maintenance Complexity</b>: 여러 팀이 서로 다른 기술 스택을
          사용하면서 유지보수가 어려워졌다
        </li>
        <li>
          <b>Development Friction</b>: 여러 view 에 걸친 변경사항(시각적 스타일
          업데이트 등)을 적용하기가 매우 느렸다
        </li>
      </ul>
      <p>
        결국 React + Redux 기반의 <b>단일 application</b> 으로 재구축한 결과,
        모든 핵심 지표에서 이전 web player 를 앞서는 성능을 달성했다. Spotify
        사례는 MFE 의 이론적 장점들이 실제 환경에서는 오히려 발목을 잡을 수
        있음을 보여주는 대표적인 예시다.
      </p>
      <p>
        흥미롭게도 Spotify 의 MFE 실패는 동시기의 조직적 문제와 밀접한 관련이
        있다. "the Spotify Model" 에 대한 회고를{" "}
        <Link
          href="https://news.hada.io/topic?id=2191"
          target="_blank"
          rel="noopener noreferrer"
        >
          여기서
        </Link>{" "}
        확인해볼 수 있는데, 자율적인 squad 들이 서로 다른 기술 스택을 사용하며
        coordination 없이 개발하던 조직 구조가 바로 MFE 의 maintenance
        complexity 와 development friction 을 야기한 근본 원인이었다. Conway's
        Law 에 따르면 소프트웨어 구조는 조직 구조를 반영하는데, Spotify 는
        조직적 문제를 기술적 architecture 로 해결하려다 실패한 셈이다.
      </p>

      <h3>Facebook: BigPipe</h3>
      <p>
        <Link
          href="https://www.nia.or.kr/site/nia_kor/ex/bbs/View.do?cbIdx=99863&bcIdx=24826&parentSeq=24826"
          target="_blank"
          rel="noopener noreferrer"
        >
          NIA 한국지능정보사회진흥원 이슈리포트
        </Link>{" "}
        에서 발행한 글에서 Micro Frontend 의 Best Practice 로 소개된 Facebook 의
        BigPipe 서비스 개선 사례는 <b>전형적인 분류 오류</b>의 예시다.
      </p>
      <p>
        BigPipe 는 2009년 Facebook 이 웹 페이지 로딩 시간을 줄이기 위해 개발한{" "}
        <b>서버 사이드 렌더링 최적화 기법</b>이다. 웹 페이지를 "pagelets" 라는
        작은 단위로 나누어 <b>서버에서 병렬로 처리</b>한 후 클라이언트로
        스트리밍 하는 방식이다. 이는 본질적으로 <b>백엔드 아키텍처 최적화</b>에
        해당하며, 현재 우리가 논의하는 MFE 개념과는 완전히 다른 영역이다.
      </p>
      <p>BigPipe 의 핵심은:</p>
      <ul>
        <li>
          <b>Server-side optimization</b>: 서버에서 페이지 구성 요소들을 병렬로
          생성
        </li>
        <li>
          <b>Streaming response</b>: 완성된 구성 요소부터 순차적으로
          클라이언트에 전송
        </li>
        <li>
          <b>Progressive rendering</b>: 사용자가 페이지의 일부분을 먼저 볼 수
          있도록 함
        </li>
      </ul>
      <p>
        이런 기법을 MFE 로 분류하는 것은 앞서 언급한 Shell Application 을
        Frontend 로 분류하는 것과 같은 맥락의 <b>개념적 혼동</b>이다. MFE 영역의
        미성숙함을 보여주는 또 다른 사례로, 성능 최적화 기법과 아키텍처 패턴을
        혼동하고 있는 것이다.
      </p>

      <h2>Conclusion</h2>
      <p>
        이 글에서 살펴본 바와 같이, MFE 는 아직 <b>개념적으로 정립되지 않은</b>{" "}
        미성숙한 영역이다. Shell Application 을 Frontend 로 분류하거나, BigPipe
        같은 백엔드 최적화 기법을 MFE Best Practice 로 소개하는 등의 사례들은 이
        분야가 얼마나 혼재된 상태인지를 보여준다.
      </p>
      <p>
        더 중요한 것은 MFE 의 본질이 <b>기술적 해결책이 아닌 조직적 문제</b>에
        있다는 점이다. MFE 도입을 고려한다면 먼저 조직적 차원에서 접근해야 한다:
      </p>
      <ul>
        <li>
          <b>팀 간 collaboration 프로세스</b>가 명확히 정립되어 있는가?
        </li>
        <li>
          <b>기술 스택 통일성</b>을 포기할 만한 조직적 이유가 있는가?
        </li>
        <li>
          <b>Cross-team coordination</b>을 위한 governance 체계가 존재하는가?
        </li>
        <li>
          분산된 시스템의 <b>복잡성 증가</b>를 감당할 조직적 역량이 있는가?
        </li>
      </ul>
      <p>
        성능 향상이나 개발 효율성 같은 기술적 목적으로 MFE 를 도입하려 한다면,
        그보다는{" "}
        <Link href="/blog/bundle-optimization">Bundle Optimization</Link> 이나
        모듈화 같은 검증된 기법들을 먼저 고려해보는 것이 현명하다. MFE 는 조직적
        문제에 대한 <b>마지막 수단</b>이어야 하며, 그 복잡성과 비용을 충분히
        이해한 후에 신중하게 결정해야 할 아키텍처 선택이다.
      </p>
    </Fragment>
  );
}
