import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { useLanguage } from '../../components/LanguageContext/LanguageContext';
import logo from "../../../public/Pink_Breast_Cancer_Awareness_Instagram_Post__8_-removebg-preview.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin, logout } = useContext(UserContext); // ← استخدم logout من Context
  const { lang, setLang } = useLanguage();

  const [showServices, setShowServices] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const servicesRef = useRef(null);
  const communityRef = useRef(null);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  function signout() {
    logout(); // ← استخدم logout من Context
    setShowUserMenu(false);
    navigate("/login");
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuOpen && mobileMenuRef.current?.contains(event.target)) return;
      
      if (
        servicesRef.current && !servicesRef.current.contains(event.target) &&
        communityRef.current && !communityRef.current.contains(event.target) &&
        userMenuRef.current && !userMenuRef.current.contains(event.target)
      ) {
        setShowServices(false);
        setShowCommunity(false);
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  const t = {
    en: {
      login: "Log in",
      register: "Sign Up",
      home: "Home",
      about: "About",
      services: "Services",
      community: "Community",
      servicesDropdown: {
        awareness1: "Awareness_1",
        awareness3: "Self-Examination",
        analyze: "Medical Analysis",
        visual: "Visual Reference",
        symptomDetails: "Symptom Details",
      },
      communityDropdown: {
        communityHome: "Community Home",
        supportCommunity: "Support Community",
        survivorStories: "Survivor Stories"
      },
      userMenu: { profile: "Profile", signout: "Sign out" }
    },
    ar: {
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      community: "المجتمع",
      servicesDropdown: {
        awareness1: "التوعية",
        awareness3: "الفحص الذاتي",
        analyze: "التحليل الطبي",
        visual: "المرجع البصري",
        symptomDetails: "تفاصيل الأعراض",
      },
      communityDropdown: {
        communityHome: "الرئيسية",
        supportCommunity: "مجتمع الدعم",
        survivorStories: "قصص الناجيات"
      },
      userMenu: { profile: "الملف الشخصي", signout: "تسجيل الخروج" }
    }
  }[lang];

  const closeAll = () => {
    setMenuOpen(false);
    setShowServices(false);
    setShowCommunity(false);
    setShowUserMenu(false);
  };

  const closeDropdowns = () => {
    setShowServices(false);
    setShowCommunity(false);
    setShowUserMenu(false);
  };

  const scrollToAbout = () => {
    setMenuOpen(false);
    if (isHomePage) {
      const aboutSection = document.getElementById('about');
      if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/', { state: { scrollToAbout: true } });
    }
  };

  useEffect(() => {
    if (isHomePage && location.state?.scrollToAbout) {
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
    }
  }, [isHomePage, location.state, location.pathname, navigate]);

  return (
    <nav className={`absolute top-0 left-0 w-full z-30 transition-all duration-300 ${isHomePage ? "bg-transparent text-white" : "bg-pink-200"}`}>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto py-3 px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-auto h-16 md:h-20 object-contain" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6 font-medium relative items-center">
          <Link className="hover:text-pink-400 transition" to="/">{t.home}</Link>

          <button onClick={scrollToAbout} className="hover:text-pink-400 transition bg-transparent border-none cursor-pointer">
            {t.about}
          </button>

          {/* Services Dropdown */}
          <div className="relative" ref={servicesRef}>
            <button onClick={() => { setShowServices(p => !p); setShowCommunity(false); }}
              className="hover:text-pink-400 transition flex items-center gap-1 bg-transparent border-none cursor-pointer">
              {t.services}
              <svg className={`w-4 h-4 transform transition ${showServices ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showServices && (
              <div className="absolute left-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg py-2 z-50">
                <Link to="/awarenss1" onClick={closeAll} className="block px-4 py-2 hover:bg-pink-100">{t.servicesDropdown.awareness1}</Link>
                <Link to="/awarenss3" onClick={closeAll} className="block px-4 py-2 hover:bg-pink-100">{t.servicesDropdown.awareness3}</Link>
                <Link to="/analyze" onClick={closeAll} className="block px-4 py-2 hover:bg-pink-100">{t.servicesDropdown.analyze}</Link>
                <Link to="/visual" onClick={closeAll} className="block px-4 py-2 hover:bg-pink-100">{t.servicesDropdown.visual}</Link>
                <Link to="/symptom_details" onClick={closeAll} className="block px-4 py-2 hover:bg-pink-100">{t.servicesDropdown.symptomDetails}</Link>
              </div>
            )}
          </div>

          {/* Community Dropdown */}
          <div className="relative" ref={communityRef}>
            <button onClick={() => { setShowCommunity(p => !p); setShowServices(false); }}
              className="hover:text-pink-400 transition flex items-center gap-1 bg-transparent border-none cursor-pointer">
              {t.community}
              <svg className={`w-4 h-4 transform transition ${showCommunity ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showCommunity && (
              <div className="absolute left-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg py-2 z-50">
                <Link to="/community" onClick={closeAll} className="block px-4 py-2 hover:bg-pink-100">{t.communityDropdown.communityHome}</Link>
                <Link to="/support_community" onClick={closeAll} className="block px-4 py-2 hover:bg-pink-100">{t.communityDropdown.supportCommunity}</Link>
                <Link to="/survivor_stories" onClick={closeAll} className="block px-4 py-2 hover:bg-pink-100">{t.communityDropdown.survivorStories}</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          <button className={`relative w-10 h-10 rounded-full flex items-center justify-center transition ${isHomePage ? "bg-white/20 text-white border border-white/30 hover:bg-white/30" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
          </button>

          {userLogin ? (
            <div className="relative" ref={userMenuRef}>
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex text-sm rounded-full focus:ring-4 focus:ring-pink-300">
                <img 
                  className="w-10 h-10 rounded-full object-cover" 
                  src={userLogin?.image || userLogin?.avatar || "/docs/images/people/profile-picture-3.jpg"} 
                  alt="user" 
                />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 text-gray-800">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold">{userLogin?.name || userLogin?.username || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{userLogin?.email || ""}</p>
                  </div>
                  <Link to="/profile" onClick={() => setShowUserMenu(false)} className="block px-4 py-2 hover:bg-pink-50 text-sm">{t.userMenu.profile}</Link>
                  <button onClick={signout} className="block w-full text-left px-4 py-2 hover:bg-pink-50 text-sm text-red-600">{t.userMenu.signout}</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition font-medium text-sm">{t.login}</Link>
              <Link to="/register" className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700 transition font-medium text-sm">{t.register}</Link>
            </>
          )}

          <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
            <button onClick={() => setLang("en")} className={`px-3 py-2 text-sm font-medium transition ${lang === "en" ? "bg-pink-600 text-white" : "text-gray-600 hover:text-pink-600"}`}>EN</button>
            <div className="w-px h-4 bg-gray-300"></div>
            <button onClick={() => setLang("ar")} className={`px-3 py-2 text-sm font-medium transition ${lang === "ar" ? "bg-pink-600 text-white" : "text-gray-600 hover:text-pink-600"}`}>AR</button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(p => !p)} className="lg:hidden flex flex-col gap-1.5 p-2 z-50">
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isHomePage ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isHomePage ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${isHomePage ? 'bg-white' : 'bg-gray-800'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={mobileMenuRef} className="lg:hidden bg-white text-gray-800 shadow-lg px-6 py-4 flex flex-col gap-3">
          <Link to="/" onClick={closeAll} className="py-2 border-b hover:text-pink-600">{t.home}</Link>
          <button onClick={scrollToAbout} className="text-left py-2 border-b hover:text-pink-600">{t.about}</button>

          {/* Services */}
          <div>
            <button onClick={() => setShowServices(p => !p)} className="w-full text-left py-2 border-b hover:text-pink-600 flex justify-between items-center">
              {t.services}
              <svg className={`w-4 h-4 transform transition ${showServices ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showServices && (
              <div className="pl-4 flex flex-col gap-1 mt-1">
                <Link to="/awarenss1" onClick={closeAll} className="py-1 hover:text-pink-600">{t.servicesDropdown.awareness1}</Link>
                <Link to="/awarenss3" onClick={closeAll} className="py-1 hover:text-pink-600">{t.servicesDropdown.awareness3}</Link>
                <Link to="/analyze" onClick={closeAll} className="py-1 hover:text-pink-600">{t.servicesDropdown.analyze}</Link>
                <Link to="/visual" onClick={closeAll} className="py-1 hover:text-pink-600">{t.servicesDropdown.visual}</Link>
                <Link to="/symptom_details" onClick={closeAll} className="py-1 hover:text-pink-600">{t.servicesDropdown.symptomDetails}</Link>
              </div>
            )}
          </div>

          {/* Community */}
          <div>
            <button onClick={() => setShowCommunity(p => !p)} className="w-full text-left py-2 border-b hover:text-pink-600 flex justify-between items-center">
              {t.community}
              <svg className={`w-4 h-4 transform transition ${showCommunity ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showCommunity && (
              <div className="pl-4 flex flex-col gap-1 mt-1">
                <Link to="/community" onClick={closeAll} className="py-1 hover:text-pink-600">{t.communityDropdown.communityHome}</Link>
                <Link to="/support_community" onClick={closeAll} className="py-1 hover:text-pink-600">{t.communityDropdown.supportCommunity}</Link>
                <Link to="/survivor_stories" onClick={closeAll} className="py-1 hover:text-pink-600">{t.communityDropdown.survivorStories}</Link>
              </div>
            )}
          </div>

          {/* Auth */}
          <div className="flex flex-col gap-2 pt-2">
            {userLogin ? (
              <>
                <Link to="/profile" onClick={closeAll} className="py-2 hover:text-pink-600">{t.userMenu.profile}</Link>
                <button onClick={signout} className="text-left py-2 text-red-600 hover:text-red-700">{t.userMenu.signout}</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeAll} className="bg-pink-600 text-white px-5 py-2 rounded-full text-center hover:bg-pink-700">{t.login}</Link>
                <Link to="/register" onClick={closeAll} className="bg-pink-600 text-white px-5 py-2 rounded-full text-center hover:bg-pink-700">{t.register}</Link>
              </>
            )}
          </div>

          <div className="flex items-center bg-gray-100 rounded-full border border-gray-300 overflow-hidden w-fit mt-2">
            <button onClick={() => setLang("en")} className={`px-3 py-2 text-sm font-medium transition ${lang === "en" ? "bg-pink-600 text-white" : "text-gray-600"}`}>EN</button>
            <div className="w-px h-4 bg-gray-300"></div>
            <button onClick={() => setLang("ar")} className={`px-3 py-2 text-sm font-medium transition ${lang === "ar" ? "bg-pink-600 text-white" : "text-gray-600"}`}>AR</button>
          </div>
        </div>
      )}
    </nav>
  );
}
