import React from 'react'
import UserProfileCard from './UserCard'

const UsersInSpace = ({currentSpaceData}: {currentSpaceData: any}) => {
    return (
        <>

            {currentSpaceData?.users.map((user: any) => {
                return (
                    <div className='w-[250px]'>
                        <UserProfileCard user={user} />
                    </div>

                )
            })}
        </>
    )
}

export default UsersInSpace