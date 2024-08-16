import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../sidebar/Sidebar'
import BGGradient from '../BGGradient'
import SocialSide from '../Home/SocialSide'

const MainLayout = ({ children }: any) => {
    return (
        <main className="birdcontainer min-h-100 flex min-h-screen flex-col mb-0 pb-0 ml-16 md:ml-24 px-4" >
            <Header />
            <Sidebar />
            <BGGradient />
            {children}

            <SocialSide />
        </main>
    )
}

export default MainLayout