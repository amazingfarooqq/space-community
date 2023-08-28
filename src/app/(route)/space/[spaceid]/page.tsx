"use client"

import Chatbox from "@/components/Room/Chatbox";
import RightSide from "@/components/Room/RightSide";
import useIsMainWindow from "@/components/useIsMainWindow";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import {  useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const page = ({
    params: { spaceId },
}: {
    params: {
        spaceId: string;
    };
}) => {

    const isMain = useIsMainWindow()
    console.log({isMain});
    const router = useRouter()

    if(!isMain) return router.push("/")
    const [isChatBox, setIsChatBox] = useState(true)
    const [isParticipants, setIsParticipants] = useState(false)

    const handleParticipants = () => {
        setIsChatBox(false)
        setIsParticipants(!isParticipants)
    }
    const handleChatBox = () => {
        setIsParticipants(false)
        setIsChatBox(!isChatBox)
    }


    const { spaces, socket, messages, setMessages, setChatid, spaceUsers } = useSocket()
    const {  userData } = useUser()

    useEffect(() => {
        setMessages([])
        setChatid(spaceId)
    }, [])
    useEffect(() => {
        console.log("run");
        if (!socket) return
        if (!userData.username) {
            toast.error("Excuse, you need a username")
            router.push("/")
            return
        }

        const joinedUserData = {
            id: userData.socketid,
            username: userData.username,
            image: userData.image,
        }

        socket?.emit("join_space", {spaceId: spaceId, joinedUserData});
    }, [socket])

    const sendMessage = (txt: any, setTxt: any) => {
        if (!socket) return
        if (!txt) return
        socket?.emit("send_message", {
            text: txt,
            socketId: userData.socketid,
            spaceId: spaceId,
            username: userData.username,
            image: userData.image,
            status: "sent",
            createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        });

        setTxt("")
    }


    const leaveSpace = () => {
        socket?.emit("leave_space", spaceId);
        router.push("/");
    }

    console.log({spaces});
    
    return (
        <div>
            <div className="h-screen flex" > 
                <div className={`${(!isChatBox && !isParticipants) ? "w-full" : "w-3/4"} flex flex-col justify-between dark:bg-[#191D20] h-[calc(100vh)]`} 

               
                >
                    <RightSide leaveSpace={leaveSpace} handleParticipants={handleParticipants} handleChatBox={handleChatBox} />
                </div>



                {isChatBox &&
                    <div className={`${isChatBox && isParticipants ? "w-2/4" : "w-1/4"}  border dark:bg-[#1e272d] dark:border-gray-700  pb-2  justify-between flex flex-col h-[calc(100vh)]`}>
                        <Chatbox  messages={messages}sendMessage={sendMessage}/>
                    </div>
                }

                {isParticipants &&
                    <div className={`${isChatBox && isParticipants ? "w-2/4" : "w-1/4"}   border dark:bg-[#1e272d] dark:border-gray-700 h-[calc(100vh)]`}>
                        <h1 className="p-5 px-2 text-purple-400 ">Users </h1>
                        <div className="flex flex-wrap justify-start pb-6 overflow-y-auto">


                            {/* {spaces?.map((u: any) => u.users.map((user: any, imgIndex) => (
                                <div key={user.id} className='flex flex-col justify-center align-center items-center ml-2 bg-white dark:bg-gray-900 rounded-lg pb-1'>
                                    <img key={imgIndex} className={`opacity-90 dark:opacity-70 border border-purple-900 inline-block h-24 w-24 rounded-t-lg   ring-white  && "ring-4"} dark:ring-[#272F34]`} src="https://i.pinimg.com/564x/e6/0d/c6/e60dc656906dbb296e7f924e74fbbc02.jpg" alt="" />
                                    <span title={user} className=' text-purple-400 mt-1' style={{ fontSize: "0.6rem" }}>{user.length > 9 ? `${user?.slice(0, 9)}...` : user}</span>
                                </div>
                            ))} */}

                            {spaces.map((u: any) => {
                                return u?.users.map((user: any, imgIndex: any) => (
                                    <div key={user.id} className='flex flex-col justify-center align-center items-center ml-2 bg-white dark:bg-gray-900 rounded-lg pb-1'>
                                        <img key={imgIndex} className={`opacity-90 dark:opacity-70  inline-block h-24 w-24 rounded-t-lg   ring-white  && "ring-4"} dark:ring-[#272F34]`} src={user.image} alt="" />
                                        <span title={user} className=' text-purple-400 mt-1' style={{ fontSize: "0.6rem" }}>{user.username.length > 9 ? `${user?.slice(0, 9)}...` : user.username}</span>
                                    </div>
                                ))
                            })}

                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default page;
