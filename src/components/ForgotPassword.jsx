import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { forgotPassword } from '../connection/connection' // Import function

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const myfun = async (data) => {
        setIsSubmitting(true)
        try {
            console.log("Sending data:", data); // Debug log
            
            // ✅ CRITICAL FIX: Pass 'data' to the function!
            const res = await forgotPassword(data); 

            console.log("API Response:", res);

            // Handle success based on your backend response structure
            if (res && res.message && res.message.includes("rgukt@123")) {
                alert(`Success! ${res.message}`);
                navigate("/login");
            } else {
                alert("Password reset processed. Check your account.");
                navigate("/login");
            }
        } catch (error) {
            console.error("Frontend Error:", error);
            // Handle 404 or 500 errors
            const errMsg = error?.response?.data?.message || "Failed to reset password. Email might be invalid.";
            alert(errMsg);
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-2xl shadow-2xl overflow-hidden'>
                    <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white'>
                        <h2 className='text-3xl font-bold text-center mb-2'>Forgot Password?</h2>
                        <p className='text-blue-100 text-center text-sm'>Enter your email to reset password.</p>
                    </div>

                    <div className='p-8'>
                        <form onSubmit={handleSubmit(myfun)} className='space-y-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                                <input
                                    type='email'
                                    {...register("email", { required: "Email is required" })}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
                                    placeholder='Enter your email'
                                />
                                {errors.email && <p className='mt-2 text-sm text-red-600'>{errors.email.message}</p>}
                            </div>

                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50'
                            >
                                {isSubmitting ? "Processing..." : "Reset Password"}
                            </button>
                        </form>
                        <div className='mt-6 text-center'>
                            <button onClick={() => navigate("/login")} className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword