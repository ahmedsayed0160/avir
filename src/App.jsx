import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Profile from './components/Profile/Profile'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/protectedRoute'
import PostContextProvider from './Context/PostContext'






const x = createBrowserRouter([
  {path: "", element: <Layout/>, children:[
    {index: true, element:
      <ProtectedRoute>
       <Home/>
      </ProtectedRoute> 
      },
    {path: "profile", element:
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
    },
    {path: "login", element: <Login/>},
    {path: "register", element: <Register/>},
    {path: "*", element: <Notfound/>},
  ] 
 }
])
  
 


function App() {

  return (
    <>


    <UserContextProvider>
    <PostContextProvider>
      <CounterContextProvider>
      <RouterProvider router={x}></RouterProvider>
      </CounterContextProvider>
    </PostContextProvider>
    </UserContextProvider>
    
      
    </>
  )
}

export default App
