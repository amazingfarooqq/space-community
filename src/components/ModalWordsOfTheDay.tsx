'use client';

import { Avatar, Button, Modal } from 'flowbite-react';
import { useState } from 'react';


const words = [
    {
        word: "Serendipity",
        meaning: "Finding something good without looking for it.",
        sentences: ["Meeting my best friend at that random party was pure serendipity."]
    },
    {
        word: "Quintessential",
        meaning: "The most perfect or typical example of something.",
        sentences: ["Her elegant dress was the quintessential outfit for the evening."]
    },
    {
        word: "Panacea",
        meaning: "A solution or remedy for all problems or difficulties.",
        sentences: ["Some people believe that exercise is a panacea for stress."]
    }
]

export default function ModalWordsOfTheDay({ isWordsOfTheDayModal, setIsWordsOfTheDayModal }: any) {

    const handleOnClose = () => setIsWordsOfTheDayModal(false)
    return (
        <>
            <Modal className='fade-in' dismissible show={isWordsOfTheDayModal} size="3xl" popup onClose={handleOnClose}>
                <Modal.Header className='border-b py-4'>
                    <div className="text-3xl px-2 ">Words of the Day</div>
                </Modal.Header>
                <Modal.Body className="">
                    <div className="mt-2">
                        {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}

                        <div>
                            {words.map((item, index): any => {
                                return (
                                    <div className='flex flex-col mt-5'>
                                        <div className='text-xl'>{index+1}. {item.word} </div>
                                        <div className='font-normal text-gray-500 dark:text-gray-400'>Meaning: {item.meaning}</div>
                                        <div className='font-normal text-gray-500 dark:text-gray-400'>Sentences:</div>
                                        <ol>
                                            {item.sentences.map((item):any => {
                                                return <li className='font-normal text-gray-500 dark:text-gray-400'>{item}</li>
                                            })}
                                        </ol>

                                    </div>
                                )
                            })}
                        </div>


                        <div className="flex gap-4 mt-5">
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
