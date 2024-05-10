/* eslint-disable react/no-unescaped-entities */
"use client";

import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Crown, Library, SquareDashedBottomCode } from "lucide-react";
// import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import LoggedInUser from "./LoggedInUser";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";


const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [category, setCategory] = useState<string>('')

  async function getData() {
    // Get today's date in ISO 8601 format
    const today = new Date().toISOString().split('T')[0];

    // Construct the GROQ query
    const query = `*[_type == "categories" && $today >= startDate && $today < endDate]{
        _id,
        category,
        startDate,
        endDate
    }`;

    // Define the parameters for the query
    const params = { today };

    // Execute the query
    const data = await client.fetch(query, params);

    return data[0].category;
  }

  useEffect(() => {
    getData().then((category) => setCategory(category))
  },[])

  return (
    <div className="pt-5 w-full">
      <div className="mx-auto flex justify-between items-center border-b pb-5">
        <div className="px-16 w-1/3">
          <Link
            href={"/"}
            className="inline-flex justify-start gap-1 items-center text-xl"
          >
            <SquareDashedBottomCode className="w-8 h-8 text-indigo-500" />
            <h1 className="text-dark font-bold">
              CodeQuest
            </h1>
          </Link>
        </div>

        <div className="w-1/3 hidden md:flex justify-center items-center">
          <span className="bg-slate-100 px-5 py-2 rounded-md text-slate-700">
            Today's Category: <span className='font-bold'>{category}</span>
          </span>
        </div>

        <div className="w-1/3 flex items-center gap-3 justify-end px-16">
          <LoggedInUser />
        </div>
      </div>
    </div>
  );
};

export default Navbar;