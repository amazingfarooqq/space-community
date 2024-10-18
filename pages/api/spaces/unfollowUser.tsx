import { NextApiRequest } from 'next'
import prisma from '@/libs/prismadb'
import { NextApiResponseServerIo } from '../../../types'

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {

    console.log('req.body', req.body)

    const { userId, currentUserEmail } = req.body

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ message: 'Invalid user ID' })
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: currentUserEmail,
      },
    })

    if (!currentUser) {
      return res.status(404).json({ message: 'Current user not found' })
    }

    const userToUnfollow = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!userToUnfollow) {
      return res.status(404).json({ message: 'User to unfollow not found' })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: {
          set: currentUser.followingIds.filter(id => id !== userId),
        },
      },
      include: {
        following: true,
        followedBy: true,
      },
    })

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followedByIds: {
          set: userToUnfollow.followedByIds.filter(id => id !== currentUser.id),
        },
      },
    })

    // res?.socket?.server?.io?.emit("followUpdate", {
    //     updatedUser: updatedUser,
    //     followersCount: 12,
    //     action: 'unfollow',
    //     followerId: currentUser.id,
    // });

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}