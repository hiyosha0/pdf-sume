import { getPriceIdForActiveUser } from "@/lib/user";
import { pricingPlans } from "@/utils/constants";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { Badge } from "../badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

export default async function PlanBadge() {
  // Opt out of caching for this component
  noStore();

  const user = await currentUser();

  if (!user?.id) return null;

  const email = user?.emailAddresses?.[0]?.emailAddress;

  let priceId: string | null = null;
  if (email) {
    priceId = await getPriceIdForActiveUser(email);
  }

  console.log("Current user plan:", priceId); // Debug log

  let planName = "Buy a plan";
  const plan = pricingPlans.find((plan) => plan.priceId === priceId);

  if (plan) {
    planName = plan.name;
  }

  return (
    <Badge
      variant={"outline"}
      className={cn(
        " shadow-md rounded-full ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
        !priceId && " from-red-100 to-red-200 border-red-300"
      )}
    >
      <Crown
        className={cn(
          " w-3 h-3 mr-1 text-amber-600",
          !priceId && " text-red-600"
        )}
      />
      {planName}
    </Badge>
  );
}
