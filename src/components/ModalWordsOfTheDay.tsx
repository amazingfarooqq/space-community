'use client';

import { Avatar, Button, Modal } from 'flowbite-react';
import { useState } from 'react';

export default function ModalWordsOfTheDay({ isWordsOfTheDayModal, setIsWordsOfTheDayModal }: any) {

    const handleOnClose = () => setIsWordsOfTheDayModal(false)
    return (
        <>
            <Modal dismissible show={isWordsOfTheDayModal} size="3xl" popup onClose={handleOnClose}>
                <Modal.Header className='border-b py-4'>
                    <div className="text-3xl px-2 ">Words of the Day</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="mt-2">
                        {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}

                        <div>
                            <div className='flex flex-col mt-5'>
                                <div className='text-xl'>1. Test word 1</div>
                                <div className='font-normal text-gray-500 dark:text-gray-400'>Meaning: test</div>
                                <div className='font-normal text-gray-500 dark:text-gray-400'>Sentences:</div>
                                <ol>
                                    <li className='font-normal text-gray-500 dark:text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, sed!</li>
                                    <li className='font-normal text-gray-500 dark:text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, sed!</li>
                                    <li className='font-normal text-gray-500 dark:text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, sed!</li>
                                    <li className='font-normal text-gray-500 dark:text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, sed!</li>
                                </ol>

                            </div>
                            <div className='flex flex-wrap text-sm py-5'>
                                <div className="mr-4 text-center">
                                    <span className="block">32</span>
                                    <span className="text-blueGray-400">Followers</span>
                                </div>
                                <div className="mr-4 text-center">
                                    <span className="block ">44</span>
                                    <span className="text-blueGray-400">Following</span>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-center gap-4">
                            {/* <Button color="failure" onClick={() => handleOnClose}>
                                Yes, I'm sure
                            </Button> */}
                            <Button color="gray" onClick={handleOnClose}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}


