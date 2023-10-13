import SignIn from "@/components/sign-in";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link className="inline-flex items-center" href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <SignIn />
      </div>
    </div>
  );
}
