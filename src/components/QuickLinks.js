import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks = () => {
  const quickLinks = [
    { name: 'MJPJAY Scheme', icon: 'fas fa-link', link: '/about' },
    { name: 'Health Camps', icon: 'fas fa-medkit', link: '/health-camps' },
    { name: 'SHAS', icon: 'fas fa-building', link: '/about/shas' },
    { name: 'Arogyamitras', icon: 'fas fa-user-md', link: '/arogyamitras' },
    { name: 'Governing Council', icon: 'fas fa-users', link: '/about/council' },
    { name: 'Network Hospitals', icon: 'fas fa-hospital', link: '/network-hospitals' },
    { name: 'Emergency Telephonic Intimation', icon: 'fas fa-phone-alt', link: '/emergency' },
    { name: 'Follow up', icon: 'fas fa-sync-alt', link: '/follow-up' },
    { name: 'Staff Directory', icon: 'fas fa-address-book', link: '/staff-directory' },
    { name: 'Organisation Chart', icon: 'fas fa-sitemap', link: '/organisation-chart' },
    { name: 'Empanelment Request', icon: 'fas fa-file-signature', link: '/hospitals/empanelment' },
    { name: 'Procedure List', icon: 'fas fa-list-ol', link: '/guidelines/procedures' },
    { name: 'PHCs', icon: 'fas fa-clinic-medical', link: '/phcs' },
    { name: 'Bed Occupancy', icon: 'fas fa-bed', link: '/hospitals/bed-occupancy' },
    { name: 'Reports', icon: 'fas fa-chart-bar', link: '/reports' },
    { name: 'Newspaper Clippings', icon: 'fas fa-newspaper', link: '/media' },
    { name: 'Post Your Opinion', icon: 'fas fa-comment', link: '/feedback/opinion' },
    { name: 'Success Stories', icon: 'fas fa-trophy', link: '/feedback/success-stories' },
    { name: 'Patient Feedback', icon: 'fas fa-comment-medical', link: '/feedback/patient' },
    { name: 'Public Opinion', icon: 'fas fa-users', link: '/feedback/public' },
    { name: 'CAUTION - Fake Job Offer', icon: 'fas fa-exclamation-triangle', link: '/caution', isWarning: true }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">Quick Links</h2>
      <div className="grid grid-cols-1 gap-2">
        {quickLinks.map((link, index) => (
          <Link 
            key={index}
            to={link.link} 
            className={`flex items-center p-2 rounded hover:bg-blue-50 ${
              link.isWarning 
                ? 'text-red-600 hover:text-red-800' 
                : 'text-blue-700 hover:text-blue-900'
            }`}
          >
            <i className={`${link.icon} mr-2 ${
              link.isWarning ? 'text-red-600' : 'text-blue-600'
            }`}></i> 
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks; 