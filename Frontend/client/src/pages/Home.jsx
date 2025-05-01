import React from 'react';
import Navbar from '../components/Navbar'
import About from '../components/About'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonilas'
import Trainers from '../components/Trainers'

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