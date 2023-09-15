import React, { useState } from 'react'
import UserProfileCard from './UserCard'
import { useUser } from '@/contexts/UserContext'
import { MediaRoom } from './Media'
import Options from './Options'
import UsersInSpace from './UsersInSpace'
import { Avatar } from 'flowbite-react'

const RightSide = ({ currentSpaceData, isChatBox, handleChatBox, leaveSpace, handleRightSide }: any) => {



    return (
        <>
            {/* <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 "
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div> */}


            <div>

                <div className="flex  justify-between  h-[60px]  px-8  bg-transparent border-t border-gray-100 md:grid-cols-3 dark:border-gray-600">
                    <div className="items-center justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex">
                        <span className="text-sm">Created At: </span>

                        <svg
                            className="w-3 h-3 mx-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                        </svg>
                        <span className="text-sm">{currentSpaceData?.createdAt}</span>
                    </div>
                    <div className="items-center justify-center ml-auto md:flex">
                        <button
                            type="button"
                            className="p-2.5 group rounded-full hover:bg-gray-100 mr-1 dark:focus:bg-gray-600 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                            </svg>
                            <span className="sr-only">Share feedback</span>
                        </button>
                        <button
                            type="button"
                            className="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 18"
                            >
                                <path d="M10.836.357a1.978 1.978 0 0 0-2.138.3L3.63 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1.63l5.07 4.344a1.985 1.985 0 0 0 2.142.299A1.98 1.98 0 0 0 12 15.826V2.174A1.98 1.98 0 0 0 10.836.357Zm2.728 4.695a1.001 1.001 0 0 0-.29 1.385 4.887 4.887 0 0 1 0 5.126 1 1 0 0 0 1.674 1.095A6.645 6.645 0 0 0 16 9a6.65 6.65 0 0 0-1.052-3.658 1 1 0 0 0-1.384-.29Zm4.441-2.904a1 1 0 0 0-1.664 1.11A10.429 10.429 0 0 1 18 9a10.465 10.465 0 0 1-1.614 5.675 1 1 0 1 0 1.674 1.095A12.325 12.325 0 0 0 20 9a12.457 12.457 0 0 0-1.995-6.852Z" />
                            </svg>
                            <span className="sr-only">Adjust volume</span>
                        </button>
                        <button
                            onClick={handleChatBox}
                            type="button"
                            className="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
                        >
                            <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" fill="currentColor">
                                <path d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z" fill="currentColor" />
                                <path d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z" fill="currentColor" />
                            </svg>
                            <span className="sr-only">Show information</span>
                        </button>

                        {(isChatBox) &&
                            <button
                                type="button"
                                className="p-2.5 group rounded-full"
                                onClick={handleRightSide}
                            >
                                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                                <span className="sr-only">Show options</span>
                            </button>
                        }
                    </div>
                </div>


                <div className="h-[calc(100vh-180px)] flex gap-3 flex-wrap overflow-auto  justify-center py-5">
                    <UsersInSpace currentSpaceData={currentSpaceData} />
                </div>

            </div>

            <div >
                {/* <div className=" flex align-center justify-start px-3  overflow-auto w-96">

                <img className='w-10 h-10' src="/images/persistence.jpg" alt="" />
                <img className='w-10 h-10' src="/images/persistence.jpg" alt="" />
                <img className='w-10 h-10' src="/images/persistence.jpg" alt="" />
                </div> */}
                <div className="flex align-center justify-between  h-[75px]  px-8  bg-gray-100 border-t border-gray-100 md:grid-cols-3 dark:bg-[#1e272d] dark:border-gray-600">
                    <Options leaveSpace={leaveSpace} />

                </div>
            </div>
        </>
    )
}

export default RightSide