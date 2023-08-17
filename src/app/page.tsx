"use client"

import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link';
import ThemeSwitch from '@/components/ThemeSwitch';
import Header from '@/components/Header';


const sampleData = [
  {
    title: "How can one grow online presence and make a huge out of it sad",
    host: "Farooq Dad",
    language: "English",
    inviting: true,
    users: [
      { name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
    ],
  },
  {
    title: "How can one grow online presence and make a huge out of it sad",
    host: "Farooq Dad",
    language: "English",
    inviting: true,
    users: [
      { name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [

      { name: "Farooq Dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq Dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },

    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq Dad", imageUrl: "https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: true,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },

    ],
  },
  {
    title: "Gym guide",
    host: "Farooq Dad",
    language: "Spanish",
    inviting: false,
    users: [
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Farooq dad", imageUrl: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
      { name: "Ahmed", imageUrl: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    ],
  },
  // ... Add more data objects here
];


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
                          <div className='flex flex-col justify-center align-center items-center'>
                            <img key={imgIndex} className={`inline-block ${item.users?.length <= 4 ? "h-20 w-20" : item.users?.length <= 5 ? "h-16 w-16 mt-3" : "h-14 w-14 mt-3 "}  rounded-full ring-2 ring-white dark:ring-[#272F34]`} src={user.imageUrl} alt="" />
                            <span className=' text-purple-400 mt-1' style={{ fontSize: "0.6rem" }}>{user.name.length % 2 ? "⭐" : ""}  {user.name.length}</span>
                          </div>
                        )
                      ))}


                      {item.users?.length && item.users.length > 7 &&
                        <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white flex items-center justify-center dark:ring-[#272F34] bg-slate-100 dark:bg-gray-600  dark:text-gray-200" style={{ fontSize: '0.8rem' }}>
                          +{item.users.length - 7}
                        </div>
                      }


                    </>
                  }
                </div>
                <div className="text-right ">
                  {item.users.length % 2 ?
                    <Link href="/space/21323"
                      className="text-sm font-medium hover:text-purple-500 inline-flex items-center transition duration-150 ease-in-out group"
                    >
                      <svg className="w-4 h-4 ml-1 mr-2 tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
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



        {/* <div
          className="absolute inset-x-0 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div> */}

      </main >

      <div className="fixed bottom-4 right-4 ">
        {showRoomWidget &&
          <div className='h-auto overflow-y-auto rounded-sm w-96 p-3 border border-gray-600  bg-white dark:bg-[#272F34] ' style={{ maxHeight: "80vh" }}>
            <div className="flex justify-between ">

              <div className="">
                <p className="mt-1">
                  English
                  <span className='text-sm opacity-40 '> Upper Advance</span>
                </p>
                <h3 className="cursor-pointer  text-purple-400">
                  How can one grow online presence and make a huge out of it sad
                </h3>

                <div className='my-2 text-sm'>Co-ordinators</div>
                <div className="flex flex-wrap  ">
                  {["Farooq dad", "Sarah Ahmed"].map((item, imgIndex) => {
                    return (
                      <div className='flex flex-col justify-center align-center items-center'>
                        <img title={item} key={imgIndex} className={`inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-[#272F34]`} src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <span className=' text-purple-400 mt-1' style={{ fontSize: "0.6rem" }}>
                          {item.length % 2 ? "⭐" : ""} {item == "Farooq dad" ? "Host" : "Co-host"}</span>
                      </div>
                    )
                  })}


                </div>

                <div className='my-2 text-sm'>Speakers</div>
                <div className="flex flex-wrap  mb-4">
                  {["Farooq dad", "Sarah Ahmed", "Farooq dad", "Sarah Ahmed", "Yasir Awan", "Elon Musk", "Zuck", "Imran khan", "Lizard", "Ino",].map((item, imgIndex) => {
                    return (
                      <div className='flex flex-col justify-center align-center items-center'>
                        <img title={item} key={imgIndex} className={`inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-[#272F34]`} src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <span className=' text-purple-400 mt-1' style={{ fontSize: "0.6rem" }}>
                          {item.length % 2 ? "⭐" : ""} {item.length < 6 ? item : `${item.slice(0, 5)}..`}</span>
                      </div>
                    )
                  })}
                </div>

                <div className='my-2 text-sm'>Listeners</div>
                <div className="flex flex-wrap  mb-4">
                  {["Farooq dad", "Sarah Ahmed"].map((item, imgIndex) => {
                    return (
                      <div className='flex flex-col justify-center align-center items-center'>
                        <img title={item} key={imgIndex} className={`inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-[#272F34]`} src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <span className=' text-purple-400 mt-1' style={{ fontSize: "0.6rem" }}>
                          {item.length % 2 ? "⭐" : ""} {item.length < 6 ? item : `${item.slice(0, 5)}..`}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
              </p>



            </div>
            <div className="text-left ">
              <Link href="/space/21323"
                className="text-sm font-medium hover:text-purple-500 inline-flex items-center transition duration-150 ease-in-out group"
              >
                {/* <svg className="w-4 h-4 ml-1 tracking-normal text-purple-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg> */}
                Leave
              </Link>
            </div>
          </div>
        }
        <div className='text-end my-2'>

          <button className='bg-purple-500 rounded-full p-2' onClick={() => setShowRoomWidget(!showRoomWidget)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14.836V9a7 7 0 00-14 0v5.836L3.101 17.77a2 2 0 001.732 3.113h15.134a2 2 0 001.732-3.113L19 14.836z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
