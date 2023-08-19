"use client"

import BottomNav from '@/components/Room/BottomNav';
import Chatbox from '@/components/Room/Chatbox';
import RightSide from '@/components/Room/RightSide';
import axios from 'axios';
import React, { useState } from 'react';



const ChatComponent = () => {


    return (
        <>
            
            <div className="h-screen flex">
                <BottomNav />
                <RightSide />
                <Chatbox />

            </div>
        </>
    );
};

export default ChatComponent;
