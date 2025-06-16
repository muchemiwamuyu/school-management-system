import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import Home from './pages/Home'
import './index.css'
import React from 'react'
import RegisterAdmin from './pages/RegisterAdmin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'
import StaffAdmin from './pages/StaffAdmin'
import ProtectedRoutes from './api/ProtectedRoutes'
import MainStaff from './pages/MainStaff'
import Staff from './pages/Staff'
import Attendance from './pages/StaffAttendanceSystem'
import Students from './pages/Students'
import Academics from './pages/Academics'
import Finance from './pages/Finance'
import Notice from './pages/Notice'
import Settings from './pages/Settings'
import Signup from './pages/Signup'
import Parents from './pages/Parents'
import Teachers from './pages/Teachers'
import LoginStaff from './pages/LoginStaff'
import Deans from './pages/Deans'
import { ToastContainer } from 'react-toastify'
import StaffAttendanceSystem from './pages/StaffAttendanceSystem'
import Assignments from './pages/Assignments'
import CameraTest from './pages/CameraTest'
import StudentDetails from './pages/StudentDetails'
import ApplicationForm from './pages/ApplicationForm'

function App() {
 

  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register-admin" element={<RegisterAdmin/>} />
        <Route path="/admin-dashboard" element={ <ProtectedRoutes> <AdminDashboard/> </ProtectedRoutes> } />
        <Route path='/staff-admin' element={<StaffAdmin/> }/>
        <Route path='/register' element={<MainStaff/>}/>
        <Route path='/staff' element={<Staff/>} />
        <Route path='/attendance' element={<StaffAttendanceSystem/>}/>
        <Route path='/students' element={<Students/>}/>
        <Route path='/academics' element={<Academics/>}/>
        <Route path='/finance' element={<Finance/>}/>
        <Route path='/notice' element={<Notice/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/parents' element={<Parents/>}/>
        <Route path='/teachers' element={<Teachers/>}/>
        <Route path='/login' element={<LoginStaff/>}/>
        <Route path='/dean-dashboard' element={<Deans/>}/>
        <Route path='/assignments' element={<Assignments/>}/>
        <Route path='/camera' element={<CameraTest/>}/>
        <Route path='/form' element={<ApplicationForm/> }/>
        <Route path="/students/:id" element={<StudentDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
     
    </>
  )
}

export default App
