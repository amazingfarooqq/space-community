"use client";
import { createContext, useContext, useEffect, useState } from "react";
import socketIO, { Socket } from "socket.io-client"; // Import Socket directly from socket.io-client
import { useRouter } from "next/router"; // Correct import for useRouter
import { v4 as uuidv4 } from 'uuid';
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import client from "@/libs/prismadb";
import axios from "axios";

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

    const getSpaces = async () => {
        try {
            let data = await axios.get("/api/spaces/getSpaces")
            console.log({ data });

            if (data?.data) {
                console.log("data");

                setSpaces(data.data)
            } else {
                console.log("nothing");

            }

        } catch (error) {
            console.log({ error });

        }
    }

    useEffect(() => {
        const clientid = uuidv4()

        getSpaces()


        setClientId(clientid)
        const socket_io = socketIO?.connect(process.env.NEXT_PUBLIC_BASE_URL!, {
            query: { clientId: clientid },
        });
        setSpacesSocket(socket_io);


        // socket_io?.on("receive_spaces", (data: any) => {
        //     console.log("receive_spaces", { data });
        //     setClientId(data.socketid)
        //     setSpaces(data.spaces);
        // });

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


    const createSpace = async (setIsCreateSpaceModal: any) => {
        if (session.status == "authenticated") {
            try {
                const newSpace = {
                    owner: session.data.user?.id,
                    title: space.title || "Lets talk in english",
                    language: space.language || "English",
                    level: space.level || "Begineer",
                    limit: "4",
                };
                const createNewSpace = await axios.post('/api/spaces/createSpace', {
                    newSpace
                })
                console.log({ createNewSpace });
                spacesSocket?.emit("create_space", {...createNewSpace.data, spaceusers: []});
                toast.success('Space created!');
                setIsCreateSpaceModal("hide")

            } catch (error) {
                toast.error('There was some error, try again');
            }
        }
        if (session.status == "unauthenticated") {
            toast.error('Login to create a space');
        }
    }

    const joinSpace = async (spaceId: any) => {
        if (session.status == "authenticated") {

            const updatingObj = {
                title: "new one"
            }

            const updateSpace = await axios.post('/api/spaces/joinSpace', {
                spaceId, updatingObj
            })

            console.log({updateSpace});
            
            // const previousSpace = spaces.find(space => space.spaceusers.some(user => user.id === clientId));

            // if (previousSpace) {
            //     console.log({ previousSpace });
            //     console.log("session.data.user", session.data.user);


            //     // Remove the user from the previous space
            //     previousSpace.spaceusers = previousSpace.spaceusers.filter(user => user.id !== clientId);
            //     spacesSocket?.emit("space_joined_response", previousSpace); // Update the previous space on all clients
            // }

            // // Emit the "join_space" event to join the new space ss
            // spacesSocket?.emit("join_space", { spaceId, joinedUserData: { ...session.data.user } });

        }
    }

    return (
        <SpacesSocketContext.Provider value={{ spacesSocket, createSpace, spaces, setSpaces, joinSpace }}>
            {children}
        </SpacesSocketContext.Provider>
    );
}
