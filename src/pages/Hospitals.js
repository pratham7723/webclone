import React from 'react';
import { Link } from 'react-router-dom';

const Hospitals = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Network Hospitals</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Find network hospitals, check bed availability, and get information about 
            hospital empanelment under the MJPJAY scheme.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">Hospital Empanelment</h2>
            <p className="text-blue-800 mb-4">
              Are you a hospital interested in joining the MJPJAY network? Learn about eligibility criteria, 
              required documents, and the application process.
            </p>
            <Link 
              to="/hospitals/empanelment" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-hospital mr-2"></i>
              View Empanelment Details
            </Link>
          </div>
          
          <p className="text-lg text-gray-700 mb-6">
            This page will contain hospital listings, search functionality, and 
            detailed information about each network hospital.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hospitals; 