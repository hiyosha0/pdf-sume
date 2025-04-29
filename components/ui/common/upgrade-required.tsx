import React from "react";
import BgGradient from "./bg-gradient";
import Sparkle from "@/public/sparkles";
import { Button } from "../button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function UpgradeRequired() {
  return (
    <div className=" relative min-h-[50vh]">
      <BgGradient />
      <div className=" container px-8 py-16">
        <div
          className=" flex flex-col items-center justify-center
         gap-8 text-center max-w-2xl mx-auto"
        >
          <div
            className=" flex items-center gap-2 bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]
           bg-clip-text text-transparent  "
          >
            <Sparkle />
            <span className=" text-sm font-medium uppercase tracking-wider">
              Premium Feature
            </span>
          </div>
          <h1
            className=" text-4xl font-bold tracking-tight
           bg-linear-to-r from bg-gray-900 to to-gray-600 bg-clip-text text-transparent"
          >
            Subscription Required
          </h1>
          <p
            className=" text-lg leading-8 text-gray-600 border-2 border-rose-200
           bg-white/50 backdrop-blur-sm rounded-xl border-dashed max-w-xl"
          >
            oops! you need to upgrade to the basic plan or the pro plan to
            access to convert your boring pdfs to interactive insta-stories 🤩
          </p>
          <Button
            size={"lg"}
            asChild
            className=" font-bold shadow-md rounded-full bg-linear-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:scale-105 transition-all duration-200
             text-white"
          >
            <Link href="/#pricing" className=" flex gap-2 items-center ">
              View Pricing Plans <ArrowRight className=" font-bold w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
