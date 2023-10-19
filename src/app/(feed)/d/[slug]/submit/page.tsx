import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function SubmitPage({
  params,
}: {
  params: { slug: string };
}) {
  const subreddit = await prisma.subreddit.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!subreddit) return notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-foreground">
            Create Post
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-secondary-foreground">
            in d/{params.slug}
          </p>
        </div>
      </div>

      <Editor />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="subreddit-post-form">
          Post
        </Button>
      </div>
    </div>
  );
}