"use client"

import Chatbox from "@/components/Room/Chatbox";
import RightSide from "@/components/Room/RightSide";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const page = ({
    params: { spaceId },
}: {
    params: {
        spaceId: string;
    };
}) => {
    const router = useRouter()

    const [isChatBox, setIsChatBox] = useState(true)
    const [isParticipants, setIsParticipants] = useState(false)

    const handleParticipants = () => {
        setIsChatBox(false)
        setIsParticipants(true)
    }
    const handleChatBox = () => {
        setIsParticipants(false)
        setIsChatBox(true)
    }

    const handleRightSide = () => {
        if(isChatBox && !isParticipants) {
            setIsChatBox(false)
            setIsParticipants(false)
        } 
        if(!isChatBox && isParticipants) {
            setIsChatBox(false)
            setIsParticipants(false)
        } 
        if(!isChatBox && !isParticipants) {
            setIsChatBox(true)
        } 
    }


    const { spaces, socket, messages, setMessages, setChatid, spaceUsers }: any = useSocket()
    const { userData }: any = useUser()

    useEffect(() => {
        setMessages([])
        setChatid(spaceId)
    }, [])


    useEffect(() => {

        if (!socket) return
        console.log(userData);

        if (!userData?.id) {
            toast.error("Excuse, you are not logged in")
            spaces.users.find((u: any) => u.id === userData?.id) && toast.error("You are already in this space")
            router.push("/")
            return
        }

        const joinedUserData = {
            id: userData?.id || "",
            name: userData?.name || "",
            image: userData?.image || "",
            followers: userData?.followers || "",
        }

        // joinUserDatabase()


        socket?.emit("join_space", { spaceId: spaceId, joinedUserData });
    }, [socket])

    const joinUserDatabase = async () => {
        try {
            const createNewSpace = await axios.post('/api/spaces/joinSpace', {
                spaceId, userId: userData.id
            })

            console.log(createNewSpace.data);

        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = (txt: any, setTxt: any) => {
        if (!socket) return
        if (!txt) return
        socket?.emit("send_message", {
            text: txt,
            uuid: userData.id,
            spaceId: spaceId,
            name: userData.name,
            image: userData.image,
            status: "sent",
            createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        });

        setTxt("")
    }


    const leaveSpace = async () => {
        try {
            
            const response = await axios.delete(`/api/spaces/leaveSpace`, {
                data: {
                    spaceId: spaceId,
                    userId: userData.id
                }
            });
            console.log({response});
            
            socket?.emit("leave_space", spaceId);
            router.push("/");

        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <div>
            <div className="h-screen flex" >
                <div className={`${(!isChatBox && !isParticipants) ? "w-full" : "w-3/4"} flex flex-col justify-between dark:bg-[#191D20] h-[calc(100vh)]`}


                >
                    <RightSide isChatBox={isChatBox} isParticipants={isParticipants} leaveSpace={leaveSpace} handleParticipants={handleParticipants} handleChatBox={handleChatBox} handleRightSide={handleRightSide}/>
                </div>



                {isChatBox &&
                    <div className={`${isChatBox && isParticipants ? "w-2/4" : "w-1/4"}  border dark:bg-[#1e272d] dark:border-gray-700  pb-2  justify-between flex flex-col h-[calc(100vh)]`}>
                        <Chatbox messages={messages} sendMessage={sendMessage} />
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
                                        <span title={user} className=' text-purple-400 mt-1' style={{ fontSize: "0.6rem" }}>{user.name.length > 9 ? `${user?.name?.slice(0, 9)}...` : user.name}</span>
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
