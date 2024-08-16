"use client"

import MainLayout from '@/components/Layout/MainLayout'
import { Avatar } from 'flowbite-react'
import React from 'react'



const teams = ({ params: { teamId } }: { params: { teamId: string; } }) => {

    console.log({ teamId });

    return (
        <>
            <MainLayout>

                <div className=' py-10'>
                    <div className='flex justify-between'>
                        <h1 className='text-6xl text-semibold'>Team {teamId}</h1>
                        <div className=' pr-5'>
                            <button
                                className="bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-sm px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Join Team {teamId}
                            </button>
                        </div>
                    </div>
                    <div className='flex'>
                        
                        <h1 className='text-5xl font-semibold py-5'>10043</h1>
                        <h1 className=''>#1</h1>

                    </div>


                    <div className='flex flex-wrap gap-1'>
                        {[24, 30, 70, 5, 66, 70, 90].map((item: any) => {
                            return (
                                <section className="w-64 bg-gray-100 dark:bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                                    <div className="text-gray-400 text-sm">From 2nd Feb 2023</div>
                                    <div className="mt-6 w-fit">
                                        <Avatar bordered size="xl" img="/images/persistence.jpg" />
                                    </div>
                                    <h2 className="mt-4 font-bold text-2xl tracking-wide">
                                        Farooq dad khan
                                    </h2>
                                    <p className="font-semibold mt-2"> {item}</p>
                                    {/* <p className="text-xs mt-2.5"> ranks 4</p>
                            <p className="text-xs mt-2.5"> In this team: rank 1</p> */}
                                    <div className="h-1 w-full bg-black mt-4 rounded-full">
                                        <div className={`h-1 rounded-full w-full bg-${teamId}-400`} />
                                    </div>
                                </section>

                            )
                        })}
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default teams