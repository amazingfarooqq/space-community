import { ThemeProvider } from 'next-themes'
import React, { useEffect, useState } from 'react'
import ThemeSwitch from '../ThemeSwitch'
import { toast } from 'react-hot-toast'

const Chatbox = ({ messages, sendMessage }: { messages: any, sendMessage: any }) => {


    const [txt, setTxt] = useState("")


    const handleOnChange = (e: any) => {
        setTxt(e.target.value)
    }


    const sendMessageFunc = (e: any) => {
        e.preventDefault()
        const text = txt.trim()
        if (text === "") return

        sendMessage(text, setTxt)


    }



    const onEnterPress = (e: any) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            sendMessageFunc(e)
        }
    }
    return (
        <>

            <div id="messages" className="flex flex-col py-2 pr-0 overflow-y-auto h-full" >
                {messages?.map((item: any) => {
                    return (
                        <>
                            {(item.status == "joined" || item.status == "left") &&
                                <div className="flex items-center py-2">
                                    <div className="space-y-2 w-full text-xs items-start">
                                        <div className={`px-2 rounded-lg`}>
                                            <div className={`break-all ${item.status == "joined" ? "text-green-400 pb-0 mb-0" : item.status == "left" ? "text-red-400 pb-0 mb-0" : ""}`}>
                                                {item.text}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {item.status == "sent" &&
                                <div key={item?.id} className="chat-message p-2">
                                    <div className="flex ">
                                        <div className="space-y-2 w-full text-xs mx-1 order-2 items-start">
                                            <div className={`px-2 rounded-lg`}>
                                                <div className='flex justify-between'>
                                                    <h2 className='mb-1 text-purple-400 text-sm'>{item % 2 ? "⭐" : ""} {item?.name} </h2>
                                                    <h2>
                                                        <div className=" justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex">
                                                            <span className="text-xs break-all">{item?.createdAt}</span>
                                                        </div>
                                                    </h2>

                                                </div>
                                                <div className='dark:text-gray-300 pb-1 text-sm'>
                                                    {item?.text}
                                                </div>
                                            </div>
                                        </div>
                                        <img
                                            src={item?.image}
                                            alt="My profile"
                                            className="w-10 h-10 rounded-lg order-1"
                                        />
                                    </div>

                                </div>
                            }
                        </>
                    )
                })}


            </div>
            <div>
                <div className='pt-1'>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-full w-8 transition duration-500 ease-in-out text-gray-500 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-600 hover:text-purple-400 transition duration-300 ease-in-out"
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
                            className="h-6 w-6 text-gray-600 hover:text-purple-400 transition duration-300 ease-in-out"
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
                        onKeyDown={onEnterPress}
                        value={txt}
                        onChange={handleOnChange}
                        className="w-full p-2 border dark:bg-[#1e272d] dark:border-gray-700  rounded-l-lg resize-none  dark:text-gray-200 "
                        placeholder="Enter your message..."
                        rows={2}
                    />
                    <button className="bg-purple-500 text-white p-2 rounded-r-lg" onClick={sendMessageFunc}>
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
        </>
    )
}

export default Chatbox


//  {/* <div className="flex sm:items-center justify-between border-b-2 py-2 border-gray-200">
//                     <div className="relative flex items-center space-x-4">
//                         <div className="flex flex-col leading-tight">
//                             <div className="  flex items-center">
//                                 <span className="mr-3">Anderson Vanhron</span>
//                             </div>
//                             <span className=" ">Junior Developer</span>

//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-2">

//                         <button
//                             type="button"
//                             className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
//                         >
//                             <ThemeSwitch />
//                         </button>
//                         <button
//                             type="button"
//                             className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 className="h-6 w-6"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                                 />
//                             </svg>
//                         </button>
//                         <button
//                             type="button"
//                             className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 className="h-6 w-6"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                                 />
//                             </svg>
//                         </button>
//                         <button
//                             type="button"
//                             className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 className="h-6 w-6"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                                 />
//                             </svg>
//                         </button>
//                     </div>
//                 </div> */}

// <div className="border-t-2 border-gray-200  pt-2 mb-2 sm:mb-0">
//                     <div className="relative flex">
//                         <span className="absolute inset-y-0 flex items-center">
//                             <button
//                                 type="button"
//                                 className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                     className="h-6 w-6 text-gray-600"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
//                                     />
//                                 </svg>
//                             </button>
//                         </span>
//                         <input
//                             type="text"
//                             placeholder="Write your message!"
//                             className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
//                         />
//                         <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
//                             {/* <button
//                                 type="button"
//                                 className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                     className="h-6 w-6 text-gray-600"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
//                                     />
//                                 </svg>
//                             </button>
//                             <button
//                                 type="button"
//                                 className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                     className="h-6 w-6 text-gray-600"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                                     />
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                                     />
//                                 </svg>
//                             </button>
//                             <button
//                                 type="button"
//                                 className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                     className="h-6 w-6 text-gray-600"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth={2}
//                                         d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                     />
//                                 </svg>
//                             </button> */}
//                             <button
//                                 type="button"
//                                 className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
//                             >
//                                 <span className="font-bold">Send</span>
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewBox="0 0 20 20"
//                                     fill="currentColor"
//                                     className="h-6 w-6 ml-2 transform rotate-90"
//                                 >
//                                     <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>