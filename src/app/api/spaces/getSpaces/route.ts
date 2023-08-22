import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function GET(
    req: Request
){
    try{
        const categories = await prisma.space.findMany();
        return NextResponse.json(categories);
    } catch(error){
        console.log('[CATEGORIES_GET]',error);
        return new NextResponse("Internal error", {status: 500});
    }
};