import React, { useState, useEffect, useRef } from 'react';

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef(null);
  const videoRefs = useRef({});

  const videoItems = [
    {
      id: 'local-1',
      type: 'local',
      src: '/videos/1.mp4'
    },
    {
      id: 'local-2',
      type: 'local',
      src: '/videos/2.mp4'
    },
    {
      id: 'local-3',
      type: 'local',
      src: '/videos/3.mp4'
    }
  ];

  const startAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videoItems.length);
    }, 8000);
  };

  const stopAutoAdvance = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!isVideoPlaying) {
      startAutoAdvance();
    }
    
    return () => {
      stopAutoAdvance();
    };
  }, [isVideoPlaying, videoItems.length]);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoItems.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videoItems.length) % videoItems.length);
  };

  const goToVideo = (index) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[videoItems[currentIndex].id];
    if (currentVideo) {
      if (currentVideo.paused) {
        currentVideo.play();
      } else {
        currentVideo.pause();
      }
    }
  };

  const toggleMute = () => {
    const currentVideo = videoRefs.current[videoItems[currentIndex].id];
    if (currentVideo) {
      currentVideo.muted = !currentVideo.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    stopAutoAdvance();
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    startAutoAdvance();
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    startAutoAdvance();
  };

  const renderVideo = (item) => {
    if (item.type === 'youtube') {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${item.videoId}?autoplay=0&rel=0&modestbranding=1`}
          title={item.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else if (item.type === 'local') {
      return (
        <div className="relative w-full h-full">
          <video
            ref={(el) => (videoRefs.current[item.id] = el)}
            src={item.src}
            className="w-full h-full object-cover"
            poster={`/images/${item.id}-poster.jpg`}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onEnded={handleVideoEnded}
            muted={isMuted}
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Custom Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <i className={`fas ${isVideoPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              
              <button
                onClick={toggleMute}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
              >
                <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 flex items-center">
        <i className="fas fa-video mr-2 text-blue-600"></i> Featured Videos
      </h2>
      
      <div className="relative rounded-lg overflow-hidden mb-4 h-96 bg-gray-200">
        <div className="video-container relative h-full w-full">
          {videoItems.map((item, index) => (
            <div
              key={item.id}
              className={`video-item absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {renderVideo(item)}
            </div>
          ))}

          {/* Navigation Arrows */}
          <button 
            onClick={prevVideo}
            className="video-prev absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            onClick={nextVideo}
            className="video-next absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
            {videoItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToVideo(index)}
                className={`video-indicator w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel; 