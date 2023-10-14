import { buttonVariants } from "@/components/ui/button";
import { UserAccountNav } from "@/components/user-account";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-background border-b z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <p className="hidden text-foreground text-sm font-medium md:block">
            Devvit
          </p>
        </Link>

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
