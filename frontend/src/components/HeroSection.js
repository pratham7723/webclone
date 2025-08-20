import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Mahatma Jyotirao Phule Jan Arogya Yojana</h1>
      <p className="text-lg mb-6">A health assurance scheme providing cashless healthcare services to beneficiaries in Maharashtra.</p>
      <div className="flex flex-wrap gap-4">
        <Link 
          to="/eligibility" 
          className="bg-white text-blue-800 hover:bg-blue-100 font-bold py-3 px-6 rounded-lg flex items-center"
        >
          <i className="fas fa-search mr-2"></i> Check Eligibility
        </Link>
        <Link 
          to="/hospitals" 
          className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold py-3 px-6 rounded-lg flex items-center"
        >
          <i className="fas fa-hospital mr-2"></i> Find Hospitals
        </Link>
        <Link 
          to="/forms" 
          className="bg-green-500 hover:bg-green-600 font-bold py-3 px-6 rounded-lg flex items-center"
        >
          <i className="fas fa-file-alt mr-2"></i> Download Forms
        </Link>
      </div>
    </div>
  );
};

export default HeroSection; 