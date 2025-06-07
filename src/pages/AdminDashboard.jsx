import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Essentials from '../components/Essentials'
import { MdHighlight } from 'react-icons/md';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Line } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FinanceOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'black',
        font: {
          size: 16,
          family: 'Instrument Serif, serif',
        },
      },
    },
    title: {
      display: true,
      text: 'Finance Overview',
    },
  },
};

const financeData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Income',
      data: [12000, 15000, 13000, 17000, 16000, 18000],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(202, 215, 236)',
    },
    {
      label: 'Expenses',
      data: [8000, 9000, 8500, 9500, 10000, 11000],
      borderColor: 'rgb(239, 173, 6)',
      backgroundColor: 'rgba(239, 173, 6, 0.2)',
    },
    {
      label: 'Profit',
      data: [4000, 6000, 4500, 7500, 6000, 7000],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'black',
        font: {
          size: 16,
          family: 'Instrument Serif, serif',
        },
      },
    },
    title: {
      display: true,
      text: 'Attendance Over Time',
    },
  },
};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Attendance by teachers',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      label: 'Attendance by other staff',
      data: [72, 59, 92, 86, 63, 55],
      borderColor: 'rgb(239, 173, 6)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
  ],
};


const gradientBg = 'bg-gradient-to-r from-[#3B64A5] to-[#17263F]'
const goldBg = 'bg-gradient-to-l from-[#C79005] to-[#614602]'
const bluishBg = 'bg-gradient-to-r from-[#014BAD] to-[#001F47]'


function AdminDashboard() {
  return (
    <div className={`${bluishBg} flex`}>
      <AdminNavbar />
      <Essentials />
      <div className='w-[954px] rounded m-2 bg-[#cad7ec]'>
        {/* box for displaying controller of this dashboard */}
        <div className=' m-2'>
          <h1 className='text-3xl text-[#014BAD] p-3' style={{ fontFamily: 'Instrument Serif, serif' }}>Admin Dashboard</h1>

          <hr />
        </div>

        {/* small chart boxes */}
        <div className='grid grid-cols-3 gap-4 m-2'>
          <div className={`${gradientBg} p-4 rounded shadow-lg text-white relative`}>
            <h2 className='text-3xl font-semibold'>100, 001</h2>
            <p className={`text-sm text-[#FABB17]`}>Total students</p>

            {/* highlights box */}
            <div className='w-38 h-8 bg-white absolute left-36 top-12 rounded border-2 border-green-500 flex justify-between'>
              <h3 className='text-black m-1'>HighLights</h3>
              <MdHighlight size={22} className='m-1 text-black' />

            </div>

            {/* numbers stats box */}
            <div className='w-12 h-7 bg-white absolute right-3 top-2 flex rounded border-2 border-amber-400'>
              <FaArrowUp size={16} className="text-green-500 m-1" />
              <p className='text-black'>5%</p>
            </div>
          </div>

          <div className={`${goldBg} p-4 rounded shadow-lg text-black relative`}>
            <h2 className='text-3xl font-semibold'>90</h2>
            <p className='text-sm text-white'>Total Teachers</p>

            {/* highlights box */}
            <div className='w-38 h-8 bg-white absolute left-36 top-12 rounded border-2 border-green-500 flex justify-between'>
              <h3 className='text-black m-1'>HighLights</h3>
              <MdHighlight size={22} className='m-1 text-black' />

            </div>

            {/* numbers stats box */}
            <div className='w-12 h-7 bg-white absolute right-3 top-2 flex rounded border-2 border-amber-400'>
              <FaArrowUp size={16} className="text-green-500 m-1" />
              <p className='text-black'>5%</p>
            </div>
          </div>

          <div className={`${bluishBg} p-4 rounded shadow-lg text-white relative`}>
            <h2 className='text-3xl font-semibold'>74 <span className='text-sm'>Points</span></h2>
            <p className='text-sm text-[#FABB17]'>Average Grade</p>

            {/* highlights box */}
            <div className='w-38 h-8 bg-white absolute left-36 top-12 rounded border-2 border-green-500 flex justify-between'>
              <h3 className='text-black m-1'>HighLights</h3>
              <MdHighlight size={22} className='m-1 text-black' />

            </div>

            {/* numbers stats box */}
            <div className='w-12 h-7 bg-white absolute right-3 top-2 flex rounded border-2 border-amber-400'>
              <h2 className='text-red-600 ml-1'>~</h2>
              <p className='text-black ml-0.5'>Avg</p>
            </div>
          </div>

        </div>
        {/* another set */}
        <div className='grid grid-cols-3 gap-4 m-2'>
          <div className={`${bluishBg} p-4 rounded shadow-lg text-white relative`}>
            <h2 className='text-3xl font-semibold'>32 ⁿᵈ <span className='text-sm'>(Week)</span></h2>
            <p className='text-sm text-[#FABB17]'>Academic Cal</p>

            {/* highlights box */}
            <div className='w-38 h-8 bg-white absolute left-36 top-12 rounded border-2 border-green-500 flex justify-between'>
              <h3 className='text-black m-1'>HighLights</h3>
              <MdHighlight size={22} className='m-1 text-black' />

            </div>

            {/* numbers stats box */}
            <div className='w-12 h-7 bg-white absolute right-3 top-2 flex rounded border-2 border-amber-400'>
              <FaArrowUp size={16} className="text-green-500 m-1" />
              <FaArrowUp size={16} className="text-green-500 m-1" />
            </div>
          </div>

          <div className={`${gradientBg} p-4 rounded shadow-lg text-white relative`}>
            <h2 className='text-3xl font-semibold'>115</h2>
            <p className='text-sm text-[#FABB17]'>Total Staff</p>

            {/* highlights box */}
            <div className='w-38 h-8 bg-white absolute left-36 top-12 rounded border-2 border-green-500 flex justify-between'>
              <h3 className='text-black m-1'>HighLights</h3>
              <MdHighlight size={22} className='m-1 text-black' />

            </div>

            {/* numbers stats box */}
            <div className='w-12 h-7 bg-white absolute right-3 top-2 flex rounded border-2 border-amber-400'>
              <FaArrowUp size={16} className="text-green-500 m-1" />
              <p className='text-black'>15%</p>
            </div>
          </div>


          <div className={`${goldBg} p-4 rounded shadow-lg text-white relative transition duration-300 hover:shadow-[0_0_30px_10px_rgba(250,187,23,0.5)]`}>
            <h2 className='text-3xl font-semibold'>15<span className='text-sm'> pending tasks..</span></h2>
            <p className='text-sm text-[#FABB17]'>Your Tasks</p>

            {/* highlights box */}
            <div className='w-38 h-8 bg-white absolute left-36 top-12 rounded border-2 border-green-500 flex justify-between'>
              <h3 className='text-black m-1'>HighLights</h3>
              <MdHighlight size={22} className='m-1 text-black' />

            </div>

            {/* numbers stats box */}
            <div className='w-12 h-7 bg-white absolute right-3 top-2 flex rounded border-2 border-amber-400'>
              <FaArrowUp size={16} className="text-green-500 m-1" />
              <p className='text-black'>5%</p>
            </div>
          </div>

        </div>
        <div className=' h-[550px] m-2 flex'>
          <div className='w-2/5 bg-white m-2 rounded flex flex-col'>
            <div className="flex-1 min-h-0">
              <Line options={options} data={data} style={{ height: '100%' }} />
            </div>
          </div>
          <div className='w-3/4 bg-white m-2 rounded flex flex-col'>
            <div className="flex-1 min-h-0">
              <Bar options={FinanceOptions} data={financeData} style={{ height: '100%' }} />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default AdminDashboard