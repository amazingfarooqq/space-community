"use client"

import Chatbox from "@/components/Room/Chatbox";
import RightSide from "@/components/Room/RightSide";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import { pusherClient } from "@/libs/pusher";
import axios from "axios";
import { Avatar } from "flowbite-react";
import { useSession } from "next-auth/react";
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
        if (isChatBox && !isParticipants) {
            setIsChatBox(false)
            setIsParticipants(false)
        }
        if (!isChatBox && isParticipants) {
            setIsChatBox(false)
            setIsParticipants(false)
        }
        if (!isChatBox && !isParticipants) {
            setIsChatBox(true)
        }
    }


    
    
    const { spaces, socket, messages, setMessages, setSpaces }: any = useSocket()
    
    const { userData }: any = useUser()
    const currentSpaceData = spaces.find((space: any) => space.id === spaceId)


    console.log({ currentSpaceData });




    useEffect(() => {
        setMessages([])
    }, [])

    const session = useSession()

    const getSpace = async () => {
        const spaceData = await axios.post("/api/spaces/getSpace", { spaceId })
        return spaceData
    }

    useEffect(() => {
        if (session.status == "loading") {
            toast.error("Loading");
            return;
        }

        if (session.status == "unauthenticated") {
            toast.error("Excuse, you are not logged in");
            router.push("/");
            return;
        }

        if (!userData?.id) {
            toast.error("Excuse, userData?.id you are not logged in");
            router.push("/");
            return;
        }

        toast.error("please wait as we fetch space data");

        getSpace().then((spaceData) => {
            console.log("spaceData", spaceData);

            const spacedata = spaceData.data;
            console.log("joining");

            const joinedUserData = {
                id: userData?.id || "",
                name: userData?.name || "",
                image: userData?.image || "",
                followers: userData?.followers || "",
            }

            console.log("running");

            joinUserDatabase(joinedUserData)
        }).catch((error) => {
            // Handle any errors that might occur during the fetch
            console.error("Error fetching space data:", error);
        });
    }, [userData]);

    const joinUserDatabase = async (joinedUserData) => {
        try {
            await axios.post('/api/spaces/joinSpace', {
                spaceId, userId: userData.id, joinedUserData, socketId: socket.id
            })

        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = async (txt: any, setTxt: any) => {
        if (!pusherClient || !txt || !spaceId) return

        try {

            let msgData = {
                text: txt,
                uuid: userData.id,
                spaceId: spaceId,
                name: userData.name,
                image: userData.image,
                status: "sent",
                createdAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            }

            console.log({socket});
            console.log({socketid: socket.id});
            
            

            await axios.post(`/api/msgs/spacemsgs/msgs`, {
                spaceId, msgData, 
            });

            setTxt("")
        } catch (error) {
            console.log({ error });

        }

    }


    const leaveSpace = async () => {
        try {

            const response = await axios.delete(`/api/spaces/leaveSpace`, {
                data: {
                    spaceId: spaceId,
                    userId: userData.id
                }
            });
            console.log({ response });

            socket?.emit("leave_space", spaceId);
            router.push("/");

        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div>
            {!currentSpaceData?.id &&
                <div className=" flex flex-col h-[100vh] w-[100vw] align-center justify-center items-center">
                    <div role="status" >
                        <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    {/* <h2 className="text-center text-white text-xl font-semibold">Loading...</h2> */}
                    <p className="w-1/3 text-center text-white">Loading space data.</p>
                </div>
            }
            {currentSpaceData?.id &&
                <div className="h-screen flex " >
                    {/* {isParticipants && */}
                    <div className="relative max-w-md mx-auto shadow-lg h-80 overflow-hidden ring-1 ring-slate-900/5 w-[300px] h-[100vh]">
                        <div className="top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-sm  dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">
                            Avtive
                        </div>
                        <div className="overflow-auto flex flex-col divide-y dark:divide-slate-200/5 h-full">
                            {currentSpaceData.users?.map((user: any) => (
                                <div className="flex items-center gap-4 p-4">

                                    <Avatar img={user.image} bordered rounded />
                                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                                        {user.name.length > 15 ? `${user.name?.slice(0, 15)}...` : user.name}
                                    </strong>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* } */}
                    <div className={`lg:w-3/4 w-full flex flex-col justify-between dark:bg-[#191D20]`}>
                        <RightSide isChatBox={isChatBox} isParticipants={isParticipants} leaveSpace={leaveSpace} handleParticipants={handleParticipants} handleChatBox={handleChatBox} handleRightSide={handleRightSide} />
                    </div>



                    {isChatBox &&
                        <div className={`absolute lg:relative right-0 absolute lg:relative w-[400px]  border dark:bg-[#1e272d] dark:border-gray-700  pb-2  justify-between flex flex-col h-[calc(100vh)]`}>
                            <Chatbox messages={messages} sendMessage={sendMessage} />
                        </div>
                    }


                </div>
            }
        </div>
    );
};

export default page;
