import { useState, useEffect } from 'react'
import React from 'react'
import Logo from '../assets/logo.svg'

import { FiMenu, FiX, FiArrowRight, FiCheck, FiBook, FiAward, FiUsers, FiSmile, FiMail, FiPhone, FiMapPin, FiStar, FiGlobe, FiHeart, FiTarget, FiShield } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { AxiosInstance1 } from '../api/Axios'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [stakeholderForm, setStakeholderForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    message: '',
  })
  const [registered, setRegistered] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'academics', 'contact']
      const scrollPosition = window.scrollY + 100

      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'academics', label: 'Academics' },
    { id: 'contact', label: 'Contact' }
  ]
  const navigate = useNavigate()

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setStakeholderForm({
      ...stakeholderForm,
      [name]: value
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await AxiosInstance1.post('/parents/request/', stakeholderForm)
      setRegistered('Registration successful! We will contact you soon.')
    } catch (error) {
      setRegistered('Error occured', error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg shadow-lg z-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-blue-600 font-bold text-2xl flex items-center" style={{ fontFamily: 'Instrument Serif, serif' }}>
                  <div className=" bg-gradient-to-br  rounded-full mr-3 flex items-center justify-center">
                    {/* <FiBook className="text-white text-lg" /> */}
                    <img src={Logo} alt="school logo" className='w-28'/>
                  </div>
                  Kingsbridge Academy
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  style={{ fontFamily: 'Instrument Serif, serif' }}
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-lg font-bold transition-all duration-300 relative ${
                    activeSection === item.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => navigate('/form')} className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition-all duration-300">
                Apply Now
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none transition-colors"
              >
                {mobileMenuOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-blue-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 pt-4">
                <button  onClick={() => navigate('/form')} className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-3 rounded-full text-base font-bold shadow-lg">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200">
                  <FiStar className="text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-blue-700">Award-Winning Education</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-extrabold" style={{ fontFamily: 'Adamina, serif' }}>
                  <span className="block text-gray-900">Where Young</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Minds Shine
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl" style={{ fontFamily: 'Instrument Serif, serif' }}>
                  Nurturing brilliance in children aged 5-11 through innovative curriculum, personalized attention, and a culture of excellence that prepares them for tomorrow's world.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Discover Our Story
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-white/80 backdrop-blur-sm hover:bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl border border-blue-200 transform hover:scale-105 transition-all duration-300"
                >
                  Schedule Tour
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  className="rounded-3xl shadow-2xl w-full h-[600px] object-cover" 
                  src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800&auto=format&fit=crop&q=80" 
                  alt="Happy children learning" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-3xl"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Academy</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over two decades, we've been shaping young minds and nurturing the leaders of tomorrow through innovative education and unwavering dedication.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">Our Mission & Vision</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe every child is unique and deserves an education that celebrates their individuality while preparing them for a rapidly evolving world. Our mission is to create confident, creative, and compassionate global citizens.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <value.icon className="text-white text-xl" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h4>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover" 
                src="https://plus.unsplash.com/premium_photo-1683887034102-9dc7524c5cfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHRlYWNoZXJzfGVufDB8fDB8fHww" 
                alt="Students in classroom" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent rounded-3xl"></div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-12 underline" style={{ fontFamily: 'Instrument Serif, serif' }}>Why Choose Kingsbridge Academy?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-white text-2xl" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Academic Programs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive curriculum designed to challenge, inspire, and prepare students for success in an ever-changing world.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <program.icon className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{program.title}</h3>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">{program.description}</p>
                <ul className="space-y-3">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <FiCheck className="text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">What Parents Say</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 overflow-hidden">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-blue-600 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Instrument Serif, serif' }}>
              Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Adamina, serif' }}>
              Ready to give your child the gift of exceptional education? We'd love to meet you and show you what makes Kingsbridge Academy special.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <info.icon className="text-white text-xl" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{info.label}</p>
                        <p className="text-gray-600">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 underline text-black" style={{ fontFamily: 'Instrument Serif, serif' }}>Ready to Join Our Family?</h3>
                <p className="mb-6 text-white/90">
                  Book a personalized tour and see firsthand why families choose Kingsbridge Academy for their children's education.
                </p>
                <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Schedule Your Visit
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
              {/* stakeholders form */}
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      onChange={handleFormChange}
                      value={stakeholderForm.first_name}
                      name="first_name"
                      type="text" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      onChange={handleFormChange}
                      value={stakeholderForm.last_name}
                      name="last_name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    onChange={handleFormChange}
                    value={stakeholderForm.email}
                    name="email"
                    required
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    onChange={handleFormChange}
                    value={stakeholderForm.phone_number}
                    name="phone_number"
                    required
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    onChange={handleFormChange}
                    value={stakeholderForm.message}
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your child and any questions you have..."
                  />
                </div>

                {registered && (
                  <div>
                    <p  style={{ fontFamily: 'Instrument Serif, serif' }} className="text-green-600 font-semibold text-center">{registered}</p>
                  </div> 
                )}
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mr-4 flex items-center justify-center">
                  <FiBook className="text-white text-xl" />
                </div>
                <span className="text-2xl font-bold" style={{ fontFamily: 'Instrument Serif, serif' }}>
                  Kingsbridge Academy
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Nurturing young minds and shaping future leaders through exceptional education, innovative curriculum, and unwavering commitment to excellence.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-blue-300">Quick Links</h3>
              <ul className="space-y-3 text-lg" style={{ fontFamily: 'Instrument Serif, serif' }}>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-blue-300">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FiMapPin className="text-blue-400 mr-3" />
                  <div className="text-gray-300">
                    <p>Lavington, Nairobi</p>
                    <p>owashika lane</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiPhone className="text-blue-400 mr-3" />
                  <p className="text-gray-300">+254 700 748 603</p>
                </div>
                <div className="flex items-center">
                  <FiMail className="text-blue-400 mr-3" />
                  <p className="text-gray-300">info@kingsbridgeacademy.edu</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Kingsbridge Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const stats = [
  { number: '500+', label: 'Happy Students' },
  { number: '25+', label: 'Expert Teachers' },
  { number: '15+', label: 'Years Excellence' }
]

const values = [
  {
    icon: FiHeart,
    title: 'Nurturing Environment',
    description: 'Creating a safe, supportive space where every child feels valued and encouraged to reach their potential.'
  },
  {
    icon: FiTarget,
    title: 'Academic Excellence',
    description: 'Delivering rigorous, engaging curriculum that challenges students while building confidence and competence.'
  },
  {
    icon: FiShield,
    title: 'Character Development',
    description: 'Instilling strong values, integrity, and social responsibility alongside academic achievement.'
  }
]

const features = [
  {
    name: 'Small Class Sizes',
    description: 'Maximum 18 students per class ensuring personalized attention and optimal learning outcomes.',
    icon: FiUsers,
  },
  {
    name: 'Innovative Curriculum',
    description: 'Cutting-edge programs that blend traditional academics with modern skills and technology.',
    icon: FiBook,
  },
  {
    name: 'Expert Teachers',
    description: 'Highly qualified educators passionate about inspiring and nurturing young minds.',
    icon: FiAward,
  },
  {
    name: 'Holistic Development',
    description: 'Focus on academic, social, emotional, and physical growth for well-rounded development.',
    icon: FiSmile,
  },
]

const programs = [
  {
    title: 'Early Years (Ages 5-7)',
    description: 'Foundation building through play-based learning and discovery',
    icon: FiSmile,
    features: [
      'Phonics and early literacy',
      'Mathematical foundations',
      'Creative arts and music',
      'Social skill development'
    ]
  },
  {
    title: 'Middle Years (Ages 8-9)',
    description: 'Expanding knowledge and developing critical thinking skills',
    icon: FiBook,
    features: [
      'Advanced reading and writing',
      'STEM exploration',
      'Foreign language introduction',
      'Project-based learning'
    ]
  },
  {
    title: 'Upper Years (Ages 10-11)',
    description: 'Preparing for secondary education with advanced concepts',
    icon: FiAward,
    features: [
      'Advanced mathematics',
      'Science investigations',
      'Digital literacy',
      'Leadership opportunities'
    ]
  }
]

const testimonials = [
  {
    quote: "The transformation in my daughter's confidence and love for learning has been remarkable. The teachers truly care about each child's success.",
    name: "Sarah Johnson",
    role: "Parent of Emma, Year 4",
    avatar: "https://randomuser.me/api/portraits/women/43.jpg"
  },
  {
    quote: "Outstanding academic programs combined with excellent pastoral care. My son has flourished in every aspect of his development.",
    name: "Michael Chen",
    role: "Parent of Alex, Year 6",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "The nurturing environment and innovative teaching methods have made learning exciting for my twins. They can't wait to get to school each day!",
    name: "Emma Thompson",
    role: "Parent of Twins, Year 2",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
]

const contactInfo = [
  {
    icon: FiMapPin,
    label: "Address",
    value: "Lavington, Nairobi, Owashika Lane"
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+254 700 748 603"
  },
  {
    icon: FiMail,
    label: "Email",
    value: "info@kingsbridgeacademy.edu"
  },
  {
    icon: FiGlobe,
    label: "Website",
    value: "www.kingsbridgeacademy.netlify.app"
  }
]

const quickLinks = [
  { name: "Admissions", href: "#" },
  { name: "Academic Calendar", href: "#" },
  { name: "Student Portal", href: "#" },
  {name: 'staff', href: '/login'}
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
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
      </svg>
    ),
  }
]