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
  
  return (
    <>
      <main className="birdcontainer min-h-100 flex min-h-screen flex-col mb-0 pb-0 ml-24 px-4" >
        <Header />
        <Sidebar />
        <div className="bird-container bird-container--one">
          <div className="bird bird--one" />
        </div>
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
          <h2 className=" py-2 text-2xl  opacity-90">Join Space and start talking or create your own</h2>
        </div>
        <div className=" flex flex-wrap gap-5 flex-col lg:flex-row  pb-56">
          <Spaces />

          
        </div>
      </main >

    </>
  )
}