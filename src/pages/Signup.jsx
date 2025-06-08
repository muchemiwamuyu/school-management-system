import React from 'react'
import schoolLogo from '../assets/logo.svg'
import Teacher from '../assets/teachervid.gif'
function Signup() {
    const mainBg = 'bg-gradient-to-r from-[#fff1eb] to-[#ace0f9]'
    
return (
    <div className={`h-screen ${mainBg} p-2`}>
            {/* dynamic navbar */}
            <div className='w-full h-36 bg-[#1d2633] rounded flex'>
                    <img src={schoolLogo} alt="" className='w-56 mt-[-3px]'/>

                    <ul className='flex gap-5 mx-auto pt-12 text-xl text-white'>
                            <a href='/'>Home</a >
                            <a href='/'>Enrollments</a >
                            <a href='/'>Parents</a >
                            <a href='/'>Contact</a >
                    </ul>
            </div>
            <img src={Teacher} alt="techer teaching" className=' rounded ml-48 mt-28'/>

            {/* div form */}
            <div className='w-1/2 h-3/4 bg-[#cad7ec] absolute top-48 right-16 flex items-center justify-center rounded shadow-lg'>
                    <form className="w-4/5">
                            <h2 className="text-2xl font-bold mb-6 text-center text-[#1d2633]">Sign Up</h2>
                            <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                                    <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ace0f9]"
                                            placeholder="Enter your name"
                                    />
                            </div>
                            <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                                    <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ace0f9]"
                                            placeholder="Enter your email"
                                    />
                            </div>
                            <div className="mb-6">
                                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                                    <input
                                            type="password"
                                            id="password"
                                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#ace0f9]"
                                            placeholder="Enter your password"
                                    />
                            </div>
                            <button
                                    type="submit"
                                    className="w-full bg-[#1d2633] text-white py-2 rounded hover:bg-[#22304a] transition"
                            >
                                    Sign Up
                            </button>
                    </form>
            </div>
    </div>
)
}

export default Signup