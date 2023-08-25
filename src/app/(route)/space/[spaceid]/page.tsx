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

    const [isChatBox, setIsChatBox] = useState(false)

    const [isParticipants, setIsParticipants] = useState(true)

    const handleParticipants = () => {
        setIsParticipants(!isParticipants)
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
                <BottomNav isChatBox={isChatBox} setIsChatBox={setIsChatBox} handleParticipants={handleParticipants} />
                <RightSide isChatBox={isChatBox} currentUsers={space?.users} />
                {isChatBox &&
                    <Chatbox />
                }


            </div>
                {isParticipants &&
                    <div className="w-96 border dark:bg-[#1e272d] dark:border-gray-700 flex-1 p:2 pb-10 sm:px-1 justify-between flex flex-col h-[calc(100vh-2rem)]">
                        <div className="grid grid-cols-2 gap-4">
                            {space?.users?.map((participant, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 rounded shadow-md flex flex-col items-center w-full"
                                >
                                    <img
                                        src={participant.image}
                                        alt={`Profile of ${participant.name}`}
                                        className="w-24 h-24 rounded-full mb-2"
                                    />
                                    <h3 className="text-lg font-semibold">{participant.name}</h3>
                                    <p className="text-gray-600">Followers: {participant.followers}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
        </div>
    );
};

export default page;
