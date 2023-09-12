import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useUser } from '@/contexts/UserContext'
import { TopicCategories } from '@/libs/data'
import { Spinner } from 'flowbite-react'

export default function SidebarbarToCreateSpace({ open, setOpen }: any) {

  const [isExploreTopics, setIsExploreTopics] = useState(false)

  const session = useSession()
  const { userData } = useUser()

  const [loading, setLoading] = useState(false)
  const [spaceData, setSpaceData] = useState({
    title: '',
    language: '',
    level: '',
    limit: 10,
  });

  const handleOnSelectTopic = (topic: any) => {
    setIsExploreTopics(false)
    setSpaceData({ ...spaceData, title: topic });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpaceData({ ...spaceData, [name]: value });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLimit = parseInt(e.target.value);
    setSpaceData({ ...spaceData, limit: selectedLimit });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', spaceData);
    setLoading(true);
    await createSpace(spaceData);
    setLoading(false);
  };


  const createSpace = async (spaceData: any) => {

    if (session.status == "loading") {
      toast.error('please try again in a minute');
      return
    }

    if (session.status !== "authenticated") {
      toast.error('You need to login first');
      return
    }

    if(!userData?.id) {
      toast.error('There was error creating a new space');
      return
    }

    try {
      const newSpace = {
        owner: userData.id,
        title: spaceData.title || "Lets talk in english",
        language: spaceData.language || "English",
        level: spaceData.level || "Begineer",
        limit: spaceData.limit.toString() || "10",
      };
      const createNewSpace = await axios.post('/api/spaces/createSpace', {
        newSpace
      })
      toast.success('Space created!');
      setOpen(false)
      setSpaceData({})

    } catch (error) {
      console.log(error);

      toast.error('There was some error, try again');
    }
  }


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden" >
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col border-l dark:border-gray-700 overflow-y-scroll bg-white dark:bg-[#191D20] py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6">
                        <div className='flex justify-between'>
                          <div>Create Space</div>
                          <div className='cursor-pointer' onClick={() => setIsExploreTopics(!isExploreTopics)}>{!isExploreTopics ? "Explore Topics" :

                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                            </svg>
                          }</div>
                        </div>
                      </Dialog.Title>
                    </div>
                    {isExploreTopics &&
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className='text-2xl pb-2'>Explore Topics</div>
                        <div className='py-2 text-lg cursor-pointer border-b border-gray-200 dark:border-gray-600' onClick={() => handleOnSelectTopic("🍿 Just Hanging out")}>🍿 Just Hanging out</div>
                        <div className='py-2 text-lg cursor-pointer border-b border-gray-200 dark:border-gray-600' onClick={() => handleOnSelectTopic("🎊 New here ")}>🎊 New here </div>
                        <div className='py-2 text-lg cursor-pointer border-b border-gray-200 dark:border-gray-600' onClick={() => handleOnSelectTopic("⏰ 10 min chat ")}>⏰ 10 min chat </div>
                        <div className='py-2 text-lg cursor-pointer border-b border-gray-200 dark:border-gray-600' onClick={() => handleOnSelectTopic("🎤 Singing Room ")}>🎤 Singing Room </div>


                        {TopicCategories.map(item =>{
                          return <>
                          {item.topics.map(item => {
                            return <div className='py-2 text-lg cursor-pointer border-b border-gray-200 dark:border-gray-600' onClick={() => handleOnSelectTopic(item)}>{item}</div>
                          })}
                          </>
                        })}
                      </div>
                    }
                    {!isExploreTopics &&
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label htmlFor="title">Space Title</label>
                            <input
                              type="text"
                              name="title"
                              value={spaceData.title}
                              onChange={handleInputChange}
                              placeholder="Let's talk in English"
                              className=" block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none border dark:bg-gray-700 dark:border-gray-700"
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="language">Language</label>
                            <input
                              type="text"
                              name="language"
                              value={spaceData.language}
                              onChange={handleInputChange}
                              placeholder="English"
                              className=" block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none border dark:bg-gray-700 dark:border-gray-700"
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="level">Level</label>
                            <input
                              type="text"
                              name="level"
                              value={spaceData.level}
                              onChange={handleInputChange}
                              placeholder="Intermediate"
                              className=" block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none border dark:bg-gray-700 dark:border-gray-700"
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="limit">Limit</label>
                            <select
                              name="limit"
                              value={spaceData.limit}
                              onChange={handleLimitChange}
                              className=" block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none border dark:bg-gray-700 dark:border-gray-700"
                            >
                              {Array.from({ length: 20 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          {loading ?
                            <Spinner aria-label="Loader" />
                            :
                            <button
                              type="submit"
                              className="bg-blue-800 hover:bg-blue-800 text-white text-sm py-2.5 px-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:focus:ring-blue-900"
                            >
                              Create Space
                            </button>
                          }
                        </form>
                      </div>
                    }

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
