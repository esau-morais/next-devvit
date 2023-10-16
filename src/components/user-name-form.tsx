"use client";

import { User } from "@prisma/client";
import { HTMLAttributes } from "react";
// @ts-ignore - see https://github.com/vercel/next.js/issues/56041
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { updateUsername } from "@/app/settings/actions";
import { Loader2 } from "lucide-react";

type UsernameFormProps = HTMLAttributes<HTMLFormElement> & {
  user: Pick<User, "id" | "username">;
};

export function UserNameForm({ className, user, ...props }: UsernameFormProps) {
  const { pending } = useFormStatus();

  return (
    <form className={cn(className)} action={updateUsername} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Your username</CardTitle>
          <CardDescription>
            Please enter a display name you are comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400">u/</span>
            </div>
            <Input id="name" name="name" className="w-[400px] pl-6" size={32} />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Change username"
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
