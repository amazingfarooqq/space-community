"use client";
import { createContext, useContext, useEffect, useState } from "react";
import socketIO, { Socket } from "socket.io-client"; // Import Socket directly from socket.io-client
import { useRouter } from "next/navigation"; // Correct import for useRouter
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

    const router = useRouter();
    const [clientId, setClientId] = useState("")

    const getSpaces = async () => {
        try {
            let data = await axios.get("/api/spaces/getSpaces")

            if (data?.data) {
                setSpaces(data.data)
            } else {
                console.log("nothing");

            }

        } catch (error) {
            console.log({ error });

        }
    }

    // useEffect(() => {
    //     const clientid = uuidv4()

    //     getSpaces()


    //     setClientId(clientid)
    //     const socket_io = socketIO?.connect(process.env.NEXT_PUBLIC_BASE_URL!, {
    //         query: { clientId: clientid },
    //     });
    //     setSpacesSocket(socket_io);


    //     // socket_io?.on("receive_spaces", (data: any) => {
    //     //     console.log("receive_spaces", { data });
    //     //     setClientId(data.socketid)
    //     //     setSpaces(data.spaces);
    //     // });



    //     socket_io.on("create_space_response", (data: any) => {
    //         console.log("create_space_response", { spaces, data });
    //         // Update the spaces array with the new space data
    //         setSpaces(prevSpaces => [...prevSpaces, data]);
    //     });

    //     socket_io.on("space_joined_response", (data) => {
    //         console.log("Join space response received:", { data });
    //         // Update the spaces array with the updated space data
    //         // setSpaces(prevSpaces => prevSpaces.map(space => space.id === data.id ? data : space));
    //     });

    //     socket_io.on("join_space_updated_response", updatedSpaceData => {
    //         console.log("join_space_updated_response", { updatedSpaceData: updatedSpaceData.data });

    //         console.log({ updatedSpaceData });

    //         // Update the UI with the updated space data received from the server
    //         // Assuming updatedSpaceData has properties like id, name, image, etc.

    //         setSpaces(prevSpaces => {
    //             // Find the index of the updated space in the previous spaces array

    //             console.log({ prevSpaces, updatedSpaceData });

    //             const updatedIndex = prevSpaces.findIndex(space => space.id === updatedSpaceData.id);

    //             console.log({ updatedIndex });

    //             // If the updated space is found in the array, update the array with the new updatedSpaceData
    //             if (updatedIndex !== -1) {
    //                 const updatedSpaces = [...prevSpaces];
    //                 updatedSpaces[updatedIndex] = updatedSpaceData;
    //                 return updatedSpaces;
    //             }

    //             // If the updated space is not found, return the previous state
    //             return prevSpaces;
    //         });
    //     });

    //     return () => {
    //         // socket_io?.off("receive_spaces");
    //         socket_io.disconnect();
    //     };
    // }, []);


    const createSpace = async (spaceDate:any, setIsCreateSpaceModal: any) => {
        if (session.status == "authenticated") {
            console.log({spaceDate});
            
            try {
                const newSpace = {
                    owner: session.data.user?.id,
                    title: spaceDate.title || "Lets talk in english",
                    language: spaceDate.language || "English",
                    level: spaceDate.level || "Begineer",
                    limit: "4",
                };
                const createNewSpace = await axios.post('/api/spaces/createSpace', {
                    newSpace
                })
                // console.log({ createNewSpace });
                spacesSocket?.emit("create_space", { ...createNewSpace.data });

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
        console.log({ spaceId });
        
        if (session.status == "authenticated") {
            console.log("join space");
            
            const currentSpace = spaces.find((space: any) => space.id === spaceId);
            
            if(currentSpace?.userIds?.includes(session.data.user?.id)){
                toast.error('You are already in this space');
                return
            }
            const updatingObj = {
                title: "new one",
                userIds: {
                    push: session.data.user?.id
                }

            }

            const data = await axios.post('/api/spaces/joinSpace', {
                spaceId, updatingObj, userId: session.data.user?.id

            })

            spacesSocket?.emit("join_space", data.data.updatedSpace);

            if (data.data.spacesWithUser.length > 0) {
                data.data.spacesWithUser.map((space: any) => {
                    console.log({space});
                    
                    spacesSocket?.emit("join_space", space);
                })

            }
            
            
            // router.push("/space/" + spaceId)
        }else {
            console.log("login");
            toast.error('Login to join a space');
        }

        
    }

    return (
        <SpacesSocketContext.Provider value={{ spacesSocket, createSpace, spaces, setSpaces, joinSpace }}>
            {children}
        </SpacesSocketContext.Provider>
    );
}
