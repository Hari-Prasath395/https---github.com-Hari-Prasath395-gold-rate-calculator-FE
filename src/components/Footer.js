import React from 'react';
import { FaPhone, FaEnvelope,FaYoutube } from 'react-icons/fa';
import { AiFillFacebook, AiFillTwitterCircle } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center p-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>Contact Us</h5>
            <p>
              <FaPhone className="mx-2" />
              +1 123 456 7890
            </p>
            <p>
              <FaEnvelope className="mx-2" />
              hpinfo@test.com
            </p>
          </div>
          <div className="col">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#">
                <AiFillFacebook size={30} className="mx-2" />
              </a>
              <a href="#">
                <AiFillTwitterCircle size={30} />
              </a>
              <a href="#">
                <FaYoutube size={30} className="mx-2"/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        &copy; {new Date().getFullYear()} Gold Rate Converter. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
