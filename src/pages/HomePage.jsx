import React, { useState } from 'react';
import { User, Mail, MessageSquare, Users, BookOpen, Award, ArrowRight, Menu, X } from 'lucide-react';
import infosnitylogo from '../assets/infosnity.jpeg';
import { Link } from 'react-router';

export default function InfoSnityHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <img src={infosnitylogo} alt="infosnityLogo" className="w-8 h-8 rounded-md" />
              </div>
              <span className="text-2xl font-bold text-blue-600">InfoSnity</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
              >
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#about" className="block text-gray-700 hover:text-blue-600">About</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600">Contact</a>
              <Link
                to="/login"
                className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg text-center hover:bg-blue-700 transition-all"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Welcome to <span className="text-blue-600">InfoSnity</span>
                </h1>
                <p className="text-xl text-gray-600">
                  The Official Alumni Network of RGUKT
                </p>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                InfoSnity connects alumni of Rajiv Gandhi University of Knowledge Technologies (RGUKT), 
                fostering a vibrant community where graduates can network, share opportunities, and stay 
                connected with their alma mater. Join thousands of RGUKT alumni worldwide in building 
                lasting professional relationships.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-lg font-semibold"
                >
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </Link>
                <button className="bg-white text-blue-600 px-8 py-4 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg text-lg font-semibold">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">10k+</div>
                  <div className="text-sm text-gray-600 mt-1">Alumni</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600 mt-1">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600 mt-1">Countries</div>
                </div>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-white space-y-8 text-center">
                  <div className="text-6xl mb-4">✱</div>
                  <h3 className="text-3xl font-bold">Join InfoSnity</h3>
                  <p className="text-lg text-blue-100">
                    Connect with RGUKT alumni, share experiences, and grow your professional network
                  </p>
                  <div className="pt-4">
                    <Link
                      to="/login"
                      className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Login in Now
                    </Link>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* About RGUKT Section */}
      <div id="about" className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About RGUKT</h2>
              <div className="space-y-4 text-lg text-blue-100">
                <p>
                  Rajiv Gandhi University of Knowledge Technologies (RGUKT) is a unique institution 
                  established by the Government of Andhra Pradesh to provide quality education to 
                  talented rural youth.
                </p>
                <p>
                  With campuses across Andhra Pradesh, RGUKT offers integrated programs combining 
                  pre-university and undergraduate education in engineering and sciences, creating 
                  a pathway for rural students to achieve their academic and professional dreams.
                </p>
                <p>
                  InfoSnity serves as the bridge connecting RGUKT's growing community of successful 
                  alumni, fostering collaboration, mentorship, and lifelong learning.
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Integrated Education</h3>
                  <p className="text-blue-100">6-year integrated B.Tech programs for rural talent</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Strong Community</h3>
                  <p className="text-blue-100">Thousands of successful alumni worldwide</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-white/20 rounded-lg p-3">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Excellence</h3>
                  <p className="text-blue-100">Recognized for academic and research achievements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join the Community?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Connect with thousands of RGUKT alumni and unlock exclusive opportunities
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-10 py-4 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl text-lg font-bold"
          >
            Get Started Today
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-2xl">✱</div>
                </div>
                <span className="text-xl font-bold text-white">InfoSnity</span>
              </div>
              <p className="text-sm">Connecting RGUKT alumni worldwide</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Alumni Directory</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 InfoSnity - RGUKT Alumni Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
