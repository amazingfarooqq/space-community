"use client"

import Header from '@/components/Header';
import Sidebar from '@/components/sidebar/Sidebar';
import BGGradient from '@/components/BGGradient';
import Spaces from '@/components/Home/Spaces';
import ModalToCreateSpace from '@/components/ModalToCreateSpace';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { set } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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


  const [showRoomWidget, setShowRoomWidget] = useState(false)


  const [isCreateSpaceModal, setIsCreateSpaceModal] = useState("hide")

  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [user, setuser] = useState({ id: "", userid: "", name: "", email: "", image: "", currentSpaceId: "" })
  console.log({ user });
  console.log({ spaces });


  const router = useRouter()

  const session = useSession()


  const getSpaces = async () => {
    try {
      let data = await axios.get("/api/spaces/getSpaces")

      if (data?.data) {
        setSpaces(data.data)
      } else {
        console.log("nothing");

      }

    } catch (error) {
      console.log({ error });

    }
  }
  useEffect(() => {
    console.log({ session });

    if (session.status == "loading") return;
    if (session.status == "unauthenticated") return setuser({ id: "", userid: "", name: "", email: "", image: "", currentSpaceId: "" });
    if (session.status == "authenticated") return setuser({ ...user, userid: session.data.user?.id || "", email: session.data?.user?.email || "", image: session.data.user?.image || "" });

  }, [session.status])

  useEffect(() => {

    getSpaces()
    if (socket) return
    let s;
    const existingSocketId = localStorage.getItem('socketId');
    const existingSpace = localStorage.getItem('spaceid');

    console.log(existingSpace);

    if (existingSocketId) {

      const socket = io("http://localhost:4000", {
        query: { socketId: existingSocketId },
      });
      s = socket;

      console.log({ socketid: socket, s: s });

      setSocket(socket)
      setuser(prevUser => ({ ...prevUser, id: existingSocketId, currentSpaceId: existingSpace || "" }))
    } else {

      const socket = io("http://localhost:4000");
      s = socket;

      console.log({ socketid: socket.io, s: s.id });
      const socketId = socket.id;
      localStorage.setItem('socketId', socketId);
      setSocket(socket)
      setuser(prevUser => ({ ...prevUser, id: socket.id, currentSpaceId: existingSpace || "" }))
    }

    // s.on('connect', () => {
    //   console.log("connect");
    //   setuser(prevUser => ({ ...prevUser, id: s.id }))
    // });


    s.on('create_space_response', (newSpace: Space) => {
      setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
    });

    s.on('space_updated_response', (updatedSpace: Space) => {
      setSpaces((prevSpaces: any) => {

        return prevSpaces.map((space: any) => {
          return space.id === updatedSpace.id ? updatedSpace : space
        })

      });
    });


    s.on('on_disconnected', (data) => {
      const disconnectedUserId = data.userid;
      const currentSpaceId = data.currentSpace;

      if (!currentSpaceId) return
      const getSpace = async () => {
        const currentSpace = await axios.post(`/api/spaces/getSpace`, { spaceId: currentSpaceId })
        const spacedata = currentSpace.data
        spacedata.userIds = spacedata.userIds.filter((id: any) => id !== disconnectedUserId);
        const updatespaceSpace = await axios.post(`/api/spaces/joinSpace`, { space: spacedata })

        const join_space_data = {
          userid: user.userid,
          updatedSpace: updatespaceSpace.data
        }

        s?.emit('join_space', join_space_data);

      }

      getSpace()
    });


    return () => {
      s.off('create_space_response');
      s.off('space_updated_response');
    };
  }, []);

  const logout = () => {
    // console.log(socket?.connected);

    // // Find the space the user was in
    // const userSpace = spaces.find(space => space.id === user.currentSpaceId);
    // console.log({ userSpace });

    // if (userSpace) {
    //   // Remove the user from the space
    //   userSpace.userIds = userSpace.userIds.filter(id => id !== user.id);
    //   userSpace.users = userSpace.users.filter(u => u.id !== user.id);

    //   // Emit the updated space to the server
    //   socket?.emit('leave_space', userSpace);

    //   // Update the state
    //   setSpaces(prevSpaces =>
    //     prevSpaces.map(space =>
    //       space.id === user.currentSpaceId ? userSpace : space
    //     )
    //   );


    //   // Clear the user's current space
    //   setuser(prevUser => ({ ...prevUser, currentSpaceId: '' }));
    // }

    // // socket?.disconnect();
    // // console.log(socket?.connected);
  }

  const connect = () => {
    socket?.connect();
  }

  const createSpace = async (spaceDate, setIsCreateSpaceModal) => {
    console.log({ spaceDate });

    if (session.status === 'unauthenticated') return toast.error('Please login first')

    const newSpace: Space = {
      owner: user.userid,
      title: spaceDate.title || "New Space",
      language: spaceDate.language || "English",
      level: spaceDate.level || "Beginner",
      limit: spaceDate.limit || "4",
    };
    const createNewSpace = await axios.post('/api/spaces/createSpace', {
      newSpace
    })

    const newspacedata = { ...createNewSpace.data }

    console.log({ newspacedata });

    socket?.emit('create_space', newspacedata);

    setIsCreateSpaceModal(false)

  };


  const handleSpaceUpdate = (response: any) => {
    console.log({ response });

    if (response.status === 200) {
      const updatedSpace = response.data;
      console.log({ updatedSpace });

      const join_space_data = {
        userid: user.userid,
        updatedSpace: updatedSpace
      }

      // Emit the updated new space through Socket.IO
      socket?.emit('join_space', join_space_data);
    } else {
      console.error('Failed to update space');
    }
  };

  const joinSpace = async (space: any) => {
    console.log("spaceid", space.id);

    if (!user.userid) {
      return toast.error('Please login first');
    }

    if (space.id === user.currentSpaceId) {
      return toast.error('You are already in this space');
    }

    localStorage.setItem('spaceid', space.id);
    const newUser = {
      ...user,
      currentSpaceId: space.id,
    };
    setuser(newUser);

    const prevSpaceIndex = spaces.findIndex((s: any) => s.id === user.currentSpaceId);

    if (prevSpaceIndex !== -1) {
      const prevSpace = { ...spaces[prevSpaceIndex] };
      prevSpace.userIds = prevSpace.userIds.filter(id => id !== user.userid);

      try {
        const response = await axios.post('/api/spaces/joinSpace', { space: prevSpace });
        handleSpaceUpdate(response);
      } catch (error) {
        console.error('Failed to update space:', error);
      }
    }

    space.userIds = Array.from(new Set([...space.userIds, user.userid]));

    try {
      const response = await axios.post('/api/spaces/joinSpace', { space });
      handleSpaceUpdate(response);

    router.push(`/space/${response.data.id}?from=home`)

    } catch (error) {
      console.error('Failed to update space:', error);
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pb-56 ml-20">
        <BGGradient />
        <Sidebar />

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
        <div className='mt-4 flex flex-wrap gap-x-2 gap-y-2 justify-center items-center '>
          <ModalToCreateSpace id="popup-modal" isCreateSpaceModal={isCreateSpaceModal} setIsCreateSpaceModal={setIsCreateSpaceModal} createSpace={createSpace} />
          <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-900">Community</button>
        </div>
        <div className="py-6 flex flex-wrap gap-x-6 ml-1 lg:ml-10 gap-y-5 flex-col lg:flex-row xl:gap-x-8   ">
          <Spaces spaces={spaces} setSpaces={setSpaces} joinSpace={joinSpace} />
        </div>
      </main >


    </>
  )
}
  // {currentSpaceTest?.id &&
  //   <>
  //     <div className="fixed bottom-0 left-0 z-50 grid w-full h-16 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-[#191D20] dark:border-gray-600 ">
  //       <div className="items-center justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex">

  //         <p className="text-sm font-medium text-gray-900 mr-3">
  //           <span className="relative flex h-3 w-3">
  //             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
  //             <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
  //           </span>
  //         </p>
  //         <span className="text-sm">Created At: </span>

  //         <svg
  //           className="w-3 h-3 mx-2"
  //           aria-hidden="true"
  //           xmlns="http://www.w3.org/2000/svg"
  //           fill="currentColor"
  //           viewBox="0 0 20 20"
  //         >
  //           <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
  //         </svg>
  //         <span className="text-sm">12:43 PM</span>
  //       </div>
  //       <div className="flex items-center justify-center mx-auto">

  //       </div>
  //       <div className="items-center justify-center ml-auto md:flex">
  //         <button
  //           data-tooltip-target="tooltip-participants"
  //           type="button"
  //           className="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-white dark:focus:ring-[#1e272d] dark:hover:bg-gray-600"
  //           onClick={() => setShowRoomWidget(!showRoomWidget)}>
  //           <svg
  //             className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="currentColor"
  //             viewBox="0 0 20 18"
  //           >
  //             <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
  //           </svg>
  //           <span className="sr-only">Show participants</span>
  //         </button>
  //         <div
  //           id="tooltip-participants"
  //           role="tooltip"
  //           className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
  //         >
  //           Show participants
  //           <div className="tooltip-arrow" data-popper-arrow="" />
  //         </div>
  //         <button
  //           data-tooltip-target="tooltip-volume"
  //           type="button"
  //           className="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
  //         >
  //           <svg
  //             className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="currentColor"
  //             viewBox="0 0 20 18"
  //           >
  //             <path d="M10.836.357a1.978 1.978 0 0 0-2.138.3L3.63 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1.63l5.07 4.344a1.985 1.985 0 0 0 2.142.299A1.98 1.98 0 0 0 12 15.826V2.174A1.98 1.98 0 0 0 10.836.357Zm2.728 4.695a1.001 1.001 0 0 0-.29 1.385 4.887 4.887 0 0 1 0 5.126 1 1 0 0 0 1.674 1.095A6.645 6.645 0 0 0 16 9a6.65 6.65 0 0 0-1.052-3.658 1 1 0 0 0-1.384-.29Zm4.441-2.904a1 1 0 0 0-1.664 1.11A10.429 10.429 0 0 1 18 9a10.465 10.465 0 0 1-1.614 5.675 1 1 0 1 0 1.674 1.095A12.325 12.325 0 0 0 20 9a12.457 12.457 0 0 0-1.995-6.852Z" />
  //           </svg>
  //           <span className="sr-only">Adjust volume</span>
  //         </button>
  //         <div
  //           id="tooltip-volume"
  //           role="tooltip"
  //           className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
  //         >
  //           Adjust volume
  //           <div className="tooltip-arrow" data-popper-arrow="" />
  //         </div>
  //         <button
  //           data-tooltip-target="tooltip-information"
  //           type="button"
  //           className="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
  //         >
  //           <svg
  //             className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
  //             aria-hidden="true"
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="currentColor"
  //             viewBox="0 0 20 20"
  //           >
  //             <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
  //           </svg>
  //           <span className="sr-only">Show information</span>
  //         </button>
  //         <div
  //           id="tooltip-information"
  //           role="tooltip"
  //           className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
  //         >
  //           Show information
  //           <div className="tooltip-arrow" data-popper-arrow="" />
  //         </div>


  //       </div>


  //     </div>
  //     <div className="fixed bottom-16 right-0 ">
  //       {!showRoomWidget &&
  //         <div className='h-auto overflow-y-auto rounded-sm w-96 p-3 border dark:border-gray-600  bg-white dark:bg-[#1e272d]' style={{ maxHeight: "80vh" }}>
  //           <div className="flex justify-between ">

  //             <div className="">
  //               <p className="mt-1">
  //                 {currentSpaceTest.language}
  //                 <span className='text-sm opacity-40 '> {currentSpaceTest.level}</span>
  //               </p>
  //               <h3 className="cursor-pointer  text-purple-400">
  //                 {currentSpaceTest.title}
  //               </h3>

  //               {/* <div className='my-2 text-sm'>Co-ordinators {`( ${spaceData.coordinators.length} )`}</div>
  //           <div className="flex flex-wrap  ">
  //             {spaceData.coordinators.map((item, index) => {
  //               return (
  //                 <>
  //                   {(item.role == "Host" || item.role == "Co-Host") &&
  //                     <div className='flex flex-col justify-center align-center items-center'>
  //                       <img title={item.name} className={`inline-block m-2 h-16 w-16 rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={item.img} alt="" />
  //                       <span className=' text-purple-400 ' style={{ fontSize: "0.6rem" }}>
  //                         {item.name.length % 2 ? "⭐" : ""} {item.role}</span>
  //                     </div>
  //                   }
  //                 </>
  //               )
  //             })}
  //           </div> */}


  //               <div className='my-2 text-sm'>Users {`( ${currentSpaceTest?.users?.length} )`}</div>
  //               <div className="flex flex-wrap  ">
  //                 {currentSpaceTest?.users?.map((item, index) => {
  //                   return (
  //                     <>
  //                       <div className='flex flex-col justify-center align-center items-center'>
  //                         <img title={item.name} className={`inline-block m-2 h-16 w-16 rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={item.image} alt="" />
  //                         <span className=' text-purple-400 ' style={{ fontSize: "0.6rem" }}>
  //                           {item.name.length % 2 ? "⭐" : ""} {item.name}</span>
  //                       </div>
  //                     </>
  //                   )
  //                 })}
  //               </div>

  //               {/* <div className='my-2 text-sm'>Guest Users {`( ${spaceData.coordinators.length} )`}</div> */}
  //               {/* <div className="flex flex-wrap  ">
  //             {spaceData.guest.map((item, index) => {
  //               return (
  //                 <>
  //                   <div title={item} className='flex flex-col justify-center align-center items-center'>
  //                     <div className={`inline-block bg-purple-400 h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#272F34]`}></div>
  //                     <span className=' text-purple-400 ' style={{ fontSize: "0.6rem" }}>{item.slice(0, 4)}..</span>
  //                   </div>
  //                 </>
  //               )
  //             })}
  //           </div> */}


  //             </div>
  //             <p className="text-sm font-medium text-gray-900">
  //               <span className="relative flex h-3 w-3">
  //                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
  //                 <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
  //               </span>
  //             </p>



  //           </div>
  //         </div>
  //       }
  //     </div>
  //   </>
  // }
