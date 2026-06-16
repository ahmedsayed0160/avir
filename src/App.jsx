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
import { LanguageProvider } from './components/LanguageContext/LanguageContext' // ← جديد
import ProtectedRoute from './components/ProtectedRoute/protectedRoute'
import PostContextProvider from './Context/PostContext'
import Community from './components/Community/Community'
import Services from './components/Services/Services'
import Awarenss1 from './components/Awarenss1/Awarenss1'
import Awarenss2 from './components/Awarenss2/Awarenss2'
import Awarenss3 from './components/Awarenss3/Awarenss3'
import Awarenss4 from './components/Awarenss4/Awarenss4'
import Chatbot from './components/Chatbot/Chatbot'
import Analyze from './components/Analyze/Analyze'
import Support1 from './components/Support1/Support1'
import Visual from './components/Visual/Visual'
import Symptom_Details from './components/Symptom_Details/Symptom_Details'
import Survivor_Stories from './components/Survivor_Stories/Survivor_Stories' 
import Support_Community from './components/Support_Community/Support_Community' 


const x = createBrowserRouter([
  {
    path: "", 
    element: <Layout/>, 
    children: [
      { index: true, element: <Home/> },
      { path: "profile", element: <Profile/> },
      
      { path: "services", element: <ProtectedRoute><Services/></ProtectedRoute> },
      { path: "community", element: <ProtectedRoute><Community/></ProtectedRoute>   },
      { path: "register", element: <Register/> }, // ← حطيته جوه Layout
      { path: "*", element: <Notfound/> },
      { path: "awarenss1", element: <ProtectedRoute><Awarenss1/></ProtectedRoute>  },
      { path: "awarenss2", element: <ProtectedRoute><Awarenss2/></ProtectedRoute>  },
      { path: "awarenss3", element: <ProtectedRoute><Awarenss3/></ProtectedRoute>  },
      { path: "awarenss4", element: <ProtectedRoute> <Awarenss4/></ProtectedRoute> },
      { path: "chatbot", element: <ProtectedRoute><Chatbot/></ProtectedRoute>  },
      { path: "analyze", element: <ProtectedRoute><Analyze/></ProtectedRoute>  },
      { path: "support1", element: <ProtectedRoute><Support1/></ProtectedRoute>  },
      { path: "visual", element: <ProtectedRoute><Visual/></ProtectedRoute>  },
      { path: "symptom_details", element: <ProtectedRoute><Symptom_Details/></ProtectedRoute>  },
      { path: "survivor_stories", element: <ProtectedRoute><Survivor_Stories/></ProtectedRoute>  },
      { path: "support_community", element: <ProtectedRoute><Support_Community/>  </ProtectedRoute>  },
      { path: "Profile", element: <ProtectedRoute><Profile/>  </ProtectedRoute>  },

    ] 
  },
  { path: "login", element: <Login/> }, // ← برا Layout (مش عايز Navbar فيها)
])

function App() {
  return (
    <LanguageProvider> {/* ← غلفنا كل حاجة */}
      <UserContextProvider>
        <CounterContextProvider>
          <RouterProvider router={x}></RouterProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </LanguageProvider>
  )
}

export default App