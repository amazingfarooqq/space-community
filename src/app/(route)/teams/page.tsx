"use client"
import BGGradient from '@/components/BGGradient'
import Header from '@/components/Header/Header'
import MainLayout from '@/components/Layout/MainLayout'
import Sidebar from '@/components/sidebar/Sidebar'
import { Dropdown } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

const teamsArr = [
  {
    name: "Team Blue",
    points: "12422",
    users: [12, 12, 312, 31412,12, 12, 312, 31412,12, 12, 312, 31412,12, 12, 312, 31412,12, 12, 312, 31412,12, 12, 312, 31412],
    link: "blue"
  },
  {
    name: "Team Red",
    points: "1422",
    users: [12, 12, 312],
    link: "red"
  },
  {
    name: "Team Pink",
    points: "122",
    users: [12, 12],
    link: "pink"
  }
]

const teams = () => {
  return (
    <>
      <MainLayout>
        <div className='p-10' >
          <h1 className='text-6xl text-semibold'>Super League</h1>
          {teamsArr.map((team: any, index: any) => {
            return (
              <div className='py-3'>
                <div className={`flex h-full flex-col  animate-fade-in relative   bg-gray-100 dark:bg-gray-800 w-full h-60 lg:h-80 overflow-hidden ml-0 rounded-lg  shadow-lg border dark:border-gray-700 border-gray-400`}>

                  <div className={`w-full text-sm items-start bg-gray-200 dark:bg-[#1A202C] px-4 py-3`}>
                    <div className='flex justify-between w-full'>
                      <div className="">
                        <div className=" mb-1 flex gap-1">
                          <h3 className="text-gray-600 dark:text-white font-semibold text-3xl">Team {team.link}</h3>
                          <span className='text-sm opacity-70 flex items-center '>#1</span>
                        </div>
                        <div className="text-2xl mb-3 lg:mb-0 text-blue-500 dark:text-blue-400 font-semibold">
                          {team.points}
                        </div>
                      </div>

                      <div className="text-right  z-100 bottom-3 right-3   ">
                      <Link href={`/teams/${team.link}`}
                      className="text-sm font-medium inline-flex items-center transition duration-150 ease-in-out group border px-4 py-2 rounded-xl border-blue-200 dark:border-gray-600 border-dashed hover:text-blue-400 ">Visit
                      <svg className="w-4 h-4 ml-2 tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap p-5">

                    {team.users.map((item: any) => {
                      return (

                        <div className={`flex flex-wrap `}>
                          <div className='flex flex-col justify-center align-center items-center py-1'>
                            <div className="relative">

                              <img className={`cursor-pointer h-14 w-14 rounded-full ring-1 ring-ring-gray-400 dark:ring-gray-700 mr-1`} src="/images/persistence.jpg" alt="" />
                              <span className="bottom-1 right-1 absolute   rounded-full text-2xl">
                                <img title={"Pakistan"} className={`h-3`} src={`/images/flags/pk.png`} alt="" />
                              </span>

                            </div>
                            <span className={'mt-1'} style={{ fontSize: "0.6rem" }}>{item % 3 == 0 && "⭐"} {item}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                </div>

              </div>
            )
          })}

        </div>
      </MainLayout>
    </>
  )
}

export default teams