import React from 'react';

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "MJPJAY Scheme Extended for FY 2024-25",
      date: "2024-01-20",
      link: "#"
    },
    {
      id: 2,
      title: "New Hospital Network Expansion",
      date: "2024-01-18",
      link: "#"
    },
    {
      id: 3,
      title: "Updated Package Rates Effective",
      date: "2024-01-15",
      link: "#"
    },
    {
      id: 4,
      title: "Helpline Numbers Updated",
      date: "2024-01-12",
      link: "#"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 flex items-center">
        <i className="fas fa-bullhorn mr-2 text-blue-600"></i> Announcements
      </h2>

      <div className="space-y-2">
        {announcements.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-bullhorn text-blue-600 text-xs"></i>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {item.title}
              </h3>
              <p className="text-xs text-blue-600">
                {new Date(item.date).toLocaleDateString('en-IN')}
              </p>
            </div>

            <div className="flex-shrink-0">
              <a href={item.link} className="text-gray-400 hover:text-blue-600 transition-colors">
                <i className="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements; 