"use client"

import BGGradient from "@/components/BGGradient";
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


    useEffect(() => {
        setMessages([])
    }, [])

    const session = useSession()

    const getSpace = async () => {
        try {
            const spaceData = await axios.post("/api/spaces/getSpace", { spaceId })
            return spaceData

        } catch (error) {
            console.log({ error });
            toast.error("Space does not exist");
            router.push("/")


        }
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
            toast.error("Excuse, !userData?.id you are not logged in");
            router.push("/");
            return;
        }

        // toast.error("please wait as we fetch space data");

        getSpace().then((spaceData) => {
            const spacedata = spaceData.data;
            const joinedUserData = {
                id: userData?.id || "",
                name: userData?.name || "",
                image: userData?.image || "",
                followers: userData?.followers || "",
            }
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
            toast.error("Error joining space");
            router.push("/")
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

            await axios.post(`/api/msgs/spacemsgs/msgs`, {
                spaceId, msgData,
            });

            setTxt("")
        } catch (error) {
            toast.error("Error sending message");
            console.log({ error });

        }

    }


    const leaveSpace = async () => {
        try {

            const response = await axios.delete(`/api/spaces/leaveSpace`, {
                data: {
                    spaceId: spaceId,
                    userId: userData.id,
                    name: userData.name
                }
            });
            console.log({ response });

            router.push("/");

        } catch (error) {
            toast.error("Error leaving space");
            console.log(error);

        }
    }


    return (
        <div>
            {!currentSpaceData?.id &&
                <section className="relative place-items-center grid h-screen w-screen gap-4">
                    <BGGradient />
                    {/*   ITEM 1 */}
                    <div className="bg-purple-500 w-48 h-48  absolute animate-ping rounded-full delay-5s shadow-xl" />
                    {/*   ITEM 2 */}
                    <div className="bg-purple-400 w-32 h-32 absolute animate-ping rounded-full shadow-xl" />
                    {/*   ITEM 3 */}
                    <div className="bg-white dark:bg-black w-24 h-24 absolute animate-pulse rounded-full shadow-xl" />
                    {/*   SVG LOGO */}
                    <img src="/images/logoemoji.png" alt="Logo" className="text-purple-900  h-16 w-16" />

                    {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-purple-900 filter mix-blend-overlay h-16 w-16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                    </svg> */}
                </section>

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
