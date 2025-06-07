import React from 'react';
import { Link } from 'react-router-dom';

function Staff() {
  return (
    <div className="p-6 min-h-screen bg-[#f0f4f8] text-[#001F47]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Link to='/staff-admin' className="bg-[#014BAD] hover:bg-[#013a8c] text-white px-4 py-2 rounded-lg shadow-md transition">
          + Add Staff
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-[#CAD7EC] text-left text-[#001F47]">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {/* Sample row – replace with .map from staff data */}
            <tr className="border-b hover:bg-gray-100">
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">john@school.com</td>
              <td className="px-6 py-4">Science</td>
              <td className="px-6 py-4">Teacher</td>
              <td className="px-6 py-4 text-green-600 font-semibold">Active</td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
            {/* End sample row */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staff;
