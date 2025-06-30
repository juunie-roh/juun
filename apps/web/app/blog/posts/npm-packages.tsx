import { AspectRatio } from "@pkg/ui/aspect-ratio";
import { CodeBlock } from "@pkg/ui/code-block";
import { Skeleton } from "@pkg/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Fragment, Suspense } from "react";

import { BlogHeader, BlogHeaderSkeleton } from "@/components/blog/header";

export const metadata = {
  title: "Publishing NPM Package with ChangeSet",
  description:
    "GitHub Actions, ChangeSet, TypeDoc 으로 자동화된 개발 환경 구축하기",
  date: "2025-04-10",
  tags: [
    "npm",
    "Changesets",
    "CI/CD",
    "GitHub Actions",
    "GitHub Pages",
    "release",
    "publish",
    "TypeScript",
    "TypeDoc",
  ],
  image:
    "https://raw.githubusercontent.com/npm/logos/cc343d8c50139f645d165aedfe4d375240599fd1/npm%20logo/npm-logo-red.svg",
};

export default function NpmPublish() {
  return (
    <Fragment>
      <Suspense fallback={<BlogHeaderSkeleton />}>
        <BlogHeader metadata={metadata} />
      </Suspense>
      {metadata.image && (
        <AspectRatio ratio={16 / 9} className="mb-8 size-full rounded-lg">
          <Suspense fallback={<Skeleton className="size-full" />}>
            <Image
              src={metadata.image}
              alt={metadata.title}
              className="size-full object-contain p-8"
              fill
            />
          </Suspense>
        </AspectRatio>
      )}
      <div className="prose mt-8 max-w-none text-primary">
        <h2 className="tracking-tight">Opening</h2>
        <p>
          사내 프로젝트에서 <Link href="https://cesium.com/">CesiumJS</Link> 를
          보다 편하게 사용하기 위해서 만들었던 여러 기능들을 개인적으로
          정리해보려다가 Browser Compatibility(브라우저 호환성), Documentation,
          Versioning, CI/CD, npm publishing, 마지막으로 GitHub Pages Deployment
          까지. 생각나는 가능한 모든 자동화를 도입해서 개발 환경을 구축한 기록을
          남겨본다.
        </p>

        <h2 className="tracking-tight">Package Metadata</h2>
        <p>
          일반적인 프론트 프로젝트의 경우는 패키지를 다운 받아 사용하기만 하고
          배포하지 않기 때문에 <code>package.json</code> 에 명시되는 metadata 를
          신경 쓸 일이 없다. 하지만 npm 패키지 형태로 관리 및 사용하려는 경우는
          패키지의 이름부터 버전, exports 등 구체적으로 명시해줘야 하는 metadata
          가 많다.{" "}
          <Link href="https://docs.npmjs.com/cli/v11/configuring-npm/package-json">
            Configuring npm
          </Link>{" "}
          에서 모든 항목을 확인할 수 있다.
        </p>
        <CodeBlock
          fileName="package.json"
          code={`{
  "name": "@(scope)/(package-name)",
  "version": "0.0.2",
  "description": "package description",
  "keywords": [],
  "repository": {
    "type": "git",
    "url": "(github path)"
  },
  "homepage": "(homepage path)",
  "bugs": {
    "url": "(bug/issues report page path)"
  },
  "license": "MIT",
  "author": {
    "name": "(author name)",
    "url": "(author homepage path)"
  },
  "peerDependencies": {
    "cesium": "^1"
  },
}`}
        />
        <p>필수로 명시해야 하는 것은 다음 두 가지가 있다.</p>
        <ul>
          <li>
            name: 패키지의 이름으로, npm 에 publish 하기 위해서는 사용할 npm
            계정에 publish 권한이 있는{" "}
            <Link href="https://docs.npmjs.com/cli/v11/using-npm/scope">
              scope
            </Link>{" "}
            를 지정해주어야 한다. 개인 계정의 경우, username 과 같은 scope 는
            기본으로 권한이 주어진다.
          </li>
          <li>
            version: npm 은{" "}
            <Link href="https://www.npmjs.com/package/semver?activeTab=readme">
              semver
            </Link>{" "}
            모듈로 패키지의 버전을 판단하기 때문에 형식을 맞춰주어야 한다. 이는{" "}
            <Link href="https://semver.org/">Semantic Versioning</Link> 규칙을
            따르는 것으로, 이 프로젝트에서는 후술할 Changesets versioning 툴을
            사용했다.
          </li>
        </ul>

        <h2 className="tracking-tight">Project Configurations</h2>
        <h3 className="tracking-tight">TypeScript - Builds</h3>
        <p>
          기본 컴파일러인 <code>tsc</code> 를 사용해도 되지만,{" "}
          <Link href="https://tsup.egoist.dev/">
            <code>tsup</code>
          </Link>{" "}
          이라는 번들러를 이용했다. (<s>그냥</s>)
        </p>
        <CodeBlock
          fileName="tsup.config.js"
          code={`import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  esbuildOptions(options) {
    options.platform = 'neutral';
  },
  format: ['cjs', 'esm'],
  minify: true,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    };
  },
  sourcemap: false,
});
`}
        />

        <p>
          Common JS 와 Module JS (ESM) 두 가지 방식으로 컴파일을 진행했고, dts
          파일을 제공하기 때문에 minify 를 true 로 설정했다. dist 디렉토리에
          생성되는 빌드 결과물을 <code>package.json</code> 에서 제대로
          명시해주어야 한다.
        </p>
        <CodeBlock
          id="package-json-structure"
          fileName="package.json"
          code={`{
// ...
  "type": "module",
  "main": "dist/index.js",
  "module": "dist/index.js",
  "files": [
    "dist"
  ],
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    }
  },
// ...
}`}
        />
        <ul>
          <li>
            type: 패키지 내에서 JavaScript 의 기본 확장자인 <code>.js</code> 를
            어떻게 취급할지를 명시한다. module 이면 esm, common 이면 common js
            로 취급한다.
          </li>
          <li>main: 패키지의 기본 primary entry point.</li>
          <li>
            module: 패키지를 esm 방식으로 접근할 때의 primary entry point.
          </li>
          <li>
            files: 패키지가 포함하는 파일들로, <code>.gitignore</code> 의
            반대격.
          </li>
          <li>
            types: 패키지에 대한 type 을 추론할 수 있는 declaration (dts) 파일.
          </li>
          <li>
            exports: main 에서 명시한 entry point 를 상세하게 나눠 명시하는
            항목으로, require(Common JS) 로 접근하면 <code>.cjs</code> 파일을
            참고하게 하는 것 등이 가능.
          </li>
        </ul>

        <h3 className="tracking-tight">TypeScript - Documentation</h3>
        <p>
          JavaScript 는 JSDoc 이라는 documentation 양식이 있다. TypeScript
          에서도 동일한 양식을 사용한다.
        </p>
        <CodeBlock
          fileName="tsdoc.ts"
          code={`// TypeScript Documentation Example
/**
 * Abstract class that enhances Cesium collection objects with tagging functionality.
 * This class provides a consistent API for working with different types of Cesium collections
 * and allows grouping and manipulating collection items by custom tags.
 *
 * @abstract
 * @template C - The type of Cesium collection (e.g., EntityCollection, PrimitiveCollection)
 * @template I - The type of items in the collection (e.g., Entity, Primitive)
 * @example
 * ...
 */
abstract class Collection<C, I>{
  ...
}`}
        />
        <p>
          <Link href="https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html">
            TypeScript JSDoc
          </Link>{" "}
          에서 지원 및 미지원 태그를 확인할 수 있다. TypeScript 는 JSDoc 의 타입
          표시를 생략한다. JSDoc 을 잘 작성하면 IDE 내에서 설명을 제공할 수 있을
          뿐만 아니라, API 문서까지도 자동화해서 제공할 수 있다.
        </p>
        <p>
          <Link href="https://typedoc.org/index.html">TypeDoc</Link> 은 대표적인
          Documentation Tool 중 하나이다. JSDoc 형태의 Comment 들을 정적으로
          serve 할 수 있는 <code>html</code> 로 작성해준다. MarkDown(MD) 형식도
          지원하기에 API 문서를 어떻게 제공할 지에 따라 선택할 수 있다.{" "}
          <code>typedoc.json</code> 로 Configuration 을 설정할 수 있으며{" "}
          <Link href="https://typedoc.org/documents/Themes.html">
            Typedoc Themes
          </Link>{" "}
          에서는 사용할 수 있는 스타일 테마 플러그인과 커스텀 테마 작성 방법에
          대해 안내하고 있다.
        </p>
        <CodeBlock
          fileName="typedoc.json"
          code={`{
  "$schema": "https://typedoc.org/schema.json",
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "name": "Name of this document",
  "includeVersion": true,
  "excludePrivate": false,
  "excludeProtected": false,
  "excludeExternals": true,
  "readme": "README.md",
  "githubPages": true,
  "categorizeByGroup": true,
  "navigationLinks": {
    "GitHub": "Link to your project",
    "NPM": "Link to your package"
  }
}`}
        />
        <p>
          위 설정대로 local 환경에서 <code>typedoc</code> 을 실행하면{" "}
          <code>src/index.ts</code> 파일이 포함하고 있는 코드의 JSDoc 에 대한
          API Document 가 <code>docs</code> 디렉토리 하위에 생성된다. 그 중{" "}
          <code>index.html</code> 을{" "}
          <Link href="https://marketplace.visualstudio.com/items/?itemName=ritwickdey.LiveServer">
            라이브 서버
          </Link>{" "}
          로 실행해보면{" "}
          <Link href="https://juunie-roh.github.io/cesium-utils/">
            Cesium Utils
          </Link>{" "}
          와 같이 API Document 가 구성되는 것을 확인해볼 수 있다.
        </p>

        <h3 className="tracking-tight">Versioning - Changesets</h3>
        <p>
          npm 의 Semantic Versioning 규칙을 따르면서 사용자들에게 패치노트 같은
          정보를 제공해주기 위한 versioning 툴을 사용했다. 배포 및 Documentation
          자동화를 위한 GitHub Actions 의 핵심 trigger 역할을 하도록 설계해서
          이벤트 시점을 조절하는 것이 중요했는데, 이렇게 설계한 것에는 몇 가지
          이유가 있다.
        </p>
        <ul>
          <li>
            npm publish 는 <code>package.json</code> 의 name 과 version 이
            primary key 로 작용한다. 같은 패키지 이름으로 이미 존재하는
            버전으로는 다시 publish 할 수 없다.
          </li>
          <li>
            Changeset 은{" "}
            <Link href="https://github.com/changesets/action">
              Changeset Actions
            </Link>{" "}
            를 통해 <code>CHANGELOG.md</code> 의 내용을 수정할 수 있는데,
            Changeset 의 타입
            <small>(patch/minor/major)</small> 에 따라 <code>package.json</code>{" "}
            의 version 을 함께 업데이트 하는 Pull Request 를 생성하도록 설정할
            수 있다.
          </li>
          <li>
            <code>typedoc</code> 으로 생성한 API Documentation 에는 패키지의
            version 을 표시할 수 있는데, 이는 TypeDoc 실행 시점의{" "}
            <code>package.json</code> version 을 기준으로 한다.
          </li>
        </ul>

        <p>
          이런 점들을 고려해서 배포 과정을 자동화하되, 다음과 같은 배포 process
          를 설계했다.
        </p>

        <ol>
          <li>
            코드의 수정과 함께 주요 변경점을 담은 changeset 을 만들어 commit
            한다.
          </li>
          <li>Changeset action 이 version update PR 을 생성한다. </li>
          <li>Version Update PR 을 Repository Owner 가 수동으로 승인한다.</li>
          <li>
            <code>CHANGELOG.md</code> 와 <code>package.json</code> 의 변화를
            감지해 GitHub Release 를 생성하고, npm 에 publish 한 뒤, API
            Document 를 업데이트 하고 GitHub Pages 에 Deploy 한다.
          </li>
        </ol>
        <p>
          이는 배포에 대한 의사 결정 단계를 상정하여 Repository Owner 의 PR 수락
          시점을 최종 배포 시점으로 설정한 프로세스이다. 이런 workflow 를
          구현하기 위해 Changeset action 에 포함된 npm publish 단계를 생략하고,
          PR 수락 이후 npm publish 를 진행하도록 구성했다.
        </p>

        <CodeBlock
          fileName="changesets.yml"
          code={`name: Changesets

on:
  push:
    branches:
      - main

env:
  CI: true
  HUSKY: 0 # Disable husky hit hooks

jobs:
  version:
    timeout-minutes: 15
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    outputs:
      has_changes: \${{ steps.changesets.outputs.hasChangesets }}
      pr_number: \${{ steps.changesets.outputs.pullRequestNumber }}
    steps:
      - name: Checkout code repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      # This project uses pnpm as a package manager.
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
      
      - name: Setup node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install
      
      - name: Disable Git hooks
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          
          # Disable husky git hooks
          mkdir -p /tmp/empty-hooks
          git config --global core.hooksPath /tmp/empty-hooks
      
      - name: Create and publish versions
        id: changesets
        uses: changesets/action@v1
        with:
          commit: "Release version update"
          title: "Release version update"
          # You can publish to npm here
          publish: "pnpm build"
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          # NPM_TOKEN: \${{ secrets.NPM_TOKEN }} # required for npm publish
          HUSKY: 0
      
      - name: Generate documentation for PR
        if: steps.changesets.outputs.hasChangesets == 'true'
        run: |
          echo "Changesets created a PR #\${{ steps.changesets.outputs.pullRequestNumber }}"
          
          # Get the branch name that changesets created
          CHANGESET_BRANCH=$(gh pr view \${{ steps.changesets.outputs.pullRequestNumber }} --json headRefName -q .headRefName)
          echo "Changesets branch: $CHANGESET_BRANCH"
          
          # Checkout that branch
          git fetch origin $CHANGESET_BRANCH
          git checkout $CHANGESET_BRANCH
          
          # Generate documentation
          pnpm typedoc

          # Verify docs were generated properly
          if [ ! -f "./docs/index.html" ]; then
            echo "Documentation generation failed!"
            exit 1
          fi
          
          # Commit and push the documentation changes
          git add docs/
          git commit -m "docs: Update documentation for release" || echo "No documentation changes to commit"
          git push origin $CHANGESET_BRANCH
        env:
          GITHUB_TOKEN:\${{ secrets.GITHUB_TOKEN }}
`}
        />
        <p>
          Changeset action 으로 생성한 PR 에 Documentation 변경점을 commit 하는
          과정을 추가했다. GitHub Pages Deployment 에는 영향을 주지 않지만, 해당
          페이지에 표시되는 정보와 local 소스의 docs 디렉토리 하위 정보를
          동기화하는 역할이다.
        </p>

        <CodeBlock
          fileName="release-and-publish.yml"
          code={`name: Release and Publish

on:
  push:
    branches:
      - main
    paths:
      - 'CHANGELOG.md'
      - 'package.json'
  workflow_dispatch:

jobs:
  release-and-publish:
    runs-on: ubuntu-latest
    if: contains(github.event.head_commit.message, 'Release version update')
    permissions:
      contents: write
      id-token: write
    steps:
      - name: Checkout code repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
      
      - name: Setup node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          registry-url: 'https://registry.npmjs.org'
          
      - name: Install dependencies
        run: pnpm install
      
      - name: Get package version
        id: package-version
        run: |
          PACKAGE_VERSION=$(node -p "require('./package.json').version")
          echo "version=$PACKAGE_VERSION" >> $GITHUB_OUTPUT
      
      - name: Get latest changes from CHANGELOG
        id: changelog
        run: |
          # Extract the changes for the latest version
          LATEST_CHANGES=$(sed -n "/## \${{ steps.package-version.outputs.version }}/,/## [0-9]/p" CHANGELOG.md | sed '$d' | sed '1d')
          # Store the changes in a file to preserve newlines
          echo "$LATEST_CHANGES" > latest_changes.txt
          echo "changes_file=latest_changes.txt" >> $GITHUB_OUTPUT
      
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v\${{ steps.package-version.outputs.version }}
          name: Release v\${{ steps.package-version.outputs.version }}
          body_path: \${{ steps.changelog.outputs.changes_file }}
          draft: false
          prerelease: false
          generate_release_notes: true
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      
      - name: Build package for publishing
        run: pnpm build
      
      - name: Publish to NPM registry
        run: pnpm publish --no-git-checks
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}
          HUSKY: 0

  deploy:
    permissions:
      contents: read
      pages: write
      id-token: write
    concurrency:
      group: "pages"
      cancel-in-progress: false
    needs: release-and-publish
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
      - name: Install dependencies
        run: pnpm install
      - name: Generate documentation
        run: pnpm typedoc
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './docs/'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`}
        />
        <p>
          <code>CHANGELOG.md</code> 와 <code>package.json</code> 이 변경됐을 때,
          최근 commit message 가 "Release version update" 라면 두 가지 job 이
          실행된다.
        </p>
        <ol>
          <li>
            {" "}
            <code>CHANGELOG.md</code> 에 반영된 이번 업데이트 버전에 대한 변경
            사항을 포함한 GitHub Release 를 생성하고, npm publish 를 진행한다.
          </li>
          <li>
            앞선 job 이 성공하면, API Documentation 을 최신화하고 GitHub Pages
            에 deploy 한다.
          </li>
        </ol>
        <p>
          <i>
            <b>NOTE</b>: 이 프로젝트는 <code>husky</code> 와{" "}
            <code>commitlint</code> 로 commit 메시지의 형식을 제한하고 있어
            "Release version update" 라는 메시지가 겹칠 일이 없지만, 같은 환경이
            아니라면 조건 설정에 유의해야 한다.
          </i>
        </p>

        <h2 className="tracking-tight">Closing</h2>
        <p>
          npm 패키지를 사용만 해보고 직접 올려본 것은 처음인데, 실무를
          겪어보면서 생긴 개발 업무 프로세스에 대한 개인적인 convention 을 잘
          정리해서 반영하지 않았나 싶다. Branch naming convention, branch
          protection rules 등 협업을 고려한 프로세스도 기회가 되면 설계해보고
          싶다.
        </p>
      </div>
    </Fragment>
  );
}
