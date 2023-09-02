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

    // const connectSocket = () => {

    //     if (!userData?.id) {
    //         console.log("no user data");
    //         return
    //     }
    //     console.log("got user");

    //     console.log("run")

    //     const newSocket = io.connect(process.env.NEXT_PUBLIC_BASE_URL, {
    //         query: { name: userData.name, uuid: userData.id },
    //     });



    //     // newSocket.on("receive_spaces", (data: any) => {
    //     //     console.log("receive_spaces", { data });
    //     //     setSpaces(data)
    //     //     // const data = { uuid: userData.uuid, username: userData.username, image: userData.image };
    //     //     // setUserDataInCookie(data);
    //     // });

    //     newSocket.on("receive_available_spaces", (data: any) => {
    //         console.log("receive_available_spaces", data);
    //         setSpaces(data);
    //     })
    //     newSocket.on("receive_message", (data: any) => {
    //         if (data.status === "previous_space_left") {
    //             console.log("previous_space_left", data);

    //         } else {
    //             setMessages((prev: any) => [...prev, data]);
    //         }
    //     });

    //     newSocket.on("receive_space", (data: any) => {
    //         setSpaces((prev: any) => {
    //             const updatedSpaces = [data, ...prev];
    //             updateSpaces(updatedSpaces);
    //             return updatedSpaces;
    //         });
    //     });

    //     newSocket.on("users_response", (data: any) => {
    //         const status = data.status;

    //         if (status === "joined") {
    //             const newUsers = data.joinedUser;
    //             setSpaces((prevSpaces: any[]) => {
    //                 return prevSpaces.map((space: any) => {
    //                     if (space.id === data.spaceId) {
    //                         return { ...space, users: [...space.users, newUsers] };
    //                     }
    //                     return space;
    //                 });
    //             });
    //         }
    //         if (status === "left") {
    //             const leftUserId = data.leftUserId;

    //             setSpaces((prevSpaces: any[]) => {
    //                 return prevSpaces.map((space: any) => {
    //                     if (space.id === data.spaceId) {
    //                         const updatedUsers = space.users.filter((user: any) => user.id !== leftUserId);
    //                         return { ...space, users: updatedUsers };
    //                     }
    //                     return space;
    //                 });
    //             });
    //         }


    //     });
    //     setSocket(newSocket);

    // }


    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });

        socketInstance.on("connect", () => {
            console.log("connected", socketInstance);
            setIsConnected(true);
        });

        socketInstance.on("disconnect", () => {
            setIsConnected(false);
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

            console.log("joinSpace", data);
            const status = data.status;
            if (status === "joined") {

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
            console.log({ data });
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
