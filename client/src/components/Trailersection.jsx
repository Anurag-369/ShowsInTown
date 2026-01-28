import React, { useState } from 'react';
import { dummyTrailers } from '../assets/data.js';
import BlurCircle from './blurcircle';
import { PlayCircle } from 'lucide-react';

const Trailersection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>
      <BlurCircle top="-100px" right="-100px" />

      <div className="relative mt-6">
        <iframe
          src={getYouTubeEmbedUrl(currentTrailer.videoUrl)}
          className="mx-auto max-w-full rounded-lg"
          width="960px"
          height="540px"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className='group grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-8 max-w-5xl mx-auto'>
        {dummyTrailers.map((trailer) => (
          <div 
            key={trailer.videoUrl} 
            className='relative group-hover:not-hover:opacity-50 hover:-translate-y-2 hover:scale-105 duration-300 transition cursor-pointer overflow-hidden rounded-xl shadow-lg' 
            onClick={() => setCurrentTrailer(trailer)}
          >
            <div className='aspect-video w-full'>
              <img 
                src={trailer.image} 
                alt='trailer poster' 
                className='w-full h-full object-cover brightness-75 hover:brightness-90 transition-all duration-300'
              />
            </div>
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none' />
            <PlayCircle 
              strokeWidth={1.5} 
              className='absolute top-1/2 left-1/2 w-12 md:w-16 h-12 md:h-16 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-lg transition-transform group-hover:scale-110'
              fill='rgba(255, 255, 255, 0.2)'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trailersection;