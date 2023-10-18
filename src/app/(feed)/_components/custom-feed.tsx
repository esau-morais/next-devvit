import Feed from "@/components/feed";
import { getAuthSession } from "@/lib/auth";
import { LIMIT } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function CustomFeed() {
  const session = await getAuthSession();
  if (!session) return notFound();

  const followedCommunities = await prisma.subscription.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      subreddit: true,
    },
  });

  const postsByFollowedCommunities = await prisma.post.findMany({
    where: {
      subreddit: {
        name: {
          in: followedCommunities.map((sub) => sub.subreddit.name),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      subreddit: true,
    },
    take: LIMIT,
  });

  return <Feed initialPosts={postsByFollowedCommunities} />;
}
