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
import { useSession } from 'next-auth/react';

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
  const { socket, setSpaces, spaces }: any = useSocket()
  const { userData }: any = useUser()
  const router = useRouter()

  const session = useSession()

  const [isCreateSpaceModal, setIsCreateSpaceModal] = useState("hide")
  const [isLoginModal, setIsLoginModal] = useState<string | undefined>();

  const createSpace = async (spaceData: any) => {

    if (session.status == "loading") {
      toast.error('please try again in a minute');
      return
    }

    if (session.status !== "authenticated") {
      toast.error('You need to login first');
      return
    }

    try {
      const spaceid = uuidv4()
      const newSpace = {
        owner: userData.id,
        title: spaceData.title || "Lets talk in english",
        language: spaceData.language || "English",
        level: spaceData.level || "Begineer",
        limit: spaceData.limit.toString() || "10",
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



  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSpaces, setFilteredSpaces] = useState([]);

  useEffect(() => {
    // Fetch spaces data here or use your existing data fetching logic

    // Filter spaces based on search query
    const filtered = spaces.filter((space) => {
      const { title, language, level, limit } = space;
      const queryLowerCase = searchQuery.toLowerCase();

      return (
        title.toLowerCase().includes(queryLowerCase) ||
        language.toLowerCase().includes(queryLowerCase) ||
        level.toLowerCase().includes(queryLowerCase) ||
        limit.toLowerCase().includes(queryLowerCase)
      );
    });

    setFilteredSpaces(filtered);
  }, [searchQuery, spaces]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Sidebar />
      <main className="birdcontainer min-h-100 flex min-h-screen flex-col pb-56 ml-16 px-10">
        <Header />
        <div className="bird-container bird-container--one">
          <div className="bird bird--one" />
        </div>
        {/* <BGGradient /> */}



        {/* <div
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
        </div> */}

        <div className='mt-4 flex flex-wrap mt-4 '>
          <ModalToCreateSpace id="popup-modal" isCreateSpaceModal={isCreateSpaceModal} setIsCreateSpaceModal={setIsCreateSpaceModal} createSpace={createSpace} />
        </div>
        {/* <input
          value={searchQuery}
          onChange={handleSearchInputChange}
          type="text"
          placeholder="Search space by user, title, language, level, limit, etc"
          className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-700 dark:bg-gray-800"
        /> */}
        <div className="py-6 flex flex-wrap gap-5 flex-col lg:flex-row  ">
          <Spaces filteredSpaces={filteredSpaces} joinSpace={joinSpace} />
        </div>
      </main >



    </>
  )
}