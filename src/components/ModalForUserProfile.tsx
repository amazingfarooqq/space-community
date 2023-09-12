'use client';

import { Avatar, Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export default function ModalForUserProfile({ user, openUserModal, handleOnClose }) {


    console.log({user});
    
    return (
        <>
            <Modal dismissible show={openUserModal} size="md" popup onClose={handleOnClose}>
                <Modal.Header />
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
                        <h3 className="mb-5 mt-3  font-normal text-gray-500 dark:text-gray-400">
                            {user.bio}
                        </h3>
                        <div className="flex justify-center gap-4">
                            {/* <Button color="failure" onClick={() => handleOnClose}>
                                Yes, I'm sure
                            </Button> */}
                            <Button color="gray" onClick={handleOnClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}


