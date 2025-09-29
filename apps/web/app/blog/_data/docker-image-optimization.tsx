import { AspectRatio } from "@juun/ui/aspect-ratio";
import { CodeBlock } from "@juun/ui/code-block";
import { Skeleton } from "@juun/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";

export const metadata = {
  title: "Case Study: Docker Image Optimization for NextJS Monorepo",
  description:
    "NextJS monorepo 프로젝트의 Docker 이미지 크기와 빌드 성능을 최적화한 사례 연구",
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
      <h2>Docker Build</h2>
      <p>
        <Link href="https://docs.docker.com/build/concepts/overview">
          Docker Build
        </Link>{" "}
        는 client-server 아키텍쳐를 취하고 있다. 클라이언트(Buildx)가 Dockerfile
        의 내용을 interpret 해서 서버에 전달하면 서버(BuildKit)가 build 한 후
        build output 을 클라이언트에게 넘기거나{" "}
        <Link href="https://hub.docker.com">Docker Hub</Link> 같은 registry 에
        등록하는 방식이다. 여기서 주목해야 할 점은{" "}
        <Link href="https://docs.docker.com/build/building/multi-stage">
          Multi-stage
        </Link>{" "}
        이다.
      </p>

      <h2>Multi-stage</h2>
      <p>
        Dockerfile 은 일반적으로 base image 를 선택하는 명령어인{" "}
        <code>FROM</code> 으로 시작하게 되는데, 이는 곧 새로운 stage 가 시작됨을
        의미한다. <code>FROM</code> 명령어가 두 번 이상 있으면 multi-stage build
        가 되는 것이다.
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
        index 또는 string 을 받을 수 있다. <code>FROM ... AS ...</code> 명령으로
        stage 에 이름을 지정하여 접근할 수도 있고, 해당 stage 가 선언된 순서에
        따라 integer index 로 접근할 수 있다.
        <code>COPY --from</code> 은 image 에도 접근 가능하다!
      </p>
      <p>
        Docker 는 가장 마지막에 위치한 stage 를 최종 output 을 생성할 stage 로
        인식한다. 마지막이 아닌 stage 에서 실행된 내용들은 build cache 에는
        저장되지만 image 에는 포함되지 않는다.
      </p>

      <h2>Image Build Optimization</h2>
      <p>
        <Link href="https://docs.docker.com/build/building/best-practices">
          Docker Build Best Practices
        </Link>{" "}
        를 바탕으로 NextJS monorepo 프로젝트의 이미지 크기와 빌드 성능을 동시에
        최적화했다. 핵심은 cache mount, multi-stage 분리, 그리고 production
        stage 격리이다.
      </p>

      <h3>1. Cache Mount</h3>
      <p>
        BuildKit 의 cache mount 기능을 활용하여 PNPM packages 와 next build
        결과를 보존할 수 있다. 이는 docker 자체의 build cache layer 에
        명시적으로 접근 가능한 id 를 부여하고, 후에 이를 활용하는 방식이다.
      </p>
      <CodeBlock
        fileName="dockerfile"
        code={`# PNPM cache mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001,gid=1001 \\
    pnpm install --frozen-lockfile --prefer-offline

# Turborepo cache mount
RUN --mount=type=cache,id=turbo,target=/app/.turbo,uid=1001,gid=1001 \\
    pnpm build --filter=@juun/web`}
      />

      <h3>2. Multi-Stage Separation</h3>
      <p>
        Dependencies 설치와 빌드 과정을 완전히 분리하여 Docker layer caching 을
        최적화한다. 패키지 설치 과정을 선행하여 layer 로 caching 해놓으면, 소스
        코드만 변경된 프로젝트를 다시 발드할 때 의존성 설치를 건너뛸 수 있어
        빌드 시간이 크게 단축된다.
      </p>
      <CodeBlock
        fileName="dockerfile"
        code={`# deps stage - install only
FROM base AS deps
RUN apk update && \\
    apk add --no-cache libc6-compat && \\
    corepack enable && \\
    corepack prepare pnpm@latest --activate && \\
    rm -rf /var/cache/apk/*

# Copy package.json files only
COPY --chown=nextjs:nodejs package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=nextjs:nodejs apps/web/package.json ./apps/web/package.json
COPY --chown=nextjs:nodejs packages/config/*/package.json ./packages/config/*/package.json
COPY --chown=nextjs:nodejs packages/ui/package.json ./packages/ui/package.json
COPY turbo.json ./

# Install dependencies with cache mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1001,gid=1001 \\
    pnpm install --frozen-lockfile --prefer-offline`}
      />

      <h3>3. Reducing Bottlenecks</h3>
      <p>
        복사한 소스 파일들에 대한 권한 변경 작업이 30 초 이상 소요되는 것을
        발견하여
        <code>--chown</code> 옵션을 사용해 작업 지연 시간을 최소화 했다. 이처럼
        단순한 작업도 작업 시간에 큰 영향을 미칠 수 있으니, docker 의 image
        build log 를 확인하며 build 과정을 개선하는 작업이 필요하다.
      </p>
      <CodeBlock
        fileName="dockerfile"
        code={`# Builder stage - build only
FROM deps AS builder

# Copy source files with correct ownership
COPY --chown=nextjs:nodejs packages/ ./packages/
COPY --chown=nextjs:nodejs apps/web/ ./apps/web/

USER nextjs

# Build with Turborepo cache mount
RUN --mount=type=cache,id=turbo,target=/app/.turbo,uid=1001,gid=1001 \\
    pnpm build --filter=@juun/web`}
      />

      <h3>4. Complete Isolation of Production Stage</h3>
      <p>
        Production stage 에서는 기존 base 를 상속하지 않고 새로운 Alpine image
        에서부터 시작한다. 이를 통해 빌드 도구와 중간 stage 의 설정으로 인한
        파일 중복 가능성을 완전히 제거할 수 있다.
      </p>
      <CodeBlock
        fileName="dockerfile"
        code={`# Production image - fresh base for clean isolation
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \\
    NEXT_TELEMETRY_DISABLED=1 \\
    PORT=3000 \\
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && \\
    adduser --system --uid 1001 nextjs

# Copy only Next.js standalone output
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "apps/web/server.js"]`}
      />

      <h3>Optimization Result</h3>
      <p>
        이 최적화를 통해 이미지 크기를 526MB 에서 346MB 로 34% 감소시켰으며,
        중복 공간을 361MB 에서 87kB 로 99.97% 줄여 효율성 점수 99% 를 달성했다.
      </p>

      <AspectRatio
        ratio={16 / 9}
        className="mb-8 size-full overflow-hidden rounded-lg bg-gray-100"
      >
        <Suspense fallback={<Skeleton className="size-full" />}>
          <Image
            src="/images/blog/dive.png"
            alt="The result of executing dive command after optimization"
            className="mt-0 size-full object-cover"
            fill
          />
        </Suspense>
      </AspectRatio>
      <p>
        <Link href="https://github.com/wagoodman/dive">dive</Link> 툴로 확인한
        결과, 최적화 후 이미지는 346MB 로 줄어들었고 효율성 점수 99% 를
        달성했다. Fresh Alpine base 사용이 중복 제거의 핵심이었다.
      </p>
      <p>
        더 나아가서, 실행에 필요한 패키지 설치를 image 에 포함하지 않고,
        container 실행 시에 설치하도록 구성할 수도 있다. 다만 container 실행에는
        시간이 더 걸릴 수도 있다.
      </p>

      <h2>Others</h2>
      <h3>dive - Image Analysis Tool</h3>
      <p>
        Docker image layer 분석 툴인{" "}
        <Link href="https://github.com/wagoodman/dive">dive</Link> 는 image 를
        layer 단위로 탐색할 수 있어 어느 부분에서 size 를 더 줄일 수 있는지
        확인하기 쉽도록 도와준다. Image Details 항목을 살펴보면, 중복된 파일의
        크기와 어떤 파일이 중복되는지를 명확하게 보여준다. 최적화 전후 비교를
        통해 실제 개선 효과를 정량적으로 측정할 수 있어 매우 유용하다.
      </p>

      <h3>Yarn Berry PnP</h3>
      <p>
        예시로 사용한 NextJS 프로젝트는 처음에는 Yarn Berry 를 패키지 매니저로
        사용하고 있었다. NextJS 의 <code>output: "standalone"</code> 옵션과{" "}
        <code>vercel</code> 의 monorepo 빌드가 PnP 를 지원하지 않아 결국 패키지
        매니저를 PNPM 로 바꿨지만, Yarn Berry PnP 환경으로 작성했던 Dockerfile
        을 남겨본다.
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
RUN yarn workspaces focus @juun/web --production

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
        NextJS standalone 은 node_modules 디렉토리에서 필요한 모듈을 복사하는데,
        Yarn Berry PnP 로 설치한 모듈은 인식하지 못해 결국 필요한 모듈을 따로
        설치해줘야 하는 불상사가 발생한다. 위의 예시는 <code>package.json</code>{" "}
        에서 <code>devDependency</code> 로 분류된 모듈만 제외하고 모두
        설치해버린 결과, image 크기가 681MB 가 되어버렸다.{" "}
        <small>next 는 pnpm 쓰자...</small>
      </p>

      <h2>Closing</h2>
      <p>
        Docker 이미지 최적화는 단순히 크기만 줄이는 것이 아니라 빌드 성능, 캐시
        효율성, 보안까지 고려한 종합적인 접근이 필요하다는 것을 배웠다. 특히
        Yarn Berry 의 실패 경험을 통해 패키지 매니저 선택의 중요성을 깨달았고,
        PNPM + Turborepo 조합으로 최적의 결과를 얻을 수 있었다. Cache mount 와
        multi-stage 분리, 그리고 production stage 의 환경 분리가 핵심이었으며,
        최종적으로 346MB 이미지에 99% 효율성을 달성했다.
      </p>
    </Fragment>
  );
}
