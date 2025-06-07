import React, { useState } from 'react'
import { SchoolBrand2 } from '../components/SchoolBrand'
import { AxiosInstance } from '../api/Axios';

function StaffAdmin() {

  const registerGradient = 'bg-linear-to-t from-[#014BAD] to-[#001F47] shadow-lg shadow-black'
  const [staffData, setStaffData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
    dob: '',
    doJoining: '',
    position: '',
    department: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData(prev => ({ ...prev, [name]: value }));
  };


  const showMoreFields = staffData.firstName && staffData.lastName && staffData.email
  const showExtraFields = staffData.phoneNumber && staffData.idNumber && staffData.dob
  const styleInputs = 'border-2 border-black bg-white'
  const [response, setResponse] = useState('')
  const [success, setSuccess] = useState(null)

  const handleStaffRegistration = async (e) => {
    e.preventDefault()
    try {
      const res = await AxiosInstance.post('register_school/', {

        first_name: staffData.firstName,
        last_name: staffData.lastName,
        email: staffData.email,
        phone_number: staffData.phoneNumber,
        id_number: staffData.idNumber,
        date_of_birth: staffData.dob,
        date_of_joining: staffData.doJoining,
        position: staffData.position,
        department: staffData.department
      })

      setResponse(res.data.message || 'STAFF REGISTERED')
      setSuccess(true)
      console.log(res.data)
    } catch (error) {
      setResponse('Registration Failed please try again')
      setSuccess(false)
      console.log("Error response data:", error.response?.data);

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fff1eb] to-[#ace0f9]">
      <SchoolBrand2 />

      {/* register staff card */}
      <div className={`w-xl h-28 ${registerGradient} fixed right-28 top-6 rounded-2xl flex items-center justify-center`}>
        <h1 style={{ fontFamily: 'Kite One' }} className="text-3xl text-white font-bold">REGISTER STAFF</h1>
      </div>

      {/* dynamic registration staff form */}
      <div className="max-w-xl w-full bg-[#CAD7EC] fixed right-28 top-44 rounded-2xl shadow-lg shadow-black p-8">
        <form
          onSubmit={handleStaffRegistration}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
        >
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#014BAD]">First Name</label>
            <input
              type="text"
              className={`${styleInputs} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#014BAD]`}
              name="firstName"
              onChange={handleChange}
              value={staffData.firstName}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#014BAD]">Last Name</label>
            <input
              type="text"
              className={`${styleInputs} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#014BAD]`}
              name="lastName"
              onChange={handleChange}
              value={staffData.lastName}
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#014BAD]">Email</label>
            <input
              type="email"
              className={`${styleInputs} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#014BAD]`}
              name="email"
              onChange={handleChange}
              value={staffData.email}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#014BAD]">Phone Number</label>
            <input
              type="tel"
              className={`${styleInputs} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#014BAD]`}
              name="phoneNumber"
              value={staffData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#014BAD]">ID Number</label>
            <input
              type="text"
              className={`${styleInputs} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#014BAD]`}
              name="idNumber"
              value={staffData.idNumber}
              onChange={handleChange}
              placeholder="Enter ID number"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#014BAD]">Date of Birth</label>
            <input
              type="date"
              className={`${styleInputs} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#014BAD]`}
              name="dob"
              value={staffData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#014BAD]">Date of Joining</label>
            <input
              type="date"
              className={`${styleInputs} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#014BAD]`}
              name="doJoining"
              value={staffData.doJoining}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#014BAD]">Position</label>
            <input
              type="text"
              className={`${styleInputs} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#014BAD]`}
              name="position"
              value={staffData.position}
              onChange={handleChange}
              placeholder="Enter position"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-[#014BAD]">Department</label>
            <input
              type="text"
              className={`${styleInputs} rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#014BAD]`}
              name="department"
              value={staffData.department}
              onChange={handleChange}
              placeholder="Enter department"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-4">
            {response && (
              <p className={`${success ? 'text-green-600' : 'text-red-500'} mb-2 text-center`}>
                {response}
              </p>
            )}
            <button
              type="submit"
              className="bg-[#014BAD] hover:bg-[#01337a] text-white font-bold py-2 px-8 rounded shadow transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StaffAdmin