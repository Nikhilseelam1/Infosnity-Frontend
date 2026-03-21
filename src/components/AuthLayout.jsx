import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    // useEffect(() => {

    //     if(authentication && authStatus !== authentication){
    //         navigate("/login")
    //     } else if(!authentication && authStatus !== authentication){
    //         navigate("/profile-page")
    //     }
    //     setLoader(false)
    // }, [authStatus, navigate, authentication])

    useEffect(() => {
    if(authentication && authStatus !== authentication){
        // Protected route, user not logged in
        navigate("/login", { replace: true })
    } else if(!authentication && authStatus === true){
        // Public route, user is already logged in
        navigate("/mail", { replace: true }) // <-- change from /profile-page
    }
    setLoader(false)
}, [authStatus, navigate, authentication])


  return loader ? <h1>Loading...</h1> : <>{children}</>
}