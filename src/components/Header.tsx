"use client"

import React, { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, Dropdown } from 'flowbite-react';

const Header = () => {
    const session = useSession();

    return (
        <div className="py-3 lg:ml-20 ml-12 z-10 xl:ml-20">


            <div className="px-2 h-12 mx-auto flex justify-between items-center ">
                <Link href="/" className="flex items-center ">
                    {/* <img src="https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" alt="Logo" className="h-10 w-10 mr-2" /> */}
                    <h1 className="text-gray-600 dark:text-white  text-lg font-semibold">Spark talk</h1>
                </Link>
                <div className="flex items-center ">
                    <ThemeSwitch />

                    {session?.status === 'authenticated' ? <>
                        <p className="mr-4 ml-3">Hello, {session?.data?.user?.name}</p>
                        <Dropdown
                            placement="bottom-end"

                            inline
                            label={<Avatar alt="User settings" img={session?.data?.user?.image || ""} rounded />}
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {session?.data?.user?.name}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {session?.data?.user?.email}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Public Chat
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => signOut()}>
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>

                    </> :

                        <Link
                            href="/login"
                            className="ml-1 px-5 py-2.5 text-center inline-flex items-center mr-2 inline-flex items-center transition duration-150 ease-in-out group"
                        >
                            Sign in
                            <svg className="w-4 h-4 ml-1 tracking-normal text-purple-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
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