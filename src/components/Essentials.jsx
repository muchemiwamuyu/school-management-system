import React from 'react'
import dayjs from 'dayjs'

function Essentials() {
    const today = dayjs();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Generate 2 weeks of dates
    const getDateColumns = () => {
        const firstWeek = [];
        const secondWeek = [];
        const startOfWeek = today.startOf("week");

        for (let i = 0; i < 7; i++) {
            firstWeek.push(startOfWeek.add(i, "day"));
            secondWeek.push(startOfWeek.add(i + 7, "day"));
        }

        return [firstWeek, secondWeek];
    };

    const [firstWeek, secondWeek] = getDateColumns();

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = ['27', '28', '29', '30', '31', '1', '2']; // example week dates

    return (
        <div className='w-96 m-2 bg-[#FBD46E] fixed right-0 rounded'>
            {/* box for handling the calender information */}
            <div className='bg-[#395EA2] m-3 rounded shadow-black h-1/4 p-2'>
                <h1 className='text-2xl text-white p-3' style={{ fontFamily: 'Instrument Serif, serif' }}>Calendar</h1>
                <hr className='h-2 bg-white rounded' />


                {/* the calender */}
                <div className=' gap-4 mt-2'>
                    <div className="">
                        <table className="table-auto border border-gray-300 text-center w-full rounded">
                            <thead>
                                <tr className="bg-gray-200 text-md font-bold h-16">
                                    {days.map((day, index) => (
                                        <th key={index} className="border p-2">{day}</th>
                                    ))}
                                </tr>
                                <tr className="bg-gray-100 text-md font-semibold h-14">
                                    {dates.map((date, index) => (
                                        <th key={index} className="border p-2">{date}</th>
                                    ))}
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>


            {/* box for handling agenda */}
            <div className='bg-[#395EA2] m-3 rounded shadow-2xl shadow-black p-3'>
                <h1 className='text-2xl text-white p-3' style={{ fontFamily: 'Instrument Serif, serif' }}>Agenda</h1>
                <hr className='h-2 bg-white rounded'/>
                <div className='text-white p-3 space-y-3'>
                    <div className='h-1/2 bg-rose-500 space-y-3 p-3'>
                        {/* timeline div */}
                        <div className=' h-12 bg-green-400'>
                            <li className='text-xl'>Links</li>
                        </div>
                        <div className=' h-12 bg-red-400'>
                            <li className='text-xl'>Prepare for staff meeting</li>
                        </div>
                        <div className=' h-12 bg-blue-400'>
                            <li className='text-xl'>Prepare for staff meeting</li>
                        </div>
                    </div>

                    <div className=' bg-amber-300'>
                        <div className='h-1/2 bg-gray-500 space-y-3 p-3'>
                            {/* timeline div */}
                            <div className=' h-12 bg-green-400'>
                                <li className='text-xl'>Links</li>
                            </div>
                            <div className=' h-12 bg-red-400'>
                                <li className='text-xl'>Prepare for staff meeting</li>
                            </div>
                            <div className=' h-12 bg-blue-400'>
                                <li className='text-xl'>Prepare for staff meeting</li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* box for handling messages */}
            <div className='bg-[#395EA2] m-3 h-15'>
                <li className='text-center'>Book a Confrence</li>
                <li className='text-center'>View Meetings</li>

            </div>
        </div>
    )
}

export default Essentials