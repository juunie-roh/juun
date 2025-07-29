import { Abbr } from "@juun/ui/abbr";
import { AspectRatio } from "@juun/ui/aspect-ratio";
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
  title: "Cloud Native Application and MSA",
  description:
    "Introduction to the Cloud Native, and considerations of designing cloud native applications.",
  date: "2025-05-22",
  tags: ["Cloud Native", "MSA", "architecture", "design"],
  image: "https://kubernetes.io/_common-resources/images/flower.svg",
};

const commons: { role: string; cloud: string; android: string }[] = [
  {
    role: "Messaging",
    cloud: "Message Broker(e.g. Kafka)",
    android: "Broadcasting",
  },
  {
    role: "Routing / Gateway",
    cloud: "API Gateway",
    android: "Intent Filter",
  },
  {
    role: "Lifecycle Management",
    cloud: "Container Orchestration",
    android: "Activity Manager",
  },
  {
    role: "Service Communication",
    cloud: "Service Mesh(e.g. Istio)",
    android: "Binder IPC",
  },
  {
    role: "Monitoring",
    cloud: "Health Checks / Monitoring",
    android: "Watchdog / ANR Detection",
  },
  {
    role: "Fault Tolerance",
    cloud: "Circuit Breaker",
    android: "Process Isolation",
  },
  {
    role: "Resource Management",
    cloud: "Auto Scaling",
    android: "Memory Management",
  },
];

export default function CloudNative() {
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

      <div className="prose text-primary mt-8 max-w-none">
        <h2 className="tracking-tight">
          A Paradigm Shift in Application Development
        </h2>
        <p>
          최근 어플리케이션의 구축의 패러다임은 flexibility, scalability,
          sustainability, retainability 등을 강조하며 서비스의 제공과 기능
          개발의 영역을 분리하는 쪽으로 변화하고 있다. 이러한 변화는 단순히
          기술적 트렌드를 따르는 것이 아니라, 급변하는 비즈니스 환경에서
          생존하기 위한 필수 전략이 되었다.
        </p>
        <p>
          기존의 Monolithic 아키텍처에서는 하나의 거대한 코드베이스에 모든
          기능이 통합되어 있었다. 이는 초기 개발과 배포가 간단하다는 장점이
          있었지만, 시간이 지날수록 배포의 위험성, 확장성의 제약, 기술 스택의
          경직성, 팀 간 협업의 어려움과 같은 한계를 드러냈다. 이러한 문제들을
          해결하기 위해 등장한 것이 바로 마이크로서비스 아키텍처(MSA)이다.
          그러나 MSA는 단독으로 존재할 수 없으며, 이를 현실화하기 위한 기반
          기술들의 발전이 필요했다.
        </p>

        <h3 className="tracking-tight">Cloud Computing</h3>
        <p>
          클라우드 컴퓨팅은 하드웨어 수준의 자원을 동적으로 할당하는 것을
          가능하게 하면서, 기존의 예측 사용량을 바탕으로 필요한 모든 자원을
          확보해 관리하던 On-Premise (Bare Metal) 방식을 보완하며 인프라 레벨의
          자원 활용 효율을 끌어올렸다. 물리 자원을 더 세분화하여 분배함으로써
          자원의 가용률을 크게 높일 수 있게 된 것이다. 하지만 기존의 Monolithic
          어플리케이션으로는 폭주하는 트래픽을 어플리케이션 전체를 새로운
          인스턴스로 올리는 방식으로 분산시켜야 했기 때문에, 효율성에서 크게
          이득을 보기 어려웠다.
        </p>

        <h3 className="tracking-tight">Microservices Architecture, MSA</h3>
        <p>
          Docker 의 등장과 함께 생겨난 Container 개념은 어플리케이션을 하드웨어,
          OS 등의 여러 종속성에서 해방시켜주었다. 여기에 더해, 컨테이너화된
          서비스를 효과적으로 관리하기 위한 Kubernetes 가 등장하면서 클라우드
          컴퓨팅에서의 동적 자원 할당 개념을 어플리케이션의 서비스 레벨까지
          적용할 수 있게 되자, 어플리케이션이 서비스 도메인을 기준으로 쪼개지기
          시작했다. 이렇게 나눠진 서비스를 microservice, 이를 기준으로 한 설계를
          MSA 라고 부른다.
        </p>

        <p>
          MSA 이전에도 서비스 중심의 설계 방식은 존재했다.{" "}
          <Link
            href="https://redhat.com/en/topics/cloud-native-apps/what-is-service-oriented-architecture"
            target="_blank"
            rel="noopener noreferrer"
          >
            Service-oriented Architecture, SOA
          </Link>{" "}
          가 그 주인공으로, 어플리케이션을 서비스 도메인으로 나누어 설계한다는
          점은 동일하지만 설계의 적용 범위에 차이가 있다. SOA 가 전사적인 범위로
          적용하여 동일한 서비스의 중복 개발을 피하기 위해 사용한다면, MSA 는
          어플리케이션 범위에서의 서비스를 분할한다.{" "}
          <Abbr title="Enterprise Service Bus">ESB</Abbr> 도입을 통해 공통
          서비스를 엔터프라이즈 수준에서 관리하는 것을 목적으로 하는 SOA 와
          달리, MSA 는 어플리케이션의 서비스를 분할 제공하여 가용성 및 확장성
          등의 확보를 노린다고 할 수 있다.
        </p>

        <Table className="mt-4">
          <TableCaption>Difference between SOA and MSA</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Aspect</TableHead>
              <TableHead className="w-1/3">SOA</TableHead>
              <TableHead className="w-1/3">MSA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Scope</TableCell>
              <TableCell>Enterprise</TableCell>
              <TableCell>Application-level</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Communication</TableCell>
              <TableCell>ESB</TableCell>
              <TableCell>Direct (REST, gRPC)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Governance</TableCell>
              <TableCell>Centralized</TableCell>
              <TableCell>Decentralized</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h3 className="tracking-tight">Cloud Native</h3>
        <blockquote className="text-primary">
          <Quote /> Divide and conquer is an algorithm design paradigm based on
          multi-branched recursion. A divide-and-conquer algorithm works by
          recursively breaking down a problem into two or more sub-problems of
          the same or related type until these become simple enough to be solved
          directly. The solutions to the sub-problems are then combined to give
          a solution to the original problem. -{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikipedia
          </Link>
        </blockquote>
        <p>
          <Link
            href="https://redhat.com/en/blog/cloud-native-building-blocks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Red Hat Blog
          </Link>{" "}
          에서는 Cloud Native 가 <i>divide-and-conquer</i> 알고리즘을 원칙으로
          삼는다고 소개한다. 이에 따라 하나의 어플리케이션에 통합되어있던
          서비스들을 나누면서 어플리케이션 업데이트와 서비스 제공을 분리할 수
          있게 되고, 서비스에 따른 동적 자원 할당을 통해 요청이 몰리는 서비스를
          지연 없이 제공할 수 있다. 이는 서비스의 가용성을 보장하고 개발
          효율성을 높여 전체적인 비용을 절감하는 효과를 가져오며, 어플리케이션의
          사용자 경험 향상에도 주요한 역할을 한다. Cloud Native 는 이렇게 구성된
          어플리케이션을 효과적으로 운용하기 위한 ecosystem 전체를 의미한다.
        </p>

        <ul>
          <li>Monitoring and controlling services and resources</li>
          <li>Continuous Integration & Delivery (CI/CD)</li>
          <li>Container orchestration and networking</li>
          <li>
            Self-healing, circuit breaker, test automation, roll-out, roll-back,
            bin packing, etc
          </li>
        </ul>

        <p>
          하지만 단일 microservice 를 정의하기 위해 사용되는 아이템들(
          <Link
            href="https://kubernetes.io/docs/concepts/workloads/pods"
            target="_blank"
            rel="noopener noreferrer"
          >
            pod
          </Link>
          ,{" "}
          <Link
            href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment"
            target="_blank"
            rel="noopener noreferrer"
          >
            deployment
          </Link>
          ,{" "}
          <Link
            href="https://kubernetes.io/docs/concepts/workloads/controllers/replicaset"
            target="_blank"
            rel="noopener noreferrer"
          >
            replicaset
          </Link>
          ,{" "}
          <Link
            href="https://kubernetes.io/docs/concepts/services-networking/service"
            target="_blank"
            rel="noopener noreferrer"
          >
            service
          </Link>
          ,{" "}
          <Link
            href="https://kubernetes.io/docs/concepts/services-networking/ingress"
            target="_blank"
            rel="noopener noreferrer"
          >
            ingress
          </Link>
          ,{" "}
          <Link
            href="https://kubernetes.io/docs/concepts/workloads/controllers/job"
            target="_blank"
            rel="noopener noreferrer"
          >
            job
          </Link>
          ,{" "}
          <Link
            href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account"
            target="_blank"
            rel="noopener noreferrer"
          >
            service account
          </Link>
          ,{" "}
          <Link
            href="https://kubernetes.io/docs/reference/access-authn-authz/rbac"
            target="_blank"
            rel="noopener noreferrer"
          >
            role
          </Link>{" "}
          등)이 늘어나 어플리케이션의 복잡도를 높이는 결과를 초래한다. 개발은
          물론 운영 인력에게도 전체 시스템에 대한 높은 이해도가 요구되면서{" "}
          <Abbr title="Development Operations">DevOps</Abbr> 라는 새로운 인력
          구성 형태가 나타났다. 여기에 보안 관리 인력이 추가된 형태를{" "}
          <Abbr title="Development Security Operations">DevSecOps</Abbr> 라고
          한다.
        </p>

        <p>
          Cloud Native 의 발전은 현재 진행형이며, Cloud Native 환경 구성을 돕기
          위한 서드파티 도구들의 개발도 활발하게 진행되는 중이다.{" "}
          <Link
            href="https://cncf.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            CNCF <small>(Cloud Native Computing Foundation)</small>
          </Link>{" "}
          는 비영리단체인{" "}
          <Link
            href="https://linuxfoundation.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linux Foundation
          </Link>{" "}
          의 일부로, Cloud Native 를 보편화한다는 목표를 가진 오픈 소스, 벤더
          중립적 허브이다. <b>Argo</b>{" "}
          <small>(Continuous Integration & Delivery)</small>, <b>Cilium</b>{" "}
          <small>(Cloud Native Network)</small>, <b>Harbor</b>{" "}
          <small>(Container Registry)</small>, <b>Helm</b>{" "}
          <small>(Application Definition & Image Build)</small>, <b>Istio</b>{" "}
          <small>(Service Mesh)</small>, <b>Prometheus</b>{" "}
          <small>(Observability)</small>, <b>Kubernetes</b>{" "}
          <small>(Scheduling & Orchestration)</small> 등 많은 프로젝트들을 주관
          또는 지원하고 있다.
        </p>

        <h2 className="tracking-tight">Application Operating System?</h2>
        <p>
          서비스들이 분리됨에 따라 Cloud Native 환경에서 필수가 된 요소들이
          존재하는데, 이들을 살펴보다가 어느 소프트웨어의 구성과 매우 유사하다는
          점을 발견했다. 바로 Android OS 이다.
        </p>

        <Table className="mt-4">
          <TableCaption>
            Conceptual Mapping of Responsibilities between Cloud Native and
            Android OS
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Cloud Native</TableHead>
              <TableHead>Android OS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {commons.map((common) => (
              <TableRow key={common.role}>
                <TableCell>{common.role}</TableCell>
                <TableCell>{common.cloud}</TableCell>
                <TableCell>{common.android}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <p>
          Cloud Native 와 Android OS 는 모두 분산 설계 원칙(
          <Link
            href="https://en.wikipedia.org/wiki/Distributed_design_patterns"
            target="_blank"
            rel="noopener noreferrer"
          >
            Distributed Design Patterns
          </Link>
          )을 따른다는 공통점이 있다. 그렇다보니 언급한 부분 이외에도 상당
          부분이 유사한 것을 확인할 수 있다. Cloud Native 는 '확장성 및 장애
          대응', Android OS 는 'Device 최적화'라는 서로 다른 목적성을 가졌음에도
          유사한 방향으로 수렴 진화한 것이다. Cloud Native 는 어플리케이션을
          보다 효율적으로 운영하기 위한 Operating System 으로 분류해도 되지
          않을까?
        </p>

        <h2 className="tracking-tight">Core Design Considerations for MSA</h2>

        <AspectRatio
          ratio={16 / 9}
          className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
        >
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src="/images/blog/cloud-native-application-development.jpg"
              alt="Cloud Native Application Development"
              className="mt-0 size-full object-contain"
              fill
            />
          </Suspense>
        </AspectRatio>

        <p className="text-right">
          <small>
            <Link
              href="https://kanini.com/blog/building-cloud-native-applications-and-best-practices"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              <ExternalLink size={12} /> Building Cloud Native Applications: Why
              & How?
            </Link>
          </small>
        </p>
        <p>
          MSA 기반의 어플리케이션의 설계는 기존과 다른 측면으로 접근해야 한다.
          Android OS 와의 유사성에서 알 수 있듯이, Cloud Native 는
          어플리케이션을 위한 자체 OS 의 성격을 띠고 있기 때문에, 어플리케이션이
          역설적이게도 Cloud Native 시스템 자체에 대한 종속성이 생긴다. Cloud
          Native 환경에 대한 호환성을 고려해 설계를 진행해야 하는 것이다. 이에
          따라 고려해야 할 것들은 다음과 같이 나눠진다.
        </p>

        <h3 className="tracking-tight">1. Infrastructure Architecture</h3>
        <p>어플리케이션이 운영될 Cloud Native 환경을 정의하는 것이 우선이다.</p>
        <ul>
          <li>
            <b>Centralized Configuration Management</b>: 물리적 리소스, 외부
            연계 서비스, 클라우드 리소스 등을 관리할 수 있는 중앙 집권화된 설정
            관리.
          </li>
          <li>
            <b>Observability</b>: 자원 사용량, 서비스 Health 상태 등을 확인할 수
            있는 모니터링 시스템.
          </li>
          <li>
            <b>Security</b>: 네트워크 정책 및 Ingress & Engress, 방화벽 설정,
            권한 정의 및 관리 등의 보안 관리.
          </li>
          <li>
            <b>Inter-service Communication</b>: 서비스 간 통신 방식 정의 -
            동기(synchronous, REST/gRPC) 또는 비동기(asynchronous, message
            queue/event streaming).
          </li>
          <li>
            <b>Service Discovery & Load Balancing</b>: 동적 환경에서 서비스
            인스턴스를 찾고 부하를 분산하는 메커니즘.
          </li>
        </ul>
        <h3 className="tracking-tight">2. Microservice Definition</h3>
        <p>
          이렇게 정의된 Cloud Native 환경을 바탕으로 단일 microservice 의 구성
          요소를 식별할 수 있다.
        </p>
        <ul>
          <li>
            <b>Data Management</b>: 각 서비스에 독립적인 데이터 저장소 할당 및
            데이터 소스 분산에 따른 일관성 유지 정책 수립
          </li>
          <li>
            <b>API Design</b>: 정의된 서비스 통신 방식을 따르는 구체적인 통신
            방법 설계 및 개별 서비스의 통신 방법에 대한 versioning
          </li>
          <li>
            <b>Resilience Patterns</b>: Timeout, 재시도 및 Error Handling 정책과
            Circuit Breaker 등을 통한 장애 대응 방침
          </li>
        </ul>
        <p>
          위 요소들을 바탕으로 단일 Microservice 는 구성된다. 각 서비스는
          Domain-Driven Design(DDD) 원칙에 따라 서비스 경계와 Context 를
          정의하며, 환경에 맞는 통신 포맷, 네트워크 및 방화벽 보안 정책 등을
          갖추도록 설계한다.
        </p>
        <h3 className="tracking-tight">3. Others</h3>
        <p>
          이외에도 서비스 제공의 중단 없이 서비스 업데이트를 진행하기 위한 CI/CD
          Pipeline, 개발, 테스트 및 배포 환경 구축, DevOps 도입에 따른 조직 구조
          및 문화 혁신 등 많은 영역에 걸친 변화를 거쳐야 어플리케이션에 MSA 를
          적용할 수 있다.
        </p>

        <h2 className="tracking-tight">Case Studies</h2>
        <p>
          Cloud Native 어플리케이션으로의 Migration 사례는 이미 충분히 많이
          찾아볼 수 있다. 그 중에서도{" "}
          <Link
            href="https://cncf.io/case-studies"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>CNCF Case Studies</b>
          </Link>{" "}
          에서는 주로 CNCF 프로젝트들의 사례를 소개하고 있다.
        </p>
        <ul>
          <li>
            <Link
              href="https://cncf.io/case-studies/netflix"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Netflix</b>
            </Link>
            : Cloud Native 성공 사례로 빠지지 않고 언급되는 Netflix 는 사내 자체
            개발을 진행하던 <Abbr title="Remote Procedure Call">RPC</Abbr>{" "}
            기술을 <b>gRPC</b> 로 대체, 확장 적용하여 Inter-Service
            Communication 을 발전시키면서 얻은 효과를 소개한다.
          </li>
          <li>
            <Link
              href="https://cncf.io/case-studies/kakao"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Kakao</b>
            </Link>
            : 한국 기업인 카카오도 찾아볼 수 있다. 카카오는 자사의 Kubernetes
            플랫폼에 kube-proxy 와 Nginx Ingress 를 추가하면서 네트워크 문제가
            발생했는데, <b>Cilium</b> 을{" "}
            <Abbr title="Container Network Interface">CNI</Abbr> 로 채택하면서
            네트워크 비용을 줄이면서 kube-proxy 를 도입할 필요가 없어졌다.
          </li>
        </ul>

        <h2 className="tracking-tight">Conclusion</h2>
        <blockquote className="text-primary">
          <Quote /> The best way to implement complex systems is to use a series
          of simple, loosely coupled components. - Martin Fowler
        </blockquote>
        <p>
          Cloud Native와 MSA는 단순히 기술적 선택이 아니라, 소프트웨어 개발과
          운영에 대한 철학의 변화를 의미한다. Android OS가 수많은 앱들이
          독립적으로 실행되면서도 하나의 플랫폼 위에서 조화롭게 동작하는
          생태계를 만들었듯이, Cloud Native는 마이크로서비스들이 각자의
          생명주기를 가지면서도 하나의 비즈니스 가치를 전달하는 새로운
          패러다임을 제시한다.
        </p>
        <p>
          이 여정은 결코 쉽지 않다. 기술적 복잡성은 물론, 조직 문화와 개발
          프로세스의 근본적인 변화를 요구한다. 하지만 이러한 변화를 성공적으로
          이끌어낸다면, 급변하는 비즈니스 환경에서 지속 가능한 경쟁력을 확보할
          수 있을 것이다.
        </p>
      </div>
    </Fragment>
  );
}
