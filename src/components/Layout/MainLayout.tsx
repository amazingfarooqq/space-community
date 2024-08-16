import React from 'react'
import Header from '../Header/Header'
import BGGradient from '../BGGradient'

let products = [
    1, 2, 3, 4, 5, 6
]
const MainLayout = ({ children }: any) => {
    return (
        <main className=" flex min-h-screen flex-col mb-0 pb-0 px-4" >
            <Header />
            <div className='flex flex-wrap'>
                {products.map(item => {
                    return (
                        <div key={item} className="relative w-[350px] h-[350px] bg-[#F6F6F6] dark:bg-[#000] text-center rounded-lg p-8 m-1">
                            <h2 className="text-2xl ">Nike Kiger 9</h2>
                            <p className="text-sm font-light">Men's Running Shoes</p>
                            <img className="w-[280px] h-[180px] object-cover mx-auto" src="/images/test1.png" alt="Nike Kiger 9" />

                            <div className="flex justify-between items-center mt-6">
                                <span className="text-lg">₹ 12,795.00</span>
                                <button className="border-2 border-black bg-transparent text-sm uppercase py-2 px-4 rounded-full hover:bg-black hover:text-white transition-all">add to cart</button>
                            </div>

                            {/* <div className="absolute top-1/3 flex justify-center gap-2 items-center w-full">
                    <span className="w-2.5 h-2.5 bg-[#000000] rounded-full cursor-pointer"></span>
                    <span className="w-2.5 h-2.5 bg-[#093161] rounded-full cursor-pointer"></span>
                    <span className="w-2.5 h-2.5 bg-[#CE5303] rounded-full cursor-pointer"></span>
                </div> */}
                        </div>

                    )
                })}


            </div>
            {/* <BGGradient /> */}
        </main>
    )
}

export default MainLayout