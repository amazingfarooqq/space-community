"use client"

import Header from '@/components/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import BGGradient from '@/components/BGGradient';
import Spaces from '@/components/Home/Spaces';
import ModalToCreateSpace from '@/components/ModalToCreateSpace';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { useSocket } from '@/contexts/SocketContext';
import FormElements from '@/components/ModalToLogin';
import { v4 as uuidv4 } from 'uuid';
import Pusher from 'pusher-js';
import { pusherClient } from '@/libs/pusher';

interface User {
  id: string;
  name: string;
  currentSpaceId: string;
}

interface Space {
  owner: string;
  title: string;
  language: string;
  level: string;
  limit: string;
}



export default function Home() {
  const { socket, setSpaces }: any = useSocket()
  const { userData }: any = useUser()
  const router = useRouter()

  const [isCreateSpaceModal, setIsCreateSpaceModal] = useState("hide")
  const [isLoginModal, setIsLoginModal] = useState<string | undefined>();

  const createSpace = async (spaceData: any) => {

    console.log({ userData });

    if (!userData?.id) {
      toast.error('You need to login first');
      return
    }

    console.log(spaceData.limit);

    try {
      const spaceid = uuidv4()
      const newSpace = {
        owner: userData.id,
        title: spaceData.title || "Lets talk in english",
        language: spaceData.language || "English",
        level: spaceData.level || "Begineer",
        limit: spaceData.limit.toString() || "10",
        // users: []
      };
      const createNewSpace = await axios.post('/api/spaces/createSpace', {
        newSpace
      })
      toast.success('Space created!');
      setIsCreateSpaceModal("hide")

    } catch (error) {
      console.log(error);

      toast.error('There was some error, try again');
    }
  }

  // const createSpace = () => {
  //   let spaceid = uuidv4()
  //   const newSpace = {
  //     id: spaceid,
  //     title: spacetitle || "new space title"
  //   }
  //   socket?.emit("send_space", newSpace)
  // }

  const joinSpace = (spaceId: any) => {

    if (!userData?.id) {
      toast.error('Hey, you magnificent human! Just give me a snazzy nickname!')
      setIsLoginModal("show")
      return
    }
    router.push(`/space/${spaceId}`)
  }

 

  return (
    <>
      <div >
        <Header />
        <main className="flex min-h-screen flex-col pb-56 ml-24">
          <BGGradient />
          <Sidebar />

          {/* bg gradient */}
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl dark:opacity-50 sm:-top-80 "
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                background:
                  "linear-gradient(106.89deg, rgba(192, 132, 252, 0.31) 15.73%, rgba(14, 165, 233, 0.21) 15.74%, rgba(232, 121, 249, 0.36) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
              }}
            />
          </div>
          {/* bg gradient end */}

          <div className='mt-4 flex flex-wrap gap-x-2 gap-y-2 mt-4 lg:ml-6 '>
            {/* <FormElements isLoginModal={isLoginModal} setIsLoginModal={setIsLoginModal} /> */}
            <ModalToCreateSpace id="popup-modal" isCreateSpaceModal={isCreateSpaceModal} setIsCreateSpaceModal={setIsCreateSpaceModal} createSpace={createSpace} />
            {/* <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-900">Community</button> */}
          </div>
          <div className=" ">
            <Spaces setSpaces={setSpaces} joinSpace={joinSpace} />
          </div>
        </main >

      </div>


    </>
  )
}