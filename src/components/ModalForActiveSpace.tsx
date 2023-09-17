'use client';

import { Avatar, Button, Dropdown, Modal } from 'flowbite-react';
import { useState } from 'react';
import UsersInSpace from './Home/UsersInSpace';

export default function ModalForActiveSpace({ space, openModal, handleOnClose }: any) {

    return (
        <>
            <Modal dismissible show={openModal} size="md" popup onClose={handleOnClose} > 
                {/* <Modal.Header /> */}
                <Modal.Body className={`flex h-full flex-col justify-between px-4 py-3  animate-fade-in relative border dark:border-gray-700 bg-gray-100 dark:bg-gray-800 lg:w-98 ${space.users.length == 0 ? "h-60" : "h-auto"} lg:h-80 overflow-hidden ml-0 rounded-md  shadow-lg  `}>
                        
                        <div className="w-full text-sm items-start">
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
                                <div>
                                    <Dropdown
                                        placement="bottom-end"
                                        inline
                                        label=""
                                        className='w-36 '
                                    >

                                        <div className='px-3 my-2  text-center flex justify-center'>
                                            <img src={space?.ownerImage} className='w-14 h-14 rounded-full border' alt="" />
                                        </div>
                                        <div className='px-3 my-2  text-center'>
                                            <span className=''>{space?.ownerName}</span>
                                        </div>
                                        <div className='mx-auto flex flex-col justify-center px-3'>
                                            <div className='pt-1'>Create At</div>
                                            <div className='pt-1'>{space?.createdAt}</div>
                                        </div>

                                    </Dropdown>
                                </div>

                            </div>
                        </div>
                        <div className={`flex flex-wrap ${space.users.length == 0 ? "h-[100px]" : "h-[190px]"} `}>
                            {space.users.length > 0 && <UsersInSpace users={space.users} ownerId={space.ownerId} />}
                            {space.users?.length && space.users.length > 9 ?
                                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white flex items-center justify-center dark:ring-[#272F34] bg-slate-100 dark:bg-gray-600  dark:text-gray-200" style={{ fontSize: '0.8rem' }}>
                                    {space.users.length}
                                </div> : ""
                            }
                        </div>

                        <div className='flex justify-between'>
                            <div className="text-right  bottom-3 left-3   ">
                                <div className="text-sm font-medium px-3 py-2 rounded-xl bg-gray-100 shadow-md dark:bg-gray-700">{space.level}</div>
                            </div>
                            <div className="text-right  z-100 bottom-3 right-3   ">
                                {space.users.length < space.limit ?
                                    <button onClick={() => joinSpace(space.id)}
                                        className="text-sm font-medium inline-flex items-center transition duration-150 ease-in-out group border px-4 py-2 rounded-xl border-blue-200 dark:border-gray-600 border-dashed hover:text-blue-400 ">Join space
                                        <svg className="w-4 h-4 ml-2 tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </button> :
                                    <div
                                        className="text-sm font-medium text-gray-700 dark:text-red-400 inline-flex items-center transition duration-150 ease-in-out group  py-2 rounded-xl text-red-500 ">Space is Full
                                    </div>
                                }
                            </div>
                        </div>
                </Modal.Body>
            </Modal>
        </>
    )
}


