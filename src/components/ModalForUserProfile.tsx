'use client';

import { Avatar, Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export default function ModalForUserProfile({ user, openUserModal, handleOnClose }: any) {

    const [isFollowed, setIsFollowed] = useState(false)
    const followUser = () => {
        setIsFollowed(true)
    }
    const unfollowUser = () => {
        setIsFollowed(false)
    }
    return (
        <>
            <Modal dismissible show={openUserModal} size="md" popup onClose={handleOnClose}>
                <Modal.Header>

                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2">
                        {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                        <div className='flex gap-3'>
                            <div className="relative">
                                <img className={`cursor-pointer h-22 w-22 rounded-full ring-1 ring-white dark:ring-blue-400 mr-1`} src={user.image} alt="" />
                                <span className="bottom-1 right-1 absolute   rounded-full text-2xl">
                                    <img className='w-6' src={`/images/flags/${user?.country?.split("-")[1]?.toLowerCase()}.png`} alt="" />
                                </span>

                            </div>
                            <div>
                                <div className='text-xl'>{user.name}</div>
                                <div className='font-normal text-gray-500 dark:text-gray-400'>Native In {user.native?.split("-")[0] || "English"}</div>
                                {user.learning &&
                                    <div className='font-normal text-gray-500 dark:text-gray-400'>Learning {user.learning?.split("-")[0]}</div>
                                }

                            </div>

                        </div>
                        <div className='flex flex-wrap text-sm p-4 py-5'>
                            <div className="mr-4 text-center">
                                <span className="block">32</span>
                                <span className="text-blueGray-400">Followers</span>
                            </div>
                            <div className="mr-4 text-center">
                                <span className="block ">
                                    44
                                </span>
                                <span className="text-blueGray-400">Following</span>
                            </div>
                        </div>

                        <h3 className="mb-5 mt-3  font-normal text-gray-500 dark:text-gray-400">
                            {user.bio}
                        </h3>
                        <div className="flex justify-center gap-4">
                            {/* <Button color="failure" onClick={() => handleOnClose}>
                                Yes, I'm sure
                            </Button> */
                                <div className='flex flex-wrap text-sm '>
                                    {isFollowed ?
                                        <button onClick={unfollowUser}
                                            className="bg-gray-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Following
                                        </button> :
                                        <button onClick={followUser}
                                            className="bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Follow
                                        </button>
                                    }
                                </div>}
                            {/* <Button color="gray" onClick={handleOnClose}>
                                Close
                            </Button> */}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}


