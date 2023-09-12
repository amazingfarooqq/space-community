"use client"

import { useSocket } from '@/contexts/SocketContext'
import { Dropdown, Tooltip } from 'flowbite-react'
import React from 'react'
import UsersInSpace from './UsersInSpace'

const Spaces = ({ filteredSpaces, joinSpace }: { filteredSpaces: any, joinSpace: any }) => {

    const { spaces } = useSocket()
    

    return (
        <>

            {filteredSpaces?.map((space: any, index: any) => {


                return <div key={index} className={` animate-fade-in relative border dark:border-gray-700 bg-white dark:bg-gray-800 lg:w-98 h-auto py-2 h-72 lg:h-72 overflow-hidden ml-0 rounded-md  shadow-lg dark:border-gray-700 `}>

                    {/* {space.users?.length < space.limit ?
                        <>
                            <div className="absolute z-100 top-1 right-1  mt-1 mr-1 w-2 h-2 rounded-full bg-purple-300 animate-ping"></div>
                            <div className="absolute top-1 right-1 mt-1 mr-1 w-2 h-2 rounded-full bg-purple-400"></div>
                        </> : ""
                    } */}

                    <div className="flex flex-col px-4 py-3 ">
                        <div className="w-full text-sm items-start">
                            <div className={`rounded-lg`}>
                                <div className='flex justify-between'>
                                    <div className='flex justify-between w-full'>
                                        <div className="">
                                            <div className=" mb-1 flex gap-1">
                                                <h3 className="text-gray-600 dark:text-white font-semibold">{space.language}</h3>
                                                <span className='text-sm opacity-70 flex'>

                                                    {space.users.length}/{space.limit}
                                                    {space.users?.length < space.limit &&
                                                        <svg className="w-4 h-4 ml-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.079 4.839a3 3 0 0 0-4.255.1M11 18h1.083A3.916 3.916 0 0 0 16 14.083V7A6 6 0 1 0 4 7v7m7 4v-1a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4V8H3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1V8Z" />
                                                        </svg>
                                                    }
                                                </span>
                                            </div>
                                            <div className="mb-3 text-purple-500 dark:text-purple-400 font-semibold" title={space.title}>
                                                {space.title?.length > 35 ? `${space.title.slice(0, 35)}...` : space.title}
                                            </div>
                                        </div>
                                        <div>
                                            <Dropdown
                                                placement="bottom-end"
                                                inline
                                                label=""
                                            >
                                                <Dropdown.Item>
                                                    <a className="" href="#">Edit</a>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <a className="" href="#">Export Data</a>
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </div>

                                    </div>
                                    <div className="text-right absolute bottom-3 left-3   ">
                                        <div className="text-sm font-medium px-3 py-2 rounded-3xl bg-white shadow-md dark:bg-gray-700">{space.level}
                                        </div>
                                    </div>
                                    <div className="text-right absolute z-100 bottom-3 right-3   ">
                                        {space.users.length < space.limit ?
                                            <button onClick={() => joinSpace(space.id)}
                                                className="text-sm font-medium hover:text-purple-500 inline-flex items-center transition duration-150 ease-in-out group border px-3 py-2 rounded-3xl border-gray-700">Join
                                                <svg className="w-4 h-4 ml-2 tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                            </button> :
                                            <div
                                                className="text-sm font-medium inline-flex items-center transition duration-150 ease-in-out group opacity-70"
                                            >Full
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap mb-2 ">
                            {space.users.length > 0 && <UsersInSpace users={space.users} ownerId={space.owner} />}
                            {space.users?.length && space.users.length > 8 ?
                                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white flex items-center justify-center dark:ring-[#272F34] bg-slate-100 dark:bg-gray-600  dark:text-gray-200" style={{ fontSize: '0.8rem' }}>
                                    {space.users.length}
                                </div> : ""
                            }

                        </div>

                    </div>

                </div>

            })}
        </>
    )
}

export default Spaces