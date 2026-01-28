import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import React from 'react'
import TangerineLogo from '../assets/TangerineLogo.jpg'
import Netflix from '../assets/Netflix.png'
import { Navigate } from 'react-router-dom'
const Hero = () => {
  return (
    <div 
      className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-cover bg-center h-screen'
      style={{ backgroundImage: `url(${TangerineLogo})` }}
    >
      <img src={Netflix} alt='netflix logo' className=' lg:h-10 mt-7 size-15 '/>
      <h1 className='text-3xl py-90px md:text-7xl md:leading-tight font-semibold max-w-2xl'>
        When Life Gives<br/> You Tangerine
      </h1>
      <div className='flex items-center gap-4 text-gray-300'>
        <span>Romance | Fantasy | Beyond Fiction</span>
        <div className='flex items-center gap-1'>
          <CalendarIcon className='w-4.5 h-4.5'/> 2025
        </div>
        <div className='flex items-center gap-1'>
          <ClockIcon className='w-4.5 h-4.5'/> 16 Episodes
        </div>
      </div>
      <p className='max-w-md text-gray-300'>In Jeju, a spirited girl and a steadfast boy's island story blossoms 
        into a lifelong tale of setbacks and triumphs — proving love endures across time.</p>
    <button onClick={()=>{Navigate('/movies')}} className='flex
    items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>
        Explore Movies
        <ArrowRight className='w-5 h-5'/>

    </button>
    </div>
  )
}

export default Hero