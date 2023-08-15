"use client"

import BottomNav from '@/components/Room/BottomNav';
import Chatbox from '@/components/Room/Chatbox';
import RightSide from '@/components/Room/RightSide';
import { pusher } from '@/lib/pusher';
import axios from 'axios';
import React, { useState } from 'react';



const ChatComponent = () => {

    const username = "abc"
    const [message, setMessage] = useState("")

    const send = async () => {
        await axios.post("/api/pusher", {
            message: "hello",
            sender: "farooq",
        });
    }



    return (
        <div className="h-screen flex">

            <BottomNav />
            <RightSide />
            <Chatbox message={message} setMessage={setMessage} send={send} />

        </div>
    );
};

export default ChatComponent;
