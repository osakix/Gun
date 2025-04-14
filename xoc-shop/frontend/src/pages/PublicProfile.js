import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/Navbar';
import axios from 'axios';

export default function PublicProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`https://your-backend.onrender.com/u/${username}`).then(res => {
      setUser(res.data);
      const finalTheme = res.data.theme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : res.data.theme;
      document.body.setAttribute('data-theme', finalTheme);
    });
  }, [username]);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <NavBar />
    <div className="container text-center mt-5">
      <img src={user.avatar} alt="avatar" style={{ width: 100, borderRadius: '50%' }} />
      <h2 className="mt-3">{user.name}</h2>
      <p>{user.bio}</p>
      <div className="mt-4">
        {user.links.map((link, i) => (
          <div key={i} className="mb-2">
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
              {link.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}