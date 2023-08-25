"use client"

import React, { use } from 'react'

async function getData() {

    const userdata = {
        id: "123",
        socketid: "123",
        name: "hi",
        currentSpaceId: ""

    }
    const spacedata = {
        id: "",
        title: "",
        userIds: [],
        users: []
    }
    return { userdata, spacedata };
}

const dataPromise = getData();

const page = () => {
    const data = use(dataPromise);

    const userdata = data.userdata;
    const spacedata = data.spacedata;

    return (
        <div>page</div>
    )
}

export default page