
import React from 'react'
import NavBar from './components/NavBar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MyBookings from './pages/MyBookings'
import Seatlayout from './pages/Seatlayout'
import MovieDetails from './pages/MovieDetails'
import Favorite from './pages/Favorite'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'

import Layout from './pages/admin/layout'
import { Addshows } from './pages/admin/Addshows'
import { Dashboard } from './pages/admin/Dashboard'
import { ListShows } from './pages/admin/ListShows'
import { ListBooking } from './pages/admin/ListBooking'
const App = () => {
  const isAdminRoute=useLocation().pathname.startsWith('/admin')
  
  return (
    <>
      <Toaster/>
      {!isAdminRoute&& <NavBar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path="/movie/:id/:date" element={<Seatlayout />} />
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path="/admin/*" element={<Layout/>}>
               <Route index element={<Dashboard/>}/>
               <Route path='add-shows' element={<Addshows/>}/>
               <Route path='list-shows' element={<ListShows/>}/>
               <Route path='list-bookings' element={<ListBooking/>}/>
        </Route>
      </Routes>
      {!isAdminRoute&& <Footer/>}
    </>
  )
}

export default App
