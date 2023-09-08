'use client';

import { Button, Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';

interface ModalToCreateSpaceProps {
    id: string,
    isCreateSpaceModal: string,
    setIsCreateSpaceModal: (value: string) => void,
    createSpace: (spaceData: any, setIsCreateSpaceModal: any) => void
}

import React from 'react'

const ModalToCreateSpace: React.FC<ModalToCreateSpaceProps> = ({ id, isCreateSpaceModal, setIsCreateSpaceModal, createSpace }: any) => {

    const [spaceData, setSpaceData] = useState({
        title: "",
        language: "", // Adding language property
        level: "",    // Adding level property
        limit: 1      // Adding limit property with a default value
    });

    const handleOnChange = (e: any) => {
        if (e.target.value.length > 50) {
            return;
        }
        setSpaceData({ ...spaceData, [e.target.name]: e.target.value });
    };

    const handleLimitChange = (e: any) => {
        const selectedLimit = parseInt(e.target.value);
        setSpaceData({ ...spaceData, limit: selectedLimit });
    };

    const [loading, setLoading] = useState(false);

    const createSpaceFunc = async () => {
        setLoading(true);
        await createSpace(spaceData);
        setLoading(false);
    };


    return (
        <>
            <button type="button" onClick={() => setIsCreateSpaceModal('show')} className="focus:outline-none text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  dark:hover:bg-blue-500 dark:focus:ring-blue-900">Create Space</button>

            <Modal size="lg" dismissible show={isCreateSpaceModal === 'show'} onClose={() => setIsCreateSpaceModal("hide")}>
                <Modal.Header className='dark:bg-[#20354b] py-4'>Create new space</Modal.Header>
                <Modal.Body className='dark:bg-[#20354b]'>
                    <div className="">
                        <label htmlFor="title">Space Title</label>
                        <input
                            type="text"
                            value={spaceData.title}
                            name="title"
                            onChange={handleOnChange}
                            placeholder="Let's talk in English"
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-700 dark:dark:bg-[#20354b]"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="language">Language</label>
                        <input
                            type="text"
                            value={spaceData.language}
                            name="language"
                            onChange={handleOnChange}
                            placeholder="English"
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-700 dark:dark:bg-[#20354b]"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="level">Level</label>
                        <input
                            type="text"
                            value={spaceData.level}
                            name="level"
                            onChange={handleOnChange}
                            placeholder="Intermediate"
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-700 dark:dark:bg-[#20354b]"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="limit">Limit</label>
                        <select
                            value={spaceData.limit}
                            name="limit"
                            onChange={handleLimitChange}
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-700 dark:dark:bg-[#20354b]"
                        >
                            {/* Generating options for limits */}
                            {Array.from({ length: 20 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer className='pt-0 border-none dark:bg-[#20354b]'>
                    {loading ? <Spinner aria-label="Alternate spinner button example" />
                        :
                        <>
                            <Button color="blue" onClick={createSpaceFunc}>Create Space</Button>
                            <Button color="gray" onClick={() => setIsCreateSpaceModal("hide")}>
                                Close
                            </Button>
                        </>
                    }

                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ModalToCreateSpace



