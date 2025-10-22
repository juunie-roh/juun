# CodeQL Configuration

This directory contains custom CodeQL configuration files to help the security scanner understand our custom sanitization functions.

## Overview

GitHub's CodeQL security scanner uses static analysis to detect potential security vulnerabilities. However, it doesn't automatically recognize custom sanitization functions. This configuration teaches CodeQL about our security utilities.

## Files

### `extensions.yml`

Defines custom sanitizers that CodeQL should recognize as safe:

- `safeUrl` from `apps/web/utils/security.ts` - URL sanitizer that prevents XSS attacks

### `custom-queries.ql`

Custom CodeQL query that defines taint-tracking rules for our sanitizers. This query:

1. Identifies sources of user input (RemoteFlowSource)
2. Identifies sinks where XSS can occur (href attributes)
3. Marks `safeUrl()` return values as sanitized barriers

### `javascript-queries.qls`

Query suite that extends the default security queries with our custom configurations.

## How It Works

When CodeQL scans the codebase:

1. It detects data flowing from user input to href attributes
2. It checks if the data passes through `safeUrl()`
3. If yes, it recognizes the data as sanitized and doesn't flag it as a vulnerability

## The safeUrl Function

Located at `apps/web/utils/security.ts`, this function:

- Blocks dangerous protocols: `javascript:`, `data:`, `vbscript:`, `file:`, `about:`
- Handles URL encoding to prevent bypass attempts
- Allows safe protocols: `http:`, `https:`, `mailto:`, relative paths
- Returns `null` for dangerous URLs

### Test Coverage

Comprehensive tests are available at `apps/web/utils/security.test.ts` covering:

- ✅ Valid URLs (https, http, mailto, relative paths)
- ✅ XSS attack prevention (javascript:, data:, vbscript:, etc.)
- ✅ Encoded attack vectors (javascript%3A, etc.)
- ✅ Edge cases (empty strings, non-strings, whitespace)
- ✅ Real-world attack vectors (obfuscation, null bytes)
- ✅ Use case validation (blog/portfolio URLs)

Run tests with:

```bash
pnpm --filter @juun/web test security.test.ts
```

## False Positives

If CodeQL flags a use of `safeUrl()` as vulnerable, it's likely a false positive. The configuration in this directory should prevent this, but if it still occurs:

1. Verify `safeUrl()` is being called correctly
2. Check that the return value is being used (not bypassed)
3. Ensure CodeQL is using this configuration
4. If confirmed safe, dismiss the alert with reason: "False positive - sanitized by safeUrl()"

## References

- [CodeQL documentation](https://codeql.github.com/docs/)
- [Defining custom sanitizers](https://codeql.github.com/docs/writing-codeql-queries/creating-path-queries/)
- [XSS prevention in Next.js](https://nextjs.org/docs/app/building-your-application/configuring/security)

## Maintenance

When adding new sanitization functions:

1. Add them to `extensions.yml`
2. Update `custom-queries.ql` with appropriate taint-tracking rules
3. Add comprehensive tests to verify behavior
4. Document in this README
