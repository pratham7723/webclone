import React, { useState, useRef, useEffect } from 'react';

const AudioResources = () => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const audioItems = [
    {
      id: 'audio-1',
      title: "Healthcare Tips Audio",
      description: "Daily health tips and wellness advice",
      src: '/videos/4.mp4',
      duration: "3:45"
    },
    {
      id: 'audio-2',
      title: "Medical Guidelines",
      description: "Important medical procedures and guidelines",
      src: '/videos/5.mp4',
      duration: "5:20"
    },
    {
      id: 'audio-3',
      title: "Patient Education",
      description: "Educational content for patients",
      src: '/videos/6.mp4',
      duration: "4:15"
    }
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;

      const updateTime = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      };

      const setAudioData = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
          setCurrentTime(audioRef.current.currentTime);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
      };

      audioRef.current.addEventListener('timeupdate', updateTime);
      audioRef.current.addEventListener('loadedmetadata', setAudioData);
      audioRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateTime);
          audioRef.current.removeEventListener('loadedmetadata', setAudioData);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (currentAudio && audioRef.current) {
      audioRef.current.src = currentAudio.src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      }
    } else if (!currentAudio && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }
  }, [currentAudio, isPlaying]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        if (!currentAudio) {
          setCurrentAudio(audioItems[0]);
        }
        audioRef.current.play().catch(error => console.error("Audio play failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
      setCurrentTime(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = e.target.value;
      if (e.target.value > 0) setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleAudioSelect = (audioItem) => {
    if (currentAudio && currentAudio.id === audioItem.id) {
      togglePlayPause();
    } else {
      setCurrentAudio(audioItem);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2 flex items-center">
        <i className="fas fa-volume-up mr-2 text-blue-600"></i> Audio Resources
      </h2>

      <audio ref={audioRef} preload="metadata" />

      {/* Main Audio Player Section */}
      {currentAudio && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-music text-blue-600 text-2xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{currentAudio.title}</h3>
              <p className="text-gray-600">{currentAudio.description}</p>
            </div>
            <button
              onClick={togglePlayPause}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg"
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-sm text-gray-600 w-12 text-center">{formatTime(currentTime)}</span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-center">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={toggleMute}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      )}

      {/* Audio List Section (Tiles) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {audioItems.map((audioItem) => (
          <div
            key={audioItem.id}
            onClick={() => handleAudioSelect(audioItem)}
            className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
              currentAudio && currentAudio.id === audioItem.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                currentAudio && currentAudio.id === audioItem.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                <i className={`fas ${
                  currentAudio && currentAudio.id === audioItem.id && isPlaying
                    ? 'fa-pause'
                    : 'fa-play'
                }`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1 break-words">
                  {audioItem.title}
                </h4>
                <p className="text-sm text-gray-600 leading-tight mb-1 break-words line-clamp-2">
                  {audioItem.description}
                </p>
                <p className="text-xs text-blue-600 font-medium">
                  {audioItem.duration}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom CSS for slider styling */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .break-words {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
      `}</style>
    </div>
  );
};

export default AudioResources; 