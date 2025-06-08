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

  const contactGradient = 'bg-gradient-to-r from-[#0c0d0d] to-[#17191c]'
  return (
    <>
    {/* hero section */}
    <div
      id='home'
      className='h-screen bg-cover bg-center relative'
      style={{ backgroundImage: `url(${Class})` }}
    >
      <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
      <HomeNavbar/>
      <img src={Children} alt="children svg" className='w-xl absolute left-39 top-50 rounded-4xl'/>
      {/* text area card */}
      <div className='absolute right-62 top-90'>
        <h3 className='text-[#fab916] text-6xl font-bold' style={{ fontFamily: 'Alice' }}>WELCOME TO</h3>
        <h1 className='text-7xl text-white font-bold' style={{ fontFamily: 'Alice' }}>KINGSBRIDGE <br /> ACADEMY</h1>
        <p className='text-lg text-[#a9c7ee]'>where learning starts</p>

        <button className='bg-[#fab916] w-full mt-15 py-3 rounded text-xl' style={{ fontFamily: 'Instrumental Serif' }}>Enroll Now</button>

      </div>
      {/* Content can go here */}
    </div>
    {/* about section */}
    <div id='about' className='h-screen bg-cover bg-center relative' style={{backgroundImage: `url(${AboutBackground})`}}>
      <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
      <h1 className='text-6xl absolute m-4 text-white font-bold' style={{ fontFamily: 'Instrumental Serif' }}>About us</h1>

      {/* school vision and missions divs */}

      <div className='absolute top-38 left-16 p-3 space-y-16'>
        <div className='w-3xl bg-black rounded border-2 border-[#b74115]'>
          <h2 className='text-white m-3 flex gap-2'>Our Motto <BsStars className="text-white m-1 animate-bounce" /> </h2>

          <p className='text-gray-500 m-3 font-bold'>At Kingsbridge Academy, we believe that every learner carries the potential to lead, innovate, and impact the world. Our motto — Inspiring Excellence, Shaping Futures — reflects our commitment to nurturing character, curiosity, and confidence in every student. We don’t just teach; we empower, guide, and ignite a lifelong love for learning that goes beyond the classroom.</p>
        </div>
        <div className='w-3xl h-40 bg-black rounded border-2 border-[#fab916]'>
          <h2 className='text-white m-3 flex gap-2'>Our Vision <TbTargetArrow className="text-white m-1 animate-bounce" /> </h2>

          <p className='text-gray-500 m-3 font-bold'>To be a center of excellence that shapes future leaders through holistic education, innovation, and integrity. We envision a learning community where students are inspired to dream big, think critically, act responsibly, and create meaningful change in their communities and the world.</p>

        </div>
        <div className='w-3xl bg-black rounded border-2 border-green-600'>
          <h2 className='text-white m-3 flex gap-2'>Our Mission <HiOutlineEye className="text-white m-1 animate-bounce" /> </h2>

          <p className='text-gray-500 m-3 font-bold'>Our mission is to provide a nurturing and inclusive learning environment that empowers every student to reach their full potential. We are committed to academic excellence, character development, and lifelong learning. Through innovation, critical thinking, and community engagement, we prepare learners to become responsible global citizens and leaders of tomorrow.</p>

        </div>
      </div>

      <img src={PencilsImg} alt="pencils svg" className='absolute right-18 top-30 w-2xl'/>

    </div>

    {/* enrollments section */}
    <div id='enrollment' className='h-screen bg-cover bg-center relative' style={{backgroundImage: `url(${SchoolBuilding})`}}> 
      <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
      <h1 className='text-6xl absolute m-4 text-white' style={{ fontFamily: 'Instrumental Serif' }}>Enrollments</h1>

      {/* enrollments card */}
      <div className='w-5/6 h-5/6 bg-cover bg-center bg-white absolute top-25 left-28' style={{backgroundImage: `url(${EnrollmentPic})`}}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className='absolute w-full bg-[#645e77] p-2'>
        <p className='underline'>About Enrollments</p>
        <p className='text-white' style={{ fontFamily: 'Alice' }}>Enrollments at our school are conducted on a termly basis, giving new students the opportunity to join at the beginning of each academic term. Parents and guardians are encouraged to complete the admission process early to secure a spot, as spaces are limited. The process includes filling out an application form, submitting the required documents, and attending an orientation session. Our admissions team is always available to guide you through each step.</p>

      </div>
      <div className='absolute w-full bottom-0 bg-[#a57e7f] py-8'>
        <div className='w-4/5 h-16 bg-[rgba(37,37,53,0.5)] flex justify-evenly mx-auto p-2 rounded'>
        <p className='text-2xl text-white mt-3' style={{ fontFamily: 'Instrumental Serif' }}>Want to know more about enrollments?</p>
        <button className='bg-yellow-500 p-2 rounded'>Next Enrollment</button>
        <button className='bg-yellow-400 px-5 rounded'>Enroll</button>
        </div>
      </div>

        
      </div>
    </div>

    {/* contact us section */}
    <div id='contact' className='h-screen bg-cover bg-center relative flex' style={{ backgroundImage: `url(${ContactKid})` }}>
      <div className="absolute inset-0 bg-blue-900 opacity-80"></div>
      <h1 className='text-6xl absolute m-4 text-white' style={{ fontFamily: 'Instrumental Serif' }}>Contact us</h1>
      <div className='w-2xl h-4/5 bg-cover bg-center absolute top-28 left-10 rounded shadow-md shadow-black' style={{backgroundImage: `url(${muslimGirl})`}} >
      </div>
      <div className='w-1/2 h-5/6 bg-cover bg-center absolute top-24 right-5 rounded flex items-center justify-center' >
        <form className= {`text-white bg-opacity-90 w-full h-full p-10 rounded-lg shadow-lg flex flex-col justify-center space-y-5 ${contactGradient}`}>
          <h2 className="text-3xl font-bold text-gray-500 mb-4 text-center underline" style={{ fontFamily: 'Alice' }}>Get in Touch With us</h2>
          <div>
            <label className="block text-white mb-2" htmlFor="name">Name</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2" htmlFor="email">Email</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-2" htmlFor="subject">Subject</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="block text-white mb-2" htmlFor="message">Message</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 resize-none"
              id="message"
              name="message"
              rows="4"
              placeholder="Type your message here..."
              required
              style={{ minHeight: "100px" }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded font-semibold hover:bg-blue-800 transition mt-4"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>

    {/* footer section */}
    <footer className="bg-blue-900 text-white py-10 px-8 flex flex-col md:flex-row justify-between items-center relative z-10">
      <div className="mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-2">Kingsbridge Academy</h2>
        <p className="text-gray-300 max-w-xs">
          Inspiring excellence, nurturing growth. Where learning starts and futures are built.
        </p>
      </div>
      <div className="mb-6 md:mb-0">
        <h3 className="font-semibold mb-2">Quick Links</h3>
        <ul>
          <li><a href="#" className="hover:underline text-gray-200">Home</a></li>
          <li><a href="#" className="hover:underline text-gray-200">About</a></li>
          <li><a href="#" className="hover:underline text-gray-200">Enrollments</a></li>
          <li><a href="#" className="hover:underline text-gray-200">Contact</a></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Contact Info</h3>
        <p className="text-gray-300">123 School Lane, City, Country</p>
        <p className="text-gray-300">Email: info@kingsbridgeacademy.com</p>
        <p className="text-gray-300">Phone: +123 456 7890</p>
      </div>
      <div className="absolute bottom-2 left-0 w-full text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Kingsbridge Academy. All rights reserved.
      </div>
    </footer>
    </>
  )
}

export default Home