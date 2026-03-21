import React from "react";
import { 
  FaLinkedin, 
  FaGithub, 
  FaBriefcase, 
  FaCode,
  FaHackerrank 
} from "react-icons/fa";
import { MdRocketLaunch } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { SiLeetcode } from "react-icons/si";  // LeetCode icon exists

const apps = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com",
    icon: <FaLinkedin className="text-blue-600 text-5xl" />,
  },
  {
    id: "unstop",
    name: "Unstop",
    url: "https://unstop.com",
    icon: <MdRocketLaunch className="text-indigo-600 text-5xl" />,
  },
  {
    id: "internshala",
    name: "Internshala",
    url: "https://internshala.com",
    icon: <FaBriefcase className="text-blue-500 text-5xl" />,
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com",
    icon: <FaGithub className="text-gray-800 text-5xl" />,
  },
  {
    id: "nptel",
    name: "NPTEL / SWAYAM",
    url: "https://swayam.gov.in",
    icon: <GiGraduateCap className="text-orange-600 text-5xl" />,
  },
  {
    id: "hackerearth",
    name: "HackerEarth",
    url: "https://www.hackerearth.com",
    icon: <FaCode className="text-green-600 text-5xl" />,
  },
  {
    id: "leetcode",
    name: "LeetCode",
    url: "https://leetcode.com",
    icon: <SiLeetcode className="text-yellow-500 text-5xl" />,
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    url: "https://www.hackerrank.com",
    icon: <FaHackerrank className="text-green-700 text-5xl" />,
  },
];

function AppsPage() {
  return (
    <div className="relative ml-1 mr-3 md:ml-69 mt-40 md:mt-30 w-[calc(screen-69px)] h-[calc(100vh-100px)] flex flex-col">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-blue-200 border rounded-2xl flex flex-col items-center p-2 md:p-4 gap-1 max-h-50 overflow-hidden">
        <h2 className="text-black text-xl md:text-3xl font-serif tracking-widest uppercase">APPLICATIONS</h2>
        <p className="text-center text-gray-700 text-xs md:text-sm max-w-full md:max-w-3xl overflow-hidden">
          A collection of essential platforms for students including networking,
          placements, coding practice, internships, learning, and project hosting.
          Click any app to open it instantly.
        </p>
      </div>

      {/* Content Area */}
      <div className="mt-2 flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-4">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => window.open(app.url, "_blank")}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-xl shadow hover:scale-105 transition cursor-pointer border"
            >
              {app.icon}
              <p className="mt-3 text-lg font-medium text-center">{app.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default AppsPage;
