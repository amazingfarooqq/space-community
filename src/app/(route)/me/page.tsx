"use client"

import Header from '@/components/Header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { Avatar, Spinner } from 'flowbite-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useMemo, useState } from 'react'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios from 'axios'
import { LanguagesList } from '@/libs/data'
import MainLayout from '@/components/Layout/MainLayout'

const page = () => {
    const [country, setCountry] = useState<any>('')
    const [nativeLang, setNativeLang] = useState<any>("")
    const [learningLang, setLearningLang] = useState<any>("")
    const countryOptions = useMemo(() => countryList().getData(), [])

    const [name, setName] = useState("")
    const [bio, setBio] = useState("")

    const [isLoading, setIsLoading] = useState(true)



    const session = useSession()
    const { userData, setUserData }: any = useUser()
    const router = useRouter()

    useEffect(() => {
        const change = () => {


            setName(userData?.name || "")
            setBio(userData?.bio || "")
            const countryValue = userData?.country?.split("-")[1]
            const countryLabel = userData?.country?.split("-")[0]
            setCountry({ label: countryLabel, value: countryValue })

            const NativeLangValue = userData?.native?.split("-")[1]
            const NativeLangLabel = userData?.native?.split("-")[0]
            setNativeLang({ label: NativeLangLabel, value: NativeLangValue })

            const LearningLangValue = userData?.learning?.split("-")[1]
            const LearningLangLabel = userData?.learning?.split("-")[0]
            setLearningLang({ label: LearningLangLabel, value: LearningLangValue })
            setIsLoading(false)
        }
        change()
    }, [userData])

    const changeCountryHandler = (val: any) => setCountry(val)
    const changeNativeLangHandler = (val: any) => setNativeLang(val)
    const changeLearningLangHandler = (val: any) => setLearningLang(val)
    const handleOnChangeBio = (e: any) => setBio(e.target.value)
    const handleOnChangeName = (e: any) => setName(e.target.value)

    const handleSave = async () => {

        if (!userData?.id) {
            toast.error("There was an error updating")
            return
        }

        const ajdustcountry = `${country?.label}-${country?.value?.toLowerCase()}`
        const ajdustnative = `${nativeLang?.label}-${nativeLang?.value?.toLowerCase()}`
        const ajdustlearninglang = `${learningLang?.label}-${learningLang?.value?.toLowerCase()}`

        let data = {}

        if (name && name !== userData.name) {
            data = { ...data, name }
        }

        if (country && ajdustcountry !== userData.country) {
            data = { ...data, country: ajdustcountry }
        }

        if (nativeLang && ajdustnative !== userData.native) {
            data = { ...data, native: ajdustnative }
        }

        if (learningLang && ajdustlearninglang !== userData.learning) {
            data = { ...data, learning: ajdustlearninglang }
        }

        if (bio !== userData?.bio) {
            data = { ...data, bio }
        }


        !data && ""


        try {
            setIsLoading(true)

            const updatedUser = await axios.post("/api/user/updateUser", { uuid: userData.id, data })
            setUserData({ ...userData, ...data })
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            toast.error("there was some error in updating")
            console.log({ error });

        }
    }


    // session.status == "loading" && toast.error("Loading..")
    session.status == "unauthenticated" && router.push("/")
    session.status == "authenticated" && !userData?.id && router.push("/")
    return (
        <>
            <MainLayout>
                <section className="relative py-10 ">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-xl rounded-xl] py-10">
                            <div className="px-6">
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-3/12 px-4 flex">
                                        <div className="relative">
                                            <Avatar size="xl" rounded bordered img={userData?.image || ""} />
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-9/12 px-4 lg:order-1">
                                        <div className="flex flex-wrap py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {userData?.native?.split("-")[0] || "English"}
                                                </span>
                                                <span className="text-sm text-blueGray-400">Native</span>
                                            </div>
                                            {userData?.learning &&
                                                <div className="mr-4 p-3">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                        {userData?.learning?.split("-")[0]}

                                                    </span>
                                                    <span className="text-sm text-blueGray-400">Learning</span>
                                                </div>
                                            }
                                            <div className="lg:mr-4 p-3">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    89
                                                </span>
                                                <span className="text-sm text-blueGray-400">Followers</span>
                                            </div>
                                            <div className="lg:mr-4 p-3">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    32
                                                </span>
                                                <span className="text-sm text-blueGray-400">Following</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" mt-12">
                                    <div className='flex gap-10 flex-wrap'>
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 mb-2">
                                            {userData?.name}
                                        </h3>
                                        {userData?.country &&
                                            <h3 className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                                <div className='flex gap-3 flex-wrap'>
                                                    <img className='w-6 ' src={`/images/flags/${userData?.country?.split("-")[1]?.toLowerCase()}.png`} alt="" />
                                                    {userData?.country?.split("-")[0]}

                                                </div>
                                            </h3>
                                        }
                                    </div>

                                    <p className='mb-2'>Joining Date: {userData?.createdAt}</p>
                                    {userData?.bio && <p className="mb-2">Bio: {userData?.bio}</p>}

                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200">
                                    <div className='flex flex-col gap-3 flex-wrap'>
                                        <div className=" w-80 text-start">
                                            <label htmlFor="">Name</label>
                                            <input
                                                value={name}
                                                onChange={handleOnChangeName}

                                                className="w-full text-black bg-white p-2 border  "
                                                placeholder="Enter bio..."
                                            />
                                        </div>
                                        <div className=" w-80 text-start">
                                            <label htmlFor="">Bio</label>
                                            <textarea
                                                value={bio}
                                                onChange={handleOnChangeBio}
                                                className="w-full text-black p-2 border rounded-lg resize-none "
                                                placeholder="Enter bio..."
                                                rows={2}
                                            />
                                        </div>
                                        <div className=' w-80 text-start'>
                                            <label htmlFor="">Select your country</label>
                                            <div className='text-black'>
                                                <Select options={countryOptions} value={country} onChange={changeCountryHandler} />

                                            </div>
                                        </div>
                                        <div className=' w-80 text-start'>
                                            <label htmlFor="">Select your Native language</label>
                                            <div className='text-black'>
                                                <Select options={LanguagesList} value={nativeLang}
                                                    onChange={changeNativeLangHandler} />

                                            </div>
                                        </div>

                                        <div className=' w-80 text-start'>
                                            <label htmlFor="">Select language that you are learning</label>
                                            <div className='text-black'>
                                                <Select options={LanguagesList} value={learningLang}
                                                    onChange={changeLearningLangHandler} />

                                            </div>
                                        </div>
                                    </div>

                                        <div className="py-6 mt-32 sm:mt-0">
                                            {isLoading ?
                                                <button
                                                    disabled
                                                    className="bg-blue-500 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150 opacity-50"
                                                    type="button"
                                                >
                                                    <span className='flex gap-2'>
                                                        <Spinner size="sm" />
                                                        <span>Loading</span>
                                                    </span>
                                                </button>
                                                :
                                                <button
                                                    onClick={handleSave}
                                                    className="bg-blue-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                >
                                                    Save changes
                                                </button>
                                            }
                                        </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </MainLayout>
        </>

    )

}

export default page