import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCards = () => {
  const services = [
    {
      title: 'Hospital Empanelment',
      icon: 'fas fa-hospital',
      color: 'bg-blue-700',
      description: 'Information and process for hospitals to join the MJPJAY network.',
      link: '/hospitals/empanelment'
    },
    {
      title: 'Aarogyamitras',
      icon: 'fas fa-user-md',
      color: 'bg-green-600',
      description: 'Find and connect with Aarogyamitras in network hospitals and PHCs.',
      link: '/arogyamitras'
    },
    {
      title: 'Operational Guidelines',
      icon: 'fas fa-file-medical',
      color: 'bg-purple-600',
      description: 'Access clinical protocols, package costs, and required documents.',
      link: '/guidelines'
    },
    {
      title: 'Emergency Support',
      icon: 'fas fa-phone-alt',
      color: 'bg-red-600',
      description: 'Immediate assistance for emergency cases and telephonic intimations.',
      link: '/emergency'
    },
    {
      title: 'Health Camps',
      icon: 'fas fa-campground',
      color: 'bg-yellow-600',
      description: 'Information about upcoming and conducted health camps.',
      link: '/health-camps'
    },
    {
      title: 'Scheme Statistics',
      icon: 'fas fa-chart-line',
      color: 'bg-indigo-600',
      description: 'View reports and statistics about scheme implementation.',
      link: '/reports'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {services.map((service, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className={`${service.color} p-4 text-white`}>
            <i className={`${service.icon} text-2xl mb-2`}></i>
            <h3 className="text-xl font-bold">{service.title}</h3>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-4">{service.description}</p>
            <Link to={service.link} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              Learn More <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards; 