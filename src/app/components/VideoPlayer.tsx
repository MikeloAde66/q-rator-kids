import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  posterImage?: string;
}

export function VideoPlayer({ videoUrl, title, posterImage }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress || 0);
      setCurrentTime(video.currentTime);
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Handle play interruption - this can happen if video is removed from DOM
            console.log('Play interrupted:', error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * videoRef.current.duration;
    
    // Check if the calculated time is valid before setting it
    if (isFinite(newTime) && videoRef.current.duration > 0) {
      videoRef.current.currentTime = newTime;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Play interrupted:', error);
        });
      }
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="relative aspect-video bg-black rounded-3xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={posterImage}
        onClick={togglePlay}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        Your browser doesn't support video playback.
      </video>

      {/* Custom Controls Overlay */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"
      />

      {/* Big Center Play Button (when paused) */}
      {!isPlaying && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <motion.button
            onClick={togglePlay}
            className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl border-8 border-white pointer-events-auto hover:scale-110 transition-transform"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Play className="w-16 h-16 text-white ml-2" fill="currentColor" />
          </motion.button>
        </motion.div>
      )}

      {/* Bottom Controls */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 p-6 space-y-4"
      >
        {/* Progress Bar */}
        <div
          className="w-full h-3 bg-white/30 rounded-full cursor-pointer hover:h-4 transition-all group pointer-events-auto"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full relative transition-all"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-4 border-purple-500" />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Side - Play/Pause & Restart */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg pointer-events-auto"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-purple-600" fill="currentColor" />
              ) : (
                <Play className="w-8 h-8 text-purple-600 ml-1" fill="currentColor" />
              )}
            </button>

            <button
              onClick={restartVideo}
              className="w-14 h-14 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg pointer-events-auto"
            >
              <RotateCcw className="w-7 h-7 text-white" />
            </button>

            <div className="text-white font-black text-lg bg-black/50 px-4 py-2 rounded-full">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right Side - Volume & Fullscreen */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg pointer-events-auto"
            >
              {isMuted ? (
                <VolumeX className="w-7 h-7 text-purple-600" />
              ) : (
                <Volume2 className="w-7 h-7 text-purple-600" />
              )}
            </button>

            <button
              onClick={toggleFullscreen}
              className="w-14 h-14 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg pointer-events-auto"
            >
              <Maximize className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Video Title Overlay (top) */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute top-0 left-0 right-0 p-6"
      >
        <h3 className="text-white font-black text-2xl md:text-3xl drop-shadow-lg bg-black/50 px-6 py-3 rounded-3xl inline-block">
          {title}
        </h3>
      </motion.div>
    </div>
  );
}