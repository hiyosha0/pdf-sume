import { Badge } from "@/components/ui/badge";
import BgGradient from "@/components/ui/common/bg-gradient";
import { MotionDiv } from "@/components/ui/common/motion-wrapper";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { hasReachedUploadLimit } from "@/lib/user";
import Sparkle from "@/public/sparkles";
import { containerVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { SparkleIcon } from "lucide-react";
import { redirect } from "next/navigation";

export const maxDuration = 60;

export default async function UploadPage() {
  const user = await currentUser();
  if (!user?.id) {
    redirect("/sign-in");
  }
  const userId = user.id;
  const { hasReachedLimit } = await hasReachedUploadLimit(userId);
  if (hasReachedLimit) {
    redirect("/dashboard");
  }
  return (
    <section className=" min-h-screen">
      <BgGradient />
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className=" mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className=" flex flex-col items-center justify-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
}
