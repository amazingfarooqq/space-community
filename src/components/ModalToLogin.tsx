'use client';

import { useUser } from '@/contexts/UserContext';
import { randomUUID } from 'crypto';
import { Avatar, Button, Modal, Spinner } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import React from 'react'
import { useSocket } from '@/contexts/SocketContext';

const avatarArr = [
  "https://image.lexica.art/full_jpg/f673c50f-0118-4001-8e1c-2d8ce44af0f6",
  "https://image.lexica.art/full_jpg/f68c0b6c-cc0c-471f-979f-220b7db389c9",
  "https://image.lexica.art/full_jpg/5dd4e3e8-33d1-450e-89da-77b2ddacb0cd",
  "https://image.lexica.art/full_jpg/144dfcec-e763-4c5f-a2c7-cec56d6ae3d4"
]

export default function FormElements({ isLoginModal, setIsLoginModal }: any) {

  const usernameInputRef = useRef<HTMLInputElement>(null)

  const [username, setUsername] = useState<string>('');

  const { setUserData }: any = useUser();
  const [data, setData] = useState({ username: "", image: "" })

  const [avatarUrl, setAvatarUrl] = useState(avatarArr[0])

  const [loading, setLoading] = useState(false)


  const [randomFourDigits, setRandomFourDigits] = useState("")
  useEffect(() => {
    const randomID = uuid().slice(0, 4)
    setRandomFourDigits(randomID)

  }, [])

  const handleOnUsernameChange = (e: any) => {
    if (e.target.value.length > 50) {
      return
    }
    setUsername(e.target.value)

    // setAvatarUrl(`https://avatars.dicebear.com/api/avataaars/${e.target.value + randomFourDigits}.svg`)
  }

  const LoginUsername = async () => {
    setLoading(true)

    const data = {
      username: username,
      image: avatarUrl,
      uuid: uuid()
    }

    setUserData(data)


    setIsLoginModal("hide")
    setLoading(false)
  }



  return (
    <>
      <button type="button" onClick={() => setIsLoginModal('show')} className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-500 dark:hover:bg-blue-400 dark:focus:ring-blue-900 ">Create Space</button>



      <Modal size="lg" position="top-center" dismissible show={isLoginModal === 'show'} onClose={() => setIsLoginModal("hide")}>
        <Modal.Header>Please Fill this form</Modal.Header>
        <Modal.Body className='py-3'>
          <div className='opacity-50 text-xs p-0 m-0 '>You came update it later</div>
          <div className="">
            <label htmlFor="">Username</label>
            <input
              type="text"
              value={username}
              name='username'
              onChange={handleOnUsernameChange}
              placeholder="Enter your username"
              className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-600 dark:bg-gray-700"
            />

            {/* <img className={`opacity-90 rounded-full dark:opacity-70  inline-block h-24 w-24 rounded-t-lg   ring-white  && "ring-4"} dark:ring-[#272F34]`} src={avatarUrl} alt="" /> */}
            <div className='mt-2'>
              <label htmlFor="" >Avatar</label>
              <div className="flex flex-wrap my-2 ">
                {avatarArr.map(item => {
                  return <img key={item} onClick={() => setAvatarUrl(item)} className={`cursor-pointer h-24 w-24  rounded-full ${item == avatarUrl && "ring-2 ring-blue-500 dark:ring-blue-400"} `} src={item} alt="" />

                })}

              </div>
              <div className='flex gap-2 flex-wrap mt-1'>
              </div>

            </div>
          </div>


        </Modal.Body>
        <Modal.Footer className='pt-0 border-none'>
          {loading ? <Spinner aria-label="Alternate spinner button example" />
            :
            <Button color="blue" onClick={LoginUsername}>Create Space</Button>
          }

          <Button color="gray" onClick={() => setIsLoginModal("hide")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}




