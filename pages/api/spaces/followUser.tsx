import { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {

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

    const userToFollow = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!userToFollow) {
      return res.status(404).json({ message: 'User to follow not found' })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: {
          push: userId,
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
          push: currentUser.id,
        },
      },
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}