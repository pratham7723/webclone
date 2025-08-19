import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

const Feedback = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('opinion');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'general',
    subject: '',
    message: '',
    rating: 5,
    feedbackType: 'suggestion'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // Set active tab based on URL path
  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('media')) setActiveTab('media');
    else if (path.includes('success-stories')) {
      setActiveTab('success-stories');
      fetchRecentFeedbacks();
    }
    else if (path.includes('opinion')) setActiveTab('opinion');
  }, [location]);

  const fetchRecentFeedbacks = async () => {
    try {
      setFeedbackLoading(true);
      const response = await fetch(buildApiUrl(API_ENDPOINTS.feedback));
      const result = await response.json();
      
      if (result.success) {
        // Filter for positive feedback (appreciation, suggestions with high ratings)
        const positiveFeedbacks = result.data
          .filter(feedback => 
            feedback.feedbackType === 'appreciation' || 
            (feedback.rating >= 4 && feedback.feedbackType === 'suggestion')
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6); // Show latest 6 positive feedbacks
        
        setRecentFeedbacks(positiveFeedbacks);
      }
    } catch (error) {
      console.error('Error fetching recent feedbacks:', error);
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.feedback), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || 'Thank you for your feedback! Your opinion has been submitted successfully.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'general',
          subject: '',
          message: '',
          rating: 5,
          feedbackType: 'suggestion'
        });
      } else {
        setMessage(result.message || 'Error submitting feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setMessage('Error submitting feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'opinion', name: 'Post Your Opinion', icon: '💬' },
    { id: 'media', name: 'Media Coverage', icon: '📰' },
    { id: 'success-stories', name: 'Success Stories', icon: '🌟' }
  ];

  const feedbackCategories = [
    { value: 'general', label: 'General Feedback' },
    { value: 'scheme', label: 'MJPJAY Scheme' },
    { value: 'hospitals', label: 'Network Hospitals' },
    { value: 'process', label: 'Application Process' },
    { value: 'website', label: 'Website Experience' },
    { value: 'other', label: 'Other' }
  ];

  const feedbackTypes = [
    { value: 'suggestion', label: 'Suggestion' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'appreciation', label: 'Appreciation' },
    { value: 'query', label: 'Query' }
  ];

  const renderOpinionForm = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Share Your Opinion</h3>
        <p className="text-blue-700">
          We value your feedback and suggestions. Help us improve the MJPJAY scheme and our services 
          by sharing your thoughts, experiences, and recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {feedbackCategories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Type *
            </label>
            <select
              name="feedbackType"
              value={formData.feedbackType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {feedbackTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating (1-5) *
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className={`text-2xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {formData.rating} out of 5
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief subject of your feedback"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please share your detailed feedback, suggestions, or experiences..."
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderMediaCoverage = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Media Coverage</h3>
        <p className="text-green-700">
          Stay updated with the latest news, articles, and media coverage about the MJPJAY scheme 
          and healthcare initiatives in Maharashtra.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample media items - replace with actual data */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="text-sm text-gray-500 mb-2">March 15, 2024</div>
            <h4 className="font-semibold text-gray-900 mb-2">
              MJPJAY Scheme Reaches 1 Million Beneficiaries
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              The Mahatma Jyotirao Phule Jan Arogya Yojana has successfully provided healthcare 
              coverage to over 1 million beneficiaries across Maharashtra.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Read More →
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="text-sm text-gray-500 mb-2">March 10, 2024</div>
            <h4 className="font-semibold text-gray-900 mb-2">
              New Hospitals Join MJPJAY Network
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              Fifty new hospitals have been empanelled under the MJPJAY scheme, expanding 
              healthcare access in rural areas.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Read More →
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="text-sm text-gray-500 mb-2">March 5, 2024</div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Government Announces Enhanced Package Rates
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              The Maharashtra government has announced enhanced package rates for various 
              medical procedures under the MJPJAY scheme.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Read More →
            </a>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200">
          View All Media Coverage
        </button>
      </div>
    </div>
  );

  const renderSuccessStories = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-purple-900 mb-2">Success Stories</h3>
        <p className="text-purple-700">
          Read inspiring stories of how the MJPJAY scheme has transformed lives and provided 
          hope to families across Maharashtra.
        </p>
      </div>

      <div className="space-y-6">
        {feedbackLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading success stories...</p>
          </div>
        ) : recentFeedbacks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🌟</div>
            <p className="text-gray-600 mb-2">No recent positive feedbacks found.</p>
            <p className="text-gray-500 text-sm">Be the first to share your success story!</p>
          </div>
        ) : (
          recentFeedbacks.map((feedback, index) => (
            <div key={feedback.id || index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    {feedback.feedbackType === 'appreciation' ? '🙏' : '💡'}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {feedback.subject}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} className={`text-lg ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">
                    {feedback.message}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span><span className="font-medium">From:</span> {feedback.name}</span>
                    <span><span className="font-medium">Category:</span> {feedback.category}</span>
                    <span><span className="font-medium">Type:</span> {feedback.feedbackType}</span>
                    <span><span className="font-medium">Date:</span> {new Date(feedback.date).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center">
        <button 
          onClick={fetchRecentFeedbacks}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          🔄 Refresh Stories
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 ml-4">
          Share Your Success Story
        </button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Feedback & Opinions
          </h1>
          <p className="text-lg text-gray-600">
            Share your thoughts, experiences, and suggestions to help us improve the MJPJAY scheme
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('Thank you') 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium rounded-t-lg transition duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'opinion' && renderOpinionForm()}
          {activeTab === 'media' && renderMediaCoverage()}
          {activeTab === 'success-stories' && renderSuccessStories()}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
