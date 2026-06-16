import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../LanguageContext/LanguageContext';

export default function VisualGuide() {
  const { lang } = useLanguage();

  const t = {
    en: {
      title: "Visual Reference & Diagnosis Guidance",
      subtitle: "Select a primary symptom category to explore medically referenced visuals and guidance.",
      howItWorks: {
        title: "How It Works",
        steps: [
          { icon: "fa-hand-pointer", color: "bg-[#E0E7FF] text-[#4F46E5]", title: "Choose a Category", description: "Select the symptom category that best matches your concern" },
          { icon: "fa-images", color: "bg-[#F3E8FF] text-[#9333EA]", title: "Compare Visuals", description: "Review medically referenced images and detailed descriptions" },
          { icon: "fa-notes-medical", color: "bg-[#FCE7F3] text-[#DB2777]", title: "Save & Proceed", description: "Add your notes and continue to personalized guidance" }
        ]
      },
      selectSymptom: "Select Primary Symptom Category",
      cards: [
        { icon: "fa-droplet", color: "bg-[#DBEAFE] text-[#2563EB]", title: "Swelling", description: "Changes in size, fullness, or localized expansion" },
        { icon: "fa-circle-dot", color: "bg-[#FFE4E6] text-[#E11D48]", title: "Nipple Changes", description: "Alterations in shape, position, or appearance" },
        { icon: "fa-circle-question", color: "bg-[#FEF3C7] text-[#D97706]", title: "Skin Dimpling", description: "Indentations, puckering, or surface irregularities" },
        { icon: "fa-fire", color: "bg-[#FEE2E2] text-[#DC2626]", title: "Redness or Rash", description: "Color changes, irritation, or inflamed areas" },
        { icon: "fa-circle", color: "bg-[#F3E8FF] text-[#9333EA]", title: "Lump or Thickening", description: "Firm spots, masses, or localized density changes" }
      ],
      notes: { title: "Add Personal Notes or Observations", placeholder: "Write any notes you want to remember...", autoSaved: "Notes auto-saved" },
      button: "Proceed to Visual Catalog"
    },
    ar: {
      title: "المرجع البصري والإرشاد التشخيصي",
      subtitle: "اختيار فئة الأعراض الأساسية لاستكشاف المراجع البصرية الطبية والإرشادات.",
      howItWorks: {
        title: "كيف يعمل",
        steps: [
          { icon: "fa-hand-pointer", color: "bg-[#E0E7FF] text-[#4F46E5]", title: "اختيار الفئة", description: "اختيار فئة الأعراض التي تتطابق بشكل أفضل مع قلقك" },
          { icon: "fa-images", color: "bg-[#F3E8FF] text-[#9333EA]", title: "مقارنة الصور", description: "مراجعة الصور المرجعية طبياً والأوصاف التفصيلية" },
          { icon: "fa-notes-medical", color: "bg-[#FCE7F3] text-[#DB2777]", title: "حفظ والمتابعة", description: "إضافة ملاحظاتك والمتابعة إلى الإرشادات الشخصية" }
        ]
      },
      selectSymptom: "اختيار فئة الأعراض الأساسية",
      cards: [
        { icon: "fa-droplet", color: "bg-[#DBEAFE] text-[#2563EB]", title: "التورم", description: "تغييرات في الحجم، الامتلاء، أو التوسع الموضعي" },
        { icon: "fa-circle-dot", color: "bg-[#FFE4E6] text-[#E11D48]", title: "تغييرات الحلمة", description: "تغييرات في الشكل، الموضع، أو المظهر" },
        { icon: "fa-circle-question", color: "bg-[#FEF3C7] text-[#D97706]", title: "تجعد الجلد", description: "انخفاضات، تجعد، أو عيوب سطحية" },
        { icon: "fa-fire", color: "bg-[#FEE2E2] text-[#DC2626]", title: "الاحمرار أو الطفح", description: "تغييرات في اللون، التهيج، أو المناطق الملتهبة" },
        { icon: "fa-circle", color: "bg-[#F3E8FF] text-[#9333EA]", title: "كتلة أو تثخين", description: "بقع صلبة، كتل، أو تغييرات كثافة موضعية" }
      ],
      notes: { title: "إضافة ملاحظات شخصية", placeholder: "اكتبي أي ملاحظات تريدين تذكرها...", autoSaved: "تم حفظ الملاحظات تلقائياً" },
      button: "المتابعة إلى الكتالوج البصري"
    }
  }[lang];

  return (
    <div className="font-[Inter] min-h-screen pt-20 px-4 md:px-8" style={{ background: "radial-gradient(circle at top left, #f9e0eb 0%, transparent 40%), radial-gradient(circle at bottom right, #FFD3E3 0%, transparent 40%), white" }}>

      <h1 className="text-2xl md:text-4xl text-[#491326] text-center mt-10 font-semibold px-4">{t.title}</h1>
      <h3 className="text-base md:text-xl text-[#491326] text-center mt-4 font-medium px-4">{t.subtitle}</h3>

      {/* How it works */}
      <div className="bg-white rounded-2xl shadow-md max-w-4xl mx-auto p-6 mt-10">
        <h1 className="text-xl md:text-2xl text-[#491326] text-center mb-8">{t.howItWorks.title}</h1>
        <div className="flex flex-col sm:flex-row justify-center items-start text-center gap-8 py-4">
          {t.howItWorks.steps.map((step, i) => (
            <div key={i} className="flex-1">
              <div className={`w-14 h-14 ${step.color} text-2xl rounded-full flex items-center justify-center mx-auto shadow`}>
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <h2 className="text-base text-[#491326] mt-4 font-semibold">{step.title}</h2>
              <p className="text-[#4B5563] mt-2 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <h1 className="text-xl md:text-2xl text-[#491326] font-semibold mt-16 mb-6 max-w-5xl mx-auto px-2">{t.selectSymptom}</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {t.cards.map((card, i) => (
          <Link key={i} to="/symptom_details" className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-transform duration-200 block">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color} text-xl shadow mb-4`}>
              <i className={`fa-solid ${card.icon}`}></i>
            </div>
            <h2 className="text-lg text-[#491326] font-semibold">{card.title}</h2>
            <p className="text-[#4B5563] mt-2 text-sm">{card.description}</p>
          </Link>
        ))}
      </div>

      {/* Notes */}
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-md mb-8">
        <h3 className="text-[#5d1a2a] text-lg mb-4">{t.notes.title}</h3>
        <textarea placeholder={t.notes.placeholder} className="w-full h-[120px] border border-[#ADAEBC] rounded-xl p-4 text-sm outline-none resize-none" />
        <div className="flex items-center text-gray-500 text-sm mt-3 gap-2">
          <i className="fa-solid fa-circle-check text-[#22C55E]"></i>
          {t.notes.autoSaved}
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center pb-12">
        <Link to="/symptom_details" className="bg-[#e91e63] text-white py-3 px-8 rounded-xl text-base flex items-center gap-2 hover:bg-[#c2185b] transition-all shadow">
          {t.button} <span>→</span>
        </Link>
      </div>
    </div>
  );
}