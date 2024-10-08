import { Button, Tooltip } from 'flowbite-react'
import React, { useState } from 'react'
import ModalForUserProfile from '../ModalForUserProfile';

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
                <div key={user.toString()} className='flex flex-col justify-center align-center items-center py-1'>
                    <div className="relative" onClick={handleOnOpen}>

                        <img className={`cursor-pointer ${users.length <= 3 ? "h-24 w-24" : users.length <= 4 ? "h-22 w-22" : "h-18 w-18"}   rounded-full ring-1 ring-ring-gray-400 dark:ring-gray-700 mr-1`} src={user.image} alt="" />
                        <span className="bottom-1 right-1 absolute   rounded-full text-2xl">
                            <img title={user?.country?.split("-")[0]} className={`h-4`} src={`/images/flags/${user?.country?.split("-")[1]?.toLowerCase()}.png`} alt="" />
                        </span>

                    </div>
                    <span className={'mt-1'} style={{ fontSize: "0.6rem" }}>{ownerId == user.id ? "⭐" : ""}  {user.name?.slice(0, 6)}..</span>
                </div>
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