import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../LanguageContext/LanguageContext'

export default function AwarenessPage1() {
  const { lang } = useLanguage()
  
  // Refs for videos
  const video1Ref = useRef(null)
  const video2Ref = useRef(null)

  const playVideo = (videoRef) => {
    if (videoRef.current) {
      videoRef.current.play()
      // Scroll to video
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const t = {
    en: {
      heroTitle: "Breast Cancer Awareness & Education",
      heroDesc: "Empowering women with knowledge, early detection methods, and prevention strategies to fight breast cancer",
      checkNow: "check now",
      whatIsTitle: "What is Breast Cancer?",
      whatIsDesc: "Breast cancer is a disease in which cells in the breast grow out of control. It can start in different parts of the breast and has various types that require different treatment approaches.",
      commonTypes: "Common Types",
      type1: "Invasive Lobular Carcinoma (ILC)",
      type2: "Ductal Carcinoma in Situ (DCIS)",
      type3: "Invasive Ductal Carcinoma (IDC)",
      understandingTitle: "Understanding Breast Cancer",
      statistics: "Statistics",
      statisticsDesc: "Breast cancer is the most common cancer worldwide, accounting for 1 in 12 women over the course of their lifetime",
      earlyDetection: "Early Detection",
      earlyDetectionDesc: "Regular mammograms and self-exams can detect breast cancer early, when it's most treatable",
      warningSigns: "Warning Signs",
      warningSignsDesc: "Lumps, skin changes, nipple discharge, or persistent pain should be checked by a healthcare professional.",
      prevention: "Prevention",
      preventionDesc: "Healthy lifestyle, regular exercise, and limiting alcohol can help reduce breast cancer risk.",
      symptomsTitle: "Recognizing Symptoms",
      symptom1: "New lump in breast or underarm",
      symptom2: "Irritation or dimpling of breast skin",
      symptom3: "Nipple discharge other than breast milk",
      symptom4: "Pain in any area of breast",
      symptom5: "Thickening or swelling of breast",
      symptom6: "Redness or flaky skin in nipple area",
      symptom7: "Any change in size or shape of breast",
      important: "Important:",
      importantNote: "Lumps, skin changes, nipple discharge, or persistent pain should be checked by a healthcare professional.",
      resourcesTitle: "Educational Resources",
      video1Title: "Understanding Early Detection",
      video1Desc: "Learn about the importance of regular screenings and self-exams",
      video2Title: "Global Statistics & Awareness",
      video2Desc: "Comprehensive data on breast cancer prevalence worldwide",
      watchNow: "watch now",
      goToAwareness: "GO TO Awareness"
    },
    ar: {
      heroTitle: "التوعية والتثقيف حول سرطان الثدي",
      heroDesc: "تمكين النساء بالمعرفة، وطرق الاكتشاف المبكر، واستراتيجيات الوقاية لمكافحة سرطان الثدي",
      checkNow: "افحصي الآن",
      whatIsTitle: "ما هو سرطان الثدي؟",
      whatIsDesc: "سرطان الثدي هو مرض تتكاثر فيه خلايا الثدي بشكل غير طبيعي. يمكن أن يبدأ في أجزاء مختلفة من الثدي وله أنواع متعددة تتطلب طرق علاج مختلفة.",
      commonTypes: "الأنواع الشائعة",
      type1: "سرطان الفص الغازي (ILC)",
      type2: "سرطان القنوات الموضعي (DCIS)",
      type3: "سرطان القنوات الغازي (IDC)",
      understandingTitle: "فهم سرطان الثدي",
      statistics: "الإحصائيات",
      statisticsDesc: "سرطان الثدي هو أكثر أنواع السرطان شيوعاً في العالم، ويصيب 1 من كل 12 امرأة خلال حياتهن",
      earlyDetection: "الاكتشاف المبكر",
      earlyDetectionDesc: "الفحوصات المنتظمة والفحص الذاتي يمكن أن يكتشفا سرطان الثدي مبكراً، عندما يكون أكثر قابلية للعلاج",
      warningSigns: "علامات التحذير",
      warningSignsDesc: "يجب فحص الكتل، وتغيرات الجلد، وإفرازات الحلمة، أو الألم المستمر من قبل أخصائي رعاية صحية.",
      prevention: "الوقاية",
      preventionDesc: "نمط الحياة الصحي، والتمارين الرياضية المنتظمة، والحد من الكحول يمكن أن يساعد في تقليل خطر سرطان الثدي.",
      symptomsTitle: "التعرف على الأعراض",
      symptom1: "كتلة جديدة في الثدي أو الإبط",
      symptom2: "تهيج أو تغضن جلد الثدي",
      symptom3: "إفرازات من الحلمة غير حليب الثدي",
      symptom4: "ألم في أي منطقة من الثدي",
      symptom5: "تثخن أو تورم الثدي",
      symptom6: "احمرار أو تقشر الجلد في منطقة الحلمة",
      symptom7: "أي تغير في حجم أو شكل الثدي",
      important: "مهم:",
      importantNote: "يجب فحص الكتل، وتغيرات الجلد، وإفرازات الحلمة، أو الألم المستمر من قبل أخصائي رعاية صحية.",
      resourcesTitle: "الموارد التعليمية",
      video1Title: "فهم الاكتشاف المبكر",
      video1Desc: "تعرفي على أهمية الفحوصات المنتظمة والفحص الذاتي",
      video2Title: "الإحصائيات العالمية والتوعية",
      video2Desc: "بيانات شاملة حول انتشار سرطان الثدي في العالم",
      watchNow: "شاهدي الآن",
      goToAwareness: "اذهب إلى التوعية"
    }
  }[lang]

  return (
    <main className="font-sans text-slate-800">

      {/* Hero */}
      <section className="w-full min-h-screen bg-[#F7D9E4] flex items-center px-6 md:px-16 py-24">
        <div className="max-w-3xl mx-auto lg:mx-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-[#491326] font-serif">
            {t.heroTitle}
          </h1>
          <p className="mt-6 text-base md:text-xl font-light leading-relaxed text-slate-700">
            {t.heroDesc}
          </p>
          <button className="mt-10 px-8 py-4 rounded-full bg-[#E91E63] text-white text-base md:text-lg shadow-lg transition-transform duration-200 hover:scale-95 hover:bg-[#c21750] capitalize">
            {t.checkNow}
          </button>
        </div>
      </section>

      {/* What is Breast Cancer */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#491326]">{t.whatIsTitle}</h2>
          <p className="mt-6 text-base md:text-xl text-[#4B5563] leading-relaxed">{t.whatIsDesc}</p>

          <div className="mt-10 rounded-lg p-6" style={{ background: "linear-gradient(90deg,#dbeafe 0%, #FCE7F3 100%)" }}>
            <h3 className="text-xl font-bold mb-6 text-left">{t.commonTypes}</h3>
            <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
              {[
                { icon: "fa-circle-dot", bg: "bg-[#FCE7F3]", color: "text-[#DB2777]", label: t.type1 },
                { icon: "fa-expand", bg: "bg-[#DBEAFE]", color: "text-[#2563EB]", label: t.type2 },
                { icon: "fa-shield-halved", bg: "bg-[#DCFCE7]", color: "text-[#16A34A]", label: t.type3 },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-lg p-4 flex-1 min-w-[160px]">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.bg} ${item.color} text-xl mb-4`}>
                    <i className={`fa-solid ${item.icon}`} />
                  </div>
                  <p className="font-bold text-sm text-left">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Understanding */}
      <section className="bg-[#FFF9FB] py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#491326]">{t.understandingTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {[
              { icon: "fa-chart-line", title: t.statistics, desc: t.statisticsDesc },
              { icon: "fa-magnifying-glass", title: t.earlyDetection, desc: t.earlyDetectionDesc },
              { icon: "fa-triangle-exclamation", title: t.warningSigns, desc: t.warningSignsDesc },
              { icon: "fa-heart-circle-check", title: t.prevention, desc: t.preventionDesc },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-left">
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#FBEDF2] text-[#ab0e42] text-2xl mb-6">
                  <i className={`fa-solid ${item.icon}`} />
                </div>
                <h3 className="text-[#76072E] text-xl font-bold">{item.title}</h3>
                <p className="text-[#5A3D58] mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Symptoms */}
      <section className="py-16 md:py-24 px-6" style={{ background: "linear-gradient(135deg,#FAF5FF 0%, #FDF2F8 100%)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-center text-2xl md:text-3xl text-[#491326] mb-12">{t.symptomsTitle}</h2>
          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-md">
            <div className="flex flex-col md:flex-row gap-8">
              <ul className="list-disc pl-5 space-y-4 text-[#374151] flex-1">
                <li>{t.symptom1}</li><li>{t.symptom2}</li><li>{t.symptom3}</li><li>{t.symptom4}</li>
              </ul>
              <ul className="list-disc pl-5 space-y-4 text-[#374151] flex-1">
                <li>{t.symptom5}</li><li>{t.symptom6}</li><li>{t.symptom7}</li>
              </ul>
            </div>
            <div className="mt-8 relative bg-[#FEFCE8] p-6 pl-12 rounded-lg border-l-4 border-[#FACC15]">
              <i className="fa-solid fa-triangle-exclamation absolute left-4 top-6 text-[#CA8A04] text-xl"></i>
              <span className="text-[#374151] leading-6"><strong>{t.important}</strong> {t.importantNote}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Resources - WITH VIDEOS */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl text-[#76072E] mb-10 font-bold">{t.resourcesTitle}</h2>
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Video 1: Early Detection */}
            <div className="flex-1">
              <div className="border border-[#FA90B5] rounded-lg overflow-hidden bg-black">
                <video 
                  ref={video1Ref}
                  controls 
                  className="w-full h-[250px] object-contain"
                  preload="metadata"
                >
                  <source src="/videos/early-detection.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-6 bg-white">
                  <h3 className="text-[#B1476C] text-lg font-semibold mb-2">{t.video1Title}</h3>
                  <p className="text-[#374151]">{t.video1Desc}</p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button 
                  onClick={() => playVideo(video1Ref)}
                  className="group px-9 py-4 border border-[#FA90B5] rounded-2xl hover:bg-[#B1476C] transition hover:scale-90 cursor-pointer"
                >
                  <span className="text-[#B1476C] font-bold group-hover:text-white transition flex items-center gap-2">
                    <i className="fa-solid fa-play"></i> {t.watchNow}
                  </span>
                </button>
              </div>
            </div>

            {/* Video 2: Statistics */}
            <div className="flex-1">
              <div className="border border-[#FA90B5] rounded-lg overflow-hidden bg-black">
                <video 
                  ref={video2Ref}
                  controls 
                  className="w-full h-[250px] object-contain"
                  preload="metadata"
                >
                  <source src="/videos/statistics-2025.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-6 bg-white">
                  <h3 className="text-[#B1476C] text-lg font-semibold mb-2">{t.video2Title}</h3>
                  <p className="text-[#374151]">{t.video2Desc}</p>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button 
                  onClick={() => playVideo(video2Ref)}
                  className="group px-9 py-4 border border-[#FA90B5] rounded-2xl hover:bg-[#B1476C] transition hover:scale-90 cursor-pointer"
                >
                  <span className="text-[#B1476C] font-bold group-hover:text-white transition flex items-center gap-2">
                    <i className="fa-solid fa-play"></i> {t.watchNow}
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Go to Awareness2 */}
      <section className="py-16 flex justify-center px-6">
        <Link to="/awarenss2" className="bg-[#5A3D58] hover:bg-[#4a3248] text-white font-bold py-4 px-12 rounded-full shadow-lg transition-all duration-300 hover:scale-105 text-center text-lg">
          {t.goToAwareness}
        </Link>
      </section>

    </main>
  )
}