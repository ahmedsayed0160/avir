import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../LanguageContext/LanguageContext';
import logo1 from "../../../public/Pink_Breast_Cancer_Awareness_Instagram_Post__8_-removebg-preview.png";

export default function Footer() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById('about');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const t = {
    en: {
      newsletter: {
        title: "Subscribe to our Awareness Newsletter",
        subtitle: "Get quick tips, useful tools, and support from our community",
        placeholder: "Enter your email",
        button: "Join Now"
      },
      logo: {
        description: "Empowering women through awareness, education, and community support in the fight against breast cancer."
      },
      quickLinks: { title: "Quick Links" },
      contact: {
        title: "Contact Info",
        email: "support@avir.com",
        phone: "+1 (555) 123-4567"
      },
      followUs: "Follow Us",
      copyright: "© 2026 Avir. All rights reserved."
    },
    ar: {
      newsletter: {
        title: "اشتركي في نشرتنا الإخبارية للتوعية",
        subtitle: "احصلي على نصائح سريعة، أدوات مفيدة، ودعم من مجتمعنا",
        placeholder: "أدخلي بريدكِ الإلكتروني",
        button: "انضمي الآن"
      },
      logo: {
        description: "تمكين النساء من خلال الوعي، التعليم، ودعم المجتمع في مكافحة سرطان الثدي."
      },
      quickLinks: { title: "روابط سريعة" },
      contact: {
        title: "معلومات التواصل",
        email: "support@avir.com",
        phone: "+1 (555) 123-4567"
      },
      followUs: "تابعينا",
      copyright: "© 2026 Avir. جميع الحقوق محفوظة."
    }
  }[lang];

  const links = lang === 'ar'
    ? ["الرئيسية", "من نحن", "خدماتنا", "المجتمع"]
    : ["Home", "About", "Services", "Community"];

  return (
    <footer className="bg-[#5A3D58] text-white w-full pt-10 pb-6 mt-16">

      <div className="text-center px-4">
        <h2 className="text-3xl font-bold">{t.newsletter.title}</h2>
        <p className="text-gray-200 text-sm mt-2">{t.newsletter.subtitle}</p>
        <div className="flex justify-center items-center mt-8 flex-wrap gap-4">
          <input
            type="email"
            placeholder={t.newsletter.placeholder}
            className="w-[350px] h-[45px] rounded-md pl-5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300 hover:ring-2 hover:ring-pink-300 transition-all hover:bg-black hover:text-white" />
          <button className="bg-white text-[#5A3D58] px-6 py-2 rounded-md font-medium hover:ring-2 hover:ring-pink-300 transition-all hover:bg-black hover:text-white">
            {t.newsletter.button}
          </button>
        </div>
      </div>

      <hr className="border-gray-400 w-[90%] mx-auto mt-10 mb-8" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-30 px-6">

        {/* Logo */}
        <div>
          <div className="pb-4">
            <img src={logo1} alt="Avir Logo" className="w-[80px] mb-4 -mt-4" />
          </div>
          <p className="text-[#9CA3AF] text-sm -mt-16 leading-relaxed hover:text-pink-500 cursor-pointer py-10">
            {t.logo.description}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-2xl mb-4">{t.quickLinks.title}</h3>
          <ul className="space-y-2 text-[#9CA3AF] text-sm">
            {/* Home */}
            <li>
              <Link to="/" onClick={() => window.scrollTo(0, 0)}
                className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                {links[0]}
              </Link>
            </li>
            {/* About → scroll to #about in Home */}
            <li>
              <button onClick={handleAboutClick}
                className="hover:text-pink-500 cursor-pointer transition-colors duration-200 text-[#9CA3AF] text-sm">
                {links[1]}
              </button>
            </li>
            {/* Services */}
            <li>
              <Link to="/awarenss1" onClick={() => window.scrollTo(0, 0)}
                className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                {links[2]}
              </Link>
            </li>
            {/* Community */}
            <li>
              <Link to="/community" onClick={() => window.scrollTo(0, 0)}
                className="hover:text-pink-500 cursor-pointer transition-colors duration-200">
                {links[3]}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-2xl mb-4">{t.contact.title}</h3>
          <p className="text-[#9CA3AF] text-sm mb-2 flex items-center gap-2 hover:text-pink-500 cursor-pointer">
            <i className="fa-solid fa-envelope"></i> {t.contact.email}
          </p>
          <p className="text-[#9CA3AF] text-sm flex items-center gap-2 hover:text-pink-500 cursor-pointer">
            <i className="fa-solid fa-phone"></i> {t.contact.phone}
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white font-semibold text-2xl mb-4">{t.followUs}</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
              className="bg-pink-400 p-2 h-10 w-10 flex justify-center items-center rounded-full hover:bg-pink-500 transition-colors duration-200">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
              className="bg-pink-400 p-2 h-10 w-10 flex justify-center items-center rounded-full hover:bg-pink-500 transition-colors duration-200">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
              className="bg-pink-400 p-2 h-10 w-10 flex justify-center items-center rounded-full hover:bg-pink-500 transition-colors duration-200">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
              className="bg-pink-400 p-2 h-10 w-10 flex justify-center items-center rounded-full hover:bg-pink-500 transition-colors duration-200">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-400 w-[90%] mx-auto mt-2 mb-2" />

      <div className="text-center text-gray-400 text-sm mt-5 hover:text-pink-500 cursor-pointer">
        {t.copyright}
      </div>
    </footer>
  );
}