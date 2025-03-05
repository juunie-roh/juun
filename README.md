# Juun

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### This Project is using

- [Next.js](https://nextjs.org) with App Router and Page Router support
- [Yarn Berry](https://yarnpkg.com/) PnP as a node package manager
- Type checking [TypeScript](https://www.typescriptlang.org)
- Integrate with [Tailwind CSS](https://tailwindcss.com) and [shadcn/ui](https://ui.shadcn.com/)
- Linter with [ESLint](https://eslint.org) (default NextJS, NextJS Core Web Vitals, Tailwind CSS)
- Code Formatter with [Prettier](https://prettier.io)
- Husky for Git Hooks
- Lint-staged for running linters on Git staged files
- Lint git commit with [commitlint](https://commitlint.js.org/)
- Write standard compliant commit messages with Commitizen
- Unit Testing with Jest and React Testing Library
- Run tests on pull request with GitHub Actions
- Automatic changelog generation with Semantic Release
- Absolute Imports using `@` prefix
- Global State Management with [zustand](https://zustand.docs.pmnd.rs/)
- Storybook for UI development
- PRs & Conventional Commit Ruleset applied from [ruleset-recipes](https://github.com/github/ruleset-recipes)

## Deployment Strategy

### Branch Structure

This repository uses a specific branch structure for deployment:

- `main`: Main development branch - all feature development and PRs should target this branch
- `vercel`: Deployment branch - **DO NOT** directly push or create PRs to this branch

### Vercel Branch

The `vercel` branch is automatically synchronized from `main` through GitHub Actions.
It's specifically configured for Vercel deployment with the proper settings for the monorepo structure.

#### 🛑 Important:

- Never create pull requests targeting the `vercel` branch
- Never push directly to the `vercel` branch
- All changes should go through `main` and will be automatically synced to `vercel`

The `vercel` branch is protected and can only be updated through the automated GitHub Actions workflow.