
import { Avatar } from 'flowbite-react';
import Link from 'next/link';

function Sidebar() {

  return (
    <div className="h-full">
      <div className=" fixed  inset-y-0  left-0   w-20  xl:px-6 overflow-y-auto pb-4 flex flex-col justify-between  border-r border-gray-200 dark:border-gray-800">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            <li >
              <Link
                href="/"
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
                  <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                  </svg>
                  <span className="sr-only">adsad</span>

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
                  <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                  </svg>
                  <span className="sr-only">adsad</span>

                </button>

              </Link>
            </li>
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
                  <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                  </svg>
                  <span className="sr-only">adsad</span>

                </button>

              </Link>
            </li>

          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar placeholderInitials="RR" rounded/>
          </div>
        </nav>
      </div >
    </div>
  )
}

export default Sidebar;
