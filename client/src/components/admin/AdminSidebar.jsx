import React from 'react'
import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/data'

const AdminSidebar = () => {
  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  }

  const adminNavLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboardIcon,
    },
    {
      name: 'Add Shows',
      path: '/admin/add-shows',
      icon: PlusSquareIcon,
    },
    {
      name: 'List Shows',
      path: '/admin/list-shows',
      icon: ListIcon,
    },
    {
      name: 'List Bookings',
      path: '/admin/list-bookings',
      icon: ListCollapseIcon,
    },
  ]

  return (
    <div className="h-[calc(100vh-64px)] hidden md:flex flex-col items-center pt-8 w-60 border-r border-gray-300/20 text-sm">
      
      {/* Profile */}
      <img
        className="h-14 w-14 rounded-full mx-auto"
        src={user.imageUrl}
        alt="sidebar"
      />
      <p className="mt-2 text-base">
        {user.firstName} {user.lastName}
      </p>

      {/* Navigation */}
      <div className="w-full mt-4">
        {adminNavLinks.map((link, index) => (
        <NavLink
  to={link.path}
  end={link.path === '/admin'}
  className={({ isActive }) =>
    `relative flex items-center gap-3 w-full py-3 px-6
     text-gray-400 hover:text-primary
     ${isActive && 'bg-primary/15 text-primary'}`
  }
>

            {({ isActive }) => (
              <>
                <link.icon className="w-5 h-5" />
                <p>{link.name}</p>

                {isActive && (
                  <span className="absolute right-0 w-1.5 h-10 bg-primary rounded-l" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
