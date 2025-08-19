import React from 'react';
import QuickLinks from '../components/QuickLinks';
import HelpSection from '../components/HelpSection';
import HeroSection from '../components/HeroSection';
import PhotoCarousel from '../components/PhotoCarousel';
import VideoCarousel from '../components/VideoCarousel';
import GoogleMapsAdvanced from '../components/GoogleMapsAdvanced';
import Announcements from '../components/Announcements';
import KeyPersons from '../components/KeyPersons';
import SuccessStories from '../components/SuccessStories';
import AudioResources from '../components/AudioResources';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Quick Links Section */}
        <div className="lg:w-1/4">
          <QuickLinks />
          <HelpSection />
        </div>

        {/* Main Content Section */}
        <div className="lg:w-3/4">
          <HeroSection />
          <PhotoCarousel />
          <VideoCarousel />
          <GoogleMapsAdvanced />
          
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <Announcements />
            </div>
            <div>
              <KeyPersons />
            </div>
            <div>
              <AudioResources />
            </div>
          </div>
          
          <SuccessStories />
        </div>
      </div>
    </div>
  );
};

export default Home; 