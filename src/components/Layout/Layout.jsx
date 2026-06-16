import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useLanguage } from '../LanguageContext/LanguageContext'

export default function Layout() {
  const { lang } = useLanguage()
  const { pathname } = useLocation()

  // ScrollToTop global - بيشتغل على كل الصفحات
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={lang === 'ar' ? 'rtl' : 'ltr'} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      <div className="w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}