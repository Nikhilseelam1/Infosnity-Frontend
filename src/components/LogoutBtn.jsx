import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from "react-router-dom";
import {SlLogout} from "react-icons/sl"
import { logout as connectingLogout } from '../connection/connection.js';


function LogoutBtn() {
    const port = import.meta.env.VITE_URI; 
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logoutHandler = async () => {
            await connectingLogout()
            .then(dispatch(logout()))
            .then(navigate('/'))
            .catch(dispatch(() => {logout() ; navigate('/')}))
        
    };

    return (
        <button
            className="inline-block px-6 py-2 mb-5 duration-200 hover:bg-blue-100 rounded-full text-black"
            onClick={logoutHandler}
        >
            <SlLogout className='text-xl font-extrabold'/>
            
        </button>
    );
}

export default LogoutBtn;