"use client";
import IMessage from "@/interfaces/IMessage";
import ISocketContext from "@/interfaces/ISocketContext";
import { createContext, useContext, useEffect, useState } from "react";
import * as socketIO from "socket.io-client";
import { useUser } from "./UserContext";
import { useRouter } from "next/navigation";



const intialData: ISocketContext = {
  socket: undefined,
  roomUsers: {},
  messages: {},
};

const SocketContext = createContext<ISocketContext>(intialData);

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [roomUsers, setRoomUsers] = useState([]);
  const [socket, setSocket] = useState<socketIO.Socket>();
  const [messages, setMessages] = useState<{ [key: string]: IMessage[] }>({});

  const router = useRouter()
  


  const logoutFunc = () => {
    setMessages({})
    setSocket(undefined)
    setRoomUsers([])
  }


  const enterChatroom = (nickname: string) => {
    let socket_io = socketIO.connect(process.env.NEXT_PUBLIC_BASE_URL!);
    socket_io.on("receive_message", (data: IMessage) => {
      console.log({ data });

      setMessages((prev) => {
        const newMessages = { ...prev };
        newMessages[data.roomId] = [...(newMessages[data.roomId] ?? []), data];
        return newMessages;
      });
    });
    socket_io.on("users_response", (data) => {
      console.log(data);

      let global_room_data = data[1]

      setRoomUsers(global_room_data)
    });

    socket_io?.emit("send_message", {
      text: nickname + " joined the room at " + `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      socketId: "kurakani",
      roomId: 1,
      status: "user_joined"
    });
    socket_io?.emit("join_room", {
      roomId: 1,
      name: nickname,
      joinedAt: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
    });

    socket_io?.on("typing_response", (data) => {
      console.log("typing_response", { data });
    });


    socket_io.on("receivemsgs", (data) => {
      console.log("Received receivemsgs event");

      // ... (handling 'receivemsgs' event)
      console.log("receivemsgs", { data });

      setMessages({ 1: data })

    });

    console.log({ socket_io });

    setSocket(socket_io);

  }
  return (
    <SocketContext.Provider value={{ socket, roomUsers, messages, enterChatroom, logoutFunc }}>
      {children}
    </SocketContext.Provider>
  );
}
