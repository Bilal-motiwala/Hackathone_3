"use client"

import {SignInButton , UserButton , useUser  } from "@clerk/nextjs"

import React from "react";
import Link from "next/link";

const Header = () => {

  const { user , isSignedIn} = useUser();
    
  console.log("User info", user?.fullName , isSignedIn);

  return (
    <div>
      <div className="flex flex-col">
        {/* Top Bar */}
        <div className="bg-gray-900 text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center text-sm">
            <p>Welcome to BM Store!</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">BM Store</h1>
              <div className="hidden items-center gap-5 text-[#000000] sm:flex lg:gap-10">
                <Link href="/">
                  <div className="menu_btns capitalize cursor-pointer">Home</div>
                </Link>
                <Link href="#About">
                  <div className="cursor-pointer">About</div>
                </Link>
                <Link href="/Contact">
                  <div className="cursor-pointer">Contact</div>
                </Link>
              </div>
              <UserButton />
            {
                !user? <SignInButton />: null
            }
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
