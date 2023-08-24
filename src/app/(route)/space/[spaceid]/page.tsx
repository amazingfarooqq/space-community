"use client"

import BottomNav from '@/components/Room/BottomNav';
import Chatbox from '@/components/Room/Chatbox';
import RightSide from '@/components/Room/RightSide';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import socketIO, { Socket } from "socket.io-client"; // Import Socket directly from socket.io-client



const ChatComponent = ({
    params: { spaceid },
}: {
    params: {
        spaceid: string;
    };
}) => {
    const [space, setSpace] = useState<any[]>([]); // Assuming spaces will be an array of any type
    const [socket, setSocket] = useState<Socket | undefined>(undefined); // Initialize as undefined

    const session = useSession();

    console.log({ session });

    const getSpaces = async () => {
        try {
            let data = await axios.post("/api/spaces/getSpace", { spaceid })
            const currentSpace = data.data

            console.log({ getSpace: currentSpace });




            if (currentSpace) {

                setSpace(currentSpace)

                console.log("ran");
                if (currentSpace?.userIds?.includes(session?.data?.user?.id)) {
                    toast.error('You are already in this space');
                }

                console.log("ran");

                console.log({spaceId: spaceid, userId: session?.data?.user?.id});
                
                const data = await axios.post('/api/spaces/joinSpace', {
                    spaceId: spaceid,  userId: session?.data?.user?.id

                })

                console.log({ data });


            } else {
                console.log("nothing");

            }

        } catch (error) {
            console.log({ error });

        }
    }
    useEffect(() => {
        if (session.status === "authenticated") {
            const socket = socketIO?.connect(process.env.NEXT_PUBLIC_BASE_URL!);


            socket.on("join_space_updated_response", updatedSpaceData => {
                console.log("join_space_updated_response", { updatedSpaceData: updatedSpaceData });
                setSpace(updatedSpaceData);
            });
            setSocket(socket);
            getSpaces()
        }
        if (session.status === "loading") {
            console.log("loading");
        }
        if (session.status === "unauthenticated") {
            console.log("unauthenticated");
        }
    }, [session.status])


    return (
        <>

            <div className="h-screen flex">
                <BottomNav />
                <RightSide currentUsers={space?.users} />
                <Chatbox />

            </div>
        </>
    );
};

export default ChatComponent;
