'use client';

import { useUser } from '@/contexts/UserContext';
import { Avatar, Card, Dropdown } from 'flowbite-react';
import ModalForUserProfile from '../ModalForUserProfile';
import { useState } from 'react';

export default function UserProfileCard({ user }) {
    const [openUserModal, setopenUserModal] = useState(false)

    const handleOnOpen = () => {
        setopenUserModal(true)
    }

    const handleOnClose = () => {
        setopenUserModal(false)
    }
    return (
        <>
            <Card className='dark:bg-[#20354b]'>
                <div className='relative'>
                    <div className="absolute right-0 flex justify-end w-56">
                        <Dropdown
                            placement="bottom-end"
                            inline
                            label=""
                        >
                            <Dropdown.Item>
                                <a
                                    className="block pr-10 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    href="#"
                                >
                                        Kick
                                </a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <a
                                    className="block pr-10 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    href="#"
                                >
                                    <p>
                                        Delete
                                    </p>
                                </a>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex flex-col items-center my-3">
                    <div className="relative" onClick={handleOnOpen}>

                        <img className={`cursor-pointer  h-22 w-22 rounded-full ring-1 ring-white dark:ring-blue-400 mr-1`} src={user.image} alt="" />
                        <span className="bottom-1 right-1 absolute   rounded-full text-2xl">
                            <img className='w-6' src={`/images/flags/${user?.country?.split("-")[1]?.toLowerCase()}.png`} alt="" />
                        </span>

                    </div>
                    <h5 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">
                        {user.name.length > 15 ? `${user.name?.slice(0, 15)}...` : user.name}
                    </h5>
                </div>
            </Card>

            {openUserModal && (
                <ModalForUserProfile
                    user={user}
                    openUserModal={openUserModal}
                    handleOnClose={handleOnClose}
                />
            )}
        </>
    )
}


