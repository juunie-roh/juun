"use client";

import { cn } from "@juun/ui/lib/utils";
import { Copy } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import docker from "react-syntax-highlighter/dist/esm/languages/prism/docker";
import ignore from "react-syntax-highlighter/dist/esm/languages/prism/ignore";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import pure from "react-syntax-highlighter/dist/esm/languages/prism/pure";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";

SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("docker", docker);
SyntaxHighlighter.registerLanguage("yaml", yaml);
SyntaxHighlighter.registerLanguage("ignore", ignore);
SyntaxHighlighter.registerLanguage("pure", pure);

/**
 * @see {@link https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD AVAILABLE_LANGUAGES_PRISM}
 */
type SupportedLanguage =
  | "typescript"
  | "tsx"
  | "javascript"
  | "jsx"
  | "json"
  | "bash"
  | "docker"
  | "yaml"
  | "ignore"
  | "pure"; // monospaced plain text

const languageMap: Record<string, SupportedLanguage> = {
  ts: "typescript",
  tsx: "tsx",
  js: "javascript",
  jsx: "jsx",
  json: "json",
  bash: "bash",
  sh: "bash",
  zsh: "bash",
  dockerfile: "docker",
  docker: "docker",
  dockerignore: "ignore",
  yml: "yaml",
  yaml: "yaml",
  gitignore: "ignore",
  gitattributes: "pure",
  text: "pure",
};

interface CodeBlockProps {
  id?: HTMLDivElement["id"];
  code: string;
  fileName?: string;
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
  className?: string;
  maxHeight?: string | number;
}

const CodeBlock = ({
  id,
  code,
  fileName = "file.ts",
  showLineNumbers = true,
  wrapLongLines = false,
  className,
}: CodeBlockProps) => {
  // Map language aliases to their primary type
  // Extract file extension from the last dot (.) in the filename
  const getLanguageFromFileName = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex === -1) {
      return fileName; // Default to text if no extension found
    }
    return fileName.substring(lastDotIndex + 1).toLowerCase();
  };

  // Get the file extension and normalize it to a supported language
  const fileExtension = getLanguageFromFileName(fileName);
  const normalizedLanguage = languageMap[fileExtension] || fileExtension;

  const copyToClipboard = async () => {
    try {
      // Special handling for Dockerfile to fix backslash escaping
      let textToCopy = code;
      if (normalizedLanguage === "docker") {
        // Replace double backslashes with single backslashes when copying Dockerfile code
        textToCopy = code.replace(/\\\\/g, "\\");
      }

      await navigator.clipboard.writeText(textToCopy);
      toast.success("Code copied to clipboard!", {
        id: "code-copied",
        duration: 2000,
      });
    } catch (err) {
      console.error("Failed to copy code: ", err);
      toast.error("Failed to copy code", {
        id: "code-copy-error",
        duration: 2000,
      });
    }
  };

  return (
    <div
      id={id}
      className={cn(
        "bg-background relative overflow-hidden rounded-md border shadow",
        className,
      )}
    >
      <div className="bg-muted flex items-center justify-between rounded-t-md border-b px-4 py-2">
        <div className="text-muted-foreground text-sm font-medium">
          {fileName}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 text-xs"
          onClick={copyToClipboard}
        >
          <Copy className="size-3.5" />
          <span>Copy</span>
        </Button>
      </div>

      <ScrollArea className="relative w-full">
        <div className="relative">
          <SyntaxHighlighter
            language={normalizedLanguage}
            style={oneDark}
            showLineNumbers={showLineNumbers}
            wrapLongLines={wrapLongLines}
            customStyle={{
              margin: 0,
              borderRadius: "0 0 0.375rem 0.375rem",
              textShadow: "none",
            }}
            codeTagProps={{
              className: "text-sm font-mono",
            }}
            lineNumberStyle={{
              fontSize: "0.75rem",
              opacity: 0.5,
              minWidth: "2.5rem",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export { CodeBlock, type CodeBlockProps };
