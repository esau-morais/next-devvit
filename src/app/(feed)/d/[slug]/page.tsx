import Feed from "@/components/feed";
import { getAuthSession } from "@/lib/auth";
import { LIMIT } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type SubdevvitPageProps = {
  params: {
    slug: string;
  };
};

export default async function SubdevvitPage({ params }: SubdevvitPageProps) {
  const { slug } = params;

  const session = await getAuthSession();

  const subdevvit = await prisma.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: LIMIT,
      },
    },
  });

  if (!subdevvit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        d/{subdevvit.name}
      </h1>
      <Feed initialPosts={subdevvit.posts} subdevvitName={subdevvit.name} />
    </>
  );
}
