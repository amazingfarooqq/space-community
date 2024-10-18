"use client"

import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"; // Import the socket.io-client library directly
import { useUser } from "./UserContext";
import axios from "axios";
import { io as ClientIO } from "socket.io-client";
import { useSession } from "next-auth/react";

const initialData = {
    publicChatMsgs: [],
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
    const [spaces, setSpaces] = useState<any>([
        //     {
        //     id: "213123",
        //     title: "test",
        //     ownerId: "1234",
        //     ownerName: "Whats going on",
        //     ownerImage:  "/images/persistence.jpg",
        //     createdAt: "13 Sep 2023, 12:12:12 Am",
        //     ownerData: {bio: "Testing bio", native: "english-en",learning: "urdu-ur", country: "pakistan-pk" ,id: "1234",name: "Whats going on",image: "/images/persistence.jpg" },
        //     users: [
        //         {bio: "Testing bio", native: "urdu-ur",learning: "english-en", country: "india-in" ,id: "123",name: "Ahmed Sardar",image: "/images/persistence.jpg" },
        //         {bio: "Testing bio", native: "urdu-ur",learning: "english-en", country: "india-in" ,id: "123",name: "Ahmed Sardar",image: "/images/persistence.jpg" },
        //         {bio: "Testing bio", native: "urdu-ur",learning: "english-en", country: "india-in" ,id: "123",name: "Ahmed Sardar",image: "/images/persistence.jpg" },
        //         {bio: "Testing bio", native: "urdu-ur",learning: "english-en", country: "india-in" ,id: "123",name: "Ahmed Sardar",image: "/images/persistence.jpg" },
        //         {bio: "Testing bio", native: "english-en",learning: "urdu-ur", country: "pakistan-pk" ,id: "1234",name: "Whats going on",image: "/images/persistence.jpg" },
        //     ],
        //     level: "Begineer",
        //     language: "English",
        //     limit: "2"
        // },
        // {
        //     id: "213123",
        //     title: "Best Video Games of the Decade",
        //     ownerId: "31",
        //     ownerName: "Ahmed Sardar",
        //     ownerImage:  "/images/persistence.jpg",
        //     users: [
        //         {bio: "Testing bio", native: "urdu-ur",learning: "english-en", country: "Cananda-ca" ,id: "31",name: "Ahmed Sardar",image: "/images/persistence.jpg" },
        //         {bio: "Testing bio", native: "urdu-ur",learning: "english-en", country: "United States-us" ,id: "444",name: "Ahmed Sardar",image: "/images/persistence.jpg" },
        //         {bio: "Testing bio", native: "english-en",learning: "urdu-ur", country: "China-cn" ,id: "1234",name: "Whats going on",image: "/images/persistence.jpg" },
        //         {bio: "Testing bio", native: "english-en",learning: "urdu-ur", country: "China-cn" ,id: "1234",name: "Whats going on",image: "/images/persistence.jpg" },
        //     ],
        //     level: "Advance",
        //     language: "English",
        //     limit: "10"
        // },
        // {
        //     id: "213123",
        //     title: "Useless people",
        //     ownerId: "1234",
        //     ownerName: "Yasir",
        //     ownerImage:  "/images/persistence.jpg",
        //     users: [
        //         {bio: "~~", native: "Urdu-en",learning: "English-ur", country: "Pakistan-pk" ,id: "1234",name: "Yasir",image: "/images/persistence.jpg" },
        //         {bio: "Dont talk to me!", native: "Pashto-ps",learning: "English-en", country: "Afghanistan-af" ,id: "444",name: "Ilham Khan",image: "/images/dummyusers/ilham.jpg" },
        //         {bio: "Living but not really.", native: "English-ur",learning: "German-en", country: "United States-us" ,id: "444",name: "Mark",image: "/images/dummyusers/mark.jpg" },

        //     ],
        //     level: "Advance",
        //     language: "English",
        //     limit: "3"
        // },
    ]);
    const [currentSpaceData, setCurrentSpaceData] = useState({})

    const [currentSpaceId, setCurrentSpaceId] = useState("")

    const { userData } = useUser()
    const session = useSession()

    const [publicChatMsgs, setPublicChatMsgs] = useState<any>([])
    const [publicChatUsers, setPublicChatUsers] = useState<any>([])


    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {

        if (userData?.id) {
            socket?.emit("saveUserData", userData)
        }

    }, [userData, socket]);

    useEffect(() => {
        if (session.status !== "authenticated") return

        console.log("socketInstance useEffect");



        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false,
            query: {
                // Add your query parameters here
                userId: session.data?.user?.id,
                userName: session.data?.user?.name,
                userEmail: session.data?.user?.email,
                userImage: session.data?.user?.image,

            },
        });

        socketInstance.on("connect", () => {
            console.log("connected");
            setIsConnected(true);
        });

        socketInstance.on("userDisconneted", async (data: any) => {

            if (data?.id) {
                try {
                    await axios.post(`/api/spaces/disconnectUser`, {
                        userData: data
                    })

                } catch (error) {
                    console.log({ error });

                }

            }


        })

        socketInstance.on("disconnect", () => {
            console.log("disconnect");

            socketInstance.disconnect()
            socketInstance.close()
            console.log({ currentSpaceId, userData });

            setIsConnected(false);

            // if (currentSpaceId && userData) {

            //     const leaveData = {
            //         spaceId: currentSpaceId,
            //         userId: userData.id,
            //     };
            //     const removeFromSpace = async () => {
            //         await axios.delete(`/api/spaces/leaveSpace`, {
            //             data: {
            //                 spaceId: currentSpaceId,
            //                 userId: userData.id,
            //                 name: userData.name
            //             }
            //         });
            //     }

            //     removeFromSpace()
            // }
        });

        socketInstance.on("followUpdate", (data: any) => {
            console.log("followUpdate", { data });
        })

        socketInstance.on("createSpace", (data: any) => {
            console.log("createSpace", data);
            setSpaces((prev: any) => {
                const updatedSpaces = [data, ...prev];
                return updatedSpaces;
            });
        });

        socketInstance.on("deleteSpace", (deletedSpaceId: any) => {
            console.log("deleteSpace", deletedSpaceId);
            setSpaces((prevSpaces: any) => {
                // Filter out the deleted space from the state
                const updatedSpaces = prevSpaces.filter((space: any) => space.id !== deletedSpaceId);
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
            console.log("space_msg", { data: data.status });

            data.status
            if (data) {
                setMessages((prev: any) => [...prev, data]);
            }

        });



        // publicchat



        socketInstance?.on("join_public_chat", (data: any) => {
            console.log("join_public_chat", data);
            setPublicChatUsers((prev: any) => [...prev, data]);
        });

        socketInstance?.on("public_msg", (data: any) => {
            console.log("public_msg", data);
            setPublicChatMsgs((prev: any) => [...prev, data]);
        });

        socketInstance?.on("leave_public_chat", (data: any) => {
            console.log("leave_public_chat", data);

            setPublicChatMsgs((prev: any) => prev.filter((item: any) => item.nam !== data.name));
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        }
    }, [session.status]);

    useEffect(() => {
        fetchSpaces();
    }, [])

    async function fetchSpaces() {
        try {
            console.log("fetchSpaces");
            const storedSpaces = await axios.get("/api/spaces/getSpaces")
            console.log({ storedSpaces });

            const adjustSpaces = storedSpaces?.data?.map(item => {
                const createdAt = item.createdAt;
                const date = new Date(createdAt)
                const options = { year: 'numeric', month: 'short', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric" };
                const formattedDate = date.toLocaleDateString('en-US', options);

                return {
                    ...item,
                    createdAt: formattedDate
                }
            })

            setSpaces(adjustSpaces || []);

        } catch (error) {
            console.error({ error });
        }
    }

    return (
        <SocketContext.Provider
            value={{ publicChatMsgs, publicChatUsers, isConnected, socket, messages, setMessages, spaces, setSpaces, currentSpaceData, setCurrentSpaceData }}
        >
            {children}
        </SocketContext.Provider>
    );
}
