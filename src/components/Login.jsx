import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

import infosnitylogo from '../assets/infosnity.jpeg'
import { login as connectionLogin } from '../connection/connection'
import { login as authLogin } from '../store/authSlice'

function Login() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const loginFun = async (data) => {
    try {
      setLoading(true)
      setError(null)
      console.log("oooooooooooooooooooooooooooooooooo");
      
      const res = await connectionLogin(data)
      console.log("LOGIN RESPONSE:", res)

      // Check backend success response
      if (!res?.success) {
        throw new Error(res?.message || "Invaild User or password")
      }

      // Dispatch user data to Redux store
      dispatch(authLogin(res))

      // Navigate to valid route
      navigate("/mail")
      console.log("hi this is hannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
      

    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-300 w-full min-h-screen px-4 py-3 flex flex-col">

      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-2 md:px-10 py-3">
        <div className="flex items-center gap-3">
          <img
            src={infosnitylogo}
            className="w-9 h-9 md:w-11 md:h-11 rounded-lg shadow"
            alt="InfoSnity Logo"
          />
          <span className="font-extrabold text-xl md:text-3xl italic text-gray-800">
            InfoSnity
          </span>
        </div>
        <p className="text-sm text-gray-700 mt-2 md:mt-0">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-indigo-700 underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-1 gap-8">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 h-96 w-96 rounded-2xl shadow-lg p-6 text-center">
          <div className="w-24 h-1.5 rounded-full bg-indigo-500 mb-4" />
          <h2 className="text-3xl font-black italic text-gray-700">InfoSnity</h2>
          <p className="text-gray-600 font-medium mt-2">Smart Information Sharing Platform</p>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Welcome Back!</h3>

          {error && (
            <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit(loginFun)} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              className="input"
            />
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
              className="input"
            />

            {/* Role */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Select Role</label>
              <div className="flex gap-4">
                {['student', 'faculty', 'administration'].map(role => (
                  <label key={role} className="flex items-center gap-1">
                    <input
                      type="radio"
                      value={role}
                      {...register('role')}
                      defaultChecked={role === 'student'}
                    />
                    <span className="capitalize">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-400 to-blue-500 text-white font-semibold py-2 rounded-lg hover:from-indigo-500 hover:to-blue-600 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
          </p>

          <Link
            to="/home"
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-indigo-600 hover:underline mt-4"
          >
            <AiOutlineArrowLeft />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
