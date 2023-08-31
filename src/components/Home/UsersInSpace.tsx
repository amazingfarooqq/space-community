import { Tooltip } from 'flowbite-react'
import React from 'react'

const UsersInSpace = ({ users, ownerId }: any) => {
    const sortedUsers = [...users]; // Create a copy of users array

    // Find the index of the owner's user in the users array
    const ownerIndex = sortedUsers.findIndex(user => user.id === ownerId);

    if (ownerIndex !== -1) {
        // Remove the owner's user from the array
        const ownerUser = sortedUsers.splice(ownerIndex, 1)[0];

        // Place the owner's user at the beginning of the array
        sortedUsers.unshift(ownerUser);
    }
    return (
        <>
            {sortedUsers?.map((user: any, imgIndex: any) => {

                    return (
                        imgIndex < 10 && (
                            <Tooltip animation="duration-500" content={`${ownerId == user.id ? "⭐" : ""} ${user.name}`}>
                                <div key={user.toString() + imgIndex} className='flex flex-col justify-center align-center items-center py-1'>
                                    <img key={imgIndex} className={`cursor-pointer ${users.length <= 3 ? "h-24 w-24" : users.length <= 4 ? "h-22 w-22" : "h-18 w-18"}   rounded-full ring-1 ring-white dark:ring-purple-400 mr-1`} src={user.image} alt="" />
                                    <span className={'  text-purple-500 dark:text-purple-400 mt-1'} style={{ fontSize: "0.6rem" }}>{ownerId == user.id ? "⭐" : ""}  {user.name?.slice(0, 6)}..</span>
                                </div>
                            </Tooltip>
                        )
                    )
                })
            }
        </>
    )
}

export default UsersInSpace