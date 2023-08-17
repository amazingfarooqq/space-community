"use client"

import React, { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { signIn, useSession } from 'next-auth/react';

const Header = () => {
    const session = useSession();

    console.log({ session });

    return (
        <div className="bg-gray-800 py-3 dark:bg-[#1e272f]">
            <div className="max-w-7xl px-4 mx-auto flex justify-between items-center ">
                <Link href="/" className="flex items-center ">
                    {/* <img src="https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" alt="Logo" className="h-10 w-10 mr-2" /> */}
                    <h1 className="text-white text-lg font-semibold">Space Community</h1>
                </Link>
                <div className="flex items-center ">
                    <ThemeSwitch />
                    
                    {session?.status === 'authenticated' ? <>
                        <p className="text-white mr-4 ml-3">Hello, {session?.data?.user?.name}</p>
                        <img src={session?.data?.user?.image || ""} alt="Avatar" className="h-10 w-10 rounded-full" />

                    </> :

                        <Link
                            href="/login"
                            className="text-white dark:bg-[#1e272f] ml-3 border border-gray-700 hover:bg-gray-700   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800  dark:text-white dark:hover:bg-gray-700 mr-2 text-sm font-medium  inline-flex items-center transition duration-150 ease-in-out group"
                        >
                            Sign in
                            <svg className="w-4 h-4 ml-1 tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>

                        </Link>
                    }

                </div>
            </div>
        </div>

    );
}


export default Header