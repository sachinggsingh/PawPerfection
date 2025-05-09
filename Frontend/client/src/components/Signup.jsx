import React from 'react';
import {Link , useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {register} from '../redux/auth/loginSlice'
import { useSelector } from 'react-redux';
import {Loader} from  'lucide-react'
const SignUp = () => {
  const {loading,error} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    email:'',
    password : '',
    confirmPassword : ''
  })

  const handleChange =(e)=>
  {
    const {name,value} =e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
  }
  const handleSignUp = async (e)=>
  {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match")
      return
    }
    try{
      const response = await dispatch(register(formData)).unwrap()
      if(response.token){
        navigate('/')
      }
    }
    catch(err){
      console.log(err)
    }
  }
  if(loading)
  {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader className="animate-spin" size={24} />
      </div>
    );
  }
  if(error){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if(!loading && !error && formData.token){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-green-500">Successfully signed up</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 rounded-md shadow-md bg-white dark:bg-gray-50 dark:text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">Create your account</h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-600">
          Already have an Account?
          <Link to='/login' className="ml-1 text-violet-600 hover:underline">
            Login
          </Link>
        </p>

        <div className="my-6 space-y-4">
          {/* Google Login */}
          <button
            type="button"
            className="flex items-center justify-center w-full p-3 border rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-offset-1 focus:ring-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 mr-2 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
            </svg>
            Login with Google
          </button>
        </div>

        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-400" />
          <p className="px-3 text-gray-500">OR</p>
          <hr className="w-full text-gray-400" />
        </div>

        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="xyz@gmail.com"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-violet-600"
              name="email"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-violet-600"
              name="password"
              value={formData.value}
              onChange={handleChange}
              minLength={6}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="Confirm password" className="text-sm font-medium">
                Confirm Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-violet-600"
              name="confirmPassword"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 font-semibold rounded-md bg-gray-600 text-white hover:bg-gray-900"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
