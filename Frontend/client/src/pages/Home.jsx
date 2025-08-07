import React from 'react';
import Navbar from '../components/layout/Navbar'
import About from '../components/common/About'
import Hero from '../components/common/Hero'
import Services from '../components/common/Services'
import Footer from '../components/layout/Footer'
import Testimonials from '../components/common/Testimonilas'
import Trainers from '../components/common/Trainers'

const Home = ()=>
{
    return(
        <div>
            <Navbar/>
            <Hero/>
            <Services/>
            <About/>
            <Trainers/>
            <Testimonials/>
            <Footer/>
        </div>
    )
}
export default Home