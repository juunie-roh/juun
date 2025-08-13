---
title: "Yarn Berry PnP Configuration"
description: "Node package manager 로 Yarn Berry PnP 사용 및 설정하기"
date: "2025-03-25"
tags: ["Yarn Berry", "npm", "Package Manager", "PnP", "Zero-install"]
image: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgdmlld0JveD0iMCAwIDExNTQuOCA1MTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHN0eWxlPi5zdDB7ZmlsbDojZmZmfS5zdDF7ZmlsbDpyZWR9PC9zdHlsZT4KICA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzE4LjYgMjU3LjhjLTggMjcuNi0yMC44IDQ3LjYtMzUuMiA2My42VjE4MWMwLTkuNi04LjQtMTcuNi0yMS42LTE3LjYtNS42IDAtMTAuNCAyLjgtMTAuNCA2LjggMCAyLjggMS42IDUuMiAxLjYgMTIuOHY2NC40Yy00LjggMjgtMTYuOCA1NC0zMi44IDU0LTExLjYgMC0xOC40LTExLjYtMTguNC0zMy4yIDAtMzMuNiA0LjQtNTEuMiAxMS42LTgwLjggMS42LTYgMTMuMi0yMi02LjQtMjItMjEuMiAwLTE4LjQgOC0yMS4yIDE0LjggMCAwLTEzLjQgNDcuNi0xMy40IDkwIDAgMzQuOCAxNC42IDU3LjYgNDEuNCA1Ny42IDE3LjIgMCAyOS42LTExLjYgMzkuMi0yNy42VjM1MWMtMjYuNCAyMy4yLTQ5LjYgNDMuNi00OS42IDg0IDAgMjUuNiAxNiA0NiAzOC40IDQ2IDIwLjQgMCA0MS42LTE0LjggNDEuNi01Ni44VjM1NWMyMS42LTE4LjggNDQuOC00Mi40IDU4LjQtODguOC40LTEuNi40LTMuNi40LTQgMC03LjYtNy42LTE2LjQtMTQtMTYuNC00IDAtNy4yIDMuNi05LjYgMTJ6bS03Ni44IDE5OGMtNi40IDAtMTAuNC05LjYtMTAuNC0yMiAwLTI0IDguOC0zOS4yIDIxLjYtNTIuNHY0Mi44YzAgNy42IDEuNiAzMS42LTExLjIgMzEuNnoiLz4KICA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNODMzLjQgMzAxYy05LjYgMC0xMy42LTkuNi0xMy42LTE4LjR2LTY2YzAtOS42LTguNC0xNy42LTIxLjYtMTcuNi01LjYgMC0xMC40IDIuOC0xMC40IDYuOCAwIDIuOCAxLjYgNS4yIDEuNiAxMi44djYxLjZDNzg1IDI5MS40IDc3Ny44IDMwMSA3NjcgMzAxYy0xNCAwLTIyLjgtMTItMjIuOC0zMi44IDAtNTcuNiAzNS42LTgzLjYgNjYtODMuNiA0IDAgOCAuOCAxMS42LjggNCAwIDUuMi0yLjQgNS4yLTkuMiAwLTEwLjQtNy42LTE2LjgtMTguNC0xNi44LTQ4LjggMC05NS4yIDQwLjgtOTUuMiAxMDcuNiAwIDM0IDE2LjQgNjAuNCA0Ny42IDYwLjQgMTUuMiAwIDI2LjQtNy4yIDM0LjQtMTYuNCA2IDkuNiAxNi44IDE2LjQgMzAuOCAxNi40IDM0LjQgMCA1MC40LTM2IDU3LjItNjIuNC40LTEuNi40LTIuNC40LTIuOCAwLTcuNi03LjYtMTYuNC0xNC0xNi40LTQgMC04IDMuNi05LjYgMTItMy42IDE3LjYtMTAuOCA0My4yLTI2LjggNDMuMnoiLz4KICA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOTQ5IDMyNy40YzM0LjQgMCA1MC0zNiA1Ny4yLTYyLjQgMC0uOC40LTEuNi40LTIuOCAwLTcuNi03LjYtMTYuNC0xNC0xNi40LTQgMC04IDMuNi05LjYgMTItMy42IDE3LjYtMTAuNCA0My4yLTI4LjggNDMuMi0xMC44IDAtMTYtMTAuNC0xNi0yMS42IDAtNDAgMTgtODcuMiAxOC05MiAxLjYtOS4yLTE0LjQtMjIuNC0xOS4yLTIyLjRoLTIwLjhjLTQgMC04IDAtMjEuMi0xLjYtNC40LTE2LjQtMTUuNi0yMS4yLTI1LjItMjEuMi0xMC40IDAtMjAgNy4yLTIwIDE4LjQgMCAxMS42IDcuMiAyMCAxNy4yIDI1LjYtLjQgMjAuNC0yIDUzLjYtNi40IDY5LjYtMy42IDEzLjYgMTcuMiAyOCAyMi40IDExLjIgNy4yLTIzLjIgOS42LTU4IDEwLTczLjZoMzQuOGMtMTIuOCAzNC40LTIwIDYyLjgtMjAgODguNCAwIDM1LjIgMjIuNCA0NS42IDQxLjIgNDUuNnoiLz4KICA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNIDk4NC42IDE4MyBDIDk4NC42IDE3NS40IDk4MyAxNzMgOTgzIDE3MC4yIEMgOTgzIDE2Ni4yIDk4Ny44IDE2My40IDk5My40IDE2My40IEMgMTAwNi42IDE2My40IDEwMTUgMTcxLjQgMTAxNSAxODEgTCAxMDE1IDE5OSBDIDEwMjUuOCAxNzYuNiAxMDQwLjIgMTU5LjQgMTA1OS44IDE1OS40IEMgMTA4Ni42IDE1OS40IDEwOTMgMTgxLjQgMTA5MyAxOTkuOCBMIDEwOTMgMjgyLjYgQyAxMDkzIDI4Ni4yIDEwOTMgMzAxIDExMDMuNCAzMDEgQyAxMTE5LjQgMzAxIDExMjcuNiAyNzUuNCAxMTMxLjIgMjU3LjggQyAxMTMyLjggMjQ5LjQgMTEzNi44IDI0NS44IDExNDAuOCAyNDUuOCBDIDExNDcuMiAyNDUuOCAxMTU0LjggMjU0LjYgMTE1NC44IDI2Mi4yIEMgMTE1NC44IDI2Mi42IDExNTQuOCAyNjMuNCAxMTU0LjQgMjY1IEMgMTE0Ny42IDI5MS40IDExMzAuNiAzMjcuNCAxMDk2LjIgMzI3LjQgQyAxMDc1IDMyNy40IDEwNjIuNiAzMTAuMiAxMDYyLjYgMjg5LjggTCAxMDYyLjYgMjA4LjYgQyAxMDYyLjYgMTk2LjIgMTA2MS44IDE4NS44IDEwNTQuMiAxODUuOCBDIDEwNDIuNiAxODUuOCAxMDE3LjggMjIwLjIgMTAxNSAyNTEuOCBMIDEwMTUgMzEwLjIgQyAxMDE1IDMxNy44IDEwMTUuNCAzMjcuNCAxMDAzLjggMzI3LjQgQyA5OTUuOCAzMjcuNCA5ODQuNiAzMjQuNiA5ODQuNiAzMDkuOCBaIE0gMjU5IDAgQyA0MDIgMCA1MTggMTE2IDUxOCAyNTkgQyA1MTggNDAyIDQwMiA1MTggMjU5IDUxOCBDIDExNiA1MTggMCA0MDIgMCAyNTkgQyAwIDExNiAxMTYgMCAyNTkgMCBaIE0gNDM1LjIgMzM3LjUgQyA0MzMuNCAzMjMuMyA0MjEuNCAzMTMuNSA0MDYgMzEzLjcgQyAzODMgMzE0IDM2My43IDMyNS45IDM1MC45IDMzMy44IEMgMzQ1LjkgMzM2LjkgMzQxLjYgMzM5LjIgMzM3LjkgMzQwLjkgQyAzMzguNyAzMjkuMyAzMzggMzE0LjEgMzMyIDI5Ny40IEMgMzI0LjcgMjc3LjQgMzE0LjkgMjY1LjEgMzA3LjkgMjU4IEMgMzE2IDI0Ni4yIDMyNy4xIDIyOSAzMzIuMyAyMDIuNCBDIDMzNi44IDE3OS43IDMzNS40IDE0NC40IDMyNS4xIDEyNC42IEMgMzIzIDEyMC42IDMxOS41IDExNy43IDMxNS4xIDExNi41IEMgMzEzLjMgMTE2IDMwOS45IDExNSAzMDMuMiAxMTYuOSBDIDI5My4xIDk2IDI4OS42IDkzLjggMjg2LjkgOTIgQyAyODEuMyA4OC40IDI3NC43IDg3LjYgMjY4LjUgODkuOSBDIDI2MC4yIDkyLjkgMjUzLjEgMTAwLjkgMjQ2LjQgMTE1LjEgQyAyNDUuNCAxMTcuMiAyNDQuNSAxMTkuMiAyNDMuNyAxMjEuMiBDIDIzMSAxMjIuMSAyMTEgMTI2LjcgMTk0LjEgMTQ1IEMgMTkyIDE0Ny4zIDE4Ny45IDE0OSAxODMuNiAxNTAuNiBMIDE4My43IDE1MC42IEMgMTc0LjkgMTUzLjcgMTcwLjkgMTYwLjkgMTY2IDE3My45IEMgMTU5LjIgMTkyLjEgMTY2LjIgMjEwIDE3My4xIDIyMS42IEMgMTYzLjcgMjMwIDE1MS4yIDI0My40IDE0NC42IDI1OS4xIEMgMTM2LjQgMjc4LjUgMTM1LjUgMjk3LjUgMTM1LjggMzA3LjggQyAxMjguOCAzMTUuMiAxMTggMzI5LjEgMTE2LjggMzQ0LjcgQyAxMTUuMiAzNjYuNSAxMjMuMSAzODEuMyAxMjYuNiAzODYuNyBDIDEyNy42IDM4OC4zIDEyOC43IDM4OS42IDEyOS45IDM5MC45IEMgMTI5LjUgMzkzLjYgMTI5LjQgMzk2LjUgMTMwIDM5OS41IEMgMTMxLjMgNDA2LjUgMTM1LjcgNDEyLjIgMTQyLjQgNDE1LjggQyAxNTUuNiA0MjIuOCAxNzQgNDI1LjggMTg4LjIgNDE4LjcgQyAxOTMuMyA0MjQuMSAyMDIuNiA0MjkuMyAyMTkuNSA0MjkuMyBMIDIyMC41IDQyOS4zIEMgMjI0LjggNDI5LjMgMjc5LjQgNDI2LjQgMjk1LjMgNDIyLjUgQyAzMDIuNCA0MjAuOCAzMDcuMyA0MTcuOCAzMTAuNSA0MTUuMSBDIDMyMC43IDQxMS45IDM0OC45IDQwMi4zIDM3NS41IDM4NS4xIEMgMzk0LjMgMzcyLjkgNDAwLjggMzcwLjMgNDE0LjggMzY2LjkgQyA0MjguNCAzNjMuNiA0MzYuOSAzNTEuMiA0MzUuMiAzMzcuNSBaIE0gNDExLjQgMzUyLjIgQyAzOTUuNCAzNTYgMzg3LjMgMzU5LjUgMzY3LjUgMzcyLjQgQyAzMzYuNiAzOTIuNCAzMDIuOCA0MDEuNyAzMDIuOCA0MDEuNyBDIDMwMi44IDQwMS43IDMwMCA0MDUuOSAyOTEuOSA0MDcuOCBDIDI3Ny45IDQxMS4yIDIyNS4yIDQxNC4xIDIyMC40IDQxNC4yIEMgMjA3LjUgNDE0LjMgMTk5LjYgNDEwLjkgMTk3LjQgNDA1LjYgQyAxOTAuNyAzODkuNiAyMDcgMzgyLjYgMjA3IDM4Mi42IEMgMjA3IDM4Mi42IDIwMy40IDM4MC40IDIwMS4zIDM3OC40IEMgMTk5LjQgMzc2LjUgMTk3LjQgMzcyLjcgMTk2LjggMzc0LjEgQyAxOTQuMyAzODAuMiAxOTMgMzk1LjEgMTg2LjMgNDAxLjggQyAxNzcuMSA0MTEuMSAxNTkuNyA0MDggMTQ5LjQgNDAyLjYgQyAxMzguMSAzOTYuNiAxNTAuMiAzODIuNSAxNTAuMiAzODIuNSBDIDE1MC4yIDM4Mi41IDE0NC4xIDM4Ni4xIDEzOS4yIDM3OC43IEMgMTM0LjggMzcxLjkgMTMwLjcgMzYwLjMgMTMxLjggMzQ2IEMgMTMzIDMyOS43IDE1MS4yIDMxMy45IDE1MS4yIDMxMy45IEMgMTUxLjIgMzEzLjkgMTQ4IDI4OS44IDE1OC41IDI2NS4xIEMgMTY4IDI0Mi42IDE5My42IDIyNC41IDE5My42IDIyNC41IEMgMTkzLjYgMjI0LjUgMTcyLjEgMjAwLjcgMTgwLjEgMTc5LjMgQyAxODUuMyAxNjUuMyAxODcuNCAxNjUuNCAxODkuMSAxNjQuOCBDIDE5NS4xIDE2Mi41IDIwMC45IDE2MCAyMDUuMiAxNTUuMyBDIDIyNi43IDEzMi4xIDI1NC4xIDEzNi41IDI1NC4xIDEzNi41IEMgMjU0LjEgMTM2LjUgMjY3LjEgOTcgMjc5LjEgMTA0LjcgQyAyODIuOCAxMDcuMSAyOTYuMSAxMzYuNyAyOTYuMSAxMzYuNyBDIDI5Ni4xIDEzNi43IDMxMC4zIDEyOC40IDMxMS45IDEzMS41IEMgMzIwLjUgMTQ4LjIgMzIxLjUgMTgwLjEgMzE3LjcgMTk5LjUgQyAzMTEuMyAyMzEuNSAyOTUuMyAyNDguNyAyODguOSAyNTkuNSBDIDI4Ny40IDI2MiAzMDYuMSAyNjkuOSAzMTcuOSAzMDIuNiBDIDMyOC44IDMzMi41IDMxOS4xIDM1Ny42IDMyMC44IDM2MC40IEMgMzIxLjEgMzYwLjkgMzIxLjIgMzYxLjEgMzIxLjIgMzYxLjEgQyAzMjEuMiAzNjEuMSAzMzMuNyAzNjIuMSAzNTguOCAzNDYuNiBDIDM3Mi4yIDMzOC4zIDM4OC4xIDMyOSA0MDYuMiAzMjguOCBDIDQyMy43IDMyOC41IDQyNC42IDM0OSA0MTEuNCAzNTIuMiBaIi8+Cjwvc3ZnPg=="
---

## Yarn Berry?

npm(Node Package Manager)의 의존성 관리를 개선하기 위해 나온 오픈 소스 패키지 매니저로, `node_modules` 디렉토리 하위에 패키지를 관리하던 기존 방식과 달리 ZipFS(Zip File System)을 사용해 더 경량화 된 상태로 관리할 수 있고, 개발 환경을 공유할 때 패키지 설치 과정을 생략할 수 있는 Zero-install 기능을 제공한다.

`.pnp.cjs` 파일에서 모듈의 참조 방식 및 경로를 지정해주고 있기 때문에, 디스크 I/O 를 거치지 않고 모듈에 접근할 수 있어 설치 및 로드 속도에서 이점을 갖는다. 하지만 이 때문에 `node_modules` 를 통해 접근하게 되는 여러 설정들을 바꿔주어야 하는 경우가 자주 생긴다.

## Start Up

Node.js 는 14.19 / 16.9 버전 이후부터 프로젝트 별로 패키지 매니저를 지정할 수 있는 `corepack` 을 포함하고 있다. 따라서 [Yarn 공식 설치 가이드](https://yarnpkg.com/getting-started/install)에서는 이를 사용하는 방법을 안내한다.

### 1. Corepack

```bash
npm install -g corepack
```

`corepack` 이 설치되어있지 않은 경우, 설치를 진행한다.

### 2. Yarn Init

```bash
yarn init -2
```

`npm init` 명령과 같이, Yarn Berry 버전으로 패키지 매니저 초기 설정을 진행하는 명령어이다.

### 3. Set Version

```bash
yarn set version stable
```

Yarn Berry 는 지속적인 업데이트를 진행하고 있고, 자체 버전을 `.yarn/releases` 에서 별도로 관리한다. 위 명령을 실행하면 버전이 명시된 파일이 해당 경로에 생성된다.

```bash
yarn exec env
```

위 명령을 실행했을 때 환경변수 설정이 정상적으로 출력된다면 설정이 완료된 것이고, `corepack` 이 에러를 던진다면 `corepack enable yarn` 명령을 실행하고 다시 위 명령을 실행해보자.

## Configuration

npm 이 참조하는 `.npmrc` 파일처럼, Yarn 은 `.yarnrc.yml` 파일을 참조해 환경을 구성한다. 해당 파일이 다루는 모든 항목들은 [Yarn Configuration](https://yarnpkg.com/configuration/yarnrc)에서 확인할 수 있다.

### 1. `.yarnrc.yml`

```.yarnrc.yml
nodeLinker: pnp
enableGlobalCache: false
yarnPath: [path to your yarn release]
```

기본적으로 지정해줄 항목들은 위와 같다.

- `nodeLinker`: ZipFS 를 사용할 건지 지정하는 항목으로, `pnp` 로 지정하면 `.yarn/cache` 아래에 모듈들이 압축된 형태(zip)로 저장된다. 이 항목을 `node-modules` 로 지정하면 기존 npm 의 방식을 사용하게 된다.
- `enableGlobalCache`: 모듈 저장 scope 를 지정한다. 이 옵션을 지정하지 않으면 Yarn 은 모든 모듈을 글로벌 디렉토리에 저장한다. `false` 로 지정하면 모듈을 프로젝트 루트 경로의 `.yarn/cache` 하위에 저장하며, **Zero-install 을 사용하고 싶다면 필수로 지정**해주어야 하는 항목이다.
- `yarnPath`: `yarn set version` 명령을 통해 자동으로 생성되는 항목이다.

### 2. `.gitignore`

`yarn init -2` 명령을 실행하면 `.gitignore` 파일도 자동으로 생성된다.

```.gitignore
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions

# Whether you use PnP or not, the node_modules folder is often used to store
# build artifacts that should be gitignored
node_modules

# Swap the comments on the following lines if you wish to use zero-installs
# In that case, don't forget to run `yarn config set enableGlobalCache false`!
# Documentation here: https://yarnpkg.com/features/caching#zero-installs

#!.yarn/cache
.pnp.*
```

생성된 파일의 코멘트에서 확인할 수 있듯이, Zero-install 을 사용하고 싶다면 아래 두 줄의 코멘트 처리를 서로 바꿔주면 된다. (`!.yarn/cache` 는 코멘트 해제, `.pnp.*` 는 코멘트 처리)

대부분 모듈의 경우는 크기가 작아 GitHub 에도 업로드가 가능하지만, 일부 모듈의 경우 업로드 용량 제한에 걸리는 경우가 발생하기도 한다. 그럴 때는 해당 모듈만 [Git Large File Storage](https://git-lfs.com/)(git-lfs)로 관리하도록 설정하면 용량 제한을 우회해서 업로드할 수 있다.

## Editor Settings (VSCode)

VSCode 를 기준으로, PnP 는 ZipFS 를 사용하기 때문에 추가적인 설정이 필요하다. VSCode 의 다양한 extension 들은 기본적으로 `node_modules` 를 참조하기 때문이다. (typescript, eslint, prettier 등)

```bash
yarn dlx @yarnpkg/sdks vscode
```

위 명령은 VSCode 에서 필요로 하는 모듈들을 인식할 수 있도록 해주는 작업을 진행한다.

```.vscode/settings.json
{
// ...
  "prettier.prettierPath": ".yarn/sdks/prettier/index.cjs",
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  // ...
}
// 이런 경로 설정과 같은 작업을 진행한다.
```

추가로, VSCode 에 있는 [ZipFS extension](https://marketplace.visualstudio.com/items?itemName=arcanis.vscode-zipfs) 을 설치하는 것이 좋다. 이 extension 은 VSCode 에서 zip 형태 모듈의 압축을 해제하지 않고 코드를 확인할 수 있도록 지원해준다.

## Closing

Yarn Berry 는 독자적인 파일 시스템을 사용하므로써 발생하는 치명적인 단점이 존재한다. VSCode extension 을 위한 설정이 별도로 존재하는 것처럼, Dockerfile 이나 배포 환경 등에서 호환 문제를 일으킬 가능성이 높고, reference 가 적어 참고할 만한 자료가 마땅치 않다는 점이다.

특히 **Next.js** 는 빌드 과정에서 `node_modules` 를 참조해 필요 모듈을 직접 복사하거나 node.js 환경이 `.pnp.cjs` 파일을 참조하도록 따로 설정해주는 등, 추가적인 작업이 필요했다. (Vercel 의 monorepo 배포 환경에서는 해결 방법을 찾지 못했다.)

하지만 monorepo 프로젝트를 다루기 위한 명령어를 별도로 지원해주기도 하고, `node_modules` 하위에 복잡한 디렉토리 트리를 생성하지 않아서 모듈의 설치 및 삭제 과정이 빠른 것은 확실한 장점이다.

Zero-install 은 개발 환경의 모듈을 각각 설치하지 않고 공유하므로 모듈의 버전 관리를 git 에 통합할 수 있다는 점도 이점이 될 수 있다. 관련 설정들을 잘 다룰 수 있다면, Yarn Berry 를 패키지 매니저로 선택할 이유는 충분하다.
