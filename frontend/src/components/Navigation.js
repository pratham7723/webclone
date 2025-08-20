import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const menuItems = [
    {
      name: 'Home',
      icon: 'fas fa-home',
      link: '/',
      hasDropdown: false
    },
    {
      name: 'About',
      icon: 'fas fa-info-circle',
      link: '/about',
      hasDropdown: false
    },
    {
      name: 'Hospitals',
      icon: 'fas fa-hospital',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Hospital Empanelment', link: '/empanelment' },
        { name: 'Apply for Empanelment', link: '/hospital-empanelment-form' },
        { name: 'Bed Occupancy', link: '/hospitals/bed-occupancy' }
      ]
    },
    {
      name: 'Network Hospitals',
      icon: 'fas fa-network-wired',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Network Hospitals', link: '/network-hospitals' },
        { name: 'Specialitywise Hospitals', link: '/network-hospitals/speciality' },
        { name: 'Districtwise Hospitals', link: '/network-hospitals/district' }
      ]
    },
    {
      name: 'Tender & Notices',
      icon: 'fas fa-file-contract',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Tenders and Corrigendum', link: '/tenders' },
        { name: 'MoMs, Circulars and Notifications', link: '/notices' }
      ]
    },
    {
      name: 'RTI',
      icon: 'fas fa-file-alt',
      hasDropdown: true,
      dropdownItems: [
        { name: 'About SHAS', link: '/rti/about-shas' },
        { name: 'About Scheme', link: '/rti/about-scheme' },
        { name: 'Network Hospital', link: '/rti/network-hospital' }
      ]
    },
    {
      name: 'Operational Guidelines',
      icon: 'fas fa-book',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Clinical Protocol Guidelines', link: '/guidelines/clinical' },
        { name: 'Package Costs', link: '/guidelines/packages' },
        { name: 'Procedure List', link: '/guidelines/procedures' }
      ]
    },
    {
      name: 'Feedback',
      icon: 'fas fa-comment-alt',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Media Coverage', link: '/feedback/media' },
        { name: 'Post Your Opinion', link: '/feedback/opinion' },
        { name: 'Success Stories', link: '/feedback/success-stories' }
      ]
    },
    {
      name: 'PMJAY',
      icon: 'fas fa-india',
      hasDropdown: true,
      dropdownItems: [
        { name: 'About PMJAY', link: 'https://www.pmjay.gov.in/about-pmjay' },
        { name: 'Check Eligibility', link: 'https://mera.pmjay.gov.in/search/login' },
        { name: 'Hospital Engagement Module', link: 'https://hem.nha.gov.in/' }
      ]
    },
    {
      name: 'Photo Gallery',
      icon: 'fas fa-images',
      link: '/gallery',
      hasDropdown: false
    },
    {
      name: 'Careers',
      icon: 'fas fa-briefcase',
      link: '/careers',
      hasDropdown: false
    },
    {
      name: 'Contact Us',
      icon: 'fas fa-envelope',
      link: '/contact',
      hasDropdown: false
    }
  ];

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              {item.hasDropdown ? (
                <div className="dropdown">
                  <button 
                    className="px-4 py-3 hover:bg-blue-700 flex items-center"
                    onClick={() => handleDropdownToggle(item.name)}
                  >
                    <i className={`${item.icon} mr-2`}></i> {item.name} 
                    <i className="fas fa-chevron-down ml-1 text-xs"></i>
                  </button>
                  {activeDropdown === item.name && (
                    <div className="dropdown-menu absolute bg-white text-gray-800 shadow-lg rounded-b z-10">
                      {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <a 
                          key={dropdownIndex}
                          href={dropdownItem.link} 
                          className="block px-4 py-2 hover:bg-blue-100 border-b"
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to={item.link} 
                  className="px-4 py-3 hover:bg-blue-700 flex items-center"
                >
                  <i className={`${item.icon} mr-2`}></i> {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 