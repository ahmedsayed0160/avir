import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import {useForm} from 'react-hook-form'
import z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'


export default function Login() {
  const navigate = useNavigate()

   const [apiError, setapiError] = useState("")
   const [isLoading , setIsLoading] = useState(false)
   let {userLogin , setuserLogin} = useContext(UserContext);
   


  const schema = z.object({
   email: z .email( "invalid email"),
   password :z. string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , " must include at 1 capital letter at least & small letter atleast & 1 special char atleast & 1 number atleast & min length 8"), 
  })

 const form = useForm({
  defaultValues: {
    email: '',
    password: '' , 
  },
  resolver: zodResolver(schema)
 });
 let {register , handleSubmit , formState} = form
  function handleLogin (data) {

    setIsLoading(true)
  axios.post(`https://linked-posts.routemisr.com/users/signin`, data)
  .then((res)=>{
    if(res.data.message === "success"){
       setIsLoading(false)
       localStorage.setItem("userToken" , res.data.token)
       setuserLogin(res.data.token)
      navigate("/")
    }
  })
  .catch((err)=>{
    setIsLoading(false)
    setapiError(err.response.data.error)
  })
  }
  return<>
  
<form  onSubmit={handleSubmit(handleLogin) }
 className="max-w-md my-12 mx-auto pt-52 ">
  
   {apiError && (  <h1 className=' text-center  bg-red-600 text-white rounded-md my-2 p-2 font-bold'>
    {apiError}
    </h1>
    )}

  <div >
    <h1 className='text-center font-bold text-3xl flex items-end justify-center'>Log In To Our</h1>
    <h2 className='text-center font-bold text-3xl  flex items-center justify-center'>Community</h2>
  </div>
  <div className="relative z-0 w-full mb-5 group ">
    <input type="email" {...register('email')} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-pink-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0   peer-focus:scale-75 peer-focus:-translate-y-6">  Email</label>
     {formState.errors.email && formState.touchedFields.email ? 
     (<p className='text-red-600 font-semibold text-center my-2'>
      {formState.errors.email.message}</p>) :("")}
   </div> 
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" {...register('password')} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-pink-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  pb-3 peer-focus:scale-75 peer-focus:-translate-y-6">  Password</label>
    {formState.errors.password  && formState.touchedFields.password ? 
    (<p className='text-red-600 font-semibold text-center my-2 '>
      {formState.errors.password.message}</p>) :("")}
   </div>
 

    


  <button
  
  disabled={isLoading}
   type="submit" className="text-white   bg-pink-800 hover:bg-pink-800   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-800 dark:hover:bg-pink-700 dark:focus:ring-pink-800">{isLoading ? <i className='fas fa-spinner  fa-spin text-white'></i> : "Login"}</button>
</form>


  </>
}
