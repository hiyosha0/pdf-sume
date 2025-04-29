import Sparkle from "@/public/sparkles";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../ui/common/motion-wrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const btnVariants = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
  },
};

export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      // whileInView="visible"
      animate="visible"
      className=" relative mx-auto flex flex-col z-0 items-center
     justify-center py-16 sm:py-20 lg:pb-28
      transition-all animate-in lg:px-12 max-w-7xl"
    >
      <div className=" ">
        <MotionDiv
          variants={itemVariants}
          className=" relative p-[1px] overflow-hidden rounded-full bg-linear-to-r
           from-yellow-200 via-blue-400 to-rose-500 animate-gradient-x"
        >
          <Badge
            variant={"secondary"}
            className=" relative px-6 py-2 text-base
             font-medium bg-white rounded-full  group-hover:bg-gray-50 transition-colors
              duration-200 border-2"
          >
            <Sparkle />
            <p className=" text-base text-rose-600">Powered by AI</p>
          </Badge>
        </MotionDiv>
      </div>
      <MotionH1 className=" font-bold py-6 text-center" variants={itemVariants}>
        Transform PDFs into{" "}
        <span className=" relative inline-block">
          <MotionSpan whileHover={btnVariants} className=" relative z-10 px-">
            Instagram
          </MotionSpan>
          <span
            className=" absolute inset-0 bg-blue-300/50 -rotate-2 rounded-lg transform
          -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
        Stories
      </MotionH1>
      <MotionH2
        className=" text-lg sm:text-xl lg:text-2xl text-center
       px-4 lg:px-0 lg:max-w-4xl text-gray-600"
      >
        Get a beautiful summery reel on the docment in seconds. memorise your
        lecture slides in easy way.
      </MotionH2>
      <MotionDiv variants={itemVariants}>
        <Button
          variant={"link"}
          className=" text-white mt-6 text-base
        sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16
        bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:scale-110 transform transition-all duration-300
         hover:no-underline shadow-md"
        >
          <Link href={"/#pricing"} className=" flex gap-2 items-center">
            <span className=" font-bold">Try Sommaire..</span>
            <ArrowRight className=" animate-pulse w-6 h-6" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
}
