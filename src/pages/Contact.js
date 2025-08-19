import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-blue-600"></i>
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p className="text-gray-700">State Health Assurance Society, Mumbai, Maharashtra</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-blue-600"></i>
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p className="text-gray-700">Toll Free: 155 388, 1800 233 2200</p>
                </div>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope mr-3 text-blue-600"></i>
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-gray-700">info@jeevandayee.gov.in</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-800 mb-4">Send Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 