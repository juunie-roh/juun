"use client";

import { Badge } from "@juun/ui/badge";
import { Button } from "@juun/ui/button";
import { LogoAvatar } from "@juun/ui/logo-avatar";
import { Separator } from "@juun/ui/separator";
import { Link } from "lucide-react";
import { toast } from "sonner";

import { formatDateSafe } from "@/utils/date";

import { BlogMetadata } from "../_utils/post";

export default function BlogFooter({ metadata }: { metadata: BlogMetadata }) {
  return (
    <section className="m-auto grid grid-cols-responsive gap-x-responsive px-4">
      <div className="col-span-full grid w-full grid-cols-subgrid px-4 pt-8">
        <div className="col-span-full col-start-1 flex flex-col gap-8 md:col-span-8 md:col-start-3 lg:col-start-5">
          <div className="flex flex-col gap-3">
            <Separator orientation="horizontal" />
            <p className="pt-3 text-lg">Date</p>
            <p className="text-sm">{formatDateSafe(metadata.date, true)}</p>
          </div>
          {metadata.tags && (
            <div className="flex flex-col gap-3">
              <Separator orientation="horizontal" />
              <p className="pt-3 text-lg">Tags</p>
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
            <p className="pt-3 text-lg">Share article</p>
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
    </section>
  );
}
