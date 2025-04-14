import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicProfile from './pages/PublicProfile';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || 'system';
    const finalTheme = savedTheme === 'system' ? (systemDark ? 'dark' : 'light') : savedTheme;
    document.body.setAttribute('data-theme', finalTheme);
    setTheme(savedTheme);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/u/:username" element={<PublicProfile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;