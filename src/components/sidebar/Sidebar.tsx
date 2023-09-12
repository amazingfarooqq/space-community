
"use client"

import { Avatar } from 'flowbite-react';
import Link from 'next/link';
import ThemeSwitch from '../ThemeSwitch';
import { useUser } from '@/contexts/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { navigation } from '../Header/navigation';
import SidebarbarToCreateSpace from '../SidebarToCreateSpace';
import { useState } from 'react';


function Sidebar() {

  const pathname = usePathname()
  const [open, setOpen] = useState(false)


  const { userData } = useUser()
  return (
    <>
      <SidebarbarToCreateSpace open={open} setOpen={setOpen} />

      <div className="h-full">
        <div className=" fixed  inset-y-0  left-0   w-[90px] overflow-y-auto pb-4 flex flex-col justify-between  border-r border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#191D20] ">
          <nav className="mt-4 flex flex-col justify-between ">
            <ul role="list" className="flex flex-col items-center space-y-2 ">

              <li className={`my-1 ${pathname !== "/" && "hidden"} mb-4 `}>
                <div
                  className={` group 
                    hover:opacity-60
                    bg-blue-500
                    text-gray-200
                    flex 
                    rounded-full 
                    p-3 
                    text-sm 
                    leading-6 
                    font-semibold
                }
                 `
                  }
                  onClick={() => setOpen(!open)}
                >
                  {/* <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                  <button>
                    <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                    <span className="sr-only">Create space</span>

                  </button>

                </div>
              </li>
              {navigation.map((item) => {
                return (
                  <li key={item.name} className={`${pathname == item.href && "border-l border-blue-400   w-full"}`}>
                    <Link
                      href={item.href}
                      className={` group w-14 h-14 mx-auto
                    ${pathname === item.href ? 'text-white bg-blue-500 dark:bg-blue-400 ' : 'bg-gray-300 dark:bg-gray-600'}
                  dark:text-white text-gray-900
                    flex 
                rounded-full 
                p-3 
                text-sm 
                leading-6 
                font-semibold 
                
                ${pathname !== item.href ? 'hover:opacity-70  ' : ''}
                 `}
                    >
                      {/* <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                      <button className='mx-auto'>
                        {item.icon()}
                        <span className="sr-only">{item.name}</span>

                      </button>

                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          <nav className="mt-4 flex flex-col justify-between items-center">
            <div>
              <ThemeSwitch />
            </div>
            {userData?.id &&
              <div
                className="cursor-pointer hover:opacity-75 transition"
              >
                <Avatar placeholderInitials="RR" img={userData?.image} rounded />
              </div>
            }
          </nav>
        </div >
      </div >
    </>
  )
}

export default Sidebar;
