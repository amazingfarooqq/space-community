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


    console.log("Context Space:", { spaces });
    

    const connectSocket = (userData: any) => {
        console.log("run1");
        if (!userData?.username) return
        console.log("run2");

        const newSocket = io.connect(process.env.NEXT_PUBLIC_BASE_URL, {
            query: { username: userData.username, socketid: userData.socketid },
        });

        newSocket.on("receive_socketid", (id: any) => {
            const data = { socketid: userData.socketid, username: userData.username, image: userData.image };
            setUserDataInCookie(data);
        });
        newSocket.on("receive_message", (data: any) => {
            console.log("receive_message", data);

            setMessages((prev: any) => [...prev, data]);
        });

        newSocket.on("receive_space", (data: any) => {
            setSpaces((prev: any) => {
                const updatedSpaces = [...prev, data];
                updateSpaces(updatedSpaces);
                return updatedSpaces;
            });
        });

        newSocket.on("users_response", (data: any) => {
            const status = data.status;
            console.log("users_response Socket Context",{status});
            
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
        const userData = getUserDataFromCookie()
        console.log({ userData });

        console.log("run");

        connectSocket(userData)
    }, []);

    useEffect(() => {
        fetchSpaces();
    }, [])
    async function fetchSpaces() {
        const storedSpaces = await axios.get("/api/spaces/getSpaces")
        console.log({ storedSpaces });
        setSpaces(storedSpaces.data || []);

        // if (storedSpaces) {
        // }
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
