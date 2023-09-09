import { Tooltip } from 'flowbite-react'
import React from 'react'

const UsersInSpace = ({ users, ownerId }: any) => {

    const sortedUsers = [...users].filter(user => user); // Create a copy of users array and remove undefined values

    // Find the index of the owner's user in the users array
    const ownerIndex = sortedUsers.findIndex(user => user?.id === ownerId);

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
                                <div className="relative">
                                    <img key={imgIndex} className={`cursor-pointer ${users.length <= 3 ? "h-24 w-24" : users.length <= 4 ? "h-22 w-22" : "h-18 w-18"}   rounded-full ring-1 ring-white dark:ring-blue-400 mr-1`} src={user.image} alt="" />
                                    <span className="bottom-1 right-1 absolute   rounded-full text-2xl">
                                        <img className='w-6' src="/images/flags/us.png" alt="" />
                                    </span>

                                </div>
                                <span className={'  text-blue-500 dark:text-blue-400 mt-1'} style={{ fontSize: "0.6rem" }}>{ownerId == user.id ? "⭐" : ""}  {user.name?.slice(0, 6)}..</span>
                            </div>
                            {/* <div className="relative">
                                <img className="h-22 w-22 rounded-full" src={user.image} alt="" />
                                <span className="bottom-3 right-0 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                            </div> */}
                        </Tooltip>
                    )
                )
            })
            }
        </>
    )
}

export default UsersInSpace