import React, { useState } from 'react'
import style from './Register.module.css'
import {useForm} from 'react-hook-form'
import z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios' 
import { useNavigate } from 'react-router-dom'


export default function Register() {
  const navigate = useNavigate()

   const [apiError, setapiError] = useState("")
   const [isLoading , setIsLoading] = useState(false)


  const schema = z.object({
   name : z.string()
   .min(1 , "name is required")
   .max(10 , "name is too long"),
   email: z.email( "invalid email"),
   password :z. string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ , " must include at 1 capital letter at least & small letter atleast & 1 special char atleast & 1 number atleast & min length 8"),
   rePassword : z.string(),
   dateOfBirth : z.string()
   .regex(/^\d{4}-\d{2}-\d{2}$/, "invalid date")
   .refine((date)=>{
    const userDate = new Date(date)
    const now = new   Date()
    now.setHours(0,0,0,0)
    return userDate < now
   } , "cannot be future date"),
   
  }).refine((object)=>object.password === object.rePassword , {
    error : "passwords do not match",
    path : ["rePassword"]
  })
   


 const form = useForm({
  defaultValues: {
    name: '',
    email: '',
    password: '' , 
    rePassword: '',
    dateOfBirth: '',
     
   
  },
  resolver: zodResolver(schema)
 });

 let {register , handleSubmit , formState} = form
  function handleRegister (data) {

    setIsLoading(true)
  axios.post(`https://linked-posts.routemisr.com/users/signup`, data)
  .then((res)=>{
    if(res.data.message === "success"){
       setIsLoading(false)
      navigate("/login")
     
    }
  })
  .catch((err)=>{
    setIsLoading(false)
    setapiError(err.response.data.error)
    
   // console.log(err.response.data.error)
  })

  
  }
  return<>
  <div className='text-center pt-4'>
    <h1 className=' text-center my-5 text-stone-900 rounded-md   text-5xl p-2 '>Create your profile</h1>
  </div>
<form onSubmit={handleSubmit(handleRegister)}
 className="max-w-md my-12 mx-auto border border-pink-700 p-6 rounded-xl border-rounded m-16 ">
   {apiError && (  <h1 className=' text-center my-5 bg-red-600 text-white rounded-md  p-2 font-bold'>
    {apiError}
    </h1>
    )}

  <div className="relative z-0 w-full mb-5 group ">
    <input type="text"
     {...register('name')}
     id="name" 
     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-pink-600 dark:focus:border-pink-600 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  />
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> UserName</label>
  {formState.errors.name  && formState.touchedFields.name ? 
  (<p className='text-red-600 font-semibold text-center my-2'>
    {formState.errors.name.message}</p>) :("")}
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" {...register('email')} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-pink-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Email</label>
     {formState.errors.email && formState.touchedFields.email ? 
     (<p className='text-red-600 font-semibold text-center my-2'>
      {formState.errors.email.message}</p>) :("")}
   </div> 
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" {...register('password')} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-pink-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border--600 peer" placeholder=" "  />
    <label htmlFor="Password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">  Password</label>
    {formState.errors.password  && formState.touchedFields.password ? 
    (<p className='text-red-600 font-semibold text-center my-2'>
      {formState.errors.password.message}</p>) :("")}
   </div>
  <div className="relative z-0 w-full mb-5 group">
    <input type="Password" {...register('rePassword')} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-pink-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">  rePassword</label>
    {formState.errors.rePassword && formState.touchedFields.rePassword ?
     (<p className='text-red-600 font-semibold text-center my-2'>
      {formState.errors.rePassword.message}</p>) : ("")}
  </div> 
  <div className="relative z-0 w-full mb-5 group">
    <input type="date" {...register('dateOfBirth')} id="dateOfBirth" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-pink-600 dark:focus:border-pink-500 focus:outline-none focus:ring-0 focus:border-pink-600 peer" placeholder=" "  />
    <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">  dateOfBirth</label>
     {formState.errors.dateOfBirth  && formState.touchedFields.dateOfBirth ? 
     (<p className='text-red-600 font-semibold text-center my-2'>
      {formState.errors.dateOfBirth.message}</p>)  : ("")}
  </div>  

    
      

  <button
  disabled={isLoading}
   type="submit" className="text-white bg-blue-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-800 dark:hover:bg-pink-700 dark:focus:ring-pink-800">{isLoading ? <i className='fas fa-spinner  fa-spin text-white'></i> : "Sign Up"}</button>
</form>


  </>
}
