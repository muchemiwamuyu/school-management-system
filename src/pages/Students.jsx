import React from 'react';

function Students() {
  const students = [
    {
      id: 1,
      name: 'Alice Mwangi',
      class: 'Form 2',
      admissionNumber: 'ADM1234',
      status: 'Active',
      guardian: 'James Mwangi',
      contact: '0712345678',
    },
    {
      id: 2,
      name: 'Brian Otieno',
      class: 'Form 3',
      admissionNumber: 'ADM5678',
      status: 'Active',
      guardian: 'Grace Otieno',
      contact: '0723456789',
    },
    // Add more students here
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Students</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="py-3 px-6">Admission No.</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Class</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Guardian</th>
            <th className="py-3 px-6">Contact</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ id, admissionNumber, name, class: studentClass, status, guardian, contact }) => (
            <tr key={id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-6">{admissionNumber}</td>
              <td className="py-3 px-6">{name}</td>
              <td className="py-3 px-6">{studentClass}</td>
              <td className={`py-3 px-6 font-semibold ${status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {status}
              </td>
              <td className="py-3 px-6">{guardian}</td>
              <td className="py-3 px-6">{contact}</td>
              <td className="py-3 px-6">
                <button className="mr-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  View
                </button>
                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
