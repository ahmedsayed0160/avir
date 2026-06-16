import photo2 from "../../../public/pexels-leeloothefirst-7805645.jpg"
import photohome from "../../../public/pexels-thirdman-7659739.jpg"
import photo3 from "../../../public/pexels-thirdman-7659895.jpg"
import { useLanguage } from "../LanguageContext/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();

  const t = {
    en: {
      heroTitle1: "Strength in",
      heroTitle2: "Awareness",
      heroDesc1: "Early awareness is the key to protection. Join thousands of",
      heroDesc2: "women taking control of their health through knowledge and",
      heroDesc3: "community support.",
      checkNow: "Check Now",
      joinCommunity: "Join Community",
      aboutTitle: "About Our Platform",
      aboutText: "Early awareness is the key to protection — our platform helps you detect symptoms, self-check, and find support.",
      more: "More",
      impactTitle: "Impact of Early Detection",
      impactSubtitle: "The numbers speak for themselves",
      deathsTitle: "Decrease in Deaths",
      deathsDesc: "Since 1989, thanks to improved awareness and treatment",
      survivalTitle: "Survival Rate",
      survivalDesc: "With early detection and proper treatment",
      servicesTitle: "Our Services",
      servicesSubtitle: "Comprehensive support and resources for breast cancer awareness and prevention",
      awareness: "Awareness",
      awarenessDesc: "Learn about symptoms, risk factors, and prevention methods through our comprehensive educational resources.",
      selfCheck: "Self-Check Tool",
      selfCheckDesc: "Guided self-examination instructions and personalized reminder schedules for regular health monitoring.",
      visualRef: "Visual Reference",
      visualRefDesc: "Safe medical imagery and visual guides to help identify potential concerns and normal variations.",
      community: "Community",
      communityDesc: "Connect with survivors, share experiences, and find emotional support in our safe community space.",
      medicalGuide: "Medical Guidance",
      medicalGuideDesc: "Directory of specialized hospitals, clinics, and healthcare providers in your area.",
      whyJoinTitle: "Why Join Our Community",
      whyJoinSubtitle: "Connect with others, share experiences, and get the support you need every step of the way.",
      joinSpace: "Join the Space",
      joinSpaceDesc: "Be part of a safe, private space for women",
      connectSupport: "Connect & Support",
      connectSupportDesc: "Share experiences with survivors",
      shareStory: "Share Your Story",
      shareStoryDesc: "Your story can inspire others and give them hope and courage",
      hospitals: "Hospitals & Medical Guidance",
      hospitalsDesc: "Discover nearby hospitals and trusted medical support resources",
      joinButton: "Join the Space - Be Part of Our Community"
    },
    ar: {
      heroTitle1: "القوة في",
      heroTitle2: "التوعية",
      heroDesc1: "التوعية المبكرة هي مفتاح الحماية. انضمي لآلاف",
      heroDesc2: "النساء اللاتي يتحكمون في صحتهن من خلال المعرفة و",
      heroDesc3: "دعم المجتمع.",
      checkNow: "افحصي الآن",
      joinCommunity: "انضمي للمجتمع",
      aboutTitle: "عن منصتنا",
      aboutText: "التوعية المبكرة هي مفتاح الحماية — منصتنا تساعدك في اكتشاف الأعراض، الفحص الذاتي، والحصول على الدعم.",
      more: "المزيد",
      impactTitle: "تأثير الاكتشاف المبكر",
      impactSubtitle: "الأرقام تتحدث عن نفسها",
      deathsTitle: "انخفاض الوفيات",
      deathsDesc: "منذ عام 1989، بفضل التوعية والعلاج المحسن",
      survivalTitle: "معدل البقاء",
      survivalDesc: "مع الاكتشاف المبكر والعلاج المناسب",
      servicesTitle: "خدماتنا",
      servicesSubtitle: "دعم شامل وموارد للتوعية بسرطان الثدي والوقاية منه",
      awareness: "التوعية",
      awarenessDesc: "تعرفي على الأعراض، عوامل الخطر، وطرق الوقاية من خلال مواردنا التعليمية الشاملة.",
      selfCheck: "أداة الفحص الذاتي",
      selfCheckDesc: "تعليمات فحص ذاتي موجهة وجداول تذكير مخصصة للمراقبة الصحية المنتظمة.",
      visualRef: "المرجع البصري",
      visualRefDesc: "صور طبية آمنة وأدلة بصرية للمساعدة في تحديد المخاوف المحتملة والاختلافات الطبيعية.",
      community: "المجتمع",
      communityDesc: "تواصلي مع الناجيات، شاركي التجارب، واحصلي على الدعم العاطفي في مجتمعنا الآمن.",
      medicalGuide: "الإرشاد الطبي",
      medicalGuideDesc: "دليل المستشفيات المتخصصة والعيادات ومقدمي الرعاية الصحية في منطقتك.",
      whyJoinTitle: "لماذا تنضمين لمجتمعنا",
      whyJoinSubtitle: "تواصلي مع الآخرين، شاركي التجارب، واحصلي على الدعم الذي تحتاجينه في كل خطوة.",
      joinSpace: "انضمي للمجتمع",
      joinSpaceDesc: "كوني جزءاً من فضاء آمن وخاص للنساء",
      connectSupport: "تواصل ودعم",
      connectSupportDesc: "شاركي التجارب مع الناجيات",
      shareStory: "شاركي قصتك",
      shareStoryDesc: "قصتك يمكن أن تلهم الآخرين وتمنحهم الأمل والشجاعة",
      hospitals: "المستشفيات والإرشاد الطبي",
      hospitalsDesc: "اكتشفي المستشفيات القريبة وموارد الدعم الطبي الموثوقة",
      joinButton: "انضمي للمجتمع - كوني جزءاً منا"
    }
  }[lang];

  return (
    <div className={lang === 'ar' ? 'rtl' : 'ltr'} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* Hero Section - نفس الشكل الأصلي بس responsive */}
      <div className='relative w-full h-screen min-h-[500px] overflow-hidden'>
        <img src={photohome} 
          className='absolute top-0 left-0 w-full h-full object-cover z-0' 
          alt="" 
        />
        
        {/* Content - positioned from left like original */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-16">
          
          {/* Title */}
          <div className="mb-2">
            <h1 className='font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight'>
              {t.heroTitle1}
            </h1>
            <h2 className='font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-pink-500 leading-tight'>
              {t.heroTitle2}
            </h2>
          </div>
          
          {/* Description */}
          <div className="mt-4 sm:mt-6 max-w-xl">
            <p className='font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed'>
              {t.heroDesc1}
            </p>
            <p className='font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed'>
              {t.heroDesc2}
            </p>
            <p className='font-bold text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed'>
              {t.heroDesc3}
            </p>
          </div>
          
          {/* Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8'>
            <button type="button" className="text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-4 focus:ring-pink-300 font-bold rounded-full text-sm px-5 py-2.5 transition-all duration-300 w-full sm:w-auto">
              {t.checkNow}
            </button>
            <button type="button" className="bg-white hover:bg-gray-100 text-gray-800 focus:outline-none focus:ring-4 focus:ring-pink-300 font-bold rounded-full text-sm px-5 py-2.5 transition-all duration-300 w-full sm:w-auto">
              {t.joinCommunity}
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="flex flex-col md:flex-row items-center justify-center py-16 px-6 md:px-16 bg-gray-50 gap-8">
        <div className="w-full md:w-1/2">
          <img src={photo2} className="rounded-lg shadow-lg object-cover w-full h-[300px] md:h-[400px]" alt="" />
        </div>
        <div className="w-full md:w-1/2 bg-white shadow-2xl rounded-lg p-6 md:p-8">
          <h1 className="font-bold text-2xl md:text-3xl text-rose-950 mb-4">{t.aboutTitle}</h1>
          <p className="text-gray-600 leading-relaxed font-bold mb-4">{t.aboutText}</p>
          <button className="text-white bg-pink-500 hover:bg-pink-700 font-bold rounded-full text-sm px-6 py-3 transition">
            {t.more}
          </button>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-rose-950 mb-2">{t.impactTitle}</h2>
        <p className="text-gray-500 mb-12">{t.impactSubtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-20">
          <div className="flex flex-col items-center bg-white rounded-2xl p-8 w-full max-w-[250px] hover:shadow-lg transition">
            <div className="bg-pink-100 p-4 rounded-full mb-4">
              <i className="fas fa-chart-line text-pink-600 text-2xl" />
            </div>
            <h3 className="text-pink-600 text-5xl font-extrabold">42%</h3>
            <p className="font-bold text-gray-800 mt-2">{t.deathsTitle}</p>
            <p className="text-gray-500 text-sm mt-1">{t.deathsDesc}</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-2xl p-8 w-full max-w-[250px] hover:shadow-lg transition">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <i className="fas fa-heart text-purple-700 text-2xl" />
            </div>
            <h3 className="text-purple-700 text-5xl font-extrabold">99%</h3>
            <p className="font-bold text-gray-800 mt-2">{t.survivalTitle}</p>
            <p className="text-gray-500 text-sm mt-1">{t.survivalDesc}</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-rose-950 mb-4 text-center">{t.servicesTitle}</h2>
        <p className="text-gray-500 mb-12 text-center">{t.servicesSubtitle}</p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: "fa-info", color: "bg-pink-100 text-pink-600", title: t.awareness, desc: t.awarenessDesc },
            { icon: "fa-stethoscope", color: "bg-purple-100 text-purple-600", title: t.selfCheck, desc: t.selfCheckDesc },
            { icon: "fa-eye", color: "bg-pink-100 text-pink-600", title: t.visualRef, desc: t.visualRefDesc },
            { icon: "fa-users", color: "bg-purple-100 text-purple-600", title: t.community, desc: t.communityDesc },
            { icon: "fa-hospital", color: "bg-pink-100 text-pink-600", title: t.medicalGuide, desc: t.medicalGuideDesc },
          ].map((s, i) => (
            <div key={i} className="bg-white shadow-lg rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300">
              <div className={`w-12 h-12 ${s.color} flex items-center justify-center rounded-full text-xl mb-4`}>
                <i className={`fa-solid ${s.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-[#491326] mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-[#491326] mb-4 text-center">{t.whyJoinTitle}</h2>
        <p className="text-gray-600 mb-12 text-center">{t.whyJoinSubtitle}</p>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-6">
            {[
              { icon: "fa-ribbon", title: t.joinSpace, desc: t.joinSpaceDesc },
              { icon: "fa-hand-holding-heart", title: t.connectSupport, desc: t.connectSupportDesc },
            ].map((item, i) => (
              <div key={i} className="bg-pink-50 rounded-lg shadow p-6 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-pink-100 border-2 border-pink-400 flex items-center justify-center rounded-full mx-auto mb-4">
                  <i className={`fa-solid ${item.icon} text-3xl text-pink-500`}></i>
                </div>
                <h3 className="font-bold text-lg text-[#491326] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex items-stretch justify-center">
            <img src={photo3} className="w-full h-full object-cover rounded-3xl min-h-[300px]" alt="" />
          </div>
          <div className="flex flex-col gap-6">
            {[
              { icon: "fa-pen-to-square", title: t.shareStory, desc: t.shareStoryDesc },
              { icon: "fa-hospital", title: t.hospitals, desc: t.hospitalsDesc },
            ].map((item, i) => (
              <div key={i} className="bg-pink-50 rounded-lg shadow p-6 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-pink-100 border-2 border-pink-400 flex items-center justify-center rounded-full mx-auto mb-4">
                  <i className={`fa-solid ${item.icon} text-3xl text-pink-500`}></i>
                </div>
                <h3 className="font-bold text-lg text-[#5B1B47]">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Button */}
      <div className="mx-auto text-center pb-16 px-6">
        <button type="button" className="text-white bg-[#5A3D58] hover:bg-[#4a3248] font-medium rounded-3xl text-sm px-8 py-3 transition-all duration-200">
          {t.joinButton}
        </button>
      </div>

    </div>
  );
}