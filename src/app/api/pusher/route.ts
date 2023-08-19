
import Pusher from "pusher";
import { NextResponse } from "next/server";

export const pusher = new Pusher({
    appId: "1650971",
    key: "ba89d6459a65fc6d164b",
    secret: "f45bcbb1c2835539387e",
    cluster: "ap2",
    useTLS: true,
});



export default async function handler(req, res) {
    const { message, sender } = req.body;
    const response = await pusher.trigger("chat", "chat-event", {
        message,
        sender,
    });

    return NextResponse.json({message: "done"});
}