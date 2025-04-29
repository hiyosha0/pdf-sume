import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./plan-badge";
import { unstable_noStore as noStore } from "next/cache";

export default function Header() {
  // Opt out of caching for this component
  noStore();

  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className=" flex lg:flex-1">
        <NavLink
          href={"/"}
          className=" flex items-center gap-1 lg:gap-2 shrink-0"
        >
          <FileText
            className="  w-5 h-5 lg:h-8 lg:w-8  text-gray-900 hover:rotate-12 trasform
           trasnsition duration-200 ease-in-out"
          />
          <span className=" font-extrabold lg:text-xl text-gray-900">
            Sommaire
          </span>
        </NavLink>
      </div>

      <div className=" flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href={"/#pricing"}>Pricing</NavLink>
        <SignedIn>
          <NavLink href={"/dashboard"}>Your summaries</NavLink>
        </SignedIn>
      </div>

      <div className=" flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className=" flex gap-2 items-center">
            <NavLink href={"/upload"}>Upload a pdf</NavLink>
            <PlanBadge />
            <SignedIn>
              <div className=" border-2 rounded-full flex justify-center items-center border-blue-600 shadow-lg ">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href={"/sign-in"}>Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
