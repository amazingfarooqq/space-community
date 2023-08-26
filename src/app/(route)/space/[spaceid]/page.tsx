"use client"

import BottomNav from "@/components/Room/BottomNav";
import Chatbox from "@/components/Room/Chatbox";
import RightSide from "@/components/Room/RightSide";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Socket, io } from "socket.io-client";

const page = ({
    params: { spaceid },
}: {
    params: {
        spaceid: string;
    };
}) => {

    const session = useSession()
    const [space, setSpace] = useState<any>({});
    const [user, setuser] = useState({ id: "", userid: "", name: "", email: "", image: "", currentSpaceId: "" })

    const router = useRouter()

    const [isChatBox, setIsChatBox] = useState(true)
    const [isParticipants, setIsParticipants] = useState(false)

    const handleParticipants = () => {
        setIsParticipants(!isParticipants)
    }
    const handleChatBox = () => {
        setIsChatBox(!isChatBox)
    }

    const [socketIo, setSocketIo] = useState<Socket>()

    const searchParams = useSearchParams()
    const test = searchParams?.get('from')

    if (test !== "home") {
        router.push("/")
        localStorage.removeItem('spaceid')
    }

    useEffect(() => {
        console.log({ session });

        if (session.status == "loading") return;
        if (session.status == "unauthenticated") return setuser({ id: "", userid: "", name: "", email: "", image: "", currentSpaceId: "" });
        if (session.status !== "authenticated") return

        const id = localStorage.getItem('socketId') || "";
        const userid = session?.data?.user?.id || "";
        const email = session.data?.user?.email || "";
        const name = session?.data?.user?.name || "";
        const image = session?.data?.user?.image || "";
        const currentSpaceId = localStorage.getItem('spaceid') || "";

        console.log("SET USER DATA")

        setuser({ ...user, id, userid, email, name, image, currentSpaceId });

    }, [session.status])

    useEffect(() => {
        const socket = io("http://localhost:4000", {
            query: { ioId: localStorage.getItem('socketId') },
        });
        setSocketIo(socket)
        socket.on('space_updated_response', (updatedSpace) => {
            console.log("space_updated_response", updatedSpace);
            setSpace((prev: any) => ({ ...prev, ...updatedSpace, users: updatedSpace.users, userIds: updatedSpace.userIds }));
        });

        socket.on('on_disconnected', (data) => {
            const disconnectedUserId = data.userid;
            const currentSpaceId = data.currentSpace;

            if (!currentSpaceId) return
            const getSpacee = async () => {
                const currentSpace = await axios.post(`/api/spaces/getSpace`, { spaceId: currentSpaceId })
                const spacedata = currentSpace.data
                spacedata.userIds = spacedata.userIds.filter((id: any) => id !== disconnectedUserId);
                const updatespaceSpace = await axios.post(`/api/spaces/joinSpace`, { space: spacedata })

                const join_space_data = {
                    userid: user.userid,
                    updatedSpace: updatespaceSpace.data
                }

                socket?.emit('join_space', join_space_data);

            }

            getSpacee()
        });



        getSpace()
    }, []);

    const getSpace = async () => {
        if (space.id) return;

        try {
            let data = await axios.post("/api/spaces/getSpace", { spaceId: spaceid });
            const currentSpace = data.data;
            console.log({ currentSpace });
            setSpace(currentSpace);
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <div>
            <div className="h-screen flex">
                <div className={`${!isChatBox && !isParticipants ? "w-full" : "w-3/4"} flex flex-col justify-between dark:bg-[#191D20] h-[calc(100vh)]`}>
                    <RightSide handleParticipants={handleParticipants} handleChatBox={handleChatBox} />
                </div>


                {isChatBox &&
                    <div className={`${isChatBox && isParticipants ? "w-2/4" : "w-1/4"}  border dark:bg-[#1e272d] dark:border-gray-700  pb-2 sm:px-1 justify-between flex flex-col h-[calc(100vh)]`}>
                        <Chatbox userdata={user} socketIo={socketIo} spaceId={space.id}/>
                    </div>
                }

                {isParticipants &&
                    <div className={`${isChatBox && isParticipants ? "w-2/4" : "w-1/4"}   border dark:bg-[#1e272d] dark:border-gray-700 h-[calc(100vh)]`}>
                        <h1 className="p-5 px-2 text-purple-400 ">Users {space?.users?.length}</h1>
                        <div className="flex flex-wrap justify-start pb-6 overflow-y-auto">

                            {space?.users?.map((user, imgIndex) => (
                                <div key={user.id} className='flex flex-col justify-center align-center items-center'>
                                    <img key={imgIndex} className={`opacity-90 dark:opacity-70 border border-purple-900 inline-block h-24 w-24 rounded-lg ml-2  ring-white  && "ring-4"} dark:ring-[#272F34]`} src={user.image} alt="" />
                                    <span title={user.name} className=' text-purple-400 mt-1' style={{ fontSize: "0.6rem" }}>{imgIndex % 3 && "⭐"}   {user.name.length > 9 ? `${user.name?.slice(0, 9)}...` : user.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default page;
