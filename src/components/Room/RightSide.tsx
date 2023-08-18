import React from 'react'

const alphabets = ['a', 'b', 'c', 'd', 'e']

const randomAlp = () => {
    return "faroqq"
}

const sampleData = [
    {
        name: `Farooq Dad`,
        imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg",
        followers: 32,
        pro: true
    },
    {
        name: `${randomAlp()}${randomAlp()}${randomAlp()}${randomAlp()}`,
        imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        followers: 32,
        pro: true
    },
    {
        name: `Farooq Dad Khansadsadsadsadsadasdasdasdsad`,
        imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg",
        followers: 32,
        pro: true
    },
    {
        name: `${randomAlp()}${randomAlp()}${randomAlp()}${randomAlp()}`,
        imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        followers: 32,
        pro: true
    },
    {
        name: `Farooq Dad Khansadsadsadsadsadasdasdasdsad`,
        imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg",
        followers: 32,
        pro: true
    },
    {
        name: `${randomAlp()}${randomAlp()}${randomAlp()}${randomAlp()}`,
        imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        followers: 32,
        pro: true
    },
    {
        name: `Farooq Dad Khansadsadsadsadsadasdasdasdsad`,
        imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg",
        followers: 32,
        pro: true
    },
    {
        name: `${randomAlp()}${randomAlp()}${randomAlp()}${randomAlp()}`,
        imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        followers: 32,
        pro: true
    },


]
const RightSide = () => {
    return (
        <>
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl dark:opacity-0 sm:-top-80 "
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="w-3/4 flex flex-col justify-between dark:bg-[#191D20] h-[calc(100vh-3rem)] ">
                <div className="">
                    {/* Audio Call Icon */}

                </div>
                <div className="">
                    {/* Audio Call Icon */}

                </div>
                <div className="h-96  dark:bg-[#1e272d]">
                    {/* Audio Call Icon */}

                </div>
                <div className="flex flex-wrap justify-center pb-6">

                    {sampleData?.map((user, imgIndex) => (
                        <div key={user.toString() + 1} className='flex flex-col justify-center align-center items-center'>
                            <img key={imgIndex} className={`opacity-90 dark:opacity-70 border border-purple-900 inline-block h-24 w-24 rounded-lg ml-2  ring-white ${user.name == "Farooq Dad" && "ring-4"} dark:ring-[#272F34]`} src={user.imageUrl} alt="" />
                            <span title={user.name} className=' text-purple-400 mt-1' style={{ fontSize: "0.6rem" }}>{user.pro && "⭐"}   {user.name.length > 9 ? `${user.name?.slice(0, 9)}...` : user.name}</span>
                        </div>
                    ))}


                </div>
            </div>
        </>
    )
}

export default RightSide