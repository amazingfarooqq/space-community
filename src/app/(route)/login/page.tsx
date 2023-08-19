"use client"

import Header from '@/components/Header'
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import React from 'react'
import { toast } from 'react-hot-toast';
import AuthForm from '@/components/AuthForm';
import Sidebar from '@/components/sidebar/Sidebar';
import BGGradient from '@/components/BGGradient';

const page = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (session?.status === 'authenticated') {
      toast.success('Login Succesfull!');
      router.push('/')
    }
  }, [session?.status, router]);


  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          toast.success('Login Succesfull!');
          router.push('/')
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Sidebar />
      <div>
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl dark:opacity-0 sm:-top-80 "
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <Header />
        <AuthForm />

        <BGGradient />
      </div>


    </>

  )
}

export default page

