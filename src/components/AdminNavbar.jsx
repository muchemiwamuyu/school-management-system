import React from 'react'
import Logo from '../assets/logo.svg'
import { MdDashboard } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { HiClipboardCheck } from 'react-icons/hi'; // bold check clipboard
import { MdSchool } from 'react-icons/md'; 
import { FaBookOpen } from 'react-icons/fa'; 
import { MdAttachMoney } from 'react-icons/md'; 
import { MdAnnouncement } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi'; 
import { FiLogOut } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';


function AdminNavbar() {
  return (
    <div className='bg-[#014BAD] m-2 border-2 border-black rounded shadow-2xl shadow-black'>
        {/* div for handling logo and school name */}
        <div className=' h-24 m-3 flex'>
            <img src={Logo} alt="school logo" className='w-36'/>
            <h1 className='mt-6 text-3xl p-3 text-white' style={{ fontFamily: 'Instrument Serif, serif' }}>KingsBridge Academy</h1>
        </div>
        <h2 className='text-xl text-white ml-12' style={{ fontFamily: 'Instrument Serif, serif' }}>Menu:</h2>


        {/* div for handling navigation links */}
        <div className='w-72 bg-[#395EA2] h-3/4 ml-12 mt-3 rounded border-2 border-black space-y-8 font-serif'>
            {/* boxes for each essential admin page */}
            <Link to='/admin-dashboard' className='flex bg-white py-3 m-2 space-x-3 p-2 rounded mb-4'>
                <MdDashboard size={24} />
                <p className='text-xl'>Dashboard</p>
            </Link>

            <Link to="/staff" className='flex bg-white py-3 m-2 space-x-3 p-2 rounded mb-4'>
                <FiUsers size={24} />
                <p className='text-xl'>Staff</p>
            </Link>

            <Link to='/attendance' className='flex bg-white py-3 m-2 space-x-3 p-2 rounded mb-4'>
                <HiClipboardCheck size={22}/>
                <p className='text-xl'>Attendance</p>
            </Link>

            <Link to='/students' className='flex bg-white py-3 m-2 space-x-3 p-2 rounded mb-4'>
                <MdSchool size={24} />
                <p className='text-xl'>Students</p>
            </Link>

            <Link to='/academics' className='flex bg-white py-3 m-2 space-x-3 p-2 rounded mb-4'>
                <FaBookOpen size={24} />
                <p className='text-xl'>Academics</p>
            </Link>

            <Link to='/finance' className='flex bg-white py-3 m-2 space-x-3 p-2 rounded mb-4'>
                <MdAttachMoney size={24} />
                <p className='text-xl'>Finance</p>
            </Link>

            <Link to='/notice' className='flex bg-white py-3 m-2 space-x-3 p-2 rounded mb-4'>
                <MdAnnouncement size={24} />
                <p className='text-xl'>Notice</p>
            </Link>

            <Link to='/settings' className='flex bg-white py-3 m-2 space-x-3 p-2 rounded mb-4'>
                <FiSettings size={24} />
                <p className='text-xl'>Settings</p>
            </Link>

            <Link className='flex bg-white py-3 m-2 space-x-3 p-2 rounded mb-4'>
                <FiLogOut size={24} />
                <p className='text-xl'>Logout</p>
            </Link>

        </div>
    </div>
  )
}

export default AdminNavbar