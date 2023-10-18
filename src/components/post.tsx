"use client";

import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import Link from "next/link";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type PartialVote = Pick<Vote, "type">;

type PostProps = {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmt: number;
  subredditName: string;
  currentVote?: PartialVote;
  commentAmt: number;
};

export function Post({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  subredditName,
  commentAmt,
}: PostProps) {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          {subredditName ? (
            <>
              <Link href={`/d/${subredditName}`}>d/{subredditName}</Link>
              <span className="px-1">•</span>
            </>
          ) : null}
          <span>Posted by u/{post.author.username}</span>{" "}
          {formatTimeToNow(new Date(post.createdAt))}
        </CardDescription>
        <CardTitle>
          <Link href={`/d/${subredditName}/post/${post.id}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
