"use client"
import Header from '@/components/Header/Header';
import BGGradient from '@/components/BGGradient';
import Spaces from '@/components/Home/Spaces';
import Sidebar from '@/components/sidebar/Sidebar';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';
import { Avatar } from 'flowbite-react';
import MainLayout from '@/components/Layout/MainLayout';

export default function Page() {

    const { users } = useUser()

    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const filteredUsers = users?.filter((user: any) =>
        user?.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
    };
    return (
        <>
            <MainLayout>
                {isLoading && "loading.."}
                {!isLoading && users?.length < 1 ?
                    <div>No User Exist</div> :
                    <>
                        <div className="py-4">
                            <input
                                type="text"
                                placeholder="Search by name"
                                className="block mt-2 text-sm py-3 px-4 rounded-lg w-96 border outline-none dark:border-gray-700 dark:bg-gray-800"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <div className="py-6 flex flex-wrap gap-5 flex-row  ">
                            {filteredUsers.map((item: any) => {
                                return (
                                    <section className="w-64 bg-gray-100 dark:bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">{item.createdAt}</span>
                                        </div>
                                        <div className="mt-6 w-fit">
                                            <Avatar bordered size="lg" img={item.image} />
                                        </div>
                                        <div className="mt-4 ">
                                            <h2 className="text-blue-400 font-bold text-2xl tracking-wide">
                                                {item.name}
                                            </h2>
                                            <p>Web Developer</p>
                                        </div>
                                        <p className="text-emerald-400 font-semibold mt-2.5"> Active</p>
                                        <div className='flex flex-wrap gap-2 '>
                                            <p className="text-xs font-semibold mt-2.5"> Followers 100</p>
                                            <p className="text-xs font-semibold mt-2.5"> Following 2</p>
                                        </div>
                                        <div className="h-1 w-full bg-black mt-4 rounded-full">
                                            <div className="h-1 rounded-full w-full bg-blue-500 " />
                                        </div>
                                    </section>

                                )
                            })}
                            {filteredUsers.map((item: any) => {
                                return (
                                    <section className="w-64 bg-gray-100 dark:bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">{item.createdAt}</span>
                                        </div>
                                        <div className="mt-6 w-fit">
                                            <Avatar bordered size="lg" img={item.image} />
                                        </div>
                                        <div className="mt-4 ">
                                            <h2 className="text-blue-400 font-bold text-2xl tracking-wide">
                                                {item.name}
                                            </h2>
                                            <p>Web Developer</p>
                                        </div>
                                        <p className="text-emerald-400 font-semibold mt-2.5"> Active</p>
                                        <div className='flex flex-wrap gap-2 '>
                                            <p className="text-xs font-semibold mt-2.5"> Followers 100</p>
                                            <p className="text-xs font-semibold mt-2.5"> Following 2</p>
                                        </div>
                                        <div className="h-1 w-full bg-black mt-4 rounded-full">
                                            <div className="h-1 rounded-full w-full bg-blue-500 " />
                                        </div>
                                    </section>

                                )
                            })}
                            {filteredUsers.map((item: any) => {
                                return (
                                    <section className="w-64 bg-gray-100 dark:bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-400 text-sm">{item.createdAt}</span>
                                        </div>
                                        <div className="mt-6 w-fit">
                                            <Avatar bordered size="lg" img={item.image} />
                                        </div>
                                        <div className="mt-4 ">
                                            <h2 className="text-blue-400 font-bold text-2xl tracking-wide">
                                                {item.name}
                                            </h2>
                                            <p>Web Developer</p>
                                        </div>
                                        <p className="text-emerald-400 font-semibold mt-2.5"> Active</p>
                                        <div className='flex flex-wrap gap-2 '>
                                            <p className="text-xs font-semibold mt-2.5"> Followers 100</p>
                                            <p className="text-xs font-semibold mt-2.5"> Following 2</p>
                                        </div>
                                        <div className="h-1 w-full bg-black mt-4 rounded-full">
                                            <div className="h-1 rounded-full w-full bg-blue-500 " />
                                        </div>
                                    </section>

                                )
                            })}

                        </div>
                    </>

                }
            </MainLayout>

        </>
    )
}