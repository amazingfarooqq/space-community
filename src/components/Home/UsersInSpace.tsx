import React, { useState } from 'react'
import UserInSpace from './UserInSpace';

const UsersInSpace = ({ users, ownerId, index }: any) => {

    const sortedUsers = [...users].filter(user => user); // Create a copy of users array and remove undefined values

    // Find the index of the owner's user in the users array
    const ownerIndex = sortedUsers.findIndex(user => user?.id === ownerId);

    if (ownerIndex !== -1) {
        const ownerUser = sortedUsers.splice(ownerIndex, 1)[0];
        sortedUsers.unshift(ownerUser);
    }

    return (
        <>
            {sortedUsers?.map((user: any, imgIndex: any) => {
                return imgIndex < 10 && (
                    <UserInSpace users={users} imgIndex={imgIndex} user={user} ownerId={ownerId} />
                )
            })}
        </>
    )
}

export default UsersInSpace