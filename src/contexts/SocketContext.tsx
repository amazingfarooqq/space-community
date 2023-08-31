"use client"

import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"; // Import the socket.io-client library directly
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";
import { getUserDataFromCookie, setUserDataInCookie } from "@/libs/functions";
import axios from "axios";

const initialData = {
    socket: undefined,
    spaceUsers: {},
    messages: {},
    spaces: [],
};

const SocketContext = createContext(initialData);

export function useSocket() {
    return useContext(SocketContext);
}




export default function SocketProvider({ children }: { children: any }) {
    const [spaceUsers, setSpaceUsers] = useState<any>({});
    const [chatid, setChatid] = useState<any>("");
    const [socket, setSocket] = useState<any>();
    const [messages, setMessages] = useState<any>([]);
    const [spaces, setSpaces] = useState<any>([]);

    const { userData } = useUser()

    console.log({userData});
    

    const connectSocket = () => {
        if (!userData?.id) return console.log("no user data");

        const newSocket = io.connect(process.env.NEXT_PUBLIC_BASE_URL, {
            query: { name: userData.name, uuid: userData.id},
        });

        newSocket.on("receive_uuid", (id: any) => {
            // const data = { uuid: userData.uuid, username: userData.username, image: userData.image };
            // setUserDataInCookie(data);
        });
        newSocket.on("receive_message", (data: any) => {
            if(data.status === "previous_space_left"){
                console.log("previous_space_left", data);
                
            }else {
                setMessages((prev: any) => [...prev, data]);
            }
        });

        newSocket.on("receive_space", (data: any) => {
            setSpaces((prev: any) => {
                const updatedSpaces = [data,...prev];
                updateSpaces(updatedSpaces);
                return updatedSpaces;
            });
        });

        newSocket.on("users_response", (data: any) => {
            const status = data.status;

            if (status === "joined") {
                const newUsers = data.joinedUser;
                setSpaces((prevSpaces: any[]) => {
                    return prevSpaces.map((space: any) => {
                        if (space.id === data.spaceId) {
                            return {
                                ...space,
                                users: [...space.users, newUsers]
                            };
                        }
                        return space;
                    });
                });
            }
            if (status === "left") {
                const leftUserId = data.leftUserId; // ID of the user who left

                console.log({leftUserId});
                
                setSpaces((prevSpaces: any[]) => {
                    return prevSpaces.map((space: any) => {
                        if (space.id === data.spaceId) {
                            console.log(space.id, data.spaceId);
                            console.log(space.users);
                            
                            const updatedUsers = space.users.filter((user: any) => user.id !== leftUserId);
                            return {
                                ...space,
                                users: updatedUsers
                            };
                        }
                        return space;
                    });
                });
            }

            if (status === "left") {
                const leftUserId = data.leftUserId; // ID of the user who left

                setSpaces((prevSpaces: any[]) => {
                    return prevSpaces.map((space: any) => {
                        if (space.id === data.spaceId) {
                            const updatedUsers = space.users.filter((user: any) => user.id !== leftUserId);
                            return {
                                ...space,
                                users: updatedUsers
                            };
                        }
                        return space;
                    });
                });
            }


        });
        setSocket(newSocket);

    }

    useEffect(() => {
        connectSocket()
    }, [userData]);

    useEffect(() => {
        fetchSpaces();
    }, [])
    async function fetchSpaces() {
        try {
            const storedSpaces = await axios.get("/api/spaces/getSpaces")
            setSpaces(storedSpaces.data || []);
            
        } catch (error) {
            console.error({error});
            
        }
    }

    function updateSpaces(updatedSpaces: any) {
        localStorage.setItem("spaces", JSON.stringify(updatedSpaces));
    }

    return (
        <SocketContext.Provider
            value={{ socket, spaceUsers, messages, setMessages, setChatid, spaces, setSpaces, connectSocket }}
        >
            {children}
        </SocketContext.Provider>
    );
}
