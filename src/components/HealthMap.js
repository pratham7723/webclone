import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const HealthMap = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [map, setMap] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [center, setCenter] = useState({ lat: 19.0760, lng: 72.8777 }); // Mumbai coordinates
  const searchInputRef = useRef(null);

  // Mock hospital data - in real app, this would come from API
  const hospitals = [
    {
      id: 1,
      name: "JJ Hospital",
      address: "Byculla, Mumbai",
      type: "Government",
      specialties: ["Cardiology", "Orthopedics"],
      coordinates: { lat: 18.9750, lng: 72.8258 },
      rating: 4.2,
      phone: "022-23735555"
    },
    {
      id: 2,
      name: "KEM Hospital",
      address: "Parel, Mumbai",
      type: "Government",
      specialties: ["Neurology", "Oncology"],
      coordinates: { lat: 19.0170, lng: 72.8478 },
      rating: 4.5,
      phone: "022-24107000"
    },
    {
      id: 3,
      name: "Sion Hospital",
      address: "Sion, Mumbai",
      type: "Government",
      specialties: ["Pediatrics", "Gynecology"],
      coordinates: { lat: 19.0170, lng: 72.8578 },
      rating: 4.0,
      phone: "022-24087654"
    },
    {
      id: 4,
      name: "Cooper Hospital",
      address: "Juhu, Mumbai",
      type: "Government",
      specialties: ["Emergency", "Trauma"],
      coordinates: { lat: 19.0970, lng: 72.8478 },
      rating: 4.3,
      phone: "022-26673000"
    }
  ];

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleSearch = () => {
    if (!searchLocation.trim()) return;

    // In a real app, you would use Google Places API here
    // For now, we'll simulate searching by updating the center
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchLocation + ', Maharashtra, India' }, (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
        map?.panTo(location);
      } else {
        alert('Location not found. Please try a different search term.');
      }
    });
  };

  const handleMarkerClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleInfoWindowClose = () => {
    setSelectedHospital(null);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const mapOptions = {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
    styles: [
      {
        featureType: "poi.medical",
        elementType: "labels",
        stylers: [{ visibility: "on" }]
      }
    ]
  };

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 flex items-center">
          <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i> Health Services Near You
        </h2>
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Google Maps...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 flex items-center">
        <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i> Health Services Near You
      </h2>
      
      {/* Search Bar */}
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Enter your location (e.g., Mumbai, Pune, Nagpur)"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-search mr-2"></i> Search
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Find nearby network hospitals, PHCs, and health centers that accept MJPJAY.
        </p>
      </div>

      {/* Map Container */}
      <div className="relative">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {/* Hospital Markers */}
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={hospital.coordinates}
              onClick={() => handleMarkerClick(hospital)}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                scaledSize: new window.google.maps.Size(30, 30)
              }}
            />
          ))}

          {/* Info Window */}
          {selectedHospital && (
            <InfoWindow
              position={selectedHospital.coordinates}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-2">
                <h3 className="font-bold text-lg text-blue-800">{selectedHospital.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{selectedHospital.address}</p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Type:</span> {selectedHospital.type}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Phone:</span> {selectedHospital.phone}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Rating:</span> ⭐ {selectedHospital.rating}/5
                </p>
                <div className="mb-2">
                  <span className="font-semibold text-sm">Specialties:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedHospital.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
          <div className="text-sm font-semibold text-gray-700 mb-2">Legend</div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>Network Hospitals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital List */}
      <div className="mt-4">
        <h3 className="font-bold text-gray-800 mb-2">Nearby Hospitals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hospitals.slice(0, 4).map((hospital) => (
            <div
              key={hospital.id}
              className="border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setCenter(hospital.coordinates);
                setSelectedHospital(hospital);
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-blue-800">{hospital.name}</h4>
                  <p className="text-sm text-gray-600">{hospital.address}</p>
                  <p className="text-xs text-gray-500">{hospital.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-yellow-600">⭐ {hospital.rating}</div>
                  <div className="text-xs text-blue-600">MJPJAY</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthMap; 