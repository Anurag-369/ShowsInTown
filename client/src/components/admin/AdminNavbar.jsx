import React from 'react'
import { assets } from '../../assets/data'
import { Link } from 'react-router-dom'



const AdminNavbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 bordeer-b border-gray-300/30'>
        <Link to='/'>
           <img src={assets.logo} alt='logo' className='w-36 h-auto'></img>
        </Link> 
     </div>
  )
}

export default AdminNavbar