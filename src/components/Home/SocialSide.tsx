"use client"

import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Avatar } from 'flowbite-react'
import React, { useState } from 'react'
import ModalForActiveSpace from '../ModalForActiveSpace'

const SocialSide = () => {
    const [socialBar, setSocialBar] = useState(false)

    const [isMessages, setIsMessages] = useState(true)
    const openIsMessages = () => {
        setIsSettings(false)
        setIsMessages(true)
    }

    const [isSettings, setIsSettings] = useState(false)
    const openIsSettings = () => {
        setIsMessages(false)
        setIsSettings(true)
    }

    const [isActiveSpace, setIsActiveSpace] = useState(false)

    const handleOnClose = () => setIsActiveSpace(false)
    return (
        <div className="flex flex-col items-end fixed bottom-5 right-5 ">
            <ModalForActiveSpace space={{
                title: "This is title",
                language: "English",
                level: "Begineer",
                ownerId: "123",
                ownerName: "Farooq",
                ownerImage: "/images/persistence.jpg",
                createdAt: "13 Sep 2023, 11:30:23",
                users: [
                    { id: "123", name: "farooq", image: "/images/persistence.jpg", country: "pakistan-pk" },
                    { id: "44", native: "English-en", learning: "Urdu-ur", country: "Canada-ca", name: "test", image: "/images/persistence.jpg", bio: "nothing" },
                    { id: "44", native: "English-en", learning: "Urdu-ur", country: "Canada-ca", name: "test", image: "/images/persistence.jpg", bio: "nothing" },
                    { id: "1231", native: "English-en", learning: "Urdu-ur", country: "Canada-ca", name: "test", image: "/images/persistence.jpg", bio: "nothing" },
                    { id: "3123", native: "English-en", learning: "Urdu-ur", country: "Canada-ca", name: "test", image: "/images/persistence.jpg", bio: "nothing" },
                    { id: "123", native: "English-en", learning: "Urdu-ur", country: "Canada-ca", name: "test", image: "/images/persistence.jpg", bio: "nothing" },
                    
                    
                ],
                limit: "10"
            }} openModal={isActiveSpace} handleOnClose={handleOnClose} />
            {socialBar &&
                <div className='fade-in mb-3 rounded-l-md border-b  bg-white border-t border-l  dark:border-gray-600 dark:bg-gray-700 h-[calc(100vh-200px)]  w-[calc(100vw-100px)] sm:w-[400px]'>
                    <div className="flex justify-between border-r border-b dark:border-gray-600">
                        <div>
                            <button onClick={openIsMessages} className={`${isMessages ? "bg-gray-300 dark:bg-gray-800 border-b border-pink-400" : ""} rounded-tl p-4`}>
                                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                                    <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                                    <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                                </svg>
                                <span className="sr-only">Messags</span>
                            </button>
                            <button onClick={openIsSettings} className={`${isSettings ? "bg-gray-300 dark:bg-gray-800 border-b border-pink-400" : ""}  p-4`}>
                                <Bars2Icon className="h-6 w-6" aria-hidden="true" />
                                <span className="sr-only">Settings</span>
                            </button>
                        </div>
                        <div>
                            <button className={` p-4 `} onClick={() => setSocialBar(false)}>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                <span className="sr-only">Home</span>
                            </button>
                        </div>

                    </div>
                    <div className='flex flex-col h-[calc(100vh-260px)] overflow-y-auto'>
                        {isMessages &&
                            <div className='fade-in'>
                                <div className="p-0 m-0">
                                    <input
                                        type="text"
                                        placeholder="Search by name"
                                        className="block text-sm py-4 px-4 ring-gray-400 focus:ring-gray-400 w-full bg-gray-100 border-none border-gray-300 outline-none dark:border-gray-700 dark:bg-gray-800"
                                    />
                                </div>
                                {[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3].map((item,index) => {
                                    return (
                                        <div className='flex gap-1 p-3 hover:bg-gray-300  dark:hover:bg-gray-600 cursor-pointer'>
                                            <div className="relative">
                                                <img className={`cursor-pointer h-10 w-10 rounded-full ring-1 ring-white dark:ring-blue-400 mr-1`} src="images/persistence.jpg" alt="" />
                                                <span className="bottom-0 right-1 absolute   rounded-full text-2xl">
                                                    <img className='w-3' src={`/images/flags/pk.png`} alt="" />
                                                </span>

                                            </div>
                                            <div className='flex flex-col justify-center'>
                                                <div className='text-sm  '>Farooq Dad</div>
                                                <div className='text-sm font-normal items-center text-gray-500 dark:text-gray-400 flex justify-center align-center gap-1'>
                                                    {index % 7 ?
                                                    "" : <div className='h-2 w-2 bg-red-400 rounded-full'></div>
                                                    }
                                                    <div>I was looking for you</div>
                                                </div>

                                            </div>

                                        </div>

                                    )
                                })}
                            </div>
                        }

                        {isSettings &&
                            <div className='fade-in'>
                                <div className="p-0 m-0">
                                    <input
                                        type="text"
                                        placeholder="Search by name"
                                        className="block text-sm py-4 px-4 ring-gray-400 focus:ring-gray-400 w-full bg-gray-100 border-none border-gray-300 outline-none dark:border-gray-700 dark:bg-gray-800"
                                    />
                                </div>
                                <div className='p-3 flex flex-wrap gap-2'>
                                    {[1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5].map((item, index) => {
                                        return (
                                            <button className={`flex flex-col justify-center align-center items-center w-40 bg-gray-100 border border-gray-400 dark:border-gray-600 dark:bg-gray-800 rounded-lg  py-3 shadow-xl ${index % 3 && "border-green-400 border cursor-pointer"} `} onClick={() => setIsActiveSpace(true)}>
                                                <div className="relative" >

                                                    <img className={`h-10 w-10 rounded-full ring-1 ring-ring-gray-400 dark:ring-gray-700 mr-1`} src="/images/persistence.jpg" alt="" />
                                                    {index % 3 ?
                                                        <span className="bottom-1 right-1 absolute   rounded-full text-2xl">
                                                            <div className='h-2 w-2 bg-green-400 rounded-full'></div>
                                                        </span> : ""
                                                    }

                                                </div>
                                                <div className=" mt-1 text-center">
                                                    <h2 className="text-sm tracking-wide">
                                                        Babar Azam
                                                    </h2>
                                                </div>

                                            </button>

                                        )
                                    })}

                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
            <div className='flex  '>

                <button className={`mx-auto  group mx-auto text-white dark:text-white text-gray-900 flex  rounded-full p-3  text-sm  leading-6  font-semibold cursor-pointer bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 ${socialBar && "bg-pink-600"}`} onClick={() => setSocialBar(!socialBar)}>

                    <svg className="w-7 h-7  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                        <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                        <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                    </svg>
                    <span className="sr-only">Users</span>

                </button>
            </div>
        </div>
    )
}

export default SocialSide