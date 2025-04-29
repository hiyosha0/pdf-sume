import { cn } from "@/lib/utils";
import {
  containerVariants,
  itemVariants,
  pricingPlans,
} from "@/utils/constants";
import { ArrowRight, CheckIcon } from "lucide-react";
import Link from "next/link";
import { MotionDiv, MotionSection } from "../ui/common/motion-wrapper";

type priceType = {
  id: string;
  name: string;
  price: number;
  items: string[];
  description?: string;
  paymentLink?: string;
  priceId?: string;
};

const listVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: priceType) => {
  return (
    <MotionDiv
      variants={listVariant}
      className=" relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"
    >
      <div
        className={cn(
          " relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8  border-[1px] border-gray-500/20 rounded-2xl shadow-md",
          id === "pro" && " border-rose-500 gap-5 border-2"
        )}
      >
        <div className=" flex justify-between items-center gap-4">
          <div>
            <p className=" text-lg lg:text-xl font-bold uppercase">{name}</p>
          </div>
          <p className=" text-base-content/80 mt-2">{description}</p>
        </div>
        <div className=" flex gap-2">
          <p className=" text-5xl tracking-tight font-extrabold">${price}</p>
          <div className=" flex flex-col justify-end mb-[4px]">
            <p className=" text-xs uppercase font-semibold">USD</p>
            <p className=" text-xs">/month</p>
          </div>
        </div>
        <div className=" space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((item, idx) => (
            <li className=" flex items-center gap-2" key={idx}>
              <CheckIcon size={18} />
              <span> {item}</span>
            </li>
          ))}
        </div>
        <div className=" space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink || "#"}
            className={cn(
              " shadow-md w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:scale-110 transform transition-all duration-300 text-white py-2 border-2 font-bold border-white/70",
              id === "pro"
                ? " border-rose-900"
                : " border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </MotionDiv>
  );
};

export default function PricingSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true, margin: "-100px" }}
      className=" relative overflow-hidden "
      id="pricing"
    >
      <div
        className=" py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6
     lg:px-8 lg:pt-12"
      >
        <MotionDiv
          variants={itemVariants}
          className=" flex items-center justify-center w-full pb-12"
        >
          <h2
            className=" uppercase font-bold text-xl mb-8
           text-rose-500"
          >
            Pricing
          </h2>
        </MotionDiv>
        <div
          className=" relative flex justify-center flex-col lg:flex-row items-center
         lg:items-stretch gap-8"
        >
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
