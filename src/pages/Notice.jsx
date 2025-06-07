import React, { useState } from 'react';

function Notice() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: 'Holiday Announcement',
      content: 'School will be closed on June 15th for public holiday.',
      date: '2025-06-05',
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      content: 'Meeting scheduled for June 20th at 3 PM in the main hall.',
      date: '2025-06-01',
    },
  ]);

  // For adding a new notice (just a basic demo without form validation)
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addNotice = () => {
    if (newTitle.trim() && newContent.trim()) {
      const newNotice = {
        id: notices.length + 1,
        title: newTitle,
        content: newContent,
        date: new Date().toISOString().slice(0, 10),
      };
      setNotices([newNotice, ...notices]);
      setNewTitle('');
      setNewContent('');
    }
  };

  const deleteNotice = (id) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Notices</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Notice Title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="border p-2 rounded mr-4 w-1/3"
        />
        <input
          type="text"
          placeholder="Notice Content"
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
          className="border p-2 rounded mr-4 w-1/2"
        />
        <button
          onClick={addNotice}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Notice
        </button>
      </div>

      <ul>
        {notices.map(({ id, title, content, date }) => (
          <li
            key={id}
            className="mb-4 p-4 bg-white rounded shadow border border-gray-200"
          >
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-700">{content}</p>
            <p className="text-gray-400 text-sm mt-1">Date: {date}</p>
            <button
              onClick={() => deleteNotice(id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notice;
