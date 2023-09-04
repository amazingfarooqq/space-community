"use client"

import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"; // Import the socket.io-client library directly
import { useUser } from "./UserContext";
import axios from "axios";
import { io as ClientIO } from "socket.io-client";

const initialData = {
    isConnected: false,
    socket: undefined,
    messages: {},
    spaces: [],
};

const SocketContext = createContext(initialData);

export function useSocket() {
    return useContext(SocketContext);
}



export default function SocketProvider({ children }: { children: any }) {
    const [messages, setMessages] = useState<any>([]);
    const [spaces, setSpaces] = useState<any>([]);
    const [currentSpaceData, setCurrentSpaceData] = useState({})

    const [currentSpaceId, setCurrentSpaceId] = useState("")

    const { userData } = useUser()


    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);

    console.log({ isConnected });


    useEffect(() => {
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });

        socketInstance.on("connect", () => {
            console.log("connected");
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            console.log("disconnect");
            console.log({ currentSpaceId, userData });

            setIsConnected(false);

            if (currentSpaceId && userData) {

                const leaveData = {
                    spaceId: currentSpaceId,
                    userId: userData.id, // Assuming you have userData available
                };
                const removeFromSpace = async () => {
                    await axios.delete(`/api/spaces/leaveSpace`, {
                        data: {
                            spaceId: currentSpaceId,
                            userId: userData.id,
                            name: userData.name
                        }
                    });
                }

                removeFromSpace()
                // socketInstance.emit("leaveSpace", leaveData);
            }
        });

        socketInstance.on("createSpace", (data: any) => {
            console.log("createSpace", data);
            setSpaces((prev: any) => {
                const updatedSpaces = [data, ...prev];
                return updatedSpaces;
            });
        });

        socketInstance.on("joinSpace", (data: any) => {
            console.log("joinSpace: ", { data });
            const status = data.status;
            if (status === "joined") {
                setCurrentSpaceId(data.spaceId)
                const newUsers = data.joinedUserData;
                setSpaces((prevSpaces: any[]) => {
                    return prevSpaces.map((space: any) => {
                        if (space.id === data.spaceId) {
                            const usersIds = space.userIds
                            const newIds = usersIds.push(newUsers.id)
                            return { ...space, userIds: usersIds, users: [...space.users, newUsers] };
                        }
                        return space;
                    });
                });
            }
        });

        socketInstance.on("leaveSpace", (data: any) => {
            const status = data.status;

            if (status === "left") {
                const leftUserId = data.leftUserId;
                setSpaces((prevSpaces: any[]) => {
                    return prevSpaces.map((space: any) => {
                        if (space.id === data.spaceId) {

                            const updatedUsers = space.users.filter((user: any) => user.id !== leftUserId);
                            const updatedUserIds = space.userIds.filter(item => item !== leftUserId)
                            return {
                                ...space,
                                userIds: updatedUserIds,
                                users: updatedUsers
                            };
                        }
                        return space;
                    });
                });
            }
        });


        socketInstance.on("space_msg", (data: any) => {
            console.log("space_msg", { data });
            if (data) {
                setMessages((prev: any) => [...prev, data]);
            }

        });


        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        }
    }, []);

    useEffect(() => {
        fetchSpaces();
    }, [])

    async function fetchSpaces() {
        try {
            console.log("fetchSpaces");
            const storedSpaces = await axios.get("/api/spaces/getSpaces")
            console.log({storedSpaces});
            
            setSpaces(storedSpaces.data || []);

        } catch (error) {
            console.error({ error });
        }
    }

    return (
        <SocketContext.Provider
            value={{ isConnected, socket, messages, setMessages, spaces, setSpaces, currentSpaceData, setCurrentSpaceData }}
        >
            {children}
        </SocketContext.Provider>
    );
}
