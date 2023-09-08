import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useUser } from '@/contexts/UserContext'

export default function SidebarbarToCreateSpace({ open, setOpen }: any) {
  
  const session = useSession()
  const {userData} = useUser()

  const [loading, setLoading] = useState(false)
  const [spaceData, setSpaceData] = useState({
    title: '',
    language: '',
    level: '',
    limit: 1,
  });

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
    // Now you can use spaceData to submit your form data
    console.log('Form data:', spaceData);
    setLoading(true);
    await createSpace(spaceData);
    setLoading(false);
    // You can also call any other function to handle the submission.
    // For example, you can call createSpace function here.
    // createSpace(spaceData);
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
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
                    <div className="absolute  left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-gray-700 py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6">
                        Panel title
                      </Dialog.Title>
                    </div>
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
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none"
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
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none"
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
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="limit">Limit</label>
                          <select
                            name="limit"
                            value={spaceData.limit}
                            onChange={handleLimitChange}
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none"
                          >
                            {/* Generating options for limits */}
                            {Array.from({ length: 20 }, (_, index) => (
                              <option key={index + 1} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-800 hover:bg-blue-800 text-white text-sm py-2.5 px-5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:focus:ring-blue-900"
                        >
                          Create Space
                        </button>
                      </form>
                    </div>

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
