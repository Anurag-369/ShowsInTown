import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/data';
import Loading from '../../components/Loading';
import { Title } from '../../components/admin/Title';
import { Check, Star, X } from 'lucide-react';
import { kConverter } from '../../lib/kConverter';

export const Addshows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setdateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");
  
  const fetchNowPlayingMovies = async() => {
    setNowPlayingMovies(dummyShowsData)
  };

  const handleDateTimeAdd = () => {
    console.log("dateTimeInput:", dateTimeInput);
    
    if (!dateTimeInput) {
      alert("Please select a date and time");
      return;
    }
    
    const [date, time] = dateTimeInput.split("T");
    console.log("date:", date, "time:", time);
    
    if (!date || !time) {
      alert("Invalid date/time format");
      return;
    }
    
    setdateTimeSelection((prev) => {
      const times = prev[date] || [];
      console.log("Current times for this date:", times);
      
      if (!times.includes(time)) {
        const updated = { ...prev, [date]: [...times, time] };
        console.log("Updated selection:", updated);
        return updated;
      }
      alert("This time slot already exists");
      return prev;
    });
    
    setDateTimeInput("");
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [date]: filteredTimes };
    });
  }

  const handleSubmit = () => {
    if (!selectedMovie || !showPrice || Object.keys(dateTimeSelection).length === 0) {
      alert("Please fill all fields");
      return;
    }
    
    console.log({
      movieId: selectedMovie,
      price: showPrice,
      showTimes: dateTimeSelection
    });
  };
  
  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);
  
  return nowPlayingMovies.length > 0 ? (
    <>
      <Title text1="Add" text2="shows"/>
      <p className='mt-10 text-lg font-medium'>Now Playing Movies</p>
      <div className='overflow-x-auto pb-4'>
        <div className='group flex flex-wrap gap-4 mt-4 w-max'>
          {nowPlayingMovies.map((movie) => (
            <div key={movie.id} className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 
              hover:-translate-y-1 transition duration-300`} onClick={() => setSelectedMovie(movie.id)}>
                <div className='relative rounded-lg overflow-hidden'>
                  <img src={movie.poster_path} className='w-full object-cover brightness-90'/>
                  <div className='text-sm flex items-center justify-between p-2 
                  bg-black/70 w-full absolute bottom-0 left-0'>
                    <p className='flex items-center gap-1 text-gray-400'>
                      <Star className="w-4 h-4 text-primary fill-primary"/>
                      {movie.vote_average.toFixed(1)}
                    </p>
                    <p className='text-gray-300'>{kConverter(movie.vote_count)} Votes</p>
                  </div>
                  {selectedMovie === movie.id && (
                    <div className='absolute top-2 right-2 flex items-center justify-center
                     bg-primary h-7 w-7 rounded-full shadow-lg'>
                      <Check className='w-5 h-5 text-white' strokeWidth={3}/>
                    </div>
                  )}
                </div>
                <p className='font-medium truncate mt-2'>{movie.title}</p>
              </div>
          ))}
        </div>
      </div>
      
      <div className='mt-8'>
        <label className='block text-sm font-medium mb-2'>Show Price</label>
        <div className='inline-flex items-center gap-2 border border-gray-600 
        px-3 py-2 rounded-md'>
          <p className='text-gray-400 text-sm'>{currency}</p>
          <input min={0} type='number' value={showPrice} onChange={(e)=> setShowPrice(e.target.value)}
           placeholder='Enter show Price' className='outline-none bg-transparent'/>
        </div>
      </div>
      
      <div className='mt-6'>
        <label className='block text-sm font-medium mb-2'>Select Date And Time</label>
        <div className='flex flex-col sm:flex-row gap-3'>
          <input 
            type='datetime-local' 
            value={dateTimeInput} 
            onChange={(e) => {
              console.log("Input changed:", e.target.value);
              setDateTimeInput(e.target.value);
            }} 
            className='outline-none border border-gray-600 rounded-md bg-transparent text-white p-3 cursor-pointer min-w-[250px]'
            style={{ colorScheme: 'dark' }}
          />
          <button 
            className='bg-primary/80 text-white px-4 py-3 text-sm rounded-lg hover:bg-primary cursor-pointer' 
            onClick={handleDateTimeAdd}
          >
            Add Time
          </button>
        </div>
      </div>

      {/* Debug: Show current state */}
      <div className='mt-4 text-xs text-gray-500'>
        <p>Date/Time Input: {dateTimeInput || "empty"}</p>
        <p>Selection count: {Object.keys(dateTimeSelection).length}</p>
      </div>

      {/* Display Selected Date/Times */}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className='mt-6'>
          <p className='text-sm font-medium mb-3'>Selected Show Times:</p>
          <div className='space-y-3'>
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <div key={date} className='border border-gray-600 p-3 rounded-lg'>
                <p className='font-medium text-sm mb-2'>
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className='flex flex-wrap gap-2'>
                  {times.map((time) => (
                    <div key={time} className='flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-md'>
                      <span className='text-sm'>{time}</span>
                      <button 
                        onClick={() => handleRemoveTime(date, time)} 
                        className='hover:bg-primary/20 rounded-full p-0.5'
                      >
                        <X className='w-4 h-4' />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className='mt-8 mb-10'>
        <button 
          onClick={handleSubmit}
          className='bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition duration-200 font-medium'
        >
          Add Show
        </button>
      </div>
    </>
  ) : <Loading/>
}