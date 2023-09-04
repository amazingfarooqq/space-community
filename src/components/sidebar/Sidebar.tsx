
"use client"

import { Avatar } from 'flowbite-react';
import Link from 'next/link';
import ThemeSwitch from '../ThemeSwitch';

function Sidebar() {

  return (
    <div className="h-full">
      <div className=" fixed  inset-y-0  left-0   w-100 px-2 overflow-y-auto pb-4 flex flex-col justify-between  border-r border-gray-200 dark:border-gray-800">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            <li >
              <Link
                href="/"
                className={` group 
                flex 
                rounded-md 
                p-3 
                text-sm 
                leading-6 
                font-semibold 
                text-gray-800
                dark:text-gray-300
                hover:opacity-70 
              
                 `}
              >
                {/* <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                <button>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  <span className="sr-only">Home</span>

                </button>

              </Link>
            </li>
            <li >
              <Link
                href="/publicchat"
                className={` group 
                flex 
                gap-x-3 
                rounded-md 
                p-3 
                text-sm 
                leading-6 
                font-semibold 
                text-gray-800
                dark:text-gray-300
                hover:opacity-70 
              
                 `}
              >
                {/* <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                <button>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                    <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                    <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                  </svg>
                  <span className="sr-only">Group chat</span>

                </button>

              </Link>
            </li>
            {/* <li >
              <Link
                href="/community"
                className={` group 
                flex 
                gap-x-3 
                rounded-md 
                p-3 
                text-sm 
                leading-6 
                font-semibold 
                text-gray-800
                dark:text-gray-300
                hover:opacity-70 
              
                 `}
              >
                <button title="Bugs and features">
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 20">
                    <path d="M16.025 15H14.91c.058-.33.088-.665.09-1v-1h2a1 1 0 0 0 0-2h-2.09a5.97 5.97 0 0 0-.26-1h.375a2 2 0 0 0 2-2V6a1 1 0 0 0-2 0v2H13.46a6.239 6.239 0 0 0-.46-.46V6a3.963 3.963 0 0 0-.986-2.6l.693-.693A1 1 0 0 0 13 2V1a1 1 0 0 0-2 0v.586l-.661.661a3.753 3.753 0 0 0-2.678 0L7 1.586V1a1 1 0 0 0-2 0v1a1 1 0 0 0 .293.707l.693.693A3.963 3.963 0 0 0 5 6v1.54a6.239 6.239 0 0 0-.46.46H3V6a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h.35a5.97 5.97 0 0 0-.26 1H1a1 1 0 0 0 0 2h2v1a6 6 0 0 0 .09 1H2a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h1.812A6.012 6.012 0 0 0 8 19.907V10a1 1 0 0 1 2 0v9.907A6.011 6.011 0 0 0 14.188 17h1.837v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2ZM11 6.35a5.922 5.922 0 0 0-.941-.251l-.111-.017a5.52 5.52 0 0 0-1.9 0l-.111.017A5.924 5.924 0 0 0 7 6.35V6a2 2 0 1 1 4 0v.35Z" />
                  </svg>
                  <span className="sr-only">Bugs and features</span>
                </button>

              </Link>
            </li> */}
            <li >
              <Link
                href="/login"
                className={` group 
                flex 
                gap-x-3 
                rounded-md 
                p-3 
                text-sm 
                leading-6 
                font-semibold 
                text-gray-800
                dark:text-gray-300
                hover:opacity-70 
              
                 `}
              >
                {/* <Icon className="h-6 w-6 shrink-0" aria-hidden="true" /> */}
                <button>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                  </svg>
                  <span className="sr-only">adsad</span>

                </button>

              </Link>
            </li>

          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div>
            <ThemeSwitch />
          </div>
          <div
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar placeholderInitials="RR" rounded />
          </div>
        </nav>
      </div >
    </div>
  )
}

export default Sidebar;
