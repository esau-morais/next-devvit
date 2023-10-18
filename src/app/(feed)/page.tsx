import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { CustomFeed } from "./_components/custom-feed";
import { MainFeed } from "./_components/main-feed";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function HomePage() {
  const session = await getAuthSession();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {session ? <CustomFeed /> : <MainFeed />}

        <Card>
          <CardHeader>
            <CardTitle>Home</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Your personal Devvit frontpage. Come here to check in with your
              favorite communities.
            </p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href={`/d/create`}
            >
              Create Community
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
