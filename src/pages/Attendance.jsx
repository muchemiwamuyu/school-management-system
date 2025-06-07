import React, { useState } from 'react';

function Attendance() {
  // Example staff attendance state, in real use fetch from backend
  const [attendance, setAttendance] = useState([
    { id: 1, name: 'John Doe', status: 'Present' },
    { id: 2, name: 'Jane Smith', status: 'Absent' },
    { id: 3, name: 'Mark Johnson', status: 'Present' },
  ]);

  // Toggle attendance status for a staff member
  const toggleStatus = (id) => {
    setAttendance((prev) =>
      prev.map((staff) =>
        staff.id === id
          ? { ...staff, status: staff.status === 'Present' ? 'Absent' : 'Present' }
          : staff
      )
    );
  };

  return (
    <div className="p-6 min-h-screen bg-[#f0f4f8] text-[#001F47]">
      <h1 className="text-3xl font-bold mb-6">Attendance</h1>

      <table className="min-w-full bg-white rounded-xl shadow-md table-auto">
        <thead className="bg-[#CAD7EC] text-left text-[#001F47]">
          <tr>
            <th className="px-6 py-3">Staff Name</th>
            <th className="px-6 py-3">Attendance Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {attendance.map(({ id, name, status }) => (
            <tr
              key={id}
              className="border-b hover:bg-gray-100"
            >
              <td className="px-6 py-4">{name}</td>
              <td
                className={`px-6 py-4 font-semibold ${
                  status === 'Present' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {status}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => toggleStatus(id)}
                  className="bg-[#014BAD] text-white px-3 py-1 rounded hover:bg-[#013a8c] transition"
                >
                  Mark {status === 'Present' ? 'Absent' : 'Present'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
