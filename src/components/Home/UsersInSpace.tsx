import { Button, Tooltip } from 'flowbite-react'
import React, { useState } from 'react'
import ModalForUserProfile from '../ModalForUserProfile';
import UserInSpace from './UserInSpace';

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
            {
                sortedUsers?.map((user: any, imgIndex: any) => {

                    return (
                        <>
                            {imgIndex < 10 && (
                                <UserInSpace users={users} user={user} ownerId={ownerId} />
                            )}
                        </>
                    )
                })
            }
        </>
    )
}

export default UsersInSpace