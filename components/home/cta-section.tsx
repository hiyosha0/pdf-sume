import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function CTASection() {
  return (
    <section className=" bg-gray-50 py-12">
      <div
        className=" py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6
     lg:px-8 lg:pt-12"
      >
        <div
          className=" flex flex-col items-center justify-center
         space-y-4 text-center"
        >
          <div>
            <h2>Ready To Save Hours Of Reading Time ?</h2>
            <p>transform your PDFs into concise summaries with AI assistance</p>
          </div>
        </div>
        <div className=" flex flex-col gap-3 min-[400px]:flex-row justify-center">
          <div className=" flex justify-center mt-8">
            <Button
              size={"lg"}
              variant={"link"}
              className=" w-full min-[400px] :w-auto   text-white shadow-md rounded-full hover:scale-110 transform transition-all duration-300 bg-gradient-to-r from-rose-800 to-rose-500 border-2 font-bold border-white/70"
            >
              <Link
                href={"/#pricing"}
                className=" flex items-center justify-center px-6 "
              >
                Get Started{" "}
                <ArrowRight className=" ml-2 h-4 w-4 animate-pulse" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
