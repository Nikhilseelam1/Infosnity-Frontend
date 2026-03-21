

// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import {
//   Mail, MessageSquare, AtSign, GraduationCap, FileText,
//   AppWindow, AlertCircle, BookOpen, Users, PenTool, 
//   UserCircle, 
//   Bot // ✅ Added Bot Icon for AI Chat
// } from 'lucide-react';

// import LogoutBtn from './LogoutBtn';
// import ProfileModal from './ProfileDetails.jsx';

// function Sidebar({ links, forceVisible = false, onLinkClick }) {
//   const [showProfile, setShowProfile] = useState(false);

//   return (
//     <>
//       <div
//         className={`${
//           forceVisible
//             ? 'block mt-12' 
//             : 'hidden md:fixed md:top-10 mt-15 lg:left-0 md:block'
//         } bg-blue-500 min-h-screen w-64 text-white shadow-lg overflow-y-auto z-40`}
//       >
//         <div className="flex flex-col items-start space-y-0.5 p-4">
          
//           {/* PROFILE ICON SECTION */}
//           <div className="w-full mb-4 pb-4 border-b border-blue-400/50">
//             <button 
//               onClick={() => setShowProfile(true)}
//               className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-blue-600 transition-colors group"
//             >
//               <div className="bg-white text-blue-500 p-2 rounded-full">
//                 <UserCircle size={28} />
//               </div>
//               <div>
//                 <span className="block font-bold text-lg leading-tight group-hover:underline">My Profile</span>
//                 <span className="text-xs text-blue-200">View & Edit</span>
//               </div>
//             </button>
//           </div>

//           {/* Links */}
//           {links.map((link) => (
//             <NavLink
//               key={link.path}
//               to={link.path}
//               onClick={() => {
//                 if (onLinkClick) onLinkClick();
//               }}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 w-full text-left text-lg py-2 px-4 rounded transition-colors duration-200 
//                 ${
//                   isActive
//                     ? 'bg-blue-900 hover:bg-blue-800 text-white'
//                     : 'bg-blue-500 hover:bg-blue-300 hover:text-black'
//                 }`
//               }
//             >
//               {/* If the link object has an icon component, render it */}
//               {link.icon}
//               <span>{link.name}</span>
//             </NavLink>
//           ))}

//           <div className='flex text-black mt-4 border-t border-blue-400/50 pt-4 w-full'>
//             <span className='mt-2 '> <LogoutBtn />  </span>
//             <p className='mt-3 text-xl'> Logout </p> 
//           </div>
         
//         </div>
//       </div>

//       <ProfileModal 
//         isOpen={showProfile} 
//         onClose={() => setShowProfile(false)} 
//       />
//     </>
//   );
// }

// export default Sidebar;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Mail, MessageSquare, AtSign, GraduationCap, FileText,
  AppWindow, AlertCircle, BookOpen, Users, PenTool, 
  UserCircle, 
  Bot 
} from 'lucide-react';

import LogoutBtn from './LogoutBtn';
import ProfileModal from './ProfileDetails.jsx';

function Sidebar({ links, forceVisible = false, onLinkClick }) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <div
        className={`${
          forceVisible
            ? 'block mt-12' 
            : 'hidden md:fixed md:top-10 mt-15 lg:left-0 md:block'
        } bg-blue-500 h-screen w-64 text-white shadow-lg overflow-y-auto z-40 hide-scrollbar`}
      >
        <div className="flex flex-col items-start space-y-0.5 p-4 pb-24">
          
          {/* PROFILE ICON SECTION */}
          <div className="w-full mb-4 pb-4 border-b border-blue-400/50">
            <button 
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-blue-600 transition-colors group"
            >
              <div className="bg-white text-blue-500 p-2 rounded-full">
                <UserCircle size={28} />
              </div>
              <div>
                <span className="block font-bold text-lg leading-tight group-hover:underline">My Profile</span>
                <span className="text-xs text-blue-200">View & Edit</span>
              </div>
            </button>
          </div>

          {/* Links */}
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => {
                if (onLinkClick) onLinkClick();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full text-left text-lg py-2 px-4 rounded transition-colors duration-200 
                ${
                  isActive
                    ? 'bg-blue-900 hover:bg-blue-800 text-white'
                    : 'bg-blue-500 hover:bg-blue-300 hover:text-black'
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}

          <div className='flex text-black mt-4 border-t border-blue-400/50 pt-4 w-full'>
            <span className='mt-2 '> <LogoutBtn />  </span>
            <p className='mt-3 text-xl'> Logout </p> 
          </div>
         
        </div>
      </div>

      {/* CSS to hide scrollbar while keeping functionality */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* Internet Explorer and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}} />

      <ProfileModal 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
    </>
  );
}

export default Sidebar;