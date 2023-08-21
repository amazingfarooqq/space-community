"use client"

import BGGradient from '@/components/BGGradient'
import Header from '@/components/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { useRoom } from '@/contexts/RoomContext'
import { useSocket } from '@/contexts/SocketContext'
import { useUser } from '@/contexts/UserContext'
import { pusherClient } from '@/libs/pusher'
import axios from 'axios'
import { Avatar, Button, Modal } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const page = () => {
    const [isNicknameOpen, setIsNicknameOpen] = useState(true)
    const bottomRef = useRef<HTMLDivElement>(null);
    const [nickname, setNickname] = useState("")
    const { messages, socket, roomUsers, enterChatroom, logoutFunc } = useSocket();

    console.log({roomUsers});
    

    const enterAsGuest = () => {
        let generateuuid = uuidv4()
        let generate = generateuuid.split("-")
        let user = "Guest-" + generate[0].slice(0, 2) + generate[1].slice(0, 2) + generate[1].slice(0, 2)

        setNickname(user)
        setIsNicknameOpen(false)
        enterChatroom(user)
    }


    const logout = () => {
        setIsNicknameOpen(true)
        logoutFunc()
        socket?.emit("logout")

    }


    useEffect(() => {
        bottomRef?.current?.scrollIntoView();
    }, [messages])

    const globalRoomFun = () => {

        if (!nickname) {
            return;
        }
        // if ("1"?.includes(socket?.id)) return;
        setIsNicknameOpen(false)
        enterChatroom(nickname)

    }



    const [textArea, settextArea] = useState("")

    const handleSendMessage = (e: any) => {
        e.preventDefault()
        if (textArea.trim()) {
            console.log({ textArea });

            socket?.emit("send_message", {
                text: textArea,
                name: nickname,
                time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
                socketId: socket.id,
                roomId: "1",
                status: "new_message"
            });
        }
        settextArea("");
    };

    const onEnterPress = (e: any) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            handleSendMessage(e)
        }
    }


    const handleTyping = () => {
        socket?.emit("typing", textArea ? nickname + " is typing ..." : "");
    };

    return (
        <>
            <Sidebar />

            {/* <button onClick={triggerUseEffect}>See chats</button> */}
            <Modal size="lg" show={isNicknameOpen}>
                <Modal.Header>Enter your nickname to Continue</Modal.Header>
                <Modal.Body>
                    <div className="">

                        <button className="focus:outline-none w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-900" onClick={enterAsGuest}>Enter as guest</button>
                        <div>OR</div>
                        <label htmlFor="">Enter your nickname</label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Enter your nickname"
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-600 dark:bg-gray-700"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className='pt-0 border-none'>
                    <Button color="purple" onClick={globalRoomFun}>Enter Chatroom</Button>
                    <Button color="gray" onClick={() => setIsNicknameOpen(false)}>
                        Go to home
                    </Button>
                </Modal.Footer>
            </Modal>
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl opacity-70 dark:opacity-0 sm:-top-80 "
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
            <Header />


            <div className=" mx-auto flex justify-between  ml-12 z-10 xl:ml-20 ">
                <div className="flex flex-row justify-between w-full">
                    <div className=" w-full ">
                        <div className='flex flex-row justify-between h-[calc(100vh-5rem)]'>
                            <div className='border  dark:border-gray-800 flex flex-col w-1/5  overflow-y-auto overflow-x-hidden '>
                                <div className="flex sm:items-center justify-between border-b-2 py-4 mb-3 border-gray-200 dark:border-gray-800 p-2 text-md">
                                    Online users
                                </div>

                                <div className="w-100 p-0 m-0">
                                    {/* {rooms.map(item => {
                                        console.log({ item });

                                        return (
                                            <>
                                                <div className='border-b dark:border-gray-800 cursor-pointer my-1 p-2'>{item.title}</div>
                                                <img className="w-14 h-14 -mr-5 border-2 border-white rounded-full dark:border-gray-800" src="https://pbs.twimg.com/profile_images/1689670708862107648/YBrrroVQ_400x400.jpg" alt="" />
                                            </>
                                        )
                                    })} */}


                                    {roomUsers?.map((item: {name: string}) => {
                                        return <div>
                                            <span className='text-xs'>{item.name}</span>
                                        </div>
                                    })}
                                </div>

                            </div>
                            <div className='border dark:border-gray-800 flex-1 p:2 sm:px-1 justify-between flex flex-col'>

                                <div
                                    id="messages"
                                    className="flex flex-col space-y-3 p-2 overflow-y-auto"
                                >

                                    {messages[1]?.map((message: any, index: number) => {
                                        return (
                                            <div key={message + index + index + index + index} className="chat-message pt-2">
                                                {message.status == "user_joined" || message.status == "user_left" ?
                                                    <div className="flex items-center">
                                                        <div className="space-y-2 w-full text-xs mx-1 order-2 items-start">
                                                            <div className={`px-2 rounded-lg`}>
                                                                <div className={` ${message.status == "user_joined" ? "text-green-400 pb-0 mb-0" : message.status == "user_left" ? "text-red-400 pb-0 mb-0" : ""}`}>
                                                                    {message.text}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <Avatar size="sm" rounded bordered/> */}
                                                        {/* <img
                                                            src={index % 2 ? "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" : "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                                            alt="My profile"
                                                            className="w-6 h-6 rounded-lg order-1"
                                                        /> */}
                                                    </div> :
                                                    <div className="flex ">
                                                        <div className="space-y-2 w-full text-xs mx-1 order-2 items-start">
                                                            <div className={`px-2 rounded-lg`}>
                                                                <div className='flex justify-between'>
                                                                    <h2 className='mb-1 text-purple-500 dark:text-purple-400 text-sm'>{message.name}</h2>
                                                                    <h2>
                                                                        <div className=" justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex">
                                                                            <span className="text-xs">{message.time}</span>
                                                                        </div>
                                                                    </h2>

                                                                </div>
                                                                <div className={`dark:text-gray-300`}>
                                                                    {message.text}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <img
                                                            src={index % 2 ? "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144" : "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                                            alt="My profile"
                                                            className="w-10 h-10 rounded-lg order-1"
                                                        /> */}
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}

                                    <div className="" ref={bottomRef} />
                                </div>
                                <div>
                                    <div className='pt-1'>
                                        <button
                                            onClick={logout}
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-full w-8 transition duration-500 ease-in-out text-gray-500 0 focus:outline-none"
                                        >
                                            <svg className="h-6 w-6 text-purple-500 dark:text-purple-400 transition duration-300 ease-in-out" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                                            </svg>
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-full w-8 transition duration-500 ease-in-out text-gray-500 focus:outline-none"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="h-6 w-6 text-gray-600 hover:text-purple-500 transition duration-300 ease-in-out"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-full w-8 transition duration-500 ease-in-out text-gray-500 0 focus:outline-none"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="h-6 w-6 text-gray-600 hover:text-purple-500 transition duration-300 ease-in-out"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </button>

                                    </div>
                                    <form className="flex">
                                        <textarea
                                            onKeyUp={handleTyping}
                                            onKeyDown={onEnterPress}
                                            value={textArea}
                                            onChange={(e) => settextArea(e.target.value)}
                                            className="w-full p-2 border dark:bg-[#1e272d] dark:border-gray-800  rounded-l-lg resize-none  dark:text-gray-200 "
                                            placeholder="Enter your message..."
                                            rows={2}
                                        />
                                        <button onClick={handleSendMessage} type='submit' className="bg-purple-500 text-white p-2 rounded-r-lg">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div >
                    {/* end message */}
                    {/* <div className="w-2/5 border-l-2 px-5">
                        <div className="flex flex-col">
                            <div className="font-semibold text-xl py-4">Mern Stack Group</div>
                            <img
                                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                className="object-cover rounded-xl h-64"
                                alt=""
                            />
                            <div className="font-semibold py-4">Created 22 Sep 2021</div>
                            <div className="font-light">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
                                perspiciatis!
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <BGGradient />
        </>

    )
}

export default page