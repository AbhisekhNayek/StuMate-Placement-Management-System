import React from 'react';

function LoadingComponent() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center space-y-6">
        {/* Rotating Loader with Glowing Effect */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          <div className="absolute w-10 h-10 border-4 border-green-400 border-t-transparent border-solid rounded-full animate-spin-slow"></div>
        </div>

        {/* Animated Text */}
        <p className="text-xl font-medium text-green-500 max-sm:text-base animate-pulse">
          Hold your seat tightly, we are coming...
        </p>
      </div>
    </div>
  );
}

export default LoadingComponent;
