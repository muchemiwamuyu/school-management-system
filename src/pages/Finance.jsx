import React from 'react';

function Finance() {
  const transactions = [
    {
      id: 1,
      studentName: 'Jane Mwangi',
      amountPaid: 5000,
      paymentDate: '2025-06-01',
      paymentType: 'Tuition Fee',
      status: 'Completed',
    },
    {
      id: 2,
      studentName: 'Mark Otieno',
      amountPaid: 3000,
      paymentDate: '2025-06-03',
      paymentType: 'Library Fee',
      status: 'Pending',
    },
    // Add more transactions here
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Finance</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="py-3 px-6">Student</th>
            <th className="py-3 px-6">Amount Paid (KES)</th>
            <th className="py-3 px-6">Payment Date</th>
            <th className="py-3 px-6">Payment Type</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ id, studentName, amountPaid, paymentDate, paymentType, status }) => (
            <tr key={id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-6">{studentName}</td>
              <td className="py-3 px-6">{amountPaid.toLocaleString()}</td>
              <td className="py-3 px-6">{paymentDate}</td>
              <td className="py-3 px-6">{paymentType}</td>
              <td className={`py-3 px-6 font-semibold ${status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                {status}
              </td>
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

export default Finance;
