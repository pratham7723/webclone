import React from 'react';

const KeyPersons = () => {
  const keyPersons = [
    {
      id: 1,
      name: "Shri. Devendra Fadnavis",
      position: "Hon'ble Chief Minister",
      image: "https://www.jeevandayee.gov.in/MJPJAY/RGJAY-images/FADNAVIS.png"
    },
    {
      id: 2,
      name: "Shri. Eknath Shinde",
      position: "Hon'ble Deputy Chief Minister",
      image: "https://www.jeevandayee.gov.in/MJPJAY/RGJAY-images/Ekanth_shinde.png"
    },
    {
      id: 3,
      name: "Shri. Ajit Pawar",
      position: "Hon'ble Deputy Chief Minister",
      image: "https://www.jeevandayee.gov.in/MJPJAY/RGJAY-images/AJITPAWAR.png"
    },
    {
      id: 4,
      name: "Shri. Prakash Abitkar",
      position: "Hon'ble Minister, Public Health and Family Welfare",
      image: "https://www.jeevandayee.gov.in/MJPJAY/RGJAY-images/Prakash_Abitkar.png"
    },
    {
      id: 5,
      name: "Smt. Meghna Sakore-Bordikar",
      position: "Hon'ble Minister of State, Public Health and Family Welfare",
      image: "https://www.jeevandayee.gov.in/MJPJAY/RGJAY-images/Meghna_Sakore.png"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 flex items-center">
        <i className="fas fa-users mr-2 text-blue-600"></i> Key Persons
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        {keyPersons.map((person) => (
          <div key={person.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                {person.image ? (
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm" style={{ display: person.image ? 'none' : 'flex' }}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {person.name}
              </h3>
              <p className="text-xs text-blue-600 truncate">
                {person.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyPersons; 