import React from 'react'
import Class from '../assets/classroom1.jpg'
import HomeNavbar from '../components/HomeNavbar'
import Children from '../assets/children.svg'
import AboutBackground from '../assets/aboutbg.jpg'
import PencilsImg from '../assets/pencils.svg'
import SchoolBuilding from '../assets/schoolbui.jpg'
import EnrollmentPic from '../assets/backtoschool.jpg'
import ContactKid from '../assets/contactkid.jpg'
import muslimGirl from '../assets/muslimcon.jpg'
import { FaQuoteLeft } from 'react-icons/fa'
import { BsStars } from 'react-icons/bs'
import { TbTargetArrow } from 'react-icons/tb'
import { HiOutlineEye } from 'react-icons/hi'


function Home() {
  return (
    <>
    {/* hero section */}
    <div
      className='h-screen bg-cover bg-center relative'
      style={{ backgroundImage: `url(${Class})` }}
    >
      <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
      <HomeNavbar/>
      <img src={Children} alt="children svg" className='w-xl absolute left-39 top-50 rounded-4xl'/>
      {/* text area card */}
      <div className='absolute right-62 top-90'>
        <h3 className='text-[#fab916] text-6xl'>WELCOME TO</h3>
        <h1 className='text-7xl text-white'>KINGSBRIDGE <br /> ACADEMY</h1>
        <p className='text-lg text-[#a9c7ee]'>where learning starts</p>

        <button className='bg-[#fab916] w-full mt-15 py-3 rounded text-xl'>Enroll Now</button>

      </div>
      {/* Content can go here */}
    </div>
    {/* about section */}
    <div className='h-screen bg-cover bg-center relative' style={{backgroundImage: `url(${AboutBackground})`}}>
      <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
      <h1 className='text-6xl absolute m-4 text-white'>About us</h1>

      {/* school vision and missions divs */}

      <div className='absolute top-38 left-16 p-3 space-y-16'>
        <div className='w-3xl h-40 bg-black rounded border-2 border-[#b74115]'>
          <h2 className='text-white m-3 flex gap-2'>Our Motto <BsStars className="text-white m-1 animate-bounce" /> </h2>

          <p className='text-gray-500 m-3'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
        </div>
        <div className='w-3xl h-40 bg-black rounded border-2 border-[#fab916]'>
          <h2 className='text-white m-3 flex gap-2'>Our Motto <TbTargetArrow className="text-white m-1 animate-bounce" /> </h2>

          <p className='text-gray-500 m-3'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

        </div>
        <div className='w-3xl h-40 bg-black rounded border-2 border-green-600'>
          <h2 className='text-white m-3 flex gap-2'>Our Motto <HiOutlineEye className="text-white m-1 animate-bounce" /> </h2>

          <p className='text-gray-500 m-3'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

        </div>
      </div>

      <img src={PencilsImg} alt="pencils svg" className='absolute right-18 top-30 w-2xl'/>

    </div>

    {/* enrollments section */}
    <div className='h-screen bg-cover bg-center relative' style={{backgroundImage: `url(${SchoolBuilding})`}}> 
      <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
      <h1 className='text-6xl absolute m-4 text-white'>Enrollments</h1>

      {/* enrollments card */}
      <div className='w-5/6 h-5/6 bg-cover bg-center bg-white absolute top-25 left-28' style={{backgroundImage: `url(${EnrollmentPic})`}}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className='absolute w-full bg-[#645e77] p-2'>
        <p>About Enrollments</p>
        <p className='text-white'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>

      </div>
      <div className='absolute w-full bottom-0 bg-[#a57e7f] py-8'>
        <div className='w-4/5 h-16 bg-[rgba(37,37,53,0.5)] flex justify-evenly mx-auto p-2 rounded'>
        <p className='text-xl mt-3'>Want to know more about enrollments?</p>
        <button className='bg-red-600 p-2'>Next Enrollment</button>
        <button className='bg-red-600 px-5'>Enroll</button>
        </div>
      </div>

        
      </div>
    </div>

    {/* contact us section */}
    <div className='h-screen bg-cover bg-center relative' style={{ backgroundImage: `url(${ContactKid})` }}>
      <div className="absolute inset-0 bg-blue-900 opacity-80"></div>
      <h1 className='text-6xl absolute m-4 text-white'>Contact us</h1>
      <img src={muslimGirl} alt="" />
    </div>
    </>
    
    
  )
}

export default Home