"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { HTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Loader2 } from "lucide-react";

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGitHub = async () => {
    setIsLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      alert("There was an error logging in with GitHub");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGitHub}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="h-4 w-4 mr-2" />
        )}
        GitHub
      </Button>
    </div>
  );
}
