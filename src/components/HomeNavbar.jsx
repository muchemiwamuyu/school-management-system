import React from 'react'
import SchoolLogo from '../assets/logo.svg'

function HomeNavbar() {
    const navbarGradient = 'bg-gradient-to-r from-[#355fb5] to-[#121212]'
  return (
    <div className={`absolute w-full ${navbarGradient}`}>
        <img src={SchoolLogo} alt="school logo" className='w-55 ml-3 mt-[-10px]'/>
        {/* navigation links*/}
        <nav className='absolute top-19 left-59'>
            <ul className='flex space-x-16 text-white text-2xl'>
                <li>Home</li>
                <li>About</li>
                <li>Enrollment</li>
                <li>Parents</li>
                <li>Contact us</li>
            </ul>
        </nav>

        {/* login or sign up cards */}
        <div className='btn-grad w-60 h-22 absolute top-7 right-6 '>
            <p className='mt-4 text-xl'>Sign up</p>
        </div>
    </div>
  )
}

export default HomeNavbar