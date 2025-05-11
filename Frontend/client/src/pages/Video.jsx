import React from 'react'
import VideoCard from './VideoCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const Video = () => {
    return (
        <div className="min-h-screen flex flex-col ">
            <Navbar />

            <main className="flex-1 px-4 py-6 mt-16">
                <div className="flex flex-wrap justify-center items-center gap-6 overflow-auto">
                    <VideoCard />
                </div>
            </main>

            <Footer />
        </div>



    )
}

export default Video
