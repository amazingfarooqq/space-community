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
import { v4 as uuidv4 } from 'uuid';
import { useSession } from 'next-auth/react';
import SidebarToCreateSpace from '@/components/SidebarToCreateSpace';
import { Spinner } from 'flowbite-react';
import SidebarbarToCreateSpace from '@/components/SidebarToCreateSpace';
import { navigation } from '@/components/Header/navigation';
import { AdjustmentsHorizontalIcon, Bars2Icon, Bars3Icon, Bars4Icon, CameraIcon, HomeIcon, LinkIcon, SpeakerXMarkIcon, StarIcon, TableCellsIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SocialSide from '@/components/Home/SocialSide';

interface User {
  id: string;
  name: string;
  currentSpaceId: string;
}

interface Space {
  ownerId: string;
  ownerName: string;
  ownerImage: string;
  title: string;
  language: string;
  level: string;
  limit: string;
}



export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <main className="birdcontainer min-h-100 flex min-h-screen flex-col mb-0 pb-0 ml-16 md:ml-24 px-4" >
        <Header />
        <Sidebar />
        <SidebarbarToCreateSpace open={open} setOpen={setOpen} />

        {/* <div className="bird-container bird-container--one">
          <div className="bird bird--one" />
        </div> */}
        {/* <BGGradient /> */}

        {/* <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl dark:opacity-50 sm:-top-80 " aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              background:
                "linear-gradient(106.89deg, rgba(192, 132, 252, 0.31) 15.73%, rgba(14, 165, 233, 0.21) 15.74%, rgba(232, 121, 249, 0.36) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
            }}
          />
        </div> */}
        <div className=" mx-auto pb-10">
          <h2 className=" py-2 text-2xl  opacity-90 text-center">Language practice community</h2>
          {/* <h2 className=" py-2 text-2xl  opacity-90 text-center">Join Space and start talking or create your own</h2> */}
        </div>
        <div className='pb-5 flex flex-wrap gap-2'>
          <button className="text-sm px-10 font-medium inline-flex items-center transition duration-150 ease-in-out py-2 rounded-md bg-blue-600 dark:bg-blue-500 text-white opacity-90 hover:opacity-80 focus:bg-blue-700" onClick={() => setOpen(true)}>Create space
          </button>
        </div>

        <div className=" flex flex-wrap gap-5 flex-col lg:flex-row  pb-56">
          <Spaces />
        </div>

        <SocialSide />

      </main >

    </>
  )
}