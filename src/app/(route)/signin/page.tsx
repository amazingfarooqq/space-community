"use client"

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const SignInPage = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!(status === "loading") && !session) void signIn("google");
        if (session) window.close();
    }, [session, status]);

    return (
        <div className="bg-white"
            style={{
                width: "100px",
                height: "100px",
                position: "absolute",
                left: 0,
                top: 0,
                background: "white",
            }}
        ></div>
    );
};

export default SignInPage;