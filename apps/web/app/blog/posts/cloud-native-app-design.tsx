import {
  AspectRatio,
  Skeleton,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pkg/ui';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, Suspense } from 'react';

import { BlogHeader, BlogHeaderSkeleton } from '@/components/blog/header';

export const metadata = {
  title: 'Cloud Native Application Design',
  description: 'Considerations of designing cloud native applications',
  date: '2025-05-22',
  tags: ['Cloud Native', 'MSA', 'architecture', 'design'],
  image: 'https://kubernetes.io/_common-resources/images/flower.svg',
};

const commons: { role: string; cloud: string; android: string }[] = [
  {
    role: 'Messaging',
    cloud: 'Networking (Cilium)',
    android: 'Broadcasting',
  },
  {
    role: 'Routing / Gateway',
    cloud: 'API Gateway',
    android: 'Intent Filter',
  },
  {
    role: 'Lifecycle Management',
    cloud: 'Container Orchestration',
    android: 'Activity Manager',
  },
  {
    role: 'Service Communication',
    cloud: 'Service Mesh(Istio)',
    android: 'Binder IPC',
  },
  {
    role: 'Monitoring',
    cloud: 'Health Checks / Monitoring',
    android: 'Watchdog / ANR Detection',
  },
  {
    role: 'Failure Isolation',
    cloud: 'Circuit Breaker',
    android: 'Process Isolation',
  },
  {
    role: 'Resource Management',
    cloud: 'Auto Scaling',
    android: 'Memory Management',
  },
];

export default function CloudNativeAppDesign() {
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

      <div className="prose mt-8 max-w-none text-primary">
        <h2 className="tracking-tight">
          A Paradigm Shift in Application Development
        </h2>
        <p>
          최근 어플리케이션의 구축의 paradigm 은 flexibility, scalability,
          sustainability, retainability 등을 강조하며 서비스의 제공과 기능
          개발의 영역을 분리하는 쪽으로 변화하는 중이다. 이를 현실화할 수 있게
          해주는 기술들은 다음과 같다.
        </p>

        <h3 className="tracking-tight">Cloud Computing</h3>
        <p>
          클라우드 컴퓨팅은 하드웨어 수준의 자원을 동적으로 할당하는 것을
          가능하게 하면서, 기존의 예측 사용량을 바탕으로 필요한 모든 자원을
          확보해 관리하던 On-Premise (Bare Metal) 방식을 보완하며 Infrastructure
          레벨의 자원 활용 효율을 끌어올렸다. 물리 자원을 더 세분화하여
          분배함으로써 자원의 가용률을 크게 높일 수 있게 된 것이다. 하지만
          클라우드 컴퓨팅은 어플리케이션 사용자에게는 크게 체감할 수 없는
          부분이었다.
        </p>

        <h3 className="tracking-tight">Microservices Architecture, MSA</h3>
        <p>
          Docker 의 등장과 함께 생겨난 Container 개념은 어플리케이션을 하드웨어,
          OS 등의 여러 종속성에서 해방시켜주었다. 여기에 더해 Container 화 된
          서비스의 관리를 보조해줄 Kubernetes 까지 등장하면서 클라우드
          컴퓨팅에서의 동적 자원 할당 개념을 어플리케이션의 서비스 레벨까지
          적용할 수 있게 되자, 어플리케이션이 서비스 도메인을 기준으로 쪼개지기
          시작했다. 이렇게 나눠진 서비스를 microservice, 이를 기준으로 한 설계를
          MSA 라고 부른다.
        </p>

        <p>
          MSA 이전에도 서비스 중심의 설계 방식은 존재했다.{' '}
          <Link
            href="https://redhat.com/en/topics/cloud-native-apps/what-is-service-oriented-architecture"
            target="_blank"
            rel="noopener noreferrer"
          >
            Service-oriented Architecture, SOA
          </Link>{' '}
          가 그 주인공으로, 어플리케이션을 서비스 도메인으로 나누어 설계한다는
          점은 동일하지만 설계의 적용 범위에 차이가 있다. MSA 가 어플리케이션
          범위에서 서비스를 분할한다면, SOA 는 전사적인 범위로 적용하여 동일한
          서비스의 중복 개발을 피하는 목적으로 사용한다.
        </p>

        <h3 className="tracking-tight">Cloud Native</h3>
        <blockquote className="text-primary">
          <Quote /> Divide and conquer is an algorithm design paradigm based on
          multi-branched recursion. A divide-and-conquer algorithm works by
          recursively breaking down a problem into two or more sub-problems of
          the same or related type until these become simple enough to be solved
          directly. The solutions to the sub-problems are then combined to give
          a solution to the original problem. -{' '}
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
          </Link>{' '}
          에서는 Cloud Native 가 <i>divide-and-conquer</i> 알고리즘을 원칙으로
          삼는다고 소개한다. 이에 따라 하나의 어플리케이션에 통합되어있던
          서비스들을 나누면서 어플리케이션 업데이트와 서비스 제공을 분리할 수
          있게 되고, 서비스에 따른 동적 자원 할당을 통해 요청이 몰리는 서비스를
          지연 없이 제공할 수 있다. 이는 서비스의 가용성을 보장하고 개발
          효율성을 높여 전체적인 비용을 절감하는 효과를 가져오며, 어플리케이션의
          사용자 경험 향상에도 주요한 역할을 한다. Cloud Native 는 이렇게 구성된
          어플리케이션을 효과적으로 운용하기 위한 시스템 전체를 의미한다.
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
          ,{' '}
          <Link
            href="https://kubernetes.io/docs/concepts/workloads/controllers/deployment"
            target="_blank"
            rel="noopener noreferrer"
          >
            deployment
          </Link>
          ,{' '}
          <Link
            href="https://kubernetes.io/docs/concepts/workloads/controllers/replicaset"
            target="_blank"
            rel="noopener noreferrer"
          >
            replicaset
          </Link>
          ,{' '}
          <Link
            href="https://kubernetes.io/docs/concepts/services-networking/service"
            target="_blank"
            rel="noopener noreferrer"
          >
            service
          </Link>
          ,{' '}
          <Link
            href="https://kubernetes.io/docs/concepts/services-networking/ingress"
            target="_blank"
            rel="noopener noreferrer"
          >
            ingress
          </Link>
          ,{' '}
          <Link
            href="https://kubernetes.io/docs/concepts/workloads/controllers/job"
            target="_blank"
            rel="noopener noreferrer"
          >
            job
          </Link>
          ,{' '}
          <Link
            href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account"
            target="_blank"
            rel="noopener noreferrer"
          >
            service account
          </Link>
          ,{' '}
          <Link
            href="https://kubernetes.io/docs/reference/access-authn-authz/rbac"
            target="_blank"
            rel="noopener noreferrer"
          >
            role
          </Link>{' '}
          등)이 늘어나 어플리케이션의 복잡도를 높이는 결과를 초래한다. 개발은
          물론 운영 인력에게도 전체 시스템에 대한 높은 이해도가 요구되면서
          DevOps 라는 새로운 인력 구성 형태가 나타났다.
        </p>

        <p>
          Cloud Native 의 발전은 현재 진행형이며, Cloud Native 환경 구성을 돕기
          위한 서드파티 도구들의 개발도 활발하게 진행되는 중이다.{' '}
          <Link
            href="https://cncf.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            CNCF <small>(Cloud Native Computing Foundation)</small>
          </Link>{' '}
          는 비영리단체인{' '}
          <Link
            href="https://linuxfoundation.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linux Foundation
          </Link>{' '}
          의 일부로, Cloud Native 를 보편화한다는 목표를 가진 open source,
          vendor-neutral 허브이다. <b>Argo</b>{' '}
          <small>(Continuous Integration & Delivery)</small>, <b>Cilium</b>{' '}
          <small>(Cloud Native Network)</small>, <b>Harbor</b>{' '}
          <small>(Container Registry)</small>, <b>Helm</b>{' '}
          <small>(Application Definition & Image Build)</small>, <b>Istio</b>{' '}
          <small>(Service Mesh)</small>, <b>Prometheus</b>{' '}
          <small>(Observability)</small>, <b>Kubernetes</b>{' '}
          <small>(Scheduling & Orchestration)</small> 등 많은 프로젝트들을 주관
          또는 지원하고 있다.
        </p>

        <h2 className="tracking-tight">Application Operating System?</h2>
        <p>
          서비스들이 분리됨에 따라 Cloud Native 환경에서 필수가 된 요소들이
          존재하는데, 이들을 살펴보다가 어느 소프트웨어의 구성과 매우 유사하다는
          점을 발견했다. 바로 Android OS 이다.
        </p>
      </div>
      <Table className="mt-4">
        <TableCaption>
          Common Features between Cloud Native and Android OS
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
      <div className="prose mt-8 max-w-none text-primary">
        <p>
          Cloud Native 와 Android OS 는 모두 분산 설계 원칙(
          <Link
            href="https://en.widipedia.org/wiki/Distributed_design_patterns"
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
          않을까 하는 생각이 들었다.
        </p>
      </div>
    </Fragment>
  );
}
