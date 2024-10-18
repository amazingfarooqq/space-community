import { Avatar, Button, Tooltip } from 'flowbite-react'
import React, { useState } from 'react'
import ModalForUserProfile from '../ModalForUserProfile';
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion'

const UserInSpace = ({ users, user, ownerId }: any) => {

    const [openUserModal, setopenUserModal] = useState(false)

    const handleOnOpen = () => {
        setopenUserModal(true)
    }

    const handleOnClose = () => {
        setopenUserModal(false)
    }

    return (
        <>
            <Tooltip animation="duration-500" content={`${ownerId == user.id ? "⭐" : ""} ${user.name}`}>
                <motion.div
                    className="relative"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 1 }}
                >
                    <div key={user.toString()} className='relative flex flex-col justify-center align-center items-center py-1'>
                        <div className="relative cursor-pointer " onClick={handleOnOpen}>
                            {/* <Avatar size={`h-18 w-18`} rounded bordered={false} img={user.image} /> */}
                            <img className={`cursor-pointer rounded ${users.length <= 3 ? "h-24 w-24" : users.length <= 4 ? "h-22 w-22" : "h-18 w-18"} rounded-full ring-1 ring-ring-gray-400 dark:ring-gray-700 mr-1`} src={user.image} alt="" />
                            <span className="top-2 right-2 absolute   rounded-full text-2xl">
                                <img title={user?.country?.split("-")[0]} className={`h-3`} src={`/images/flags/${user?.country?.split("-")[1]?.toLowerCase()}.png`} alt="" />
                            </span>

                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-2 py-1 flex gap-2 items-center shadow-md">
                                <div className='flex'>
                                    <HeartIcon className="w-4 h-4 text-red-500 mr-1" />
                                    <span className="text-xs font-semibold text-gray-700">{user.followedByIds?.length || 0} </span>
                                </div>
                                {/* <div className='flex'>
                                <HeartIcon className="w-4 h-4 text-red-500 mr-1" />
                                <span className="text-xs font-semibold text-gray-700">{user.followedByIds?.length || 0} </span>
                            </div> */}

                            </div>



                        </div>
                        {/* <span className={'mt-1'} style={{ fontSize: "0.6rem" }}>{ownerId == user.id ? "⭐" : ""}  {user.name?.slice(0, 6)}..</span> */}
                    </div>

                </motion.div>
            </Tooltip>
            <ModalForUserProfile
                user={user}
                openUserModal={openUserModal}
                handleOnClose={handleOnClose}
            />
        </>
    )
}

export default UserInSpace