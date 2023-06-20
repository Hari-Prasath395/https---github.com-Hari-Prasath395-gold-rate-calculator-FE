

import React, { useEffect, useState } from 'react';
import { FaPhone, FaSignOutAlt } from 'react-icons/fa';
import { RiExchangeLine } from 'react-icons/ri';
import { AiOutlineGold } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/getCurrentUser', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    getCurrentUser();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-golden-yellow">
      <div className="container d-flex justify-content-between align-items-center">
        <a className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
          <AiOutlineGold className="mx-2" />
          Gold Rate Converter
        </a>
        <div>
          <ul className="navbar-nav ml-auto">
            {user && (
              <>
                <li className="nav-item">
                  <a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/gold-price')}>
                    <RiExchangeLine className="mr-1" />
                    Gold Prices
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" style={{ cursor: 'pointer' }} onClick={() => navigate('/contact-us')}>
                    <FaPhone className="mx-1" />
                    Contact Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      localStorage.removeItem('token');
                      navigate('/login');
                    }}
                  >
                    <FaSignOutAlt className="mx-1" />
                    Logout
                  </a>
                </li>
                <li className="nav-item">
                  <span className="nav-link">{user.username}</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

