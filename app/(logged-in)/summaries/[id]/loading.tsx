import BgGradient from "@/components/ui/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/upload/loading-skeleton";
import React from "react";

function HeaderSkeleton() {
  return <div>Header</div>;
}

export default function LoadingSummary() {
  return (
    <div className=" min-h-screen relative">
      <BgGradient />
      <Skeleton className=" h-10 w-48 bg-gray-200 " />
      <div className=" flex min-h-screen w-full flex-1">
        <LoadingSkeleton />
      </div>
    </div>
  );
}
