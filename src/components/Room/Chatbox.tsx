import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

const Chatbox = ({ messages, sendMessage, closeChatbox }: { messages: any; sendMessage: any, closeChatbox: any }) => {
  const [txt, setTxt] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const [newMessageCount, setNewMessageCount] = useState(0);

  useEffect(() => {
    if (bottomRef?.current && newMessageCount === 0) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (newMessageCount > 0) {
      toast.success(`${newMessageCount} new message(s)`);
    }
  }, [messages, newMessageCount]);

  const handleOnChange = (e: any) => {
    setTxt(e.target.value);
  };

  const sendMessageFunc = (e: any) => {
    e.preventDefault();
    const text = txt.trim();
    if (text === '') return;
    sendMessage(text, setTxt);
  };

  const onEnterPress = (e: any) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      sendMessageFunc(e);
    }
  };

  const handleNewMessageClick = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    setNewMessageCount(0);
  };

  return (
    <>
      <div id="messages" className="flex flex-col py-2 pr-0 overflow-y-auto h-full ">
        {messages?.map((item: any) => {
          return (
            <React.Fragment key={item.id}>
              {(item.status === 'joined' || item.status === 'left') && (
                <div className="flex items-center py-2">
                  <div className="space-y-2 w-full text-xs items-start">
                    <div className={`px-2 rounded-lg`}>
                      <div className={`break-all ${item.status === 'joined' ? 'text-green-400 pb-0 mb-0' : item.status === 'left' ? 'text-red-400 pb-0 mb-0' : ''}`}>
                        {item.text}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {item.status === 'sent' && (
                <div className="chat-message p-2">
                  <div className="flex">
                    <img src={item?.image} alt="My profile" className="w-8 h-8 rounded-lg" />

                    <div className="space-y-3 w-full text-xs mx-1 items-start">
                      <div className={`px-1 rounded-lg`}>
                        <div className="flex justify-between">
                          <h2 className="text-blue-400 text-sm">{item % 2 ? '⭐' : ''} {item?.name}</h2>
                          <h2>
                            <div className="justify-center hidden mr-auto text-gray-500 dark:text-gray-400 md:flex">
                              <span className="text-xs break-all">{item?.createdAt}</span>
                            </div>
                          </h2>
                        </div>
                        <div className="dark:text-gray-300 pb-1 text-sm">{item?.text}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
        {newMessageCount > 0 && (
          <div className="text-center text-blue-400 cursor-pointer" onClick={handleNewMessageClick}>
            {newMessageCount} new message(s)
          </div>
        )}
        <div className="" ref={bottomRef} />
      </div>
      <div>
        <div className="pt-1">
          <button
          onClick={closeChatbox}
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-full w-8 transition duration-500 ease-in-out text-gray-500 focus:outline-none"
          >
            <svg className="h-5 w-5 text-gray-600 hover:text-blue-400 transition duration-300 ease-in-out" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full w-8 transition duration-500 ease-in-out text-gray-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600 hover:text-blue-400 transition duration-300 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full w-8 transition duration-500 ease-in-out text-gray-500 0 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600 hover:text-blue-400 transition duration-300 ease-in-out"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <form className="flex">
          <textarea
            onKeyDown={onEnterPress}
            value={txt}
            onChange={handleOnChange}
            className="w-full p-2 border dark:bg-[#1e272d] dark:border-gray-700  rounded-l-lg resize-none  dark:text-gray-100 bg-gray-100"
            placeholder="Enter your message..."
            rows={3}
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-lg" onClick={sendMessageFunc}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbox;
