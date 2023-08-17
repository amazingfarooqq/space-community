"use client"

import Header from '@/components/Header'
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import React from 'react'
import { toast } from 'react-hot-toast';

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
    <div className='h-screen dark:bg-[#191D20] '>
      <Header />
      <div className="pt-16 flex justify-center items-center ">
        <div className="py-12 px-12 bg-white dark:bg-[#1e272d] rounded-xl shadow-xl z-20 border dark:border-gray-700">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
              Create An Account
            </h1>
            <p className="w-80 text-center text-sm mb-8 opacity-70  tracking-wide cursor-pointer">
              Create an account to enjoy all the services without any ads for free!
            </p>
          </div>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Email Addres"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-600 dark:bg-gray-700"
            />
            <input
              type="text"
              placeholder="Password"
              className="block text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div className="text-center mt-3">
            <button className="py-2 px-5 text-white bg-purple-400 rounded-2xl ">
              Login
            </button>

          </div>

          <span className="flex items-center justify-center space-x-2 mt-4">
            <span className="h-px bg-gray-400 w-14"></span>
            <span className="font-normal ">or login with</span>
            <span className="h-px bg-gray-400 w-14"></span>
          </span>

          <div className="flex flex-col mt-5">
            <button onClick={() => socialAction('google')} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
              <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
                <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
              </svg>
              Sign in with Google
            </button>
            <button onClick={() => socialAction('github')} className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
              <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
              </svg>
              Sign in with Github
            </button>

          </div>
        </div>
      </div>

    </div>

    </>

  )
}

export default page

