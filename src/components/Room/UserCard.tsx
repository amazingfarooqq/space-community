'use client';

import { useUser } from '@/contexts/UserContext';
import { Avatar, Card, Dropdown } from 'flowbite-react';

export default function UserProfileCard({ user }) {

    return (
        <Card className='dark:bg-[#20354b]'>
            <div className='relative'>
                <div className="absolute right-0 flex justify-end w-56">
                    <Dropdown
                        placement="bottom-end"
                        inline
                        label=""
                    >
                        <Dropdown.Item>
                            <a
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                href="#"
                            >
                                <p>
                                    Edit
                                </p>
                            </a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <a
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                href="#"
                            >
                                <p>
                                    Export Data
                                </p>
                            </a>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <a
                                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                href="#"
                            >
                                <p>
                                    Delete
                                </p>
                            </a>
                        </Dropdown.Item>
                    </Dropdown>
                </div>

            </div>
            <div className="flex flex-col items-center my-3">
                {/* <No Display Name
          alt="Bonnie image"
          className="mb-3 rounded-full shadow-lg"
          height="96"
          src="/images/people/profile-picture-3.jpg"
          width="96"
        /> */}
                <Avatar size="lg" rounded bordered img={user?.image} />
                <h5 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">
                    {user.name.length > 15 ? `${user.name?.slice(0, 15)}...` : user.name}
                </h5>
                {/* <span className="text-sm text-gray-500 dark:text-gray-400">
          Visual Designer
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            href="#"
          >
            <p>
              Add friend
            </p>
          </a>
          <a
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            href="#"
          >
            <p>
              Message
            </p>
          </a>
        </div> */}
            </div>
        </Card>
    )
}


