# Input Renderer

A live markdown editor with a split-pane preview. It exercises the exact
server-only markdown pipeline (`@/lib/server/md`) used by the blog and timeline,
so the preview is a faithful representation of how content will actually render.

This playground also serves as the **reference implementation** for the preview
mechanism the future CMS editor will use.

## How the preview works

The markdown pipeline is `server-only` and must stay that way (it reads files
for image dimensions, runs the unified/remark/rehype stack, and maps elements to
Next.js components). The challenge is letting a client-side editor re-render the
preview on every edit without pulling that pipeline into the client bundle.

The solution is a **Server Action that returns JSX**:

1. The client editor debounces keystrokes (500ms after typing stops).
2. It calls the `previewMarkdown` Server Action, passing the raw markdown.
3. The action runs the pipeline server-side and returns a `ReactElement`.
4. React serializes that element back over the RSC payload; the client drops it
   straight into the preview pane, custom component mappings intact.

Because the content travels in the **POST request body** (not the URL), there is
no length limit — the earlier `searchParams`-based approach capped out on long
documents and polluted browser history.

```text
Textarea (client)
  │  debounce 500ms
  ▼
previewMarkdown Server Action  ── POST body ──▶  md.parse → md.render (server-only)
  ▲                                                     │
  │  ReactElement (RSC-serialized)  ◀────────────────────┘
  ▼
MarkdownPreview (client)
```

## Files

| File | Role |
| ---- | ---- |
| `page.tsx` | Server Component. Renders the initial preview once (no flash on load) and passes it to the editor. No `searchParams`, so the route stays static under `cacheComponents`. |
| `_actions/preview-markdown.ts` | The `"use server"` action. Runs `md.parse`/`md.render` and returns `{ content, error }`. Shaped for `useActionState`. |
| `_components/markdown-input.tsx` | Client editor. Owns the textarea state, debounces edits, and drives the action via `useActionState`. |
| `_components/markdown-preview.tsx` | Client preview pane. Renders the returned JSX, shows parse errors, and dims while `isPending`. |

## Client-side details

The editor uses `useActionState` rather than a raw `fetch`:

```tsx
const [state, runPreview, isPending] = React.useActionState<PreviewState, string>(
  previewMarkdown,
  { content: initialRendered, error: null },
);
```

Two things this buys us:

- **Ordered responses.** `useActionState` serializes dispatches, so a fast edit
  followed by a slow one can never render stale output out of order.
- **Pending state.** `isPending` drives the preview's dim-while-rendering
  affordance.

The dispatch is wrapped in `React.startTransition`:

```tsx
React.startTransition(() => runPreview(value));
```

This is **required** when calling a `useActionState` dispatch programmatically
(outside a form `action` prop). Without it, React warns and — more visibly — the
update runs as a blocking synchronous swap that unmounts and rebuilds the preview
on every debounce (looks like a page reload). Inside a transition, React keeps the
current preview on screen, flips `isPending` to `true`, and swaps in the new tree
only once the server responds.

## Notes / gotchas

- **`_actions/preview-markdown.ts` must begin with `"use server"` as its literal
  first line.** Do not add `import "server-only"` above it — that both displaces
  the directive (breaking the action) and is semantically wrong: this file is
  meant to be *called from* the client. The pipeline is protected because
  `@/lib/server/md` is itself `server-only`.
- Every Server Action invocation also re-runs the page's Server Components as part
  of Next.js's action response. Here that only re-parses a constant, so it's
  cheap and the transition keeps it seamless.
