import Feed from "@/components/feed";
import { LIMIT } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function MainFeed() {
  const posts = await prisma.post.findMany({
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

  return <Feed initialPosts={posts} />;
}
