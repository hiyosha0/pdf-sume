import { ArrowRight, FileText } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function EmptySummaryState() {
  return (
    <div className=" text-center py-12">
      <div>
        <div className=" flex flex-col items-center gap-4">
          <FileText className=" w-16 h-16 text-gray-400 animate-pulse" />
          <h2 className=" text-xl font-semibold text-gray-600">
            It's Lonely Here...
          </h2>
          <p className=" text-gray-500 max-w-md">
            Upload your first PDF to get started with AI-Powered summaries..
          </p>
          <Button
            variant={"link"}
            className=" bg-linear-to-r from-rose-400  to-blue-400 rounded-full
             hover:scale-105 shadow-md duration-300 group hover:no-underline text-white"
          >
            <Link href={"/upload"}>
              <div className=" flex flex-row justify-center items-center gap-2 truncate font-bold text-shadow">
                Create Your First Summary
                <ArrowRight />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
