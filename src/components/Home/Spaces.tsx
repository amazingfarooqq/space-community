"use client"

import { useSocket } from '@/contexts/SocketContext'
import { Avatar, Dropdown, Tooltip } from 'flowbite-react'
import React from 'react'
import UsersInSpace from './UsersInSpace'
import { useUser } from '@/contexts/UserContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Spaces = () => {
    const { userData }: any = useUser()
    const session = useSession();

    const { spaces } = useSocket()

    const joinSpace = (spaceId: any) => {

        if (!userData?.id) {
            toast.error('You need to signup')
            return
        }
        // router.push(`/space/${spaceId}`)
        window.open(`/space/${spaceId}`, '_ blank')
    }

    const deleteSpace = async (spaceId: any) => {
        const createNewSpace = await axios.post('/api/spaces/deleteSpace', {
            spaceId
        })
    }

    return (
        <>

            {spaces?.map((space: any, index: any) => {
                return <>
                    <div key={index} className={`flex h-full flex-col justify-between  animate-fade-in relative border  bg-gray-100 dark:bg-gray-800 lg:w-98 ${space.users.length == 0 ? "h-60" : "h-auto"} lg:h-80 overflow-hidden ml-0 rounded-lg  shadow-lg dark:border-gray-700 `}>


                        <div className="w-full text-sm items-start bg-gray-200 dark:bg-[#1A202C] px-4 py-3">
                            <div className='flex justify-between w-full'>
                                <div className="">
                                    <div className=" mb-1 flex gap-1">
                                        <h3 className="text-gray-600 dark:text-white font-semibold">{space.language}</h3>
                                        <span className='text-sm opacity-70 flex items-center '>

                                            {space.users.length} /{space.limit}
                                            {/* {space.users?.length < space.limit &&
                                                <svg className="w-4 h-4 ml-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.079 4.839a3 3 0 0 0-4.255.1M11 18h1.083A3.916 3.916 0 0 0 16 14.083V7A6 6 0 1 0 4 7v7m7 4v-1a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4V8H3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1V8Z" />
                                                </svg>
                                            } */}
                                        </span>
                                    </div>
                                    <div className="mb-3 lg:mb-0 text-blue-500 dark:text-blue-400 font-semibold" title={space.title}>
                                        {space.title?.length > 100 ? `${space.title.slice(0, 100)}...` : space.title}
                                    </div>
                                </div>
                                <div className=''>
                                    <Dropdown
                                        placement="bottom-end"
                                        inline
                                        label=""
                                        className='w-36'

                                    >

                                        <div className='px-3 py-2 text-center flex justify-center'>
                                            <img src={space?.ownerImage} className='w-14 h-14 rounded-full border' alt="" />
                                        </div>
                                        <div className='px-3 pb-2  text-center'>
                                            <span className=''>{space?.ownerName}</span>
                                        </div>

                                        {space?.ownerId == session?.data?.user?.id &&
                                            <div className='text-center'>

                                                <button className='px-3  pb-2 py-1 rounded w-100 text-center' onClick={() => deleteSpace(space.id)}>
                                                    <span className=''>Remove Space</span>
                                                </button>
                                            </div>
                                        }
                                        {/* <div className='mx-auto opacity-80 flex flex-col justify-center p-1'>
                                            <div className=''>Created At:</div>
                                            <div className=''>{space?.createdAt}</div>
                                        </div> */}

                                    </Dropdown>
                                </div>

                            </div>
                        </div>

                        <div className="flex flex-wrap px-4 py-3 ">
                            {space.users.length > 0 && <UsersInSpace users={space.users} ownerId={space.ownerId} />}
                            {space.users?.length && space.users.length > 9 ?
                                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white flex items-center justify-center dark:ring-[#272F34] bg-slate-100 dark:bg-gray-600  dark:text-gray-200" style={{ fontSize: '0.8rem' }}>
                                    {space.users.length}
                                </div> : ""
                            }
                        </div>

                        <div className='flex justify-between px-4 py-3'>
                            <div className="text-right  bottom-3 left-3   ">
                                <div className="text-sm font-medium px-3 py-2 rounded-xl bg-gray-100 shadow-md dark:bg-gray-700">{space.level}</div>
                            </div>
                            <div className="text-right  z-100 bottom-3 right-3   ">
                                {space.users.length < space.limit ?
                                    <Link href={`/space/${space.id}`}
                                        className="text-sm font-medium inline-flex items-center transition duration-150 ease-in-out group border px-4 py-2 rounded-xl border-blue-200 dark:border-gray-600 border-dashed hover:text-blue-400 ">Join space
                                        <svg className="w-4 h-4 ml-2 tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </Link> :
                                    <div
                                        className="text-sm font-medium text-gray-700 dark:text-red-400 inline-flex items-center transition duration-150 ease-in-out group  py-2 rounded-xl text-red-500 ">Space is Full
                                    </div>
                                }
                            </div>
                        </div>


                    </div>

                    {/* <div key={index} className={`lg:h-80 lg:w-98 flex h-full flex-col justify-center  animate-fade-in border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md  shadow-lg dark:border-gray-700 `}>
                        <h1 className='mx-auto'>Get Free Resouces to learn programming</h1>
                        <a className='mx-auto' href="#">Expesh.com</a>
                    </div> */}
                </>

            })}


            {/* loading state */}
            {spaces.length == 0 && (
                <>

                    {([3, 2, 4, 6, 10, 3, 2, 4, 6, 10]).map((item, index) => {
                        return <div key={index + 1} className={`flex h-full flex-col justify-between px-4 py-3  animate-fade-in relative border dark:border-gray-700 bg-white dark:bg-gray-800 lg:w-98 h-60 lg:h-80 overflow-hidden ml-0 rounded-lg  shadow-lg animate-pulse `}>



                            <div className="w-full text-sm items-start">
                                <div className='flex justify-between w-full'>
                                    <div className="">
                                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-2"></div>
                                        <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-36 "></div>
                                    </div>

                                </div>
                            </div>

                            <div className="flex flex-wrap py-4">
                                <div className="flex flex-wrap gap-y-3 ">
                                    {Array.from({ length: item }, (_, index) => (

                                        <svg key={index + 1} className={`text-gray-200 dark:text-gray-700 cursor-pointer ${item <= 3 ? "h-24 w-24" : item <= 4 ? "h-22 w-22" : "h-18 w-18"}   rounded-full mr-1`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <div className="text-right  ">
                                    <div className="text-sm font-medium px-3 py-2 rounded-xl shadow-md bg-gray-200 dark:bg-gray-700  w-20 h-5"></div>
                                </div>
                                <div className="text-right ">
                                    <div className="text-sm font-medium px-3 py-2 rounded-xl shadow-md bg-gray-200 dark:bg-gray-700  w-20 h-5"></div>
                                </div>
                            </div>


                        </div>
                    })}
                </>
            )}
        </>
    )
}

export default Spaces