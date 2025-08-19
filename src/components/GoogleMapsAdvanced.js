import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle } from '@react-google-maps/api';

const GoogleMapsAdvanced = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [map, setMap] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [center, setCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Pune
  const [userLocation, setUserLocation] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [radius, setRadius] = useState(10); // km
  const [apiError, setApiError] = useState(false);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [showNearbyOnly, setShowNearbyOnly] = useState(false);
  const searchInputRef = useRef(null);

  // Enhanced hospital data with Pune locations
  const hospitals = [
    {
      id: 1,
      name: "Sassoon General Hospital",
      address: "Pune Station Road, Pune",
      type: "Government",
      specialties: ["Cardiology", "Orthopedics", "Emergency"],
      coordinates: { lat: 18.5291, lng: 73.8564 },
      rating: 4.2,
      phone: "020-26128000",
      empanelmentStatus: "active",
      bedCapacity: 1200,
      availableBeds: 45
    },
    {
      id: 2,
      name: "KEM Hospital",
      address: "Rasta Peth, Pune",
      type: "Government",
      specialties: ["Neurology", "Oncology", "Cardiology"],
      coordinates: { lat: 18.5204, lng: 73.8567 },
      rating: 4.5,
      phone: "020-26128000",
      empanelmentStatus: "active",
      bedCapacity: 1800,
      availableBeds: 23
    },
    {
      id: 3,
      name: "Ruby Hall Clinic",
      address: "Sassoon Road, Pune",
      type: "Private",
      specialties: ["Pediatrics", "Gynecology", "Emergency"],
      coordinates: { lat: 18.5308, lng: 73.8478 },
      rating: 4.0,
      phone: "020-66455555",
      empanelmentStatus: "active",
      bedCapacity: 950,
      availableBeds: 67
    },
    {
      id: 4,
      name: "Deenanath Mangeshkar Hospital",
      address: "Erandwane, Pune",
      type: "Private",
      specialties: ["Emergency", "Trauma", "Orthopedics"],
      coordinates: { lat: 18.5075, lng: 73.8047 },
      rating: 4.3,
      phone: "020-40151515",
      empanelmentStatus: "active",
      bedCapacity: 750,
      availableBeds: 89
    },
    {
      id: 5,
      name: "Pune Municipal Corporation Hospital",
      address: "Koregaon Park, Pune",
      type: "Government",
      specialties: ["General Medicine", "Surgery", "Emergency"],
      coordinates: { lat: 18.5314, lng: 73.8847 },
      rating: 4.1,
      phone: "020-26128000",
      empanelmentStatus: "active",
      bedCapacity: 1100,
      availableBeds: 34
    },
    {
      id: 6,
      name: "Jehangir Hospital",
      address: "Sassoon Road, Pune",
      type: "Private",
      specialties: ["Cardiology", "Neurology", "Emergency"],
      coordinates: { lat: 18.5289, lng: 73.8562 },
      rating: 4.4,
      phone: "020-66018000",
      empanelmentStatus: "active",
      bedCapacity: 800,
      availableBeds: 56
    },
    {
      id: 7,
      name: "Sahyadri Hospital",
      address: "Kharadi, Pune",
      type: "Private",
      specialties: ["Emergency", "Cardiology", "Orthopedics"],
      coordinates: { lat: 18.5547, lng: 73.9535 },
      rating: 4.2,
      phone: "020-71022222",
      empanelmentStatus: "active",
      bedCapacity: 600,
      availableBeds: 78
    }
  ];

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  // Handle API loading errors
  useEffect(() => {
    if (loadError) {
      console.error('Google Maps API Error:', loadError);
      setApiError(true);
    }
  }, [loadError]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, []);

  // Calculate nearby hospitals when user location or radius changes
  useEffect(() => {
    if (userLocation) {
      const nearby = hospitals
        .map(hospital => ({
          ...hospital,
          distance: getDistance(
            userLocation.lat, userLocation.lng,
            hospital.coordinates.lat, hospital.coordinates.lng
          )
        }))
        .filter(hospital => hospital.distance <= radius)
        .sort((a, b) => a.distance - b.distance);
      
      setNearbyHospitals(nearby);
    }
  }, [userLocation, radius, hospitals]);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleSearch = () => {
    if (!searchLocation.trim()) return;

    // Simple geocoding for demonstration
    // In a real app, you'd use Google Geocoding API
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchLocation }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
        map.panTo(location);
      }
    });
  };

  const handleMarkerClick = (hospital) => {
    setSelectedHospital(hospital);
  };

  const handleInfoWindowClose = () => {
    setSelectedHospital(null);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const getMarkerIcon = (hospital) => {
    if (!userLocation) return 'default';
    
    const distance = getDistance(
      userLocation.lat, userLocation.lng,
      hospital.coordinates.lat, hospital.coordinates.lng
    );
    
    // Different colors based on distance
    if (distance <= 2) return 'green'; // Very close
    if (distance <= 5) return 'yellow'; // Close
    if (distance <= radius) return 'orange'; // Within radius
    return 'red'; // Outside radius
  };

  const getMarkerColor = (hospital) => {
    const iconType = getMarkerIcon(hospital);
    switch (iconType) {
      case 'green': return '#10B981';
      case 'yellow': return '#F59E0B';
      case 'orange': return '#F97316';
      case 'red': return '#EF4444';
      default: return '#EA4335';
    }
  };

  // Show fallback if API key is missing or there's an error
  if (apiError || !process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 flex items-center">
          <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i> Hospital Map
        </h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <i className="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
            <div>
              <h3 className="text-sm font-semibold text-yellow-800">Google Maps API Configuration Required</h3>
              <p className="text-xs text-yellow-700 mt-1">
                To display the interactive map, please configure your Google Maps API key in the .env file.
              </p>
            </div>
          </div>
        </div>

        {/* Fallback Hospital List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Network Hospitals</h3>
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                  <p className="text-sm text-gray-600">{hospital.address}</p>
                  <p className="text-xs text-blue-600">{hospital.type} • {hospital.specialties.join(', ')}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Rating: {hospital.rating}⭐</div>
                  <div className="text-xs text-gray-500">{hospital.phone}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Setup Instructions:</h4>
          <ol className="text-xs text-blue-800 space-y-1">
            <li>1. Get a Google Maps API key from <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
            <li>2. Enable Maps JavaScript API, Places API, and Geocoding API</li>
            <li>3. Add your API key to the .env file: REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here</li>
            <li>4. Restart the development server</li>
          </ol>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 flex items-center">
          <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i> Hospital Map
        </h2>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-blue-600 text-2xl mb-2"></i>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  const displayHospitals = showNearbyOnly ? nearbyHospitals : hospitals;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 flex items-center">
        <i className="fas fa-map-marker-alt mr-2 text-blue-600"></i> Hospital Map
      </h2>
      
      {/* Search Controls */}
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Enter your location (e.g., Mumbai, Pune, Nagpur)"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <i className="fas fa-search mr-2"></i>
            Search
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-3">
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">Filter by:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="all">All Specialties</option>
              <option value="cardiology">Cardiology</option>
              <option value="orthopedics">Orthopedics</option>
              <option value="emergency">Emergency</option>
              <option value="neurology">Neurology</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <label className="text-sm font-medium text-gray-700 mr-2">Radius:</label>
            <input
              type="range"
              min="1"
              max="50"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value))}
              className="w-20"
            />
            <span className="text-sm text-gray-600 ml-2">{radius} km</span>
          </div>
          
          <button
            onClick={() => {
              if (userLocation) {
                setCenter(userLocation);
              }
            }}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors flex items-center"
          >
            <i className="fas fa-map-marker-alt mr-1"></i>
            My Location
          </button>

          <button
            onClick={() => setShowNearbyOnly(!showNearbyOnly)}
            className={`px-3 py-1 rounded text-sm transition-colors flex items-center ${
              showNearbyOnly 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <i className="fas fa-crosshairs mr-1"></i>
            {showNearbyOnly ? 'Show All' : 'Nearby Only'}
          </button>
        </div>

        {/* Nearby Hospitals Summary */}
        {userLocation && nearbyHospitals.length > 0 && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <i className="fas fa-hospital text-blue-600 mr-2"></i>
                <span className="text-sm font-semibold text-blue-900">
                  {nearbyHospitals.length} hospitals within {radius}km
                </span>
              </div>
              <div className="text-xs text-blue-700">
                Closest: {nearbyHospitals[0]?.name} ({nearbyHospitals[0]?.distance.toFixed(1)}km)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="relative">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '500px' }}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
        >
          {/* User Location Marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" fill="white"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(24, 24),
                anchor: new window.google.maps.Point(12, 12)
              }}
            />
          )}

          {/* Search Radius Circle */}
          {userLocation && (
            <Circle
              center={userLocation}
              radius={radius * 1000} // Convert km to meters
              options={{
                fillColor: '#4285F4',
                fillOpacity: 0.1,
                strokeColor: '#4285F4',
                strokeOpacity: 0.3,
                strokeWeight: 2
              }}
            />
          )}

          {/* Hospital Markers */}
          {displayHospitals
            .filter(hospital => {
              if (filterType === 'all') return true;
              return hospital.specialties.some(specialty => 
                specialty.toLowerCase().includes(filterType.toLowerCase())
              );
            })
            .map((hospital) => {
              const markerColor = getMarkerColor(hospital);
              
              return (
                <Marker
                  key={hospital.id}
                  position={hospital.coordinates}
                  onClick={() => handleMarkerClick(hospital)}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${markerColor}"/>
                      </svg>
                    `),
                    scaledSize: new window.google.maps.Size(24, 24),
                    anchor: new window.google.maps.Point(12, 24)
                  }}
                />
              );
            })}

          {/* Info Window */}
          {selectedHospital && (
            <InfoWindow
              position={selectedHospital.coordinates}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-2">
                <h3 className="font-semibold text-gray-900">{selectedHospital.name}</h3>
                <p className="text-sm text-gray-600">{selectedHospital.address}</p>
                <p className="text-xs text-blue-600">{selectedHospital.type}</p>
                {userLocation && (
                  <p className="text-xs text-green-600 font-medium mt-1">
                    <i className="fas fa-location-arrow mr-1"></i>
                    {getDistance(
                      userLocation.lat, userLocation.lng,
                      selectedHospital.coordinates.lat, selectedHospital.coordinates.lng
                    ).toFixed(1)} km away
                  </p>
                )}
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                    Rating: {selectedHospital.rating}
                  </p>
                  <p className="text-xs text-gray-500">
                    <i className="fas fa-phone mr-1"></i>
                    {selectedHospital.phone}
                  </p>
                  <p className="text-xs text-gray-500">
                    <i className="fas fa-bed mr-1"></i>
                    Available: {selectedHospital.availableBeds}/{selectedHospital.bedCapacity}
                  </p>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        {/* Enhanced Legend */}
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md">
          <h4 className="text-sm font-semibold mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Very Close (≤2km)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Close (≤5km)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span>Within Radius</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Outside Radius</span>
            </div>
            <div className="flex items-center mt-2 pt-2 border-t">
              <div className="w-3 h-3 border-2 border-blue-500 rounded-full mr-2"></div>
              <span>Search Radius</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapsAdvanced; 