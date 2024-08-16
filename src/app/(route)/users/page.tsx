"use client"
import Header from '@/components/Header/Header';
import BGGradient from '@/components/BGGradient';
import Spaces from '@/components/Home/Spaces';
import Sidebar from '@/components/sidebar/Sidebar';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';
import { Avatar } from 'flowbite-react';

export default function Page() {

    const { users } = useUser()

    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const filteredUsers = users?.filter((user) =>
        user?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (
        <>
            <Sidebar />
            <main className=" flex min-h-screen flex-col pb-56 ml-24 px-10">
                <Header />
                {/* <BGGradient /> */}

                {/* <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl dark:opacity-50 sm:-top-80 "
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            background:
                                "linear-gradient(106.89deg, rgba(192, 132, 252, 0.31) 15.73%, rgba(14, 165, 233, 0.21) 15.74%, rgba(232, 121, 249, 0.36) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
                        }}
                    />
                </div> */}
                {isLoading && "loading.."}
                {!isLoading && users?.length < 1 ?
                    <div>No User Exist</div> :
                    <>
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Search by name"
                                className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-700 dark:bg-gray-800"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="py-6 flex flex-wrap gap-5 flex-row  ">
                            {filteredUsers.map((item: any) => {
                                return (
                                    <section className="w-64 bg-gray-100 dark:bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">Joining 2nd Feb 2023</span>
                                            {/* <span className="text-emerald-400">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                            />
                                        </svg>
                                    </span> */}
                                        </div>
                                        <div className="mt-6 w-fit mx-auto">
                                            <Avatar bordered rounded size="xl" img={item.image} />
                                            {/* <img
                                                src={item.image}
                                                className="rounded-full w-28 "
                                                alt="profile picture"
                                                srcSet=""
                                            /> */}
                                        </div>
                                        <div className="mt-8 ">
                                            <h2 className="text-blue-400 font-bold text-2xl tracking-wide">
                                                {item.name}
                                            </h2>
                                        </div>
                                        <p className="text-emerald-400 font-semibold mt-2.5"> Active</p>
                                        {/* <p className="text-xs font-semibold mt-2.5"> Followers 100</p>
                                <p className="text-xs font-semibold mt-2.5"> Following 2</p>
                                <div className="h-1 w-full bg-black mt-8 rounded-full">
                                    <div className="h-1 rounded-full w-full bg-blue-500 " />
                                </div> */}
                                    </section>

                                )
                            })
                            }

                        </div>
                    </>

                }

            </main >



        </>
    )
}