import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NavigationControls({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSectionSelect,
}: {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSectionSelect: (index: number) => void;
}) {
  return (
    <div
      className=" absolute bottom-0 left-0 right-0 p-4
   bg-background/80 backdrop-blur-xs border-t
    border-rose-500/10
   "
    >
      <div className=" flex justify-between items-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onPrevious}
          disabled={currentSection === 0}
          className={cn(
            " shadow-lg rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-bl  from-[#833ab4] via-[#fd1d1d] to-[#fcb045] backdrop-blur-xs border border-rose-500/10",
            currentSection === 0 ? " opacity-50" : " hover:bg-rose-500/20"
          )}
        >
          <ChevronLeft className=" h-6 w-6 text-white font-bold" />
        </Button>
        <div className=" flex gap-2">
          {Array.from({ length: totalSections }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSectionSelect(index)}
              className={cn(
                " w-2 h-2 rounded-full transition-all duration-300",
                currentSection === index
                  ? " bg-linear-to-r from-rose-500 to-rose-600"
                  : " bg-rose-500/20 hover:bg-rose-500/30"
              )}
            />
          ))}
        </div>

        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={onNext}
          disabled={currentSection === totalSections - 1}
          className={cn(
            "rounded-full w-12 h-12 transition-all duration-200 bg-linear-to-br  from-[#833ab4] via-[#fd1d1d] to-[#fcb045] backdrop-blur-xs border border-rose-500/10"
          )}
        >
          <ChevronRight className=" h-6 w-6 text-white font-bold" />
        </Button>
      </div>
    </div>
  );
}
