'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { SparklesIcon, UserMinusIcon, UserPlusIcon, UsersIcon, StarIcon, BoltIcon, ShieldCheckIcon, HeartIcon } from '@heroicons/react/24/outline'

type UserStatus = 'default' | 'premium' | 'moderator' | 'admin' | 'vip'

interface User {
    id: string
    name: string
    image: string
    native?: string
    learning?: string
    bio?: string
    country?: string
    followedByIds?: string[]
    followingIds?: string[]
    userStatus: UserStatus
    likes?: number
}

interface ThemeConfig {
    bgGradient: string
    textColor: string
    buttonBg: string
    buttonText: string
    iconColor: string
    circleColor: string
}

const themes: Record<UserStatus, ThemeConfig> = {
    default: {
        bgGradient: 'from-gray-100 to-gray-200',
        textColor: 'text-gray-800',
        buttonBg: 'bg-blue-600 hover:bg-blue-700',
        buttonText: 'text-white',
        iconColor: 'text-blue-500',
        circleColor: '#3B82F6',
    },
    premium: {
        bgGradient: 'from-amber-50 to-amber-100',
        textColor: 'text-amber-900',
        buttonBg: 'bg-amber-600 hover:bg-amber-700',
        buttonText: 'text-white',
        iconColor: 'text-amber-500',
        circleColor: '#D97706',
    },
    moderator: {
        bgGradient: 'from-emerald-50 to-emerald-100',
        textColor: 'text-emerald-900',
        buttonBg: 'bg-emerald-600 hover:bg-emerald-700',
        buttonText: 'text-white',
        iconColor: 'text-emerald-500',
        circleColor: '#059669',
    },
    admin: {
        bgGradient: 'from-rose-50 to-rose-100',
        textColor: 'text-rose-900',
        buttonBg: 'bg-rose-600 hover:bg-rose-700',
        buttonText: 'text-white',
        iconColor: 'text-rose-500',
        circleColor: '#E11D48',
    },
    vip: {
        bgGradient: 'from-violet-50 to-violet-100',
        textColor: 'text-violet-900',
        buttonBg: 'bg-violet-600 hover:bg-violet-700',
        buttonText: 'text-white',
        iconColor: 'text-violet-500',
        circleColor: '#7C3AED',
    },
}

export default function EnhancedUserProfileModal({ user, openUserModal, handleOnClose }: {
    user: User,
    openUserModal: boolean,
    handleOnClose: () => void
}) {
    const [isFollowed, setIsFollowed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()

    useEffect(() => {
        const isFollowed = user?.followedByIds?.some((followed: string) => followed === session?.data?.user?.id)
        setIsFollowed(isFollowed)
    }, [session, user])

    const handleFollowButton = async (userId: string, action: 'follow' | 'unfollow') => {
        if (!session.data) return
        setIsLoading(true)

        try {
            if (!session.data?.user?.email) return
            const response = await fetch(`/api/spaces/${action}User`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, currentUserEmail: session.data.user.email }),
            })

            if (!response.ok) throw new Error(`Failed to ${action} user`)
            setIsFollowed(action === 'follow')
        } catch (error) {
            console.error(`Error ${action}ing user:`, error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleOnClose();
        }
    };

    if (!openUserModal) return null
    // type UserStatus = 'default' | 'premium' | 'moderator' | 'admin' | 'vip'

    const userStatus = "premium" // user.userStatus
    const theme = themes[userStatus]

    const StatusIcon = {
        default: SparklesIcon,
        premium: StarIcon,
        moderator: BoltIcon,
        admin: ShieldCheckIcon,
        vip: StarIcon,
    }[userStatus]

    const sparkles = Array.from({ length: 50 }, (_, i) => (
        <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-yellow-300 rounded-full`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.random() * 300 - 150,
                y: Math.random() * 300 - 150,
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: Math.random() * 2,
            }}
        />
    ))

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={handleOutsideClick}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`relative w-full max-w-md bg-gradient-to-br ${theme.bgGradient} rounded-lg shadow-xl overflow-hidden `}
            // style={{
            //     boxShadow: `0 0 1px ${theme.circleColor}, 0 0 30px ${theme.circleColor}`,
            // }}
            >
                {sparkles}
                <button
                    onClick={handleOnClose}
                    className={`absolute top-2 right-2 ${theme.textColor} hover:text-opacity-70 focus:outline-none`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className={`p-6 ${theme.textColor} `}>
                    <div className="flex items-center mb-6">
                        <div className="relative backdrop-blur-sm bg-white bg-opacity-10 rounded-full p-1">
                            <div className="relative w-24 h-24">
                                <img className="w-full h-full rounded-full object-cover"
                                    src={user.image} alt={user.name}
                                />
                                <div className="absolute inset-0 rounded-full border-2 border-yellow-400"></div>
                                <StatusIcon className={`absolute -top-1 -right-1 w-6 h-6 ${theme.iconColor}`} />

                            </div>

                        </div>
                        <div className="ml-4">
                            <h2 className="text-2xl font-bold">{user.name}</h2>
                            {user?.native && (
                                <p className="text-sm opacity-75">
                                    Native in {user.native?.split("-")[0] || "English"}
                                </p>
                            )}
                            {user.learning && (
                                <p className="text-sm opacity-75">
                                    Learning {user.learning?.split("-")[0]}
                                </p>
                            )}
                            {user?.country && (

                                <div className="flex gap-2 rounded-full mt-2">

                                    <img title={user?.country?.split("-")[0]} className={`h-5`} src={`/images/flags/${user?.country?.split("-")[1]?.toLowerCase()}.png`} alt="" />
                                    <span>{user?.country?.split("-")[0]}</span>
                                </div>
                            )}
                            {/* <p className="text-sm font-semibold mt-1 capitalize">{userStatus} User</p> */}
                        </div>
                    </div>

                    <motion.div
                        className="mb-6 p-4 bg-white bg-opacity-30 rounded-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-sm">{user.bio}</p>
                    </motion.div>

                    <div className="flex justify-around mb-6">
                        <motion.div
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <UsersIcon className="w-6 h-6 mx-auto mb-1" />
                            <p className="text-xl font-bold">{user?.followedByIds?.length || 0}</p>
                            <p className="text-xs opacity-75">Followers</p>
                        </motion.div>
                        <motion.div
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <UsersIcon className="w-6 h-6 mx-auto mb-1" />
                            <p className="text-xl font-bold">{user?.followingIds?.length || 0}</p>
                            <p className="text-xs opacity-75">Following</p>
                        </motion.div>
                    </div>

                    <motion.button
                        onClick={() => handleFollowButton(user.id, isFollowed ? 'unfollow' : 'follow')}
                        className={`w-full py-2 rounded-full font-bold text-lg transition-colors ${isFollowed
                            ? 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                            : `${theme.buttonBg} ${theme.buttonText}`
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading || !session.data}
                    >
                        {isLoading ? (
                            'Loading...'
                        ) : isFollowed ? (
                            <>
                                <UserMinusIcon className="inline-block mr-2 w-5 h-5" />
                                Unfollow
                            </>
                        ) : (
                            <>
                                <UserPlusIcon className="inline-block mr-2 w-5 h-5" />
                                Follow
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}