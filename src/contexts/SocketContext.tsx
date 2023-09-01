"use client"

import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client"; // Import the socket.io-client library directly
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";
import { getUserDataFromCookie, setUserDataInCookie } from "@/libs/functions";
import axios from "axios";
import { pusherClient } from "@/libs/pusher";
import Pusher from "pusher-js";
import { toast } from "react-hot-toast";

const initialData = {
    socket: undefined,
    messages: {},
    spaces: [],
};

const SocketContext = createContext(initialData);

export function useSocket() {
    return useContext(SocketContext);
}




export default function SocketProvider({ children }: { children: any }) {
    const [socket, setSocket] = useState<any>();
    const [messages, setMessages] = useState<any>([]);
    const [spaces, setSpaces] = useState<any>([]);

    const [currentSpaceId, setCurrentSpaceId] = useState({})
    const { userData } = useUser()

    const connectSocket = () => {

        if (!userData?.id) {
            console.log("no user data");
            return
        }
        console.log("got user");

        console.log("run")

        const newSocket = io.connect(process.env.NEXT_PUBLIC_BASE_URL, {
            query: { name: userData.name, uuid: userData.id },
        });



        // newSocket.on("receive_spaces", (data: any) => {
        //     console.log("receive_spaces", { data });
        //     setSpaces(data)
        //     // const data = { uuid: userData.uuid, username: userData.username, image: userData.image };
        //     // setUserDataInCookie(data);
        // });

        newSocket.on("receive_available_spaces", (data: any) => {
            console.log("receive_available_spaces", data);
            setSpaces(data);
        })
        newSocket.on("receive_message", (data: any) => {
            if (data.status === "previous_space_left") {
                console.log("previous_space_left", data);

            } else {
                setMessages((prev: any) => [...prev, data]);
            }
        });

        newSocket.on("receive_space", (data: any) => {
            setSpaces((prev: any) => {
                const updatedSpaces = [data, ...prev];
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
                            return { ...space, users: [...space.users, newUsers] };
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
                            return { ...space, users: updatedUsers };
                        }
                        return space;
                    });
                });
            }


        });
        setSocket(newSocket);

    }

    // useEffect(() => {
    //     connectSocket()
    // }, [userData]);

    useEffect(() => {
        const channel = pusherClient.subscribe('my-channel');

        console.log("test");
        
        channel.bind('pusher:member_added', () => {
            // Handle the connection being established here
            console.log('Connected to Pusher');
        });

        channel.bind('pusher:connection_established', () => {
            console.log('Connected to Pusher');
          });

        channel.bind('pusher:member_removed', (member) => {
            // Handle user disconnection here
            console.log(`User ${member.info.username} has disconnected.`);
            // You can run any code you want when a user disconnects.
        });
        channel.bind('new-space', (data) => {
            setSpaces((prev: any) => {
                const updatedSpaces = [data, ...prev];
                return updatedSpaces;
            });
            console.log({ data });

        });

        channel.bind(`spaceupdates`, (data) => {
            console.log("spaceupdates", data);

            const status = data.status;
            if (status === "joined") {

                const newUser = data.joinedUserData;
                toast.custom((t) => (
                    <div
                      className={`${
                        t.visible ? 'animate-enter' : 'animate-leave'
                      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                      <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 pt-0.5">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={newUser.image}
                              alt=""
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {newUser.name}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              joined the space
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex border-l border-gray-200">
                        <button
                          onClick={() => toast.dismiss(t.id)}
                          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ))
                setSpaces((prevSpaces: any[]) => {
                    return prevSpaces.map((space: any) => {
                        if (space.id === data.spaceId) {
                            return { ...space, userIds: [...space.userIds, newUser.id], users: [...space.users, newUser] };
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
                            console.log("before update", { space });

                            const updatedUsers = space.users.filter((user: any) => user.id !== leftUserId);
                            const usersIds = space.userIds
                            const indexToRemove = usersIds.indexOf(leftUserId);

                            if (indexToRemove !== -1) {
                                usersIds.splice(indexToRemove, 1);
                            }
                            usersIds.splice()
                            console.log("after update", { ...space, usersIds, users: updatedUsers });

                            return { ...space, usersIds, users: updatedUsers };
                        }
                        return space;
                    });
                });
            }

        });

        // Clean up the subscription when the component unmounts
        return () => {
            channel.unbind('pusher:member_added');
            channel.unbind('pusher:member_removed');
            channel.unbind('new-space');
            channel.unbind('spaceupdates');

            channel.unsubscribe();
        };
    }, []);

    useEffect(() => {
        fetchSpaces();
    }, [])
    async function fetchSpaces() {
        try {
            const storedSpaces = await axios.get("/api/spaces/getSpaces")
            setSpaces(storedSpaces.data || []);

        } catch (error) {
            console.error({ error });

        }
    }

    function updateSpaces(updatedSpaces: any) {
        localStorage.setItem("spaces", JSON.stringify(updatedSpaces));
    }

    return (
        <SocketContext.Provider
            value={{ socket, messages, setMessages, spaces, setSpaces, connectSocket, setCurrentSpaceId }}
        >
            {children}
        </SocketContext.Provider>
    );
}
