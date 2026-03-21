


import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import toast, { Toaster } from 'react-hot-toast'; // Import Toast
import infosnitylogo from '../assets/infosnity.jpeg';
import { register as connectionSignup } from '../connection/connection';

function FacultySignup() {
  const navigate = useNavigate(); // Initialize hook for navigation

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { role: 'faculty' }
  });

  const onSubmit = async (data) => {
    try {
      // 1. Call the backend API
      // Note: Ensure connectionSignup throws an error if response is not 200/201
      await connectionSignup(data); 

      // 2. Success Notification
      toast.success('Registration Successful! Redirecting to login...');

      // 3. Redirect to login after a short delay (optional delay for UX)
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (error) {
      // Handle errors (e.g., user already exists)
      console.error(error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Toast Container needs to be rendered */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={infosnitylogo} alt="Infosnity Logo" className="h-16 w-16 rounded-full" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Faculty Signup</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Department (Changed to Select Box & Renamed to 'dept') */}
          <div>
            <label className="block text-gray-700 mb-1">Department</label>
            <select
              {...register('dept', { required: 'Department is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
            {errors.dept && <p className="text-red-500 text-sm mt-1">{errors.dept.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register('password', { 
                required: 'Password is required', 
                minLength: { value: 6, message: 'Password must be at least 6 characters' } 
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Role (Hidden/ReadOnly) */}
          <div className="hidden"> 
            {/* Keeping it hidden or readOnly based on preference, removed unnecessary UI clutter since it's fixed */}
            <input
              type="text"
              {...register('role')}
              value="faculty"
              readOnly
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Signup
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FacultySignup;