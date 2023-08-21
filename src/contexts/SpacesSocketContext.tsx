"use client";
import { createContext, useContext, useEffect, useState } from "react";
import socketIO, { Socket } from "socket.io-client"; // Import Socket directly from socket.io-client
import { useRouter } from "next/router"; // Correct import for useRouter
import { v4 as uuidv4 } from 'uuid';
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import client from "@/libs/prismadb";

interface ISocketContext {
    spacesSocket: Socket | undefined;
    createSpace: () => void;
}

const initialData: ISocketContext = {
    spacesSocket: undefined,
    createSpace: () => { }
};

const SpacesSocketContext = createContext<ISocketContext>(initialData);

export function useSpacesSocket() {
    return useContext(SpacesSocketContext);
}

export default function SpacesSocketProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [spacesSocket, setSpacesSocket] = useState<Socket | undefined>(undefined); // Initialize as undefined

    const session = useSession();

    const [spaces, setSpaces] = useState<any[]>([]); // Assuming spaces will be an array of any type
    const [space, setSpace] = useState<any>({}); // Assuming space will be of any type


    const [clientId, setClientId] = useState("")


    console.log("spaces", spaces);

    useEffect(() => {
        const clientid = uuidv4()

        setClientId(clientid)
        const socket_io = socketIO?.connect(process.env.NEXT_PUBLIC_BASE_URL!, {
            query: { clientId: clientid },
        });
        setSpacesSocket(socket_io);

        socket_io?.on("receive_spaces", (data: any) => {
            console.log("receive_spaces", {data });
            setClientId(data.socketid)
            setSpaces(data.spaces);
        });

        socket_io.on("create_space_response", (data: any) => {
            console.log("create_space_response", { spaces, data });
            // Update the spaces array with the new space data
            setSpaces(prevSpaces => [...prevSpaces, data]);
        });

        socket_io.on("space_joined_response", (data) => {
            console.log("space_joined_response", { data });
            // Update the spaces array with the updated space data
            setSpaces(prevSpaces => prevSpaces.map(space => space.spaceid === data.spaceid ? data : space));
        });

        return () => {
            socket_io?.off("receive_spaces");
            socket_io.disconnect();
        };
    }, []);


    const createSpace = () => {
        let ownerid = uuidv4();
        let userid = uuidv4();


        console.log(session);

        if (session.status == "authenticated") {
            const newSpace = {
                spaceid: uuidv4(),
                owner: session.data.user?.id,
                title: space.title || "Lets talk in english",
                language: space.language || "English",
                level: space.level || "Begineer",
                limit: 4,
                coowners: [],
                spaceusers: [],
            };

            spacesSocket?.emit("create_space", newSpace);
            toast.success('Space created!');

        }
        if (session.status == "unauthenticated") {
            toast.error('Login to create a space');
        }
    }

    const joinSpace = (spaceId: any) => {
        // Find the previous space the user is in
        if (session.status == "authenticated") {
            
            const previousSpace = spaces.find(space => space.spaceusers.some(user => user.id === clientId));

            if (previousSpace) {
                console.log({ previousSpace });
                console.log("session.data.user", session.data.user);
                

                // Remove the user from the previous space
                previousSpace.spaceusers = previousSpace.spaceusers.filter(user => user.id !== clientId);
                spacesSocket?.emit("space_joined_response", previousSpace); // Update the previous space on all clients
            }

            // Emit the "join_space" event to join the new space
            spacesSocket?.emit("join_space", { spaceId, joinedUserData: { ...session.data.user } });

        }
    }

    return (
        <SpacesSocketContext.Provider value={{ spacesSocket, createSpace, spaces, setSpaces, joinSpace }}>
            {children}
        </SpacesSocketContext.Provider>
    );
}
