import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';

export default function Navbar() {
  let navigate = useNavigate();

// let {counter} =  useContext(CounterContext);
 let {userLogin, setuserLogin} = useContext(UserContext)
 function signout() {
   localStorage.removeItem("userToken")
   setuserLogin(null)
   navigate("/login")

 }
 

  return <>
  
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Social App </span>
    </Link>
    <div className=" gap-4 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {userLogin !== null ? (<>
      <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo" />
      </button>
      {/* Dropdown menu */}
      <div className="z-50   hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <span  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</span>
          </li>
          <li>
            <span  onClick={signout} className="block corsor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</span>
          </li>
          
        </ul>
      </div>
      </> ): (
        <ul className='flex text-white gap-4'>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
      
     
    </div>
  </div>
</nav>

  </>
}
