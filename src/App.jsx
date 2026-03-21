import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { useDispatch,useSelector } from 'react-redux'
import {login as authLogin } from "./store/authSlice.js"
import {checkAuth} from './connection/connection.js'

function App() {

  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  // Check authentication status on app load (for session persistence)
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await checkAuth();
        if (response?.success && response?.user) {
          // Session is valid, restore Redux state
          dispatch(authLogin({
            success: true,
            user: response.user
          }));
        }
      } catch (error) {
        // Session is invalid or expired, user is not logged in
        // This is fine - just means user needs to login
        console.log("No active session");
      } finally {
        setLoading(false);
      }
    };

    // Always check on mount to restore session after page refresh
    restoreSession();
  }, []); // Run only once on mount

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App

