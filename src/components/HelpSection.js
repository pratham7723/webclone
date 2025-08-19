import React from 'react';

const HelpSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="text-center">
        <img 
          src="https://www.jeevandayee.gov.in/images/Toll%20Free%20number.png" 
          alt="Need Help" 
          className="mx-auto h-40"
        />
        <h3 className="text-lg font-bold text-blue-900 mt-2">Need Help?</h3>
        <p className="text-gray-600 mb-4">Contact our support team for assistance</p>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="font-bold text-blue-800">Toll Free Number:</p>
          <p className="text-xl font-bold">155 388</p>
          <p className="text-xl font-bold">1800 233 2200</p>
          <p className="text-sm mt-2">Emergency: 9702135277/7208076239</p>
        </div>
      </div>
    </div>
  );
};

export default HelpSection; 