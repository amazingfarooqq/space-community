"use client"

import BGGradient from '@/components/BGGradient'
import Header from '@/components/Header/Header'
import MainLayout from '@/components/Layout/MainLayout'
import Sidebar from '@/components/sidebar/Sidebar'
import React, { useState } from 'react'

const page = () => {
  const posts = [
    {
      id: 1,
      name: 'Sonali Hirave',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit sequi reiciendis culpa eos quas aliquam deserunt iusto ducimus corrupti, iste aut accusamus magni? Alias ex blanditiis perspiciatis ducimus veritatis recusandae molestiae totam saepe sequi. Natus ratione similique.'
    },
    {
      id: 2,
      name: 'Sonali Hirave',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit sequi reiciendis culpa eos quas aliquam deserunt iusto ducimus corrupti, iste aut accusamus magni? Alias ex blanditiis perspiciatis ducimus veritatis recusandae molestiae totam saepe sequi. Natus ratione similique, tenetur dolorem, corrupti maiores quia atque culpa voluptates necessitatibus eius mollitia ex tempora temporibus a reiciendis voluptatibus quas, laudantium vero sapiente voluptatem esse! Inventore necessitatibus voluptatibus animi deleniti labore, qui distinctio excepturi dolorem enim voluptatem blanditiis pariatur eius tempore incidunt vel eum! Ipsa quis velit, quia fugiat vitae, commodi sunt eveniet nulla nemo labore, vero debitis veniam culpa explicabo? Dignissimos ab repudiandae quae.'
    },
    {
      id: 3,
      name: 'Sonali Hirave',
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit sequi reiciendis culpa eos quas aliquam deserunt iusto ducimus corrupti, iste aut accusamus magni? Alias ex blanditiis perspiciatis ducimus veritatis recusandae molestiae totam saepe sequi. Natus ratione similique, tenetur dolorem, corrupti maiores quia atque culpa voluptates necessitatibus eius mollitia ex tempora temporibus a reiciendis voluptatibus quas, laudantium vero sapiente voluptatem esse! Inventore necessitatibus voluptatibus animi deleniti labore, qui distinctio excepturi dolorem enim voluptatem blanditiis pariatur eius tempore incidunt vel eum! Ipsa quis velit, quia fugiat vitae, commodi sunt eveniet nulla nemo labore, vero debitis veniam culpa explicabo? Dignissimos ab repudiandae quae.'
    },
  ]
  const [expandedPosts, setExpandedPosts] = useState({});
  const [likes, setLikes] = useState({});

  const togglePostExpand = (postId) => {
    setExpandedPosts((prevExpandedPosts) => ({
      ...prevExpandedPosts,
      [postId]: !prevExpandedPosts[postId],
    }));
  };

  const handleLikeComment = (commentId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [commentId]: (prevLikes[commentId] || 0) + 1,
    }));
  };
  return (
    <MainLayout>
      <div className='w-full '>
        <div className=" ">
          <h2 className=" py-2 text-2xl font-bold">Bugs and Features</h2>
        </div>
        <div className="flex">
          <div className="w-10 py-1">
            <img
              className="inline-block h-10 w-10 rounded-full"
              src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
              alt=""
            />
          </div>
          <div className="flex-1 px-2 pt-2 ">
            <textarea
              className=" bg-transparent text-gray-400 font-medium text-lg w-full"
              rows={2}
              cols={50}
              placeholder="What's happening?"
              defaultValue={""}
            />
          </div>
        </div>
        {/*middle creat tweet below icons*/}
        <div className="flex">
          <div className="">
            <button className="bg-blue-400 mt-5 hover:bg-blue-600 font-bold py-2 px-8 rounded text-white float-right">
              Post
            </button>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="flex-1 ">
            <h2 className="py-2 text-xl font-semibolay e">Posts</h2>
          </div>
          <div className="flex-1 py-2">
            <div
              className=" text-2xl font-medium rounded-full cursor-pointer float-right"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
              </svg>
            </div>
          </div>
        </div>

        {posts.map(item => {
          const isExpanded = expandedPosts[item.id];
          const isLiked = likes[item.id] > 0;

          return (
            <div className='py-4'>

              <div className="flex flex-shrink-0 pb-0">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img className="inline-block h-10 w-10 rounded-full" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
                    </div>
                    <div className="ml-3 mb-1">
                      <p className="text-base leading-6 font-bold ">
                        {item.name} {" "}
                        <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                          16 April
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
              <div className="">
                <p className="text-base width-auto font-medium flex-shrink py-2">
                  {isExpanded ? item.text : item.text.slice(0, 400)}
                  {item.text.length > 400 && (
                    <span
                      onClick={() => togglePostExpand(item.id)}
                      className="cursor-pointer "
                    >
                      {isExpanded ? " Show Less" : " See More"}
                    </span>
                  )}
                </p>
                {/* <div className="flex">
                      <div className="w-full">
                        <div className="flex items-center">
                          <div className=" ">
                            <button
                              onClick={() => handleLikeComment(item.id)}
                              className={`flex gap-1 text-gray-500 text-base leading-6 font-medium rounded-full ${isLiked ? "text-blue-300" : ""
                                }`}
                            >
                              <svg
                                className=" h-7 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              {likes[item.id] || 0}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> */}
              </div>
            </div>

          )
        })}

      </div>
    </MainLayout>
  )
}

export default page