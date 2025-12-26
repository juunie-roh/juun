"use client";

import type { Post } from "@juun/db/post";
import { Link } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoAvatar } from "@/components/ui/logo-avatar";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/date";

export default function BlogFooter({
  metadata,
}: {
  metadata: Omit<
    Post,
    "id" | "content" | "category" | "word_count" | "created_at"
  >;
}) {
  return (
    <footer className="m-auto grid grid-cols-responsive gap-x-responsive">
      <div className="col-span-full grid w-full grid-cols-subgrid pt-8">
        <div className="col-span-full col-start-1 flex flex-col gap-8 md:col-span-8 md:col-start-3 lg:col-start-5">
          <div className="flex flex-col gap-3">
            <Separator orientation="horizontal" />
            <span className="block pt-3 text-lg">Date</span>
            <time className="text-sm" dateTime={metadata.updated_at.toString()}>
              {formatDate(metadata.updated_at, true)}
            </time>
          </div>
          {metadata.tags && (
            <div className="flex flex-col gap-3">
              <Separator orientation="horizontal" />
              <span className="block pt-3 text-lg">Tags</span>
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Separator orientation="horizontal" />
            <span className="block pt-3 text-lg">Share article</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("URL copied to clipboard!", {
                    id: "article-copied",
                    duration: 2000,
                  });
                }}
              >
                <LogoAvatar>
                  <Link />
                </LogoAvatar>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
