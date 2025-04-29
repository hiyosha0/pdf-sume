import React from "react";
import { Badge } from "../ui/badge";
import { SparkleIcon } from "lucide-react";
import Sparkle from "@/public/sparkles";
import { MotionDiv } from "../ui/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

export default function UploadHeader() {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center gap-6 text-center">
        <MotionDiv
          variants={itemVariants}
          className=" relative p-[3px] overflow-hidden rounded-full bg-gradient-to-r
  from to-blue-400 to bg-rose-300 animate-gradient-x group"
        >
          <Badge
            variant={"secondary"}
            className=" shadow-md relative px-6 py-2 text-base font-medium bg-white rounded-full "
          >
            <SparkleIcon className=" h-6 w-6 mr-2 animate-pulse" />
            <span>AI-Powered PDF summery</span>
          </Badge>
        </MotionDiv>
        <div
          className=" capitalize text-3xl tracking-tight text-gray-900 font-bold
  sm:text-4xl"
        >
          <h1>Start Uploading Your PDFs</h1>
          <div className=" flex justify-center items-center gap-2 animate-pulse">
            <p className=" text-base font-medium text-gray-500">
              Upload your PDF and let our AI agent Albert to do the magic{" "}
            </p>
            <Sparkle />
          </div>
        </div>
      </div>
    </div>
  );
}
