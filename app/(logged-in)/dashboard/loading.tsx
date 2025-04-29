import SummaryCard from "@/components/summaries/summery-card";
import BgGradient from "@/components/ui/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/ui/common/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { itemVariants } from "@/utils/constants";

function HeaderSkeleton() {
  return (
    <div className=" flex gap-4 mb-8 justify-between">
      <div className=" flex flex-col gap-2">
        <MotionH1
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          className=" text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600
        to-gray-900 bg-clip-text text-transparent "
        >
          <Skeleton className=" h-10 w-48 bg-gray-200 " />
        </MotionH1>
        <MotionP
          variants={itemVariants}
          initial="hidden"
          className=" text-gray-600"
        >
          <Skeleton className=" h-6 w-96  bg-gray-200" />
        </MotionP>
      </div>
      <MotionDiv
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className=" self-start"
      >
        <Skeleton className=" h-10 w-32  bg-gray-200" />
      </MotionDiv>
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      className=" rounded-lg border bg-gray-200  shadow-sm"
    >
      <Skeleton className=" h-48 w-full rounded-lg  bg-gray-200" />
    </MotionDiv>
  );
}

export default function LoadingSummary() {
  return (
    <div className=" min-h-screen relative">
      <BgGradient />

      <section className=" container px-10 py-24 mx-auto flex flex-col gap-4">
        <HeaderSkeleton />

        <div
          className=" grid grid-cols-1 gap-4 sm:gap-6
         md:grid-cols-2 lg:grid-cols-3 sm:px-0"
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
