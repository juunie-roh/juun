'use client';

import { cn } from '@pkg/ui/lib/utils';
import { Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { toast } from 'sonner';

import { Button } from './button';
import { ScrollArea, ScrollBar } from './scroll-area';

type SupportedLanguage =
  | 'typescript'
  | 'javascript'
  | 'json'
  | 'bash'
  | 'docker';

const languageMap: Record<string, SupportedLanguage> = {
  ts: 'typescript',
  tsx: 'typescript',
  js: 'javascript',
  jsx: 'javascript',
  json: 'json',
  bash: 'bash',
  sh: 'bash',
  zsh: 'bash',
  dockerfile: 'docker',
  docker: 'docker',
};

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  wrapLongLines?: boolean;
  className?: string;
  maxHeight?: string | number;
}

export const CodeBlock = ({
  code,
  language = 'typescript',
  showLineNumbers = true,
  wrapLongLines = false,
  className,
}: CodeBlockProps) => {
  // Map language aliases to their primary type
  const normalizedLanguage = languageMap[language.toLowerCase()] || language;

  const copyToClipboard = async () => {
    try {
      // Special handling for Dockerfile to fix backslash escaping
      let textToCopy = code;
      if (normalizedLanguage === 'docker') {
        // Replace double backslashes with single backslashes when copying Dockerfile code
        textToCopy = code.replace(/\\\\/g, '\\');
      }

      await navigator.clipboard.writeText(textToCopy);
      toast.success('Code copied to clipboard!', {
        id: 'code-copied',
        duration: 2000,
      });
    } catch (err) {
      console.error('Failed to copy code: ', err);
      toast.error('Failed to copy code', {
        id: 'code-copy-error',
        duration: 2000,
      });
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-md border bg-background shadow overflow-hidden',
        className,
      )}
    >
      <div className="flex items-center justify-between rounded-t-md border-b bg-muted px-4 py-2">
        <div className="text-sm font-medium text-muted-foreground">
          {normalizedLanguage}
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
              borderRadius: '0 0 0.375rem 0.375rem',
              textShadow: 'none',
            }}
            codeTagProps={{
              className: 'text-sm font-mono',
            }}
            lineNumberStyle={{
              fontSize: '0.75rem',
              opacity: 0.5,
              minWidth: '2.5rem',
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
