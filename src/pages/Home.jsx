import { useState } from 'react'
import React from 'react'
import { FiMenu, FiX, FiArrowRight, FiCheck, FiBook, FiAward, FiUsers, FiSmile } from 'react-icons/fi'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-blue-600 font-bold text-2xl flex items-center">
                  <FiBook className="mr-2" />
                  Bright Minds Academy
                </span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <a href="#" className="border-blue-500 text-gray-900 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-600 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium">
                  About Us
                </a>
                <a href="#" className="border-transparent text-gray-600 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium">
                  Classes
                </a>
                <a href="#" className="border-transparent text-gray-600 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium">
                  Admissions
                </a>
                <a href="#" className="border-transparent text-gray-600 hover:border-blue-300 hover:text-blue-700 inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium">
                  Parents
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 px-4 py-2 rounded-lg text-sm font-bold shadow-md transform hover:scale-105 transition">
                Contact Us
              </button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none"
              >
                {mobileMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white">
            <div className="pt-2 pb-4 space-y-1">
              <a href="#" className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-3 border-l-4 text-base font-medium">
                Home
              </a>
              <a href="#" className="border-transparent text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 block pl-3 pr-4 py-3 border-l-4 text-base font-medium">
                About Us
              </a>
              <a href="#" className="border-transparent text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 block pl-3 pr-4 py-3 border-l-4 text-base font-medium">
                Classes
              </a>
              <a href="#" className="border-transparent text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 block pl-3 pr-4 py-3 border-l-4 text-base font-medium">
                Admissions
              </a>
              <a href="#" className="border-transparent text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 block pl-3 pr-4 py-3 border-l-4 text-base font-medium">
                Parents
              </a>
              <div className="mt-4 px-4">
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-800 px-4 py-3 rounded-lg text-base font-bold shadow-md">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Where Young Minds</span>
                  <span className="block text-blue-600">Grow & Shine</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  A nurturing environment for children aged 5-11 to discover, learn, and develop lifelong skills through our innovative curriculum.
                </p>
                <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition">
                      School Tour
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition">
                      Meet Our Teachers
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="Happy children in classroom" />
        </div>
      </div>

      {/* Announcement Banner */}
      <div className="bg-yellow-400">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-yellow-500">
                <FiAward className="h-6 w-6 text-white" />
              </span>
              <p className="ml-3 font-medium text-blue-900 truncate">
                <span className="md:hidden">Now enrolling for 2023-24!</span>
                <span className="hidden md:inline">Now enrolling for the 2023-24 academic year! Limited spaces available.</span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-600 bg-white hover:bg-yellow-50">
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Our Approach to Learning
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
              We combine academic excellence with social development in a caring, inclusive environment.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative bg-blue-50 p-6 rounded-xl">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white -top-6">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-bold text-blue-800">{feature.name}</p>
                  <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-200 font-semibold tracking-wide uppercase">What Parents Say</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              Trusted by Families
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white pt-10 pb-6 px-6 rounded-lg shadow-lg relative">
                <div className="absolute -top-5 left-5 bg-yellow-400 p-2 rounded-full">
                  <a className="h-6 w-6 text-white" />
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center">
                  <img className="h-10 w-10 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-blue-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-yellow-400">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-blue-900 sm:text-4xl">
            <span className="block">Ready to join our school family?</span>
            <span className="block">We'd love to meet you!</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-yellow-600 bg-white hover:bg-yellow-50 transform hover:scale-105 transition">
                Book a Visit
                <FiArrowRight className="ml-3 -mr-1 h-5 w-5" />
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition">
                Download Prospectus
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase">About Us</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Our Mission</a></li>
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Staff</a></li>
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Facilities</a></li>
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Safeguarding</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase">Academics</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Curriculum</a></li>
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Assessment</a></li>
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Homework</a></li>
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Special Needs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase">Parents</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Calendar</a></li>
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Newsletters</a></li>
                <li><a href="#" className="text-base text-blue-100 hover:text-white">PTA</a></li>
                <li><a href="#" className="text-base text-blue-100 hover:text-white">Uniform</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-blue-200 tracking-wider uppercase">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-base text-blue-100">123 School Lane</li>
                <li className="text-base text-blue-100">Education City</li>
                <li className="text-base text-blue-100">AB1 2CD</li>
                <li className="text-base text-blue-100 mt-4">Tel: 01234 567890</li>
                <li className="text-base text-blue-100">Email: info@brightminds.ac.uk</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-blue-300">
              &copy; 2023 Bright Minds Academy. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-blue-300 hover:text-white">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    name: 'Holistic Development',
    description: 'We focus on academic, social, emotional and physical development to nurture well-rounded individuals.',
    icon: FiUsers,
  },
  {
    name: 'Creative Curriculum',
    description: 'Our innovative approach makes learning engaging and relevant to children\'s lives and the modern world.',
    icon: FiBook,
  },
  {
    name: 'Small Class Sizes',
    description: 'With a maximum of 20 students per class, each child receives personalized attention from our teachers.',
    icon: FiSmile,
  },
  {
    name: 'Outdoor Learning',
    description: 'Our extensive grounds and forest school program connect children with nature and hands-on experiences.',
    icon: FiAward,
  },
]

const testimonials = [
  {
    quote: "My child has flourished at Bright Minds Academy. The teachers genuinely care and the creative curriculum has made her love learning.",
    name: "Sarah Johnson",
    role: "Parent of Year 3 student",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg"
  },
  {
    quote: "The transition from nursery to reception was seamless thanks to the caring staff. My son looks forward to school every day!",
    name: "Michael Brown",
    role: "Parent of Reception student",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "The focus on emotional wellbeing alongside academics is what sets this school apart. My daughter has grown in confidence tremendously.",
    name: "Emma Davis",
    role: "Parent of Year 5 student",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
]

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  }
]