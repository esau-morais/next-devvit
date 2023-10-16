"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createCommunity } from "@/app/(feed)/d/create/actions";
// @ts-ignore - see https://github.com/vercel/next.js/issues/56041
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";

export function CommunityForm() {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <form action={createCommunity}>
      <Card>
        <CardHeader>
          <CardTitle>Create a Community</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <div className="relative grid gap-1">
              <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
                <span className="text-sm text-zinc-400">d/</span>
              </div>
              <Input
                id="name"
                name="name"
                className="w-[400px] pl-6"
                size={32}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button disabled={pending} onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Community"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
