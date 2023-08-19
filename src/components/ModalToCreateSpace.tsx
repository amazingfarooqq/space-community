'use client';

import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';

interface ModalToCreateSpaceProps {
    id: string,
    isCreateSpaceModal: string,
    setIsCreateSpaceModal: (value: string) => void
}

import React from 'react'

const ModalToCreateSpace: React.FC<ModalToCreateSpaceProps> = ({ id, isCreateSpaceModal, setIsCreateSpaceModal }) => {
    return (
        <>
            <button type="button" onClick={() => setIsCreateSpaceModal('show')} className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-900">Create Space</button>
            <Modal size="lg" dismissible show={isCreateSpaceModal === 'show'} onClose={() => setIsCreateSpaceModal("hide")}>
                <Modal.Header>Create new space</Modal.Header>
                <Modal.Body>
                    <div className="">
                        <label htmlFor="">Space Title</label>
                        <input
                            type="text"
                            placeholder="Lets talk in English"
                            className="block mt-2 text-sm py-3 px-4 rounded-lg w-full border outline-none dark:border-gray-600 dark:bg-gray-700"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer className='pt-0 border-none'>
                    <Button color="purple" onClick={() => setIsCreateSpaceModal("show")}>Create Space</Button>
                    <Button color="gray" onClick={() => setIsCreateSpaceModal("hide")}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalToCreateSpace



