import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

const HospitalEmpanelmentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [draftNumber, setDraftNumber] = useState('');
  const [isResuming, setIsResuming] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    hospitalName: '',
    hospitalType: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    registrationNumber: '',
    establishmentDate: '',
    bedStrength: '',
    ownerName: '',
    ownerDesignation: '',

    // Infrastructure
    totalDoctors: '',
    specialistDoctors: '',
    paramedicalStaff: '',
    nurses: '',
    operationTheatres: '',
    icuBeds: '',
    emergencyBeds: '',

    // Diagnostics
    hasLaboratory: false,
    hasRadiology: false,
    hasPharmacy: false,
    hasBloodBank: false,

    // Specialties
    generalSurgery: false,
    orthopedics: false,
    cardiology: false,
    neurology: false,
    oncology: false,
    pediatrics: false,
    gynecology: false,
    ophthalmology: false,
    otherSpecialties: '',

    // Documents
    registrationCertificate: null,
    medicalCouncilRegistration: null,
    fireSafetyCertificate: null,
    pollutionControlCertificate: null,
    buildingCompletionCertificate: null,
    otherDocuments: null,

    // Declaration
    declaration: false,
    termsAccepted: false
  });

  // Check if resuming from draft
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const draftParam = searchParams.get('draft');
    
    if (draftParam) {
      setDraftNumber(draftParam);
      loadDraftApplication(draftParam);
    }
  }, [location]);

  const loadDraftApplication = async (draftNum) => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl(`${API_ENDPOINTS.resumeDraft}/${draftNum}`));
      const result = await response.json();
      
      if (result.success) {
        const draftData = result.data.formData;
        setFormData(prev => ({
          ...prev,
          ...draftData
        }));
        setIsResuming(true);
        setMessage('Draft application loaded successfully! You can now continue filling the form.');
      } else {
        setMessage('Error loading draft: ' + result.message);
      }
    } catch (error) {
      console.error('Error loading draft:', error);
      setMessage('Error loading draft application');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const saveDraft = async () => {
    try {
      setSaving(true);
      setMessage('');

      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          if (typeof formData[key] === 'boolean') {
            formDataToSend.append(key, formData[key].toString());
          } else if (formData[key] instanceof File) {
            formDataToSend.append(key, formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      const response = await fetch(buildApiUrl(API_ENDPOINTS.saveDraft), {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setDraftNumber(result.draftNumber);
        setMessage(`Draft saved successfully! Your draft number is: ${result.draftNumber}. Please save this number to resume later.`);
      } else {
        setMessage(result.message || 'Error saving draft');
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      setMessage(`Error saving draft: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          if (typeof formData[key] === 'boolean') {
            formDataToSend.append(key, formData[key].toString());
          } else if (formData[key] instanceof File) {
            formDataToSend.append(key, formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      let apiUrl;
      if (isResuming && draftNumber) {
        // Submit from draft
        apiUrl = buildApiUrl(`${API_ENDPOINTS.submitFromDraft}/${draftNumber}`);
      } else {
        // Submit new application
        apiUrl = buildApiUrl(API_ENDPOINTS.hospitalEmpanelment);
      }

      console.log('Submitting to API:', apiUrl);
      console.log('Form data:', Object.fromEntries(formDataToSend));

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok) {
        setMessage('Application submitted successfully!');
        setTimeout(() => {
          navigate('/empanelment');
        }, 2000);
      } else {
        setMessage(result.message || 'Error submitting application');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage(`Error submitting application: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateTestData = () => {
    setFormData({
      // Basic Information
      hospitalName: 'Test Hospital Pvt Ltd',
      hospitalType: 'multispecialty',
      address: '123 Test Street, Test Area',
      city: 'Mumbai',
      district: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '022-12345678',
      email: 'test@hospital.com',
      website: 'https://testhospital.com',
      registrationNumber: 'MH/2024/TEST001',
      establishmentDate: '2010-01-15',
      bedStrength: '100',
      ownerName: 'Dr. Test Owner',
      ownerDesignation: 'CEO & Managing Director',

      // Infrastructure
      totalDoctors: '25',
      specialistDoctors: '8',
      paramedicalStaff: '45',
      nurses: '60',
      operationTheatres: '4',
      icuBeds: '20',
      emergencyBeds: '15',

      // Diagnostics
      hasLaboratory: true,
      hasRadiology: true,
      hasPharmacy: true,
      hasBloodBank: true,

      // Specialties
      generalSurgery: true,
      orthopedics: true,
      cardiology: true,
      neurology: true,
      oncology: false,
      pediatrics: true,
      gynecology: true,
      ophthalmology: true,
      otherSpecialties: 'ENT, Dermatology',

      // Documents
      registrationCertificate: null,
      medicalCouncilRegistration: null,
      fireSafetyCertificate: null,
      pollutionControlCertificate: null,
      buildingCompletionCertificate: null,
      otherDocuments: null,

      // Declaration
      declaration: true,
      termsAccepted: true
    });
  };

  const tabs = [
    { name: 'Basic Information', icon: '🏥' },
    { name: 'Infrastructure', icon: '🏗️' },
    { name: 'Diagnostics', icon: '🔬' },
    { name: 'Specialties', icon: '👨‍⚕️' },
    { name: 'Documents', icon: '📄' },
    { name: 'Declaration', icon: '✅' }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            Hospital Empanelment Application Form
          </h1>
          <p className="text-lg text-gray-600">
            {isResuming ? `Resuming Draft Application: ${draftNumber}` : 'Fill in the details below to apply for hospital empanelment'}
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Error') || message.includes('Error') 
              ? 'bg-red-50 border border-red-200 text-red-800' 
              : 'bg-green-50 border border-green-200 text-green-800'
          }`}>
            {message}
          </div>
        )}

        {/* Draft Number Display */}
        {draftNumber && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 font-medium">
              📝 Draft Number: <span className="font-bold">{draftNumber}</span>
            </p>
            <p className="text-blue-600 text-sm mt-1">
              Save this number to resume your application later
            </p>
          </div>
        )}

        {/* Test Data Button */}
        <div className="mb-6 text-center">
          <button
            onClick={generateTestData}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            🧪 Load Test Data
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(index)}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                  activeTab === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tab 1: Basic Information */}
          {activeTab === 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Type *
                  </label>
                  <select
                    name="hospitalType"
                    value={formData.hospitalType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Hospital Type</option>
                    <option value="multispecialty">Multispecialty</option>
                    <option value="specialty">Specialty</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Establishment Date *
                  </label>
                  <input
                    type="date"
                    name="establishmentDate"
                    value={formData.establishmentDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bed Strength *
                  </label>
                  <input
                    type="number"
                    name="bedStrength"
                    value={formData.bedStrength}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Designation *
                  </label>
                  <input
                    type="text"
                    name="ownerDesignation"
                    value={formData.ownerDesignation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Infrastructure */}
          {activeTab === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Infrastructure & Manpower</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Doctors *
                  </label>
                  <input
                    type="number"
                    name="totalDoctors"
                    value={formData.totalDoctors}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialist Doctors *
                  </label>
                  <input
                    type="number"
                    name="specialistDoctors"
                    value={formData.specialistDoctors}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paramedical Staff *
                  </label>
                  <input
                    type="number"
                    name="paramedicalStaff"
                    value={formData.paramedicalStaff}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nurses *
                  </label>
                  <input
                    type="number"
                    name="nurses"
                    value={formData.nurses}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operation Theatres *
                  </label>
                  <input
                    type="number"
                    name="operationTheatres"
                    value={formData.operationTheatres}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ICU Beds *
                  </label>
                  <input
                    type="number"
                    name="icuBeds"
                    value={formData.icuBeds}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Beds *
                  </label>
                  <input
                    type="number"
                    name="emergencyBeds"
                    value={formData.emergencyBeds}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Diagnostics */}
          {activeTab === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Diagnostic Facilities</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasLaboratory"
                    checked={formData.hasLaboratory}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Laboratory Services
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasRadiology"
                    checked={formData.hasRadiology}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Radiology Services
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasPharmacy"
                    checked={formData.hasPharmacy}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Pharmacy
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasBloodBank"
                    checked={formData.hasBloodBank}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Blood Bank
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Specialties */}
          {activeTab === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Medical Specialties</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="generalSurgery"
                    checked={formData.generalSurgery}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    General Surgery
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="orthopedics"
                    checked={formData.orthopedics}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Orthopedics
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="cardiology"
                    checked={formData.cardiology}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Cardiology
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="neurology"
                    checked={formData.neurology}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Neurology
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="oncology"
                    checked={formData.oncology}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Oncology
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="pediatrics"
                    checked={formData.pediatrics}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Pediatrics
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="gynecology"
                    checked={formData.gynecology}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Gynecology
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="ophthalmology"
                    checked={formData.ophthalmology}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Ophthalmology
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Other Specialties
                </label>
                <textarea
                  name="otherSpecialties"
                  value={formData.otherSpecialties}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List any other specialties not mentioned above"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Tab 5: Documents */}
          {activeTab === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Required Documents</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Registration Certificate
                  </label>
                  <input
                    type="file"
                    name="registrationCertificate"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Council Registration
                  </label>
                  <input
                    type="file"
                    name="medicalCouncilRegistration"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fire Safety Certificate
                  </label>
                  <input
                    type="file"
                    name="fireSafetyCertificate"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pollution Control Certificate
                  </label>
                  <input
                    type="file"
                    name="pollutionControlCertificate"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Completion Certificate
                  </label>
                  <input
                    type="file"
                    name="buildingCompletionCertificate"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Documents (Max 5 files)
                  </label>
                  <input
                    type="file"
                    name="otherDocuments"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Declaration */}
          {activeTab === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Declaration & Terms</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleInputChange}
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    I hereby declare that all the information provided in this application is true and correct to the best of my knowledge. *
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    I accept the terms and conditions of the MJPJAY scheme. *
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t">
            <button
              type="button"
              onClick={saveDraft}
              disabled={saving}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {saving ? 'Saving...' : '💾 Save as Draft'}
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : (isResuming ? '📤 Submit Application' : '📤 Submit Application')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalEmpanelmentForm;
