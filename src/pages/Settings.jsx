import React, { useState } from 'react';

function Settings() {
  const [schoolName, setSchoolName] = useState('Urban High School');
  const [schoolAddress, setSchoolAddress] = useState('1234 Education Rd, City');
  const [adminEmail, setAdminEmail] = useState('admin@urbanhigh.edu');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [theme, setTheme] = useState('light'); // light or dark

  const saveSettings = () => {
    // Here you'd typically call an API to save settings
    alert('Settings saved!');
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">School Name</label>
        <input
          type="text"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">School Address</label>
        <input
          type="text"
          value={schoolAddress}
          onChange={(e) => setSchoolAddress(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Admin Email</label>
        <input
          type="email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          id="notifications"
          type="checkbox"
          checked={notificationsEnabled}
          onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          className="mr-2"
        />
        <label htmlFor="notifications" className="font-semibold">Enable Notifications</label>
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1">Theme</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <button
        onClick={saveSettings}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Settings
      </button>
    </div>
  );
}

export default Settings;
