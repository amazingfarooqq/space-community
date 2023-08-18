"use client"

import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link';
import ThemeSwitch from '@/components/ThemeSwitch';
import Header from '@/components/Header';
import ProfileToolTip from '@/components/ProfileToolTip';
import ModalToCreateSpace from '@/components/ModalToCreateSpace';


const sampleData = [
  {
    id: "6564",
    title: "My Space",
    host: "Farooq Dad",
    language: "English",
    inviting: true,
    users: [
      { id: "123", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1234", name: "Ahmed", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
    ],
  },
  {
    id: "casdwae23",
    title: "How can one grow online presence and make a huge out of it sad",
    host: "Farooq Dad",
    language: "English",
    inviting: true,
    users: [
      { id: "3123", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
    ],
  },
  {
    id: "6564a2ds",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "512412", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "1232512",name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "a2cc6564",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "612g4", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "8657", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "98989", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564411s21",
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { id: "123213213", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5fdr", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "12321321213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23ere", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "53423fs", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "fsdr3", name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { id: "cda23s", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    id: "6564ngw",
    title: "Testing space",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { id: "51g42", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "5213", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "sgfasgf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "qweqwes", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "rwvsf", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "23asa", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "asfasgf", name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "gtasgafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { id: "vfafe", name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  // ... Add more data objects here
];


const spaceData = {
  coordinators: [
    {
      name: "Faroo Dad",
      img: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg",
      role: "Host",
    },
    {
      name: "Sarah",
      img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Co-Host",
      speaker: true,
    },
  ],
  users: [
    {
      name: "Farooq Dad",
      img: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg",
      role: "user",
      speaker: true,
    },
    {
      name: "Yarir khan",
      img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "user",
      speaker: false,
    },
    {
      name: "Sarah Khan",
      img: "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144",
      role: "user",
      speaker: false,
    }
  ],
  guest: ["Guest241", "Guest545", "Guest653", "Guest1231", "Guest77", "Guest124123", "Guest321", "Guest454"]
}

export default function Home() {
  const [showRoomWidget, setShowRoomWidget] = useState(false)
  return (
    <>
      <Header />

      <main className="flex min-h-screen flex-col items-center dark:bg-[#191D20] pb-56">



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


        <div className="mx-auto max-w-2xl  pt-10">
          <div className="text-center ">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Explore Spaces
            </h1>
          </div>
        </div>


        <div className='flex  items-start  '>
          <ModalToCreateSpace id="popup-modal" />
        </div>

        <div className="mt-6 py-10 flex flex-wrap gap-x-6 gap-y-5 sm:flex-col lg:flex-row xl:gap-x-8  justify-center items-center ">

          {sampleData.map((item, index) => (
            <div key={index} className="relative rounded-md bg-white dark:bg-[#272F34] dark:border-gray-700 w-96 h-60 border overflow-hidden">


              <div className="flex flex-col p-6 ">

                <div className="grow ">
                  <div className=" mb-1">{item.language}
                    <span className='text-sm opacity-40 '> Upper Advance</span>
                  </div>
                  <div className="mb-3 text-purple-400  " title={item.title}>
                    {item.title.length > 35 ? `${item.title.slice(0, 35)}...` : item.title}
                  </div>

                  
                </div>

                <div className="flex -space-x-2 overflow-hidden mb-2 ">
                  {item.users?.length > 0 &&
                    <>
                      {item.users?.map((user, imgIndex) => (
                        imgIndex < 6 && (
                          <>
                            <div  key={user.toString() + imgIndex} className='flex flex-col justify-center align-center items-center '>
                              <img key={imgIndex} data-tooltip-target={`tooltip-${user?.id || "00"}`} className={`cursor-pointer ${user.name == "Farooq Dad" ? "border border-purple-400 z-10 border-2 inline-block" : ""}  ${item.users?.length <= 4 ? "h-20 w-20" : item.users?.length <= 5 ? "h-16 w-16 mt-3" : "h-14 w-14 mt-3 "}  rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={user.imageUrl} alt="" />
                              <span className={' text-purple-400 mt-1'} style={{ fontSize: "0.6rem" }}>{user.name.length % 2 ? <span className=''>⭐</span> : ""} {user.name == "Farooq Dad" ? "Sparktalk" : ""} {user.name !== "Farooq Dad" && user.name.length}</span>
                            </div>

                            <ProfileToolTip name={user.name} id={`tooltip-${user?.id || "00"}`} />
                          </>
                        )
                      ))}




                      {item.users?.length && item.users.length > 7 &&
                        <div data-tooltip-target={`tooltip-3412-${item.users.length}`} className="inline-block h-10 w-10 rounded-full ring-2 ring-white flex items-center justify-center dark:ring-[#272F34] bg-slate-100 dark:bg-gray-600  dark:text-gray-200" style={{ fontSize: '0.8rem' }}>
                          {item.users.length}
                        </div>
                      }


                      <ProfileToolTip name="Total Users" id={`tooltip-3412-${item.users.length}`} />


                    </>
                  }
                </div>
                <div className="text-right ">
                  {item.users.length % 2 ?
                    <Link href="/space/21323"
                      className="text-sm font-medium hover:text-purple-400 inline-flex items-center transition duration-150 ease-in-out group"
                    >
                      <svg className="w-4 h-4 ml-1 mr-2 tracking-normal text-purple-400 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                      Join{/* */}{" "}
                    </Link> :
                    <div
                      className="text-sm font-medium inline-flex items-center transition duration-150 ease-in-out group opacity-70"
                    >
                      Space is limited
                    </div>
                  }
                </div>
              </div>
            </div>
          ))}

        </div>



      </main >
      {/* 
      <div className="fixed bottom-0 left-0 z-50 grid w-full h-16 grid-cols-1 px-8 bg-white border-t border-gray-200 md:grid-cols-3 dark:bg-[#1e272d] dark:border-gray-600">
        <div className="items-center justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex">

          <p className="text-sm font-medium text-gray-900 mr-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
            </span>
          </p>
          <span className="text-sm">Created At: </span>

          <svg
            className="w-3 h-3 mx-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
          </svg>
          <span className="text-sm">12:43 PM</span>
        </div>
        <div className="flex items-center justify-center mx-auto">

        </div>
        <div className="items-center justify-center ml-auto md:flex">
          <button
            data-tooltip-target="tooltip-participants"
            type="button"
            className="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-white dark:focus:ring-[#1e272d] dark:hover:bg-gray-600"
            onClick={() => setShowRoomWidget(!showRoomWidget)}>
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
            </svg>
            <span className="sr-only">Show participants</span>
          </button>
          <div
            id="tooltip-participants"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Show participants
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>
          <button
            data-tooltip-target="tooltip-volume"
            type="button"
            className="p-2.5 group rounded-full hover:bg-gray-100 mr-1 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M10.836.357a1.978 1.978 0 0 0-2.138.3L3.63 5H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1.63l5.07 4.344a1.985 1.985 0 0 0 2.142.299A1.98 1.98 0 0 0 12 15.826V2.174A1.98 1.98 0 0 0 10.836.357Zm2.728 4.695a1.001 1.001 0 0 0-.29 1.385 4.887 4.887 0 0 1 0 5.126 1 1 0 0 0 1.674 1.095A6.645 6.645 0 0 0 16 9a6.65 6.65 0 0 0-1.052-3.658 1 1 0 0 0-1.384-.29Zm4.441-2.904a1 1 0 0 0-1.664 1.11A10.429 10.429 0 0 1 18 9a10.465 10.465 0 0 1-1.614 5.675 1 1 0 1 0 1.674 1.095A12.325 12.325 0 0 0 20 9a12.457 12.457 0 0 0-1.995-6.852Z" />
            </svg>
            <span className="sr-only">Adjust volume</span>
          </button>
          <div
            id="tooltip-volume"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Adjust volume
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>
          <button
            data-tooltip-target="tooltip-information"
            type="button"
            className="p-2.5 group rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 dark:hover:bg-gray-600"
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Show information</span>
          </button>
          <div
            id="tooltip-information"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Show information
            <div className="tooltip-arrow" data-popper-arrow="" />
          </div>


        </div>


      </div>

      <div className="fixed bottom-16 right-0 ">
        {!showRoomWidget &&
          <div className='h-auto overflow-y-auto rounded-sm w-96 p-3 border dark:border-gray-600  bg-white dark:bg-[#1e272d]' style={{ maxHeight: "80vh" }}>
            <div className="flex justify-between ">

              <div className="">
                <p className="mt-1">
                  English
                  <span className='text-sm opacity-40 '> Upper Advance</span>
                </p>
                <h3 className="cursor-pointer  text-purple-400">
                  How can one grow online presence and make a huge out of it sad
                </h3>

                <div className='my-2 text-sm'>Co-ordinators {`( ${spaceData.coordinators.length} )`}</div>
                <div className="flex flex-wrap  ">
                  {spaceData.coordinators.map((item, index) => {
                    return (
                      <>
                        {(item.role == "Host" || item.role == "Co-Host") &&
                          <div className='flex flex-col justify-center align-center items-center'>
                            <img title={item.name} className={`inline-block m-2 h-16 w-16 rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={item.img} alt="" />
                            <span className=' text-purple-400 ' style={{ fontSize: "0.6rem" }}>
                              {item.name.length % 2 ? "⭐" : ""} {item.role}</span>
                          </div>
                        }
                      </>
                    )
                  })}
                </div>


                <div className='my-2 text-sm'>Users {`( ${spaceData.coordinators.length} )`}</div>
                <div className="flex flex-wrap  ">
                  {spaceData.users.map((item, index) => {
                    return (
                      <>
                        <div className='flex flex-col justify-center align-center items-center'>
                          <img title={item.name} className={`inline-block m-2 h-16 w-16 rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={item.img} alt="" />
                          <span className=' text-purple-400 ' style={{ fontSize: "0.6rem" }}>
                            {item.name.length % 2 ? "⭐" : ""} {item.name}</span>
                        </div>
                      </>
                    )
                  })}
                </div>

                <div className='my-2 text-sm'>Guest Users {`( ${spaceData.coordinators.length} )`}</div>
                <div className="flex flex-wrap  ">
                  {spaceData.guest.map((item, index) => {
                    return (
                      <>
                        <div title={item} className='flex flex-col justify-center align-center items-center'>
                          <div className={`inline-block bg-purple-400 h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#272F34]`}></div>
                          <span className=' text-purple-400 ' style={{ fontSize: "0.6rem" }}>{item.slice(0, 4)}..</span>
                        </div>
                      </>
                    )
                  })}
                </div>


              </div>
              <p className="text-sm font-medium text-gray-900">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
                </span>
              </p>



            </div>
          </div>
        }
      </div> */}
    </>
  )
}
