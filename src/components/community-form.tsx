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

export function CommunityForm() {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Community</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createCommunity}>
          <div className="grid w-full items-center gap-4">
            <div>
              <p className="text-lg font-medium">Name</p>
              <p className="text-xs pb-2">
                Community names including capitalization cannot be changed.
              </p>
              <div className="relative">
                <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
                  d/
                </p>
                <Input id="name" name="name" className="pl-6" />
              </div>
            </div>
          </div>
        </form>
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
  );
}
