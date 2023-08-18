import React from 'react'

interface CreateSpaceProps {
    id: string
}

const ModalToCreateSpace: React.FC<CreateSpaceProps> = ({ id }) => {
    return (
        <>
            <button data-modal-target={id} data-modal-toggle="popup-modal" className="mt-5 block text-white bg-purple-800 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-purple-400 dark:hover:bg-purple-500  " type="button">
                Create Space
            </button>
            <div id={id} className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full justify-center items-center">
                <div className="relative w-full max-w-md max-h-full ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide={id}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-start">

                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-200">Create a new space.</h3>

                            <div className='pb-4'>

                                <label htmlFor="" className='text-lg font-normal text-gray-500 dark:text-gray-400'>Enter Space title</label>
                                <input
                                    type="text"
                                    placeholder="Lets talk in English"
                                    className="block py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>
                            <button type="button" className="text-white bg-purple-500 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm inline-flex items-start px-5 py-2.5 text-start mr-2">
                                Create
                            </button>
                            <button data-modal-hide={id} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalToCreateSpace