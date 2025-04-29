import EmptySummaryState from "@/components/summaries/empty-summary-state";
import SummaryCard from "@/components/summaries/summery-card";
import { Button } from "@/components/ui/button";
import BgGradient from "@/components/ui/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/ui/common/motion-wrapper";
import { getSummaries } from "@/lib/summaries";
import { hasReachedUploadLimit } from "@/lib/user";
import { itemVariants } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowUpRight, CloudUploadIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Summary } from "@/types";
import React from "react";

export default async function DashBoardPage() {
  const user = await currentUser();
  if (!user?.id) return redirect("/sign-in");
  const userId = user?.id;
  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(userId);
  const summaries: Summary[] = await getSummaries(userId);
  return (
    <main className=" min-h-screen">
      <BgGradient className=" from-emerald-200 via-teal-200 to-cyan-200" />
      <div className=" container mx-auto flex flex-col gap-4">
        <div className=" px-2 py-12 sm:py-24">
          <div className=" flex gap-4 mb-8 justify-between">
            <div className=" flex flex-col gap-2">
              <MotionH1
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
                className=" text-4xl font-bold
               tracking-tight bg-linear-to-r from-gray-600
                to-gray-900 bg-clip-text text-transparent px-2"
              >
                Your Summaries
              </MotionH1>
              <MotionP
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}
                className=" text-gray-600"
              >
                Recall your lecture-slides, books like watching an instagram
                story
              </MotionP>
            </div>

            {!hasReachedLimit && (
              <Button
                variant={"link"}
                className=" bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full
             hover:scale-105 shadow-md duration-300 group hover:no-underline"
              >
                <Link
                  href={"/upload"}
                  className=" flex text-white items-center font-bold"
                >
                  <CloudUploadIcon className=" w-5 h-5 mr-2 font-bold" />
                  Upload a PDF
                </Link>
              </Button>
            )}
          </div>
          {hasReachedLimit && (
            <MotionDiv
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className=" mb-6"
            >
              <div className=" bg-rose-50 border border-rose-200 rounded-full p-4 text-rose-700 shadow-md">
                <p className=" text-sm">
                  You've reached the limit of {uploadLimit} uploads on the Basic
                  plan 🙄.
                  <Link
                    href={"/#pricing"}
                    className=" text-rose-800 underline font-medium underline-offset-4 inline-flex
                   items-center"
                  >
                    Click here to upgrade to Pro{" "}
                    <ArrowUpRight className=" w-4 h-4 inline-block" />
                  </Link>
                  for unlimited uploads.
                </p>
              </div>
            </MotionDiv>
          )}
          {/**Cards */}
          {summaries.length === 0 ? (
            <EmptySummaryState />
          ) : (
            <div className=" grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
              {summaries.map((summary: Summary, index) => (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
