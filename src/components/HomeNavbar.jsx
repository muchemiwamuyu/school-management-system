import React from 'react'
import SchoolLogo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

function HomeNavbar() {
    const navbarGradient = 'bg-gradient-to-r from-[#355fb5] to-[#121212]'
    return (
        <div className={`absolute w-full ${navbarGradient}`}>
            <img src={SchoolLogo} alt="school logo" className='w-55 ml-3 mt-[-12px]' />
            {/* navigation links*/}
            <nav className="absolute top-22 left-65">
                <ul className="flex space-x-16 text-white text-3xl" style={{ fontFamily: 'Alice' }}>
                    <li className="relative group">
                        <a href="#home" className="hover-underline">Home</a>
                    </li>
                    <li className="relative group">
                        <a href="#about" className="hover-underline">About</a>
                    </li>
                    <li className="relative group">
                        <a href="#enrollment" className="hover-underline">Enrollment</a>
                    </li>
                    <li className="relative group">
                        <Link to="/parents" className="hover-underline">Parents</Link>
                    </li>
                    <li className="relative group">
                        <a href="#contact" className="hover-underline">Contact us</a>
                    </li>
                </ul>
            </nav>


            {/* login or sign up cards */}
            <Link to='/signup' className='btn-grad w-60 h-22 absolute top-10 right-6 '>
                <p className='mt-4 text-2xl' style={{ fontFamily: 'Instrument Serif' }}>Sign up</p>
            </Link>
        </div>
    )
}

export default HomeNavbar