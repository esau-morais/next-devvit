"use client";

import { ExtendedPost } from "@/@types/post";
import { useSession } from "next-auth/react";
import { Post } from "./post";

type FeedProps = {
  initialPosts: ExtendedPost[];
  subdevvitName?: string;
};

export default function Feed({ initialPosts, subdevvitName }: FeedProps) {
  const { data: session } = useSession();

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {initialPosts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") return acc + 1;
          if (vote.type === "DOWN") return acc - 1;
          return acc;
        }, 0);

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user.id,
        );

        return (
          <li key={post.id}>
            <Post
              post={post}
              commentAmt={post.comments.length}
              subredditName={post.subreddit.name}
              votesAmt={votesAmt}
              currentVote={currentVote}
            />
          </li>
        );
      })}
    </ul>
  );
}
