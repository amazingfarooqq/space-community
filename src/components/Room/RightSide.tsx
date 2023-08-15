import React from 'react'

const RightSide = () => {
    return (
        <div className="w-3/4 flex flex-col justify-between h-[calc(100vh-3rem)]">
            <div className="">
                {/* Audio Call Icon */}

            </div>
            <div className="p-4 flex flex-wrap justify-center">
                <div className="m-1 mr-2 w-14 h-14 relative flex justify-center items-center rounded-full text-xl text-white">
                    <img
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="rounded-full"
                    />
                    <div className="absolute right-0 bottom-0  rounded-full bg-red-100 " >

                        <svg
                            className=" w-5 h-5 text-black  m-1 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 19"
                        >
                            <path d="M15 5a1 1 0 0 0-1 1v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a1 1 0 0 0-2 0v3a6.006 6.006 0 0 0 6 6h1v2H5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9v-2h1a6.006 6.006 0 0 0 6-6V6a1 1 0 0 0-1-1Z" />
                            <path d="M9 0H7a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Z" />
                        </svg>
                    </div>
                </div>

                <div className="m-1 mr-2 border border-red-400 border-4 w-14 h-14 relative flex justify-center items-center rounded-full text-xl text-white">
                    <img
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="rounded-full"
                    />
                    <div className="absolute right-0 bottom-0  rounded-full bg-red-100 " >

                        <svg
                            className=" w-5 h-5 text-black  m-1 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 16 19"
                        >
                            <path d="M15 5a1 1 0 0 0-1 1v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a1 1 0 0 0-2 0v3a6.006 6.006 0 0 0 6 6h1v2H5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9v-2h1a6.006 6.006 0 0 0 6-6V6a1 1 0 0 0-1-1Z" />
                            <path d="M9 0H7a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Z" />
                        </svg>
                    </div>
                </div>

                <div className="m-1 mr-2 w-14 h-14 relative flex justify-center items-center rounded-full text-xl text-white">
                    <img
                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="rounded-full"
                    />
                    <div className="absolute right-0 bottom-0  rounded-full bg-red-100 " >

                        <svg className=" w-5 h-5 text-black  m-1 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                        </svg>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default RightSide