import { CodeBlock } from "@juun/ui/code-block";
import Link from "next/link";
import { Fragment } from "react";

export const metadata = {
  title: "Yarn Berry PnP Configuration",
  description: `Yarn Berry (Yarn 2+) 의 PnP(Plug n Play) 설정 및 개발 환경 구성하기`,
  category: "case",
  date: "2025-03-25",
  tags: [
    "Case Study",
    "Yarn Berry",
    "npm",
    "Package Manager",
    "PnP",
    "Zero-install",
  ],
  image: "/images/blog/yarn-kitten-full.png",
};

export default function Data() {
  return (
    <Fragment>
      <h2>Yarn Berry?</h2>
      <p>
        npm(Node Package Manager)의 의존성 관리를 개선하기 위해 나온 오픈 소스
        패키지 매니저로, <code>node_modules</code> 디렉토리 하위에 패키지를
        관리하던 기존 방식과 달리 ZipFS(Zip File System)을 사용해 더 경량화 된
        상태로 관리할 수 있고, 개발 환경을 공유할 때 패키지 설치 과정을 생략할
        수 있는 Zero-install 기능을 제공한다.
      </p>
      <p>
        <code>.pnp.cjs</code> 파일에서 모듈의 참조 방식 및 경로를 지정해주고
        있기 때문에, 디스크 I/O 를 거치지 않고 모듈에 접근할 수 있어 설치 및
        로드 속도에서 이점을 갖는다. 하지만 이 때문에 <code>node_modules</code>{" "}
        를 통해 접근하게 되는 여러 설정들을 바꿔주어야 하는 경우가 자주 생긴다.
      </p>

      <h2>Start Up</h2>
      <p>
        Node.js 는 14.19 / 16.9 버전 이후부터 프로젝트 별로 패키지 매니저를
        지정할 수 있는 <code>corepack</code> 을 포함하고 있다. 따라서{" "}
        <Link href="https://yarnpkg.com/getting-started/install">
          Yarn 공식 설치 가이드
        </Link>
        에서는 이를 사용하는 방법을 안내한다.
      </p>

      <h3>1. Corepack</h3>
      <CodeBlock fileName="bash" code={`npm install -g corepack`} />
      <p>
        <code>corepack</code> 이 설치되어있지 않은 경우, 설치를 진행한다.
      </p>

      <h3>2. Yarn Init</h3>
      <CodeBlock fileName="bash" code={`yarn init -2`} />
      <p>
        <code>npm init</code> 명령과 같이, Yarn Berry 버전으로 패키지 매니저
        초기 설정을 진행하는 명령어이다.
      </p>

      <h3>3. Set Version</h3>
      <CodeBlock fileName="bash" code={`yarn set version stable`} />
      <p>
        Yarn Berry 는 지속적인 업데이트를 진행하고 있고, 자체 버전을{" "}
        <code>.yarn/releases</code> 에서 별도로 관리한다. 위 명령을 실행하면
        버전이 명시된 파일이 해당 경로에 생성된다.
      </p>
      <CodeBlock fileName="bash" code={`yarn exec env`} />
      <p>
        위 명령을 실행했을 때 환경변수 설정이 정상적으로 출력된다면 설정이
        완료된 것이고, <code>corepack</code> 이 에러를 던진다면{" "}
        <code>corepack enable yarn</code> 명령을 실행하고 다시 위 명령을
        실행해보자.
      </p>

      <h2>Configuration</h2>
      <p>
        npm 이 참조하는 <code>.npmrc</code> 파일처럼, Yarn 은{" "}
        <code>.yarnrc.yml</code> 파일을 참조해 환경을 구성한다. 해당 파일이
        다루는 모든 항목들은{" "}
        <Link href="https://yarnpkg.com/configuration/yarnrc">
          Yarn Configuration{" "}
        </Link>
        에서 확인할 수 있다.
      </p>
      <h3>
        1. <code>.yarnrc.yml</code>
      </h3>
      <CodeBlock
        fileName=".yarnrc.yml"
        code={`nodeLinker: pnp
enableGlobalCache: false
yarnPath: [path to your yarn release]`}
      />
      <p>기본적으로 지정해줄 항목들은 위와 같다.</p>
      <ul>
        <li>
          <code>nodeLinker</code>: ZipFS 를 사용할 건지 지정하는 항목으로,{" "}
          <code>pnp</code> 로 지정하면 <code>.yarn/cache</code> 아래에 모듈들이
          압축된 형태(zip)로 저장된다. 이 항목을 <code>node-modules</code> 로
          지정하면 기존 npm 의 방식을 사용하게 된다.
        </li>
        <li>
          <code>enableGlobalCache</code>: 모듈 저장 scope 를 지정한다. 이 옵션을
          지정하지 않으면 Yarn 은 모든 모듈을 글로벌 디렉토리에 저장한다.{" "}
          <code>false</code> 로 지정하면 모듈을 프로젝트 루트 경로의{" "}
          <code>.yarn/cache</code> 하위에 저장하며,{" "}
          <b className="text-lg">Zero-install 을 사용하고 싶다면 필수로 지정</b>
          해주어야 하는 항목이다.
        </li>
        <li>
          <code>yarnPath</code>: <code>yarn set version</code> 명령을 통해
          자동으로 생성되는 항목이다.
        </li>
      </ul>

      <h3>
        2. <code>.gitignore</code>
      </h3>
      <p>
        <code>yarn init -2</code> 명령을 실행하면 <code>.gitignore</code> 파일도
        자동으로 생성된다.
      </p>
      <CodeBlock
        fileName=".gitignore"
        code={`.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# Whether you use PnP or not, the node_modules folder is often used to store
# build artifacts that should be gitignored
node_modules

# Swap the comments on the following lines if you wish to use zero-installs
# In that case, don't forget to run \`yarn config set enableGlobalCache false\`!
# Documentation here: https://yarnpkg.com/features/caching#zero-installs

#!.yarn/cache
.pnp.*
`}
      />
      <p>
        생성된 파일의 코멘트에서 확인할 수 있듯이, Zero-install 을 사용하고
        싶다면 아래 두 줄의 코멘트 처리를 서로 바꿔주면 된다. (
        <code>!.yarn/cache</code> 는 코멘트 해제, <code>.pnp.*</code> 는 코멘트
        처리)
      </p>
      <p>
        대부분 모듈의 경우는 크기가 작아 GitHub 에도 업로드가 가능하지만, 일부
        모듈의 경우 업로드 용량 제한에 걸리는 경우가 발생하기도 한다. 그럴 때는
        해당 모듈만{" "}
        <Link href="https://git-lfs.com/">Git Large File Storage</Link>
        (git-lfs)로 관리하도록 설정하면 용량 제한을 우회해서 업로드할 수 있다.
      </p>

      <h2>Editor Settings (VSCode)</h2>
      <p>
        VSCode 를 기준으로, PnP 는 ZipFS 를 사용하기 때문에 추가적인 설정이
        필요하다. VSCode 의 다양한 extension 들은 기본적으로{" "}
        <code>node_modules</code> 를 참조하기 때문이다. (typescript, eslint,
        prettier 등)
      </p>
      <CodeBlock fileName="bash" code={`yarn dlx @yarnpkg/sdks vscode`} />
      <p>
        위 명령은 VSCode 에서 필요로 하는 모듈들을 인식할 수 있도록 해주는
        작업을 진행한다.
      </p>
      <CodeBlock
        fileName=".vscode/settings.json"
        code={`{
// ...
  "prettier.prettierPath": ".yarn/sdks/prettier/index.cjs",
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  // ...
}
// 이런 경로 설정과 같은 작업을 진행한다.
`}
      />
      <p>
        추가로, VSCode 에 있는{" "}
        <Link href="https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs">
          ZipFS extension
        </Link>{" "}
        을 설치하는 것이 좋다. 이 extension 은 VSCode 에서 zip 형태 모듈의
        압축을 해제하지 않고 코드를 확인할 수 있도록 지원해준다.
      </p>

      <h2>Closing</h2>
      <p>
        Yarn Berry 는 독자적인 파일 시스템을 사용하므로써 발생하는 치명적인
        단점이 존재한다. VSCode extension 을 위한 설정이 별도로 존재하는 것처럼,
        Dockerfile 이나 배포 환경 등에서 호환 문제를 일으킬 가능성이 높고,
        reference 가 적어 참고할 만한 자료가 마땅치 않다는 점이다.
      </p>
      <p>
        특히 <b>Next.js</b> 는 빌드 과정에서 <code>node_modules</code> 를 참조해
        필요 모듈을 직접 복사하거나 node.js 환경이 <code>.pnp.cjs</code> 파일을
        참조하도록 따로 설정해주는 등, 추가적인 작업이 필요했다. (Vercel 의
        monorepo 배포 환경에서는 해결 방법을 찾지 못했다.)
      </p>
      <p>
        하지만 monorepo 프로젝트를 다루기 위한 명령어를 별도로 지원해주기도
        하고, <code>node_modules</code> 하위에 복잡한 디렉토리 트리를 생성하지
        않아서 모듈의 설치 및 삭제 과정이 빠른 것은 확실한 장점이다.
      </p>
      <p>
        Zero-install 은 개발 환경의 모듈을 각각 설치하지 않고 공유하므로 모듈의
        버전 관리를 git 에 통합할 수 있다는 점도 이점이 될 수 있다. 관련
        설정들을 잘 다룰 수 있다면, Yarn Berry 를 패키지 매니저로 선택할 이유는
        충분하다.
      </p>
    </Fragment>
  );
}
