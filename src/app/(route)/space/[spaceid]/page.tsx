"use client"

import BGGradient from "@/components/BGGradient";
import Chatbox from "@/components/Room/Chatbox";
import RightSide from "@/components/Room/RightSide";
import { useSocket } from "@/contexts/SocketContext";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const page = ({ params: { spaceId } }: { params: { spaceId: string; } }) => {
    const router = useRouter()

    const [isChatBox, setIsChatBox] = useState(true)
    const { spaces, socket, messages, setMessages }: any = useSocket()

    const { userData }: any = useUser()
    const currentSpaceData = spaces.find((space: any) => space.id === spaceId)

    const handleChatBox = () => {
        setIsChatBox(true)
    }

    const handleRightSide = () => {
        setIsChatBox(!isChatBox)

    }

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
            return;
        }

        if (session.status == "unauthenticated") {
            toast.error("Excuse, you are not logged in");
            // router.push("/");
            return;
        }

        console.log({userData});
        

        // if (!userData?.id) {
        //     toast.error("Seems like there is something wrong, refrsh will solve it!");
        //     return;
        // }

        // toast.error("please wait as we fetch space data");
        // const set = async () => {
        //     try {
        //         const joinedUserData = {
        //             ...userData
        //         }

        //         await axios.post('/api/spaces/joinSpace', {
        //             spaceId, userId: userData.id, joinedUserData, socketId: socket.id
        //         })
                
        //         joinUserDatabase(joinedUserData)
        //     } catch (error) {
        //         console.log({error});
                
        //     }
        // }

        // set()
        getSpace().then((spaceData) => {
            console.log({userData});
            
            const joinedUserData = {
                id: userData?.id,
                name: userData?.name,
                image: userData?.image,
                followers: userData?.followers,
                native: userData?.native,
                learning: userData?.learning,
                country: userData?.country,
                bio: userData?.bio,
            }
            joinUserDatabase(joinedUserData)
        }).catch((error) => {
            // Handle any errors that might occur during the fetch
            console.error("Error fetching space data:", error);
        });
    }, [userData]);

    const joinUserDatabase = async (joinedUserData: any) => {

        try {
            await axios.post('/api/spaces/joinSpace', {
                spaceId, userId: userData.id, joinedUserData, socketId: socket.id
            })

        } catch (error) {
            console.error({error});
            toast.error("Error joining space");
            router.push("/")
        }
    }

    const sendMessage = async (txt: any, setTxt: any) => {
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


    const closeChatbox = () => {
        setIsChatBox(false)
    }


    return (
        <div>
            {!currentSpaceData?.id &&
                <section className="relative place-items-center grid h-screen w-screen gap-4">
                    <BGGradient />
                    <div className="bg-blue-500 w-48 h-48  absolute animate-ping rounded-full delay-5s shadow-xl" />
                    <div className="bg-blue-400 w-32 h-32 absolute animate-ping rounded-full shadow-xl" />
                    <div className="bg-transparent w-24 h-24 absolute animate-pulse rounded-full shadow-xl" />
                    <img src="/images/logoemoji.png" alt="Logo" className="text-blue-900  h-16 w-16" />
                </section>
                                            
            }
            {currentSpaceData?.id &&
                <div className="h-screen flex " >
                    <div className={`lg:w-full w-full flex flex-col justify-between  `}>
                        <RightSide currentSpaceData={currentSpaceData} isChatBox={isChatBox} leaveSpace={leaveSpace} handleChatBox={handleChatBox} handleRightSide={handleRightSide} />
                    </div>



                    {isChatBox &&
                        <div className={`absolute right-0 lg:relative  w-full sm:w-[400px] lg:w-[500px]  border border-gray-300 dark:bg-[#1e272d] dark:border-gray-700  pb-2  justify-between flex flex-col h-[calc(100vh)]`}>
                            <Chatbox messages={messages} sendMessage={sendMessage} closeChatbox={closeChatbox}/>
                        </div>
                    }


                </div>
            }
        </div>
    );
};

export default page;
