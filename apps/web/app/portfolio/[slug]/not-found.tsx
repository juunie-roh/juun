"use client";

import { Button } from "@pkg/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PortFolioItemError() {
  return (
    <article className="flex size-full items-center justify-center">
      <div className="mx-auto max-w-3xl py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tighter">
          Project Not Found
        </h2>
        <p className="mb-8 text-secondary-foreground">
          Sorry, the portfolio project you're looking for doesn't exist or has
          been removed.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 size-4" />
            Return to Portfolio
          </Link>
        </Button>
      </div>
    </article>
  );
}
