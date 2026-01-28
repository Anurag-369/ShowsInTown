import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star,Heart, PlayCircle, Import } from 'lucide-react';
import { dummyShowsData, dummyDateTimeData ,dummyCastsData} from '../assets/data';
import BlurCircle from '../components/blurcircle';
import timeformat from '../lib/timeformat';
import Dateselect from '../components/Dateselect';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';


const MovieDetails = () => {
  const navigate=useNavigate();

  const { id } = useParams();
  const [show, setShow] = useState(null);
  
  const getshow = async () => {
    const foundShow = dummyShowsData.find(show => show._id === id);
    
    if (foundShow) {
      setShow({
        movie: {
          ...foundShow,
          cast: foundShow.casts || dummyCastsData
        },
        datetime: dummyDateTimeData
      });
    }
  };
  
  useEffect(() => {
    getshow();
  },[id]);
  
  return show ? (
    <div className='pt-32 md:pt-40 bg-black min-h-screen text-white w-full'>
      <div className='px-6 md:px-16 lg:px-40'>
        <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
          {/* Movie Poster */}
          <img 
            src={show.movie.poster_path} 
            alt={show.movie.title} 
            className='max-md:mx-auto rounded-xl h-[26rem] w-[17.5rem] object-cover shadow-2xl' 
          />
          
          <div className='relative flex flex-col gap-3'>
            <p className='text-primary font-semibold uppercase'>
              {show.movie.original_language}
            </p>
            
            <h1 className='text-4xl font-semibold max-w-96 text-balance'>
              {show.movie.title}
            </h1>
            
            <div className='flex items-center gap-2 text-gray-200'>
              <Star className='w-5 h-5 text-yellow-400 fill-yellow-400'/>
              <span className='font-medium'>{show.movie.vote_average.toFixed(1)}</span>
              <span className='text-gray-400'>
                ({show.movie.vote_count.toLocaleString()} votes)
              </span>
            </div>
            {show.movie.tagline && (
              <p className='text-primary-dull italic text-sm'>"{show.movie.tagline}"</p>
            )}
            <p className='text-gray-400 mt-2 text-sm leading-relaxed max-w-xl'>
              {show.movie.overview}
            </p>
            <div className='flex flex-wrap items-center gap-2 text-gray-300 text-sm'>
              <span className='font-medium'>{timeformat(show.movie.runtime)}</span>
              <span>•</span>
              <span>{show.movie.genres.map(genre => genre.name).join(', ')}</span>
              <span>•</span>
              <span>
                {show.movie.release_date.includes('-') 
                  ? show.movie.release_date.split('-')[0] 
                  : show.movie.release_date.split('/')[2]
                }
              </span>
            </div>
            <div className='flex items-center flex-wrap gap-4 mt-4'>
                <button className='flex items-center gap-2 px-20 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md
                 font-medium cursor-pointer active:scale-95'>
                  <PlayCircle className='w-5 h-5'/>
                  Watch Trailer
                </button>
                
               <button 
                onClick={() => document.getElementById('dateSelect')?.scrollIntoView({ behavior: 'smooth' })}
                className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'
               >
                  Buy Tickets
               </button>
                <button className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'>
                  <Heart className={`w-5 h-5`}/>
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Cast Section */}
      <div className='mt-20 w-full'>
        <p className='text-lg font-medium mb-8 px-6 md:px-16 lg:px-40'>The Fav Cast</p>
        <div className='overflow-x-auto no-scrollbar pb-4 w-full'>
           <div className='flex items-center gap-6 w-max px-6 md:px-16 lg:px-40'>
            {show.movie.cast.slice(0,15).map((cast,index)=>(
              <div key={index} className='flex flex-col items-center text-center gap-2'>
                <img 
                  src={cast.profile_path} 
                  className='rounded-full h-24 w-24 md:h-28 md:w-28 object-cover border-2 border-gray-700'
                />
                <p className='text-sm max-w-[100px] truncate'>{cast.name}</p>
              </div>
            ))}
           </div>
        </div>
      </div>

      {/* Date Select Section */}
      <div className='px-6 md:px-16 lg:px-40'>
        <Dateselect dateTime={show.datetime} id={id}/>
      </div>

      {/* You May Also Like Section */}
      <div className='px-6 md:px-16 lg:px-40'>
        <p className='text-lg font-medium mt-20 mb-8'>You may also like</p>
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {dummyShowsData.slice(0,9).map((movie,index)=>{
            return <MovieCard key={index} movie={movie}/>
          })}
        </div>
        <div className='flex justify-center mt-20'>
           <button onClick={()=>navigate(`/movies`)} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>show more</button>
        </div>
      </div>
    </div>
  ) : (
     <Loading/>
  );
};

export default MovieDetails;