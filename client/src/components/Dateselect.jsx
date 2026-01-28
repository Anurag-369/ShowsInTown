import React, { useState } from 'react'
import BlurCircle from './blurcircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dateselect = ({dateTime = {}, id, onSelectDate}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [selected,setSelected]=useState(null);
  const dates = Object.keys(dateTime);
  const visibleDates = dates.slice(currentIndex, currentIndex + 3);
  const navigate=useNavigate()
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (onSelectDate) {
      onSelectDate(date);
    }
  };
  const onBookHandler = () => {
    if (!selectedDate) {
      return toast("please select a date");
    }
    navigate(`/movie/${id}/${selectedDate}`);
    scrollTo(0, 0);
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentIndex + 3 < dates.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  return (
    <div id='dateSelect' className='pt-10'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 relative p-6
       bg-primary/10 border border-primary/10 rounded-lg w-full'>
         <BlurCircle top='-100px' left='100px'/>
         {/* <BlurCircle top='100px' right='0px'/> */}
         
         {/* Left side - Title and dates */}
         <div className='flex flex-col md:flex-row md:items-center  flex-1'>
            <p className='text-lg font-semibold whitespace-nowrap w-full'>Choose Date</p>
            
            {/* Navigation and dates */}
            <div className='flex items-center gap-3'>
               <button 
                 onClick={handlePrevious}
                 disabled={currentIndex === 0}
                 className={`p-1 rounded transition ${
                   currentIndex === 0 
                     ? 'opacity-30 cursor-not-allowed' 
                     : 'hover:bg-white/10 cursor-pointer'
                 }`}>
                 <ChevronLeftIcon width={20} height={20}/>
               </button>
               
               <div className='flex items-center gap-3'>
                 {visibleDates.map((date)=> (
                    <button 
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-3
                      rounded transition cursor-pointer text-sm ${
                        selectedDate === date 
                          ? 'bg-primary text-white' 
                          : 'hover:bg-white/10'
                      }`}>
                       <span className='font-medium text-base'>
                        {new Date(date).getDate()}
                       </span>
                       <span className={`text-xs ${
                         selectedDate === date ? 'text-white/80' : 'text-gray-400'
                       }`}>
                        {new Date(date).toLocaleDateString("en-US",{month:"short"})}
                       </span>
                    </button>
                 ))}
               </div>
               
               <button 
                 onClick={handleNext}
                 disabled={currentIndex + 3 >= dates.length}
                 className={`p-1 rounded transition ${
                   currentIndex + 3 >= dates.length
                     ? 'opacity-30 cursor-not-allowed' 
                     : 'hover:bg-white/10 cursor-pointer'
                 }`}>
                 <ChevronRightIcon width={20} height={20} />
               </button>
            </div>
         </div>
         
         {/* Right side - Book Now button */}
         <button className='bg-primary text-white px-8 py-2.5 rounded
          hover:bg-primary/90 transition cursor-pointer whitespace-nowrap font-medium' onClick={onBookHandler}>
           Book Now
         </button>
      </div>
    </div>
  )
}

export default Dateselect