import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

const AdminPanel = () => {
  const { isAuthenticated, isLoading, logout } = useAdminAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDrafts, setShowDrafts] = useState(false);
  const [activeSection, setActiveSection] = useState('applications');
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated]);

  // Redirect to login if not authenticated
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    // Redirect to home after logout
    window.location.href = '/';
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl(API_ENDPOINTS.hospitalEmpanelment));
      const result = await response.json();
      
      if (result.success) {
        setApplications(result.data);
      } else {
        console.error('Error fetching applications:', result.message);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDrafts = async () => {
    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.getDrafts));
      const result = await response.json();
      
      if (result.success) {
        // Add draft applications to the list
        const draftApps = result.data.map(draft => ({
          ...draft.formData,
          applicationId: draft.draftNumber,
          status: 'draft',
          applicationDate: draft.savedAt,
          isDraft: true
        }));
        
        setApplications(prev => [...prev, ...draftApps]);
      }
    } catch (error) {
      console.error('Error fetching drafts:', error);
    }
  };

  const toggleDrafts = () => {
    setShowDrafts(!showDrafts);
    if (!showDrafts) {
      fetchDrafts();
    }
  };

  const fetchFeedbacks = async () => {
    try {
      setFeedbackLoading(true);
      const response = await fetch(buildApiUrl(API_ENDPOINTS.feedback));
      const result = await response.json();
      
      if (result.success) {
        setFeedbacks(result.data);
      } else {
        console.error('Error fetching feedbacks:', result.message);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setFeedbackLoading(false);
    }
  };

  const updateFeedbackStatus = async (feedbackId, newStatus, adminRemarks = '') => {
    try {
      const response = await fetch(buildApiUrl(`${API_ENDPOINTS.feedback}/${feedbackId}/status`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, adminRemarks }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Update local state
        setFeedbacks(prev => prev.map(f => 
          f.id === feedbackId 
            ? { ...f, status: newStatus, adminRemarks, updatedAt: new Date().toISOString() }
            : f
        ));
        setMessage('Feedback status updated successfully');
      } else {
        setMessage('Error updating feedback status');
      }
    } catch (error) {
      console.error('Error updating feedback status:', error);
      setMessage('Error updating feedback status');
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus, remarks = '') => {
    try {
      const response = await fetch(buildApiUrl(`${API_ENDPOINTS.hospitalEmpanelment}/${applicationId}/status`), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, remarks }),
      });

      const result = await response.json();
      
      if (result.success) {
        // Update local state
        setApplications(prev => prev.map(app => 
          app.applicationId === applicationId 
            ? { ...app, status: newStatus, remarks }
            : app
        ));
        
        // Close modal if open
        setSelectedApplication(null);
        
        alert('Application status updated successfully!');
      } else {
        alert('Error updating application status: ' + result.message);
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Error updating application status');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationId.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status) => {
    const statusLabels = {
      'pending': 'Pending',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'under_review': 'Under Review',
      'draft': 'Draft'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>
        {statusLabels[status] || status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Section Navigation */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveSection('applications')}
              className={`px-4 py-2 font-medium rounded-t-lg transition duration-200 ${
                activeSection === 'applications'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📋 Applications
            </button>
            <button
              onClick={() => {
                setActiveSection('feedback');
                fetchFeedbacks();
              }}
              className={`px-4 py-2 font-medium rounded-t-lg transition duration-200 ${
                activeSection === 'feedback'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              💬 Feedback
            </button>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Applications Section */}
        {activeSection === 'applications' && (
          <>
            {/* Filters and Search */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by hospital name, city, or application ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="draft">Drafts</option>
                </select>
                
                <button
                  onClick={toggleDrafts}
                  className={`px-4 py-2 rounded-md transition duration-200 ${
                    showDrafts 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  📝 {showDrafts ? 'Hide' : 'Show'} Drafts
                </button>
                
                <button
                  onClick={fetchApplications}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
                <div className="text-sm text-blue-600">Total Applications</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">
                  {applications.filter(app => app.status === 'pending').length}
                </div>
                <div className="text-sm text-yellow-600">Pending</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {applications.filter(app => app.status === 'approved').length}
                </div>
                <div className="text-sm text-green-600">Approved</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {applications.filter(app => app.status === 'rejected').length}
                </div>
                <div className="text-sm text-red-600">Rejected</div>
              </div>
            </div>

            {/* Applications Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Application ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Hospital Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Submitted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((application) => (
                      <tr key={application.applicationId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {application.applicationId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.hospitalName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(application.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(application.applicationDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedApplication(application)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              👁️ View
                            </button>
                            {application.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateApplicationStatus(application.applicationId, 'approved')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  ✅ Approve
                                </button>
                                <button
                                  onClick={() => updateApplicationStatus(application.applicationId, 'rejected')}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  ❌ Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Application Detail Modal */}
            {selectedApplication && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Application Details - {selectedApplication.applicationId}
                    </h3>
                    <button
                      onClick={() => setSelectedApplication(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Hospital Name:</span> {selectedApplication.hospitalName}</p>
                          <p><span className="font-medium">Type:</span> {selectedApplication.hospitalType}</p>
                          <p><span className="font-medium">Address:</span> {selectedApplication.address}</p>
                          <p><span className="font-medium">City:</span> {selectedApplication.city}</p>
                          <p><span className="font-medium">District:</span> {selectedApplication.district}</p>
                          <p><span className="font-medium">State:</span> {selectedApplication.state}</p>
                          <p><span className="font-medium">Pincode:</span> {selectedApplication.pincode}</p>
                          <p><span className="font-medium">Phone:</span> {selectedApplication.phone}</p>
                          <p><span className="font-medium">Email:</span> {selectedApplication.email}</p>
                          <p><span className="font-medium">Website:</span> {selectedApplication.website}</p>
                          <p><span className="font-medium">Registration Number:</span> {selectedApplication.registrationNumber}</p>
                          <p><span className="font-medium">Establishment Date:</span> {selectedApplication.establishmentDate}</p>
                          <p><span className="font-medium">Bed Strength:</span> {selectedApplication.bedStrength}</p>
                          <p><span className="font-medium">Owner Name:</span> {selectedApplication.ownerName}</p>
                          <p><span className="font-medium">Owner Designation:</span> {selectedApplication.ownerDesignation}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Infrastructure & Manpower</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Total Doctors:</span> {selectedApplication.totalDoctors}</p>
                          <p><span className="font-medium">Specialist Doctors:</span> {selectedApplication.specialistDoctors}</p>
                          <p><span className="font-medium">Paramedical Staff:</span> {selectedApplication.paramedicalStaff}</p>
                          <p><span className="font-medium">Nurses:</span> {selectedApplication.nurses}</p>
                          <p><span className="font-medium">Operation Theatres:</span> {selectedApplication.operationTheatres}</p>
                          <p><span className="font-medium">ICU Beds:</span> {selectedApplication.icuBeds}</p>
                          <p><span className="font-medium">Emergency Beds:</span> {selectedApplication.emergencyBeds}</p>
                        </div>

                        <h4 className="font-medium text-gray-900 mb-2 mt-4">Status</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-medium">Current Status:</span> {getStatusBadge(selectedApplication.status)}</p>
                          <p><span className="font-medium">Application Date:</span> {formatDate(selectedApplication.applicationDate)}</p>
                          {selectedApplication.remarks && (
                            <p><span className="font-medium">Remarks:</span> {selectedApplication.remarks}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-end space-x-3">
                        {selectedApplication.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateApplicationStatus(selectedApplication.applicationId, 'approved')}
                              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                            >
                              ✅ Approve Application
                            </button>
                            <button
                              onClick={() => updateApplicationStatus(selectedApplication.applicationId, 'rejected')}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                            >
                              ❌ Reject Application
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedApplication(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Feedback Section */}
        {activeSection === 'feedback' && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Feedback ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Submitted Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feedbackLoading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading feedbacks...</p>
                      </td>
                    </tr>
                  ) : feedbacks.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No feedbacks found.
                      </td>
                    </tr>
                  ) : (
                    feedbacks.map((feedback) => (
                      <tr key={feedback.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {feedback.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {feedback.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {feedback.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(feedback.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(feedback.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateFeedbackStatus(feedback.id, 'resolved')}
                              className="text-green-600 hover:text-green-900"
                            >
                              ✅ Resolve
                            </button>
                            <button
                              onClick={() => updateFeedbackStatus(feedback.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                            >
                              ❌ Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
