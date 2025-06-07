import React from 'react';

function Academics() {
  const classes = [
    {
      id: 1,
      className: 'Form 1',
      subjects: ['Mathematics', 'English', 'Biology', 'History'],
      classTeacher: 'Mrs. Wanjiku',
      examSchedule: 'Next Exam: 15th June',
    },
    {
      id: 2,
      className: 'Form 2',
      subjects: ['Physics', 'Chemistry', 'Geography', 'Kiswahili'],
      classTeacher: 'Mr. Otieno',
      examSchedule: 'Next Exam: 20th June',
    },
    // Add more classes here
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Academics</h1>
      <table className="min-w-full bg-white rounded shadow">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="py-3 px-6">Class</th>
            <th className="py-3 px-6">Subjects</th>
            <th className="py-3 px-6">Class Teacher</th>
            <th className="py-3 px-6">Exam Schedule</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(({ id, className, subjects, classTeacher, examSchedule }) => (
            <tr key={id} className="border-b hover:bg-gray-100">
              <td className="py-3 px-6">{className}</td>
              <td className="py-3 px-6">{subjects.join(', ')}</td>
              <td className="py-3 px-6">{classTeacher}</td>
              <td className="py-3 px-6">{examSchedule}</td>
              <td className="py-3 px-6">
                <button className="mr-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Edit
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

export default Academics;
