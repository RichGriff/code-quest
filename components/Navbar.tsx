/* eslint-disable react/no-unescaped-entities */
"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { SquareDashedBottomCode } from "lucide-react";
// import { UserButton } from "@clerk/nextjs";
import Link from "next/link";


const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="pt-5 w-full">
      <div className="mx-auto flex justify-between items-center border-b pb-5">
        <div className="px-16 w-1/3">
          <Link
            href={"/"}
            className="flex gap-1 items-center text-xl"
          >
            <SquareDashedBottomCode className="text-indigo-500" />
            <h1 className="text-dark font-bold">
              CodeQuest
            </h1>
          </Link>
        </div>

        <div className="w-1/3 flex justify-center items-center">
          <span className="bg-indigo-500 px-5 py-1 rounded-md text-white">
            Today's Category: Javascript
          </span>
        </div>

        <div className="w-1/3 flex items-center gap-3 justify-end px-16">
          {/* <UserMenu />*/}
          <UserButton />
            {user?.firstName}
        </div>
      </div>
    </div>
  );
};

export default Navbar;