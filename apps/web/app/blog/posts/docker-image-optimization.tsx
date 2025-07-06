import { AspectRatio } from "@pkg/ui/aspect-ratio";
import { CodeBlock } from "@pkg/ui/code-block";
import { Skeleton } from "@pkg/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";

import { BlogHeader, BlogHeaderSkeleton } from "@/components/blog/header";

export const metadata = {
  title: "Docker Image Optimization",
  description: "NextJS monorepo 프로젝트의 Docker image 크기 최적화",
  date: "2025-04-16",
  tags: [
    "Docker",
    "CI",
    "container",
    "image",
    "NextJS",
    "standalone",
    "monorepo",
  ],
  image: "/images/logo/docker-logo-blue.svg",
};

export default function DockerImageOptimization() {
  return (
    <Fragment>
      <Suspense fallback={<BlogHeaderSkeleton />}>
        <BlogHeader metadata={metadata} />
      </Suspense>
      {metadata.image && (
        <AspectRatio
          ratio={16 / 9}
          className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
        >
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src={metadata.image}
              alt={metadata.title}
              className="size-full object-contain px-4"
              fill
            />
          </Suspense>
        </AspectRatio>
      )}

      <div className="prose text-primary mt-8 max-w-none">
        <h2 className="tracking-tight">Docker Build</h2>
        <p>
          <Link href="https://docs.docker.com/build/concepts/overview">
            Docker Build
          </Link>{" "}
          는 client-server 아키텍쳐를 취하고 있다. 클라이언트(Buildx)가
          Dockerfile 의 내용을 interpret 해서 서버에 전달하면 서버(BuildKit)가
          build 한 후 build output 을 클라이언트에게 넘기거나{" "}
          <Link href="https://hub.docker.com">Docker Hub</Link> 같은 registry 에
          등록하는 방식이다. 여기서 주목해야 할 점은{" "}
          <Link href="https://docs.docker.com/build/building/multi-stage">
            Multi-stage
          </Link>{" "}
          이다.
        </p>

        <h2 className="tracking-tight">Multi-stage</h2>
        <p>
          Dockerfile 은 일반적으로 base image 를 선택하는 명령어인{" "}
          <code>FROM</code> 으로 시작하게 되는데, 이는 곧 새로운 stage 가
          시작됨을 의미한다. <code>FROM</code> 명령어가 두 번 이상 있으면
          multi-stage build 가 되는 것이다.
        </p>
        <CodeBlock
          fileName="dockerfile"
          code={`# syntax=docker/dockerfile:1
FROM golang:1.23
WORKDIR /src
COPY <<EOF ./main.go
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
EOF
RUN go build -o /bin/hello ./main.go

FROM scratch
COPY --from=0 /bin/hello /bin/hello
CMD ["/bin/hello"]`}
        />
        <p>
          Multi-stage 를 활용할 수 있게 해주는 것은 다른 stage 에 있는 파일을
          가져올 수 있는 <code>COPY</code> 의 <code>--from</code> 옵션이다.
          <code>--from=</code> 은 stage 에 대한 접근자의 역할을 하며, integer
          index 또는 string 을 받을 수 있다. <code>FROM ... AS ...</code>{" "}
          명령으로 stage 에 이름을 지정하여 접근할 수도 있고, 해당 stage 가
          선언된 순서에 따라 integer index 로 접근할 수 있다.
          <code>COPY --from</code> 은 image 에도 접근 가능하다!
        </p>
        <p>
          Docker 는 가장 마지막에 위치한 stage 를 최종 output 을 생성할 stage 로
          인식한다. 마지막이 아닌 stage 에서 실행된 내용들은 build cache 에는
          저장되지만 image 에는 포함되지 않는다.
        </p>

        <h2 className="tracking-tight">Image Optimization</h2>
        <p>
          <Link href="https://docs.docker.com/build/building/best-practices">
            Docker Build Best Practices
          </Link>{" "}
          공식 문서에서는 Build Cache 관리, 어플리케이션 Decoupling 등 Docker 의
          전반적인 사용에 대한 모범 사례와 Dockerfile 명령어들을 확인할 수 있다.
          여기서는 그 중에서도 final output image 의 크기를 줄이기 위한 방법을
          몇 가지 소개한다. NextJS monorepo 프로젝트를 build 한다.
        </p>
        <h3 className="tracking-tight">1. Base Image</h3>
        <p>
          Multi-stage 활용에 앞서, base image 를 잘 선택하는 것이 중요하다. 공식
          문서에서는{" "}
          <Link href="https://hub.docker.com/_/alpine">Alpine Image</Link> 를
          추천한다. Linux OS 로써 완벽하게 동작하면서도 용량은 6MB 정도 밖에
          되지 않는 경량화된 image 이다. 대부분의 공식 image 들은 alpine 태그를
          제공하기 때문에 여기서 image 크기를 크게 줄일 수 있다. alpine 외에도
          busybox, bullseye 등 다양한 경량 OS 를 선택할 수 있다. 여기서 사용할{" "}
          <Link href="https://hub.docker.com/_/node">Node Image</Link> 도 alpine
          태그를 지원한다.
        </p>
        <h3 className="tracking-tight">2. Multi-stage</h3>
        <p>
          적절한 Base Image 를 선택했다면, 이제는 build stage 를 나눠줄
          차례이다. 각 stage 는 일종의 세이브 포인트처럼 작동해서,{" "}
          <code>FROM (stage)</code> 명령으로 다른 stage 로부터 새로운 stage 를
          만들면 기존 stage 에서 작업한 내용들을 그대로 물려받는다. 이런 특성을
          활용해 모든 stage 의 바탕이 될 stage 를 하나 만든다.
        </p>
        <h4>Base Stage</h4>
        <CodeBlock
          fileName="dockerfile"
          code={`# syntax=docker.io/docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app

ENV NODE_ENV=production \\
    PORT=3000 \\
    HOSTNAME=0.0.0.0

RUN apk add --no-cache libc6-compat && \\
    corepack enable && corepack prepare pnpm@latest --activate && \\
    addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs`}
        />
        <p>
          어플리케이션이 실행될 node 가 포함된 image 를 바탕으로 Working
          Directory 설정 및 환경 변수 설정, 필수 패키지 설치, 권한 설정 등 build
          될 동안 공유하게 될 기본 설정을 진행하는 stage 이다.
        </p>
        <h4>Builder Stage</h4>
        <CodeBlock
          fileName="dockerfile"
          code={`FROM base AS builder

COPY --chown=nextjs:nodejs . .

USER root

# Build with full dependencies
RUN pnpm install --frozen-lockfile && \\
    pnpm build`}
        />
        <p>
          Local 소스 파일을 모두 복사하고, module 을 다운로드 한 다음 build 를
          진행한다. <code>COPY . .</code> 명령은 프로젝트의{" "}
          <i>
            <b>모든 파일을 복사</b>
          </i>{" "}
          하는 것을 뜻한다. 물론 이렇게 지정하면 node_modules 까지 복사하기
          때문에 시간이 매우 오래 걸릴 수 밖에 없다. build 에 필요한 파일을 직접
          지정해서 복사할 수도 있고, <code>.dockerignore</code> 에서 제외할
          파일들을 지정할 수도 있다. <code>.dockerignore</code> 는{" "}
          <code>.gitignore</code> 와 비슷하게 가져가면 된다. 이 단계를 거치면
          Builder Stage 의 Working Directory 에 build output 이 생긴다.
        </p>
        <h4>Runner Stage</h4>
        <CodeBlock
          fileName="dockerfile"
          code={`FROM base AS runner

# Copy only the necessary Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
`}
        />
        <p>
          builder stage 의 working directory(/app)에서 파일들을 복사해온다. 이
          프로젝트에서는 NextJS 의 <code>output: 'standalone'</code> 옵션을
          사용했기 때문에 빌드 결과가 조금 다른 모습을 하고 있다. 보통의 경우
          build output 은 별도로 server 가 필요한 html 형태이기 때문에 runner
          stage 에 <code>serve</code> 같은 npm 패키지나 따로 작성한 Node.js
          서버를 통해 html 을 serve 하는 명령으로 끝을 맺는다. 이렇게 build 한
          image 는 모든 소스 파일을 포함한 image 와 비교했을 때 2GB 에서 273MB
          까지 줄어든 것을 확인할 수 있다.
        </p>
        <h4>standalone?</h4>
        <p>
          <code>next.config.js</code> 에서 설정할 수 있는 output 옵션이다. 이를
          활성화하고 build 하게 되면 생기는 <code>.next/standalone</code> 하위의{" "}
          <code>server.js</code> 를 node 로 실행시켜주기만 하면 build output 을
          다른 서버를 거치지 않고 serve 할 수 있다. 하지만 위의 예시처럼 몇몇
          자원을 직접 복사해주어야 한다.
        </p>

        <h3>3. Selective Packages</h3>
        <p>
          그런데 base stage 에서 설치한 <code>libc6-compat</code> 이나 패키지
          매니저인 pnpm 도 builder stage 에서만 필요한 부분이기 때문에, 아래와
          같이 해당 부분만을 분리해낼 수 있다. 최종 image 크기는 273MB 에서
          254MB로 더 감소했다.
        </p>
        <CodeBlock
          fileName="dockerfile"
          code={`# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

# Set common environment variables
ENV NODE_ENV=production \\
    NEXT_TELEMETRY_DISABLED=1 \\
    PORT=3000 \\
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

FROM base AS deps

# Install only necessary dependencies for building
RUN apk update && \\
    apk add --no-cache libc6-compat && \\
    corepack enable && corepack prepare pnpm@latest --activate

# Builder stage
FROM deps AS builder

# Copy source with appropriate permissions
COPY --chown=nextjs:nodejs . .

USER root

# Build with full dependencies
RUN pnpm install --frozen-lockfile && \\
    pnpm build

# Production image
FROM base AS runner

# Copy only the necessary Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
        `}
        />
        <p>
          이처럼 image 로 export 되는 최종 stage 에는 build 중에 필요한 패키지와
          output 실행에 필요한 패키지를 구분해 필수불가결의 요소들만 포함하는
          것이 이미지 크기를 줄이는 것에 핵심적인 역할을 한다. 같은 원리로
          alpine image 의 경우 Linux 명령어 중 대표적인 <code>sudo</code> 가
          포함되어 있지 않는 등, 불필요한 요소들은 제외되어 있는 것을 확인할 수
          있다.
        </p>

        <h3 className="tracking-tight">
          4. Consolidate <code>RUN</code> Commands
        </h3>
        <p>
          Dockerfile 에서의 <code>RUN</code> 명령어는 일반적인 CLI 실행 명령이
          아니기 때문에, 주의해서 사용할 필요가 있다. 이는 Docker image 를
          생성하는 방식과 관련이 있다. Docker 는 image 를 Immutable 로
          취급하면서, 변경 사항들을 diff layer 로 만들어 image 에 쌓는 방식으로
          저장한다.
        </p>
        <CodeBlock
          fileName="dockerfile"
          code={`# inefficient example
FROM debian:latest
WORKDIR /app
RUN git clone https://some.project.git
RUN cd project
RUN make
RUN mv ./binary /usr/bin/
RUN cd .. && rm --rf project`}
        />
        <p>
          <code>RUN</code> 명령어는 실행될 때마다 변경 사항들을 포함한 layer 를
          새로 만들어 image 에 추가한다. 파일을 삭제하는 것 또한 삭제 명령이
          실행된 layer 에서 파일이 삭제됐음을 기록할 뿐, 실제 파일을 삭제하지는
          않는다. 그렇기 때문에 한 번의 <code>RUN</code> 명령에서 가능한 모든
          작업을 처리해야 한다.
        </p>
        <CodeBlock
          fileName="dockerfile"
          code={`# alternative
FROM debian:latest
WORKDIR /app
RUN git clone https://some.project.git && \\
    cd project && \\
    make && \\
    mv ./binary /usr/bin/ && \\
    cd .. && rm --rf project`}
        />
        <p>
          <code>&&</code> 와 같은 inline operator 를 활용해 layer 생성을
          최소화할 수 있다. 가독성을 높이기 위해 <code>\</code> 로 줄 바꿈을
          넣어줄 수도 있다.
        </p>

        <h3 className="tracking-tight">5. Further</h3>
        <AspectRatio
          ratio={16 / 9}
          className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
        >
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src="/images/blog/dive.png"
              alt="The result of executing dive command"
              className="mt-0 size-full object-cover"
              fill
            />
          </Suspense>
        </AspectRatio>
        <p>
          Docker image layer 분석 툴인{" "}
          <Link href="https://github.com/wagoodman/dive">dive</Link> 는 image 를
          layer 단위로 탐색할 수 있어 어느 부분에서 size 를 더 줄일 수 있는지
          확인하기 쉽도록 도와준다. Image Details 항목을 살펴보면, 86KB 의
          공간을 더 줄일 수 있고 어떤 파일이 중복되는지를 보여준다.
        </p>
        <p>
          더 나아가서, 실행에 필요한 패키지 설치를 image 에 포함하지 않고,
          container 실행 시에 설치하도록 구성할 수도 있다. 다만 container
          실행에는 시간이 더 걸릴 수도 있다.
        </p>

        <h2 className="tracking-tight">Build Cache</h2>
        <p>
          앞서 살펴봤듯이 Docker image build 과정은 서버(BuildKit)에서 diff
          layer 를 추가하는 방식으로 진행된다. 이 과정에서 만들어진 layer 를
          build cache 로 사용한다.{" "}
          <Link href="https://docs.docker.com/build/cache">
            (How the build cache works)
          </Link>
        </p>
        <CodeBlock fileName="bash" code={`docker system df`} />
        <p>
          image build 를 진행해보고 위 명령으로 Docker 가 차지하고 있는 storage
          정보를 보면 <code>Build Cache</code> 항목이 꽤나 큰 것을 확인할 수
          있다. 마지막 build stage 만 export 하는 image 와는 달리, build cache
          는 build 과정에서 만들어지는 모든 layer 를 저장하기 때문이다. build
          cache 는 그 크기 때문에 local storage 에 계속 쌓는 것은 부담스러울 수
          있는데,{" "}
          <Link href="https://docs.docker.com/build/cache/backends">
            Cache Storage Backends
          </Link>{" "}
          에서는 build cache 를 사용하거나 저장할 때 접근할 수 있는 외부
          저장소를 지정하는 방법을 안내한다.
        </p>
        <p>
          <code>RUN</code> 명령어 안에 포함된 Command 가 변경되면 layer 를 새로
          만들어야 하기에, 앞서 Image size optimization 에서 <code>RUN</code>{" "}
          명령어의 호출을 최소화했던 반면, build cache 측면에서는 layer 를
          나누는 것이 더 효율적이다. 이런 특징들로 미루어보아, build stage 가
          자주 변경될 수 있는 개발 환경에서는 layer 를 많이 생성하도록 두어
          build cache 를 최대한 활용하다가 build stage 가 확정되면 image size
          optimization 을 진행하는 것이 맞는 순서로 보인다.
        </p>

        <h2 className="tracking-tight">Others</h2>
        <h3 className="tracking-tight">Yarn Berry PnP</h3>
        <p>
          예시로 사용한 NextJS 프로젝트는 처음에는 Yarn Berry 를 패키지 매니저로
          사용하고 있었다. NextJS 의 <code>output: 'standalone'</code> 옵션과{" "}
          <code>vercel</code> 의 monorepo 빌드가 PnP 를 지원하지 않아 결국
          패키지 매니저를 PNPM 로 바꿨지만, Yarn Berry PnP 환경으로 작성했던
          Dockerfile 을 남겨본다.
        </p>
        <CodeBlock
          fileName="dockerfile"
          code={`# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app

# Set common environment variables
ENV NODE_ENV=production \\
    NEXT_TELEMETRY_DISABLED=1 \\
    PORT=3000 \\
    HOSTNAME=0.0.0.0 \\
    # Enable PnP with optimized settings
    NODE_OPTIONS="--require ./.pnp.cjs --no-warnings"

# Install only necessary dependencies for building
RUN apk add --no-cache libc6-compat && \\
    addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

# Install dependencies only when needed
FROM base AS deps

# Copy the basic yarn dependencies
COPY --chown=nextjs:nodejs .yarn ./.yarn
COPY --chown=nextjs:nodejs .pnp.* .yarnrc.yml package.json yarn.lock ./

# Copy all package.json files from workspaces to ensure proper workspace resolution
COPY --chown=nextjs:nodejs packages/config/package.json ./packages/config/package.json
COPY --chown=nextjs:nodejs packages/ui/package.json ./packages/ui/package.json
COPY --chown=nextjs:nodejs apps/web/package.json ./apps/web/package.json

# Optimize cache layers and permissions
RUN mkdir -p /app/.yarn/cache && \\
    chown -R nextjs:nodejs /app

USER nextjs
# Install the required packages needed only to run
RUN yarn workspaces focus @app/nextjs --production

# Builder stage
FROM base AS builder

# Copy only necessary files for building
COPY --chown=nextjs:nodejs turbo.json ./
COPY --from=deps --chown=nextjs:nodejs /app/.pnp* \\
                                       /app/.yarnrc.yml \\
                                       /app/package.json \\
                                       /app/yarn.lock ./

# Copy source with appropriate permissions
COPY --chown=nextjs:nodejs . .

USER nextjs

# Build with full dependencies
RUN yarn install --immutable && \\
    yarn build

# Production image
FROM base AS runner

# Copy PnP configuration and dependencies
COPY --from=deps --chown=nextjs:nodejs /app/.yarn ./.yarn
COPY --from=deps --chown=nextjs:nodejs /app/.pnp.* \\
                                       /app/.yarnrc.yml \\
                                       /app/package.json \\
                                       /app/yarn.lock ./

# Copy only the necessary Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/.next/standalone/apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./apps/web/.next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/standalone/apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/.next/standalone/apps/web/server.js"]`}
        />
        <p>
          NextJS standalone 은 node_modules 디렉토리에서 필요한 모듈을
          복사하는데, Yarn Berry PnP 로 설치한 모듈은 인식하지 못해 결국 필요한
          모듈을 따로 설치해줘야 하는 불상사가 발생한다. 위의 예시는{" "}
          <code>package.json</code> 에서 <code>devDependency</code> 로 분류된
          모듈만 제외하고 모두 설치해버린 결과, image 크기가 681MB 가
          되어버렸다. <small>next 는 pnpm 쓰자...</small>
        </p>

        <h2 className="tracking-tight">Closing</h2>
        <p>
          글 작성 시작 시점에는 layer 의 수 조절을 통해 image 의 크기를 줄이는
          것에만 집중했는데, 빌드 테스트를 자주 실행해야 하는 단계에서는 오히려
          layer 를 많이 만들어두는 것이 유리하다는 걸 알 수 있었다. Frontend
          프로젝트에서 일반적으로 제일 오래 걸리는 node modules 설치를 생략하고
          local 저장소를 참고하도록 설정해 빌드 시간을 줄일 수도 있기도 하고,
          아직 적용해보지 못한 부분들이 많다. 기회가 된다면 다른 부분들에 대한
          최적화도 진행해보고 싶다.
        </p>
      </div>
    </Fragment>
  );
}
