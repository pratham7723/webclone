import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">About MJPJAY</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            The Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY) is a health assurance scheme 
            that provides cashless healthcare services to beneficiaries in Maharashtra. The scheme 
            aims to provide quality healthcare to the economically weaker sections of society.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            This page will contain detailed information about the scheme, its objectives, 
            implementation details, and other relevant information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 