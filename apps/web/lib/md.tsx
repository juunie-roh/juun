import { AspectRatio } from "@juun/ui/aspect-ratio";
import { CodeBlock } from "@juun/ui/code-block";
import { Prose } from "@juun/ui/prose";
import { Skeleton } from "@juun/ui/skeleton";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { type ComponentProps, type ReactElement, Suspense } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeReact, { type Components } from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { getImageDimensions } from "@/utils/image";
import { safeUrl } from "@/utils/security";

namespace md {
  /**
   * Parsed markdown content
   */
  export interface ParsedContent {
    /** Rendered React content */
    content: ReactElement;
    /** Frontmatter data */
    data: Record<string, any>;
  }

  /**
   * Custom component mappings for HTML elements
   * Maps standard HTML elements to Next.js and custom components
   */
  const components: Partial<Components> = {
    // Map <a> to Next.js Link for client-side navigation
    a: ({ href, children, ...props }: ComponentProps<"a">) => {
      const safeHref = safeUrl(href);
      if (!safeHref) return <a {...props}>{children}</a>;

      // External links use regular <a> tag with security attributes
      if (safeHref.startsWith("http")) {
        return (
          <a
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        );
      }

      // Internal links use Next.js Link for client-side navigation
      return (
        <Link href={safeHref} {...props}>
          {children}
        </Link>
      );
    },

    // Map <img> to Next.js Image with AspectRatio wrapper for optimization
    img: async ({
      src,
      alt,
      width,
      height,
      ...props
    }: ComponentProps<"img">) => {
      const safeSrc = safeUrl(String(src));
      if (!safeSrc) return null;

      // Get dimensions from attributes or by probing the image
      let imgWidth = width ? Number(width) : null;
      let imgHeight = height ? Number(height) : null;

      // If dimensions not provided, try to get them automatically
      if (!imgWidth || !imgHeight) {
        const dimensions = await getImageDimensions(safeSrc);
        if (dimensions) {
          imgWidth = dimensions.width;
          imgHeight = dimensions.height;
        }
      }

      // If we have dimensions, use Next.js Image with AspectRatio wrapper
      if (imgWidth && imgHeight) {
        const ratio = imgWidth / imgHeight;

        return (
          <AspectRatio
            ratio={ratio}
            className="size-full overflow-hidden rounded-lg bg-muted"
          >
            <Suspense fallback={<Skeleton className="size-full" />}>
              <Image
                src={safeSrc}
                alt={String(alt || "")}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </Suspense>
          </AspectRatio>
        );
      }

      // Fallback to regular img tag if dimensions unavailable
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={safeSrc} alt={String(alt || "")} {...props} />;
    },

    // Map <pre> to custom CodeBlock component
    pre: ({ children, ...props }: ComponentProps<"pre">) => {
      // Extract code content from <code> child
      if (
        typeof children === "object" &&
        children !== null &&
        "props" in children
      ) {
        const codeProps = children.props as {
          className?: string;
          children?: string;
        };
        const className = codeProps.className || "";
        const language = className.replace(/language-/, "");
        const code = codeProps.children || "";

        return <CodeBlock code={String(code)} fileName={language || "text"} />;
      }

      // Fallback to regular <pre> if structure is unexpected
      return <pre {...props}>{children}</pre>;
    },
  };

  /**
   * Parse markdown and convert to React elements (server-side)
   *
   * Uses the unified/remark/rehype ecosystem for robust markdown processing.
   * The pipeline: markdown → mdast → hast → React JSX
   */
  export async function parse(markdown: string): Promise<ParsedContent> {
    const { data, content: markdownContent } = matter(markdown);

    // Process markdown through unified pipeline
    const file = await unified()
      .use(remarkParse) // Parse markdown to mdast (Markdown AST)
      .use(remarkGfm) // Support GitHub Flavored Markdown (tables, strikethrough, etc.)
      .use(remarkRehype) // Convert mdast to hast (HTML AST)
      .use(rehypeReact, {
        // Convert hast to React elements using modern JSX runtime
        Fragment,
        jsx,
        jsxs,
        // Custom component mappings
        components,
      })
      .process(markdownContent);

    return {
      content: file.result as ReactElement,
      data,
    };
  }

  /**
   * Render parsed markdown content with Prose styling (client-side)
   *
   * The content is already converted to React elements by rehype-react,
   * so we simply render it inside the Prose wrapper for styling.
   */
  export function render(parsed: ParsedContent): ReactElement {
    return <Prose>{parsed.content}</Prose>;
  }
}

export default md;
