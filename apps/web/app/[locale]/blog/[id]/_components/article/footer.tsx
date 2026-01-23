import { useFormatter } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import ClipboardButton from "../button/clipboard";
import FacebookShareButton from "../button/facebook";
import LinkedInShareButton from "../button/linkedin";
import XShareButton from "../button/x";

interface BlogFooterProps {
  metadata: {
    updated_at: Date;
    tags: string[];
  };
}

export default function BlogFooter({ metadata }: BlogFooterProps) {
  const f = useFormatter();

  return (
    <footer className="m-auto grid grid-cols-responsive gap-x-responsive">
      <div className="col-span-full grid w-full grid-cols-subgrid pt-8">
        <div className="col-span-full col-start-1 flex flex-col gap-8 md:col-span-8 md:col-start-3 lg:col-start-5">
          <div className="flex flex-col gap-3">
            <Separator orientation="horizontal" />
            <span className="block pt-3 text-lg">Date</span>
            <time
              className="text-sm"
              dateTime={new Date(metadata.updated_at).toISOString()}
            >
              {f.dateTime(metadata.updated_at, "long")}
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
              <ClipboardButton />
              <FacebookShareButton />
              <XShareButton />
              <LinkedInShareButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
