"use client"
import { Spinner } from "flowbite-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
    <Spinner size="xl" />
  </div>
}