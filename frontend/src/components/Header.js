import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-blue-800 text-white text-sm py-1 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="marquee">
            <span>Due to technical issues, if Call Center Helpline numbers are not working, for emergency kindly contact: 9702135277/7208076239</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/contact" className="hover:text-yellow-300">
              <i className="fas fa-phone-alt mr-1"></i> Toll Free: 155 388 , 1800 233 2200
            </Link>
            <div className="language-selector relative">
              <button className="hover:text-yellow-300 flex items-center">
                <i className="fas fa-globe mr-1"></i> Language <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="language-dropdown absolute hidden bg-white text-gray-800 shadow-lg rounded mt-1 right-0 z-10">
                <a href="https://www.jeevandayee.gov.in/Marathi_index.jsp" className="block px-4 py-2 hover:bg-blue-100" target="_blank" rel="noopener noreferrer">मराठी</a>
                <a href="https://www.jeevandayee.gov.in/index.jsp" className="block px-4 py-2 hover:bg-blue-100" target="_blank" rel="noopener noreferrer">English</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="https://www.jeevandayee.gov.in/images/mahalogo.gif" alt="Government of Maharashtra Logo" className="h-16 mr-4" />
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-blue-900">Mahatma Jyotiba Phule Jan Arogya Yojana</h1>
              <p className="text-sm text-gray-600">State Health Assurance Society</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img src="https://www.jeevandayee.gov.in/images/PMJAY%20logo.gif" alt="PMJAY Logo" className="h-16" />
            <img src="https://www.jeevandayee.gov.in/images/Mjpjay%20logo%20.gif" alt="MJPJAY Logo" className="h-16" />
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center">
              <i className="fas fa-sign-in-alt mr-2"></i> Login
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header; 