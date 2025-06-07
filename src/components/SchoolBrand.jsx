import React from 'react'
import SchoolLogo from '../assets/logo.svg'

function SchoolBrand() {
  return (
    <div className='w-1/2 bg-[#CAD7EC] m-2 border-2 border-black rounded'>
        <img src={SchoolLogo} alt="school logo" className=' ml-[16%] mt-[8%] w-xl'/>
        <p className='absolute text-3xl font-mono font-medium bottom-48 left-68'>Marking Excellence</p>
        <hr className='w-1/2 h-0.5 border-none bg-black ml-52 mt-22 rounded'/>
        <div className='absolute w-16 h-16 bg-[#014BAD] left-[35%] bottom-18 rounded-full'></div>
    </div>
  )
}


export const SchoolBrand2 = () => {
  const gradientBrand = 'bg-linear-to-t from-[#737373] to-[#D9D9D9] border-2 border-black'
  return (
    <div>
      <img src={SchoolLogo} alt="school logo" className='absolute bottom-4 left-22'/>
      {/* Transparent div */}
      <div className={`w-95 h-[800px] ${gradientBrand} absolute left-37 top-6 opacity-50 rounded`}>

      </div>
    </div>
  )
}


export default SchoolBrand