import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Footer Column 1 */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4 border-b border-blue-700 pb-2">About MJPJAY</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Scheme</Link></li>
              <li><Link to="/about/integrated" className="text-gray-300 hover:text-white">Integrated MJPJAY & AB-PMJAY</Link></li>
              <li><Link to="/about/council" className="text-gray-300 hover:text-white">Governing Council</Link></li>
              <li><Link to="/about/resolutions" className="text-gray-300 hover:text-white">Government Resolutions</Link></li>
              <li><Link to="/about/notifications" className="text-gray-300 hover:text-white">Notifications</Link></li>
            </ul>
          </div>

          {/* Footer Column 2 */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4 border-b border-blue-700 pb-2">For Hospitals</h3>
            <ul className="space-y-2">
              <li><Link to="/hospitals/empanelment" className="text-gray-300 hover:text-white">Hospital Empanelment</Link></li>
              <li><Link to="/network-hospitals" className="text-gray-300 hover:text-white">Network Hospitals</Link></li>
              <li><Link to="/network-hospitals/speciality" className="text-gray-300 hover:text-white">Specialitywise Hospitals</Link></li>
              <li><Link to="/network-hospitals/district" className="text-gray-300 hover:text-white">Districtwise Hospitals</Link></li>
              <li><Link to="/hospitals/bed-occupancy" className="text-gray-300 hover:text-white">Bed Occupancy</Link></li>
            </ul>
          </div>

          {/* Footer Column 3 */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4 border-b border-blue-700 pb-2">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/guidelines" className="text-gray-300 hover:text-white">Operational Guidelines</Link></li>
              <li><Link to="/guidelines/packages" className="text-gray-300 hover:text-white">Package Costs</Link></li>
              <li><Link to="/guidelines/procedures" className="text-gray-300 hover:text-white">Procedure List</Link></li>
              <li><Link to="/guidelines/documents" className="text-gray-300 hover:text-white">Required Documents</Link></li>
              <li><Link to="/tenders" className="text-gray-300 hover:text-white">Tenders & Notices</Link></li>
            </ul>
          </div>

          {/* Footer Column 4 */}
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-bold mb-4 border-b border-blue-700 pb-2">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2 text-blue-400"></i>
                <span>State Health Assurance Society, Mumbai, Maharashtra</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2 text-blue-400"></i>
                <span>Toll Free: 155 388, 1800 233 2200</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-blue-400"></i>
                <a href="mailto:info@jeevandayee.gov.in" className="hover:text-white">info@jeevandayee.gov.in</a>
              </li>
              <li className="flex items-center mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full mr-2">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blue-400 hover:bg-blue-500 text-white p-2 rounded-full mr-2">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© 2023 State Health Assurance Society, Government of Maharashtra. All Rights Reserved.</p>
          <p className="mt-2">Designed and Developed by State Health Assurance Society</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 