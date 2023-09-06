
"use client"

import { Avatar } from 'flowbite-react';
import Link from 'next/link';
import ThemeSwitch from '../ThemeSwitch';
import { useUser } from '@/contexts/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { navigation } from '../Header/navigation';


function Sidebar() {

  const pathname = usePathname()


  const { userData } = useUser()
  return (
    <div className="h-full">
      <div className=" fixed  inset-y-0  left-0   w-100 px-2 overflow-y-auto pb-4 flex flex-col justify-between  border-r border-gray-200 dark:border-gray-600">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-2 ">

            {navigation.map((item) => {
              return (
                <li key={item.name} >
                  <Link
                    href={item.href}
                    className={` group 
                    ${pathname === item.href ? 'bg-purple-400 ' : ''}
                flex 
                rounded-full 
                p-2 
                text-sm 
                leading-6 
                font-semibold 
                text-gray-800
                dark:text-gray-300
                
                ${pathname !== item.href ? 'hover:opacity-70  ' : ''}
                 `}
                  >
                    {/* <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                    <button>
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
          {userData.id &&
            <div
              className="cursor-pointer hover:opacity-75 transition"
            >
              <Avatar placeholderInitials="RR" img={userData?.image} rounded />
            </div>
          }
        </nav>
      </div >
    </div>
  )
}

export default Sidebar;
