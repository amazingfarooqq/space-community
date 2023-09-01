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

    const [CurrentSpaceData, setCurrentSpaceData] = useState({})
    const { userData }: any = useUser()

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
            const createNewSpace = await axios.post('/api/spaces/joinSpace', {
                spaceId, userId: userData.id, joinedUserData
            })

            // setCurrentSpaceId(createNewSpace.data)
            console.log(createNewSpace.data);

            setCurrentSpaceData(createNewSpace.data)


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
            console.log({ response });

            socket?.emit("leave_space", spaceId);
            router.push("/");

        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div>
            <div className="h-screen flex " >
                {/* {isParticipants && */}
                <div className="relative max-w-md mx-auto shadow-lg h-80 overflow-hidden ring-1 ring-slate-900/5 w-[300px] h-[100vh]">
                    <div className="top-0 left-0 right-0 px-4 py-3 flex items-center font-semibold text-sm  dark:bg-slate-700/90 backdrop-blur-sm ring-1 ring-slate-900/10 dark:ring-black/10">
                        Avtive
                    </div>
                    <div className="overflow-auto flex flex-col divide-y dark:divide-slate-200/5 h-full">
                        {/* {spaces?.map((u: any) => u.users.map((user: any, imgIndex: any) => (
                            <div className="flex items-center gap-4 p-4">

                                <Avatar img={user.image} bordered rounded />
                                <strong className="text-slate-900 text-sm font-medium dark:text-slate-200">
                                    {user.name.length > 15 ? `${user.name?.slice(0, 15)}...` : user.name}
                                </strong>
                            </div>
                        )))} */}
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
        </div>
    );
};

export default page;
