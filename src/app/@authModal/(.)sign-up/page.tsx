import { CloseModal } from "@/components/close-modal";
import { SignUp } from "@/components/sign-up";

export default function SignUpModal() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-background w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <SignUp />
        </div>
      </div>
    </div>
  );
}
