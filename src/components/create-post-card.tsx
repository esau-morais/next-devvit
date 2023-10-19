"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Link2 } from "lucide-react";
import { UserAvatar } from "./user-avatar";
import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Route } from "next";

export function CreatePostCard({ session }: { session: Session | null }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-4 overflow-hidden rounded-t-md bg-secondary/80 shadow">
      <div className="h-full px-6 py-4 flex items-center justify-between gap-6">
        <UserAvatar
          user={{
            name: session?.user.name || null,
            image: session?.user.image || null,
          }}
        />
        <Input
          className="bg-secondary cursor-pointer"
          onClick={() => router.push((pathname + "/submit") as Route)}
          readOnly
          placeholder="Create post"
        />
        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={(pathname + "/submit") as Route}
        >
          <ImageIcon className="text-zinc-600" />
        </Link>
        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={(pathname + "/submit") as Route}
        >
          <Link2 className="text-zinc-600" />
        </Link>
      </div>
    </div>
  );
}
