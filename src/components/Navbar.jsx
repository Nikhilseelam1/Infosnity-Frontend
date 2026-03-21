import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, HelpCircle, Menu, X } from 'lucide-react'
import Sidebar from './Sidebar'
import Logo from './Logo'
import infosnitylogo from '../assets/infosnity.jpeg'

import { Outlet } from 'react-router-dom'
import {
  Mail,
  MessageSquare,
  AtSign,
  GraduationCap,
  FileText,
  AppWindow,
  AlertCircle,
  BookOpen,
  Users,
  PenTool,
  Bell,
  Briefcase,
  Bot
} from 'lucide-react'

function Navbar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()

  const links = [
    { name: 'MAIL', path: '/mail', icon: <Mail size={20} /> },
    { name: 'MESSAGES', path: '/messages', icon: <MessageSquare size={20} /> },
    { name: 'MENTIONS', path: '/mentions', icon: <AtSign size={20} /> },
    { name: 'CLASSES', path: '/classes', icon: <GraduationCap size={20} /> },
    { name: 'FILES', path: '/files', icon: <FileText size={20} /> },
    { name: 'APPS', path: '/apps', icon: <AppWindow size={20} /> },

    // ⭐ New Placement item added here
    { name: 'PLACEMENT', path: '/placement', icon: <Briefcase size={20} /> },

    { name: 'GRIEVANCE', path: '/grievance', icon: <AlertCircle size={20} /> },
    { name: 'ACADEMICS', path: '/academics', icon: <BookOpen size={20} /> },
    { name: 'ALUMNI', path: '/alumni', icon: <Users size={20} /> },
    { name: 'BLOGS', path: '/blogs', icon: <PenTool size={20} /> },
    { name: "AI Assistant", path: "/ai-chat", icon: <Bot /> },
  ]

  const filteredLinks = links.filter(link =>
    link.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (filteredLinks.length > 0) {
        navigate(filteredLinks[0].path)
        setSearchTerm('')
        setShowSuggestions(false)
        setIsSideBarOpen(false)
      } else {
        alert('No match found!')
      }
    }
  }

  const handleSuggestionClick = (path) => {
    navigate(path)
    setSearchTerm('')
    setShowSuggestions(false)
    setIsSideBarOpen(false)
  }

  return (
    <>
      <nav className='fixed top-0 left-0 w-full bg-blue-500 text-white px-4 md:px-6 py-3 shadow-lg z-50 d-none'>
        <div className='flex items-center justify-between w-full gap-2 md:gap-10'>
          
          <div className='flex items-center gap-2 flex-shrink-0'>
            <img src={infosnitylogo} className='w-9 h-10 rounded-lg' alt="InfoSnity Logo" />
            <span className='font-semibold text-lg md:text-3xl italic'>InfoSnity</span>
          </div>

          <div className='hidden md:flex items-center gap-2'>
            <Logo className='w-8 h-8' />
            <span className='font-bold text-2xl tracking-wide'>
              RAJIV GANDHI UNIVERSITY OF KNOWLEDGE TECHNOLOGIES
            </span>
          </div>

          <div className='flex items-center gap-1 flex-1 md:flex-none md:ml-auto relative'>
            <div className='relative flex-1 md:flex-none'>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowSuggestions(true)
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={handleKeyDown}
                className="bg-white text-gray-800 rounded-md px-4 py-2 pl-10 w-full md:w-64 max-w-xs lg:max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />

              {showSuggestions && searchTerm && (
                <div className="absolute left-0 right-0 mt-1 bg-white text-black shadow-lg rounded-md max-h-64 overflow-y-auto z-50">
                  {filteredLinks.length > 0 ? (
                    filteredLinks.map(link => (
                      <div
                        key={link.path}
                        className="px-4  hover:bg-gray-200 cursor-pointer flex items-center gap-1"
                        onMouseDown={() => handleSuggestionClick(link.path)}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No match found</div>
                  )}
                </div>
              )}
            </div>

            <button className="hover:bg-blue-700 p-2 rounded-full transition hidden md:block">
              <HelpCircle size={24} />
            </button>

            <button
              className="md:hidden hover:bg-blue-700 p-2 rounded-full transition"
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            >
              {isSideBarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        <div className="mt-2 md:hidden flex text-center font-bold tracking-wide justify-center">
          RAJIV GANDHI UNIVERSITY OF KNOWLEDGE TECHNOLOGIES
        </div>
      </nav>

      <div className="hidden md:block">
        <Sidebar links={links} />
      </div>

      {isSideBarOpen && (
        <div className="fixed top-[68px] left-0 w-64 bg-blue-500 text-white h-[calc(100vh-68px)] shadow-lg z-40 md:hidden">
          <Sidebar 
            links={links} 
            forceVisible 
            onLinkClick={() => setIsSideBarOpen(false)} 
          />
        </div>
      )}
      <Outlet />
    </>
  )
}

export default Navbar
