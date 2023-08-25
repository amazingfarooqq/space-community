"use client"

import { useSpacesSocket } from '@/contexts/SpacesSocketContext'
import { Tooltip } from 'flowbite-react'
import React from 'react'



const Spaces = ({spaces, setSpaces, joinSpace}) => {

    // const { spaces, spacesSocket, joinSpace } = useSpacesSocket()

    return (
        <div className="py-6 flex flex-wrap gap-x-6 ml-1 lg:ml-10 gap-y-5 flex-col lg:flex-row xl:gap-x-8   ">

            {/* {spaces.map((item: any, index: any) => {
            console.log("spaceid", item.spaceid);
            return <Spaces item={item} index={item}/>
          }
          )} */}


            {spaces.map((item: any, index: any) => {

                return <div key={index} className={`  dark:shadow-md border-2 relative rounded-md  bg-white dark:bg-[#191D20] dark:border-gray-800 mr-3 lg:mr-0 lg:w-96 h-auto py-2 lg:h-80 border overflow-hidden`}>

                    {item.users?.length < item.limit ?
                        <>
                            <div className="absolute z-100 top-0 right-0  mt-1 mr-1 w-2 h-2 rounded-full bg-purple-300 animate-ping"></div>
                            <div className="absolute top-0 right-0 mt-1 mr-1 w-2 h-2 rounded-full bg-purple-400"></div>
                        </> : ""
                    }
                    <div className="flex flex-col px-4 py-3 ">
                        <div className="w-full text-sm items-start">
                            <div className={`rounded-lg`}>
                                <div className='flex justify-between'>
                                    <div className="grow ">
                                        <div className=" mb-1 flex gap-1">
                                            <h3 className="text-gray-600 dark:text-white font-semibold">{item.language}</h3>
                                            <span className='text-sm opacity-40 '> {item.level}</span>
                                        </div>
                                        <div className="mb-3 text-purple-500 dark:text-purple-400  font-semibold" title={item.title}>
                                            {item.title?.length > 35 ? `${item.title.slice(0, 35)}...` : item.title}
                                        </div>
                                    </div>
                                    <h2>
                                        <div className="text-right ">
                                            {item.users?.length < item.limit ?
                                                <button onClick={() => joinSpace(item)}
                                                    className="text-sm font-medium hover:text-purple-500 inline-flex items-center transition duration-150 ease-in-out group "
                                                >
                                                    Join{/* */}{" "}
                                                    <svg className="w-4 h-4 ml-2 tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                    </svg>
                                                </button> :
                                                <div
                                                    className="text-sm font-medium inline-flex items-center transition duration-150 ease-in-out group opacity-70"
                                                >
                                                    Space is limited
                                                </div>
                                            }
                                        </div>
                                    </h2>

                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap overflow-hidden mb-2 ">
                            {item.users?.length > 0 &&
                                <>
                                    {item.users?.map((user: any, imgIndex: any) => (
                                        imgIndex < 9 && (
                                            <Tooltip animation="duration-500" content={user.name}>
                                                <div key={user.toString() + imgIndex} className='flex flex-col justify-center align-center items-center '>
                                                    <img key={imgIndex} className={`cursor-pointer ${item.users?.length <= 3 ? "h-24 w-24" : item.users?.length <= 8 ? "h-22 w-22" : "h-16 w-16"}  rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={user.image} alt="" />
                                                    <span className={'  text-purple-500 dark:text-purple-400 mt-1'} style={{ fontSize: "0.6rem" }}> {item.owner == user.id && "Host"} {user.name.length}</span>
                                                </div>
                                            </Tooltip>
                                        )
                                    ))}




                                    {item.users?.length && item.users.length > 8 &&
                                        <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white flex items-center justify-center dark:ring-[#272F34] bg-slate-100 dark:bg-gray-600  dark:text-gray-200" style={{ fontSize: '0.8rem' }}>
                                            {item.users.length}
                                        </div>
                                    }
                                </>
                            }
                        </div>

                    </div>

                </div>

            })}
        </div>
    )
}

export default Spaces