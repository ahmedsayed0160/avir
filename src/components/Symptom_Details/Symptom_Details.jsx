import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext/LanguageContext';

const SymptomDetails = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    en: {
      header: "Symptom Details",
      warningBox: {
        title: "When to get medical help",
        items: [
          "Rapid increase in swelling size",
          "Severe pain or tenderness",
          "Skin color changes or warmth",
          "Fever or systemic symptoms"
        ]
      },
      sections: [
        { title: "Moderate Swelling – Tissue Changes", refImages: "Reference Images" },
        { title: "Nipple Changes", refImages: "Reference Images" },
        { title: "Skin Dimpling", refImages: "Reference Images" },
        { title: "Redness or Rash", refImages: "Reference Images" },
        { title: "Lump or Thickening", refImages: "Reference Images" }
      ],
      buttons: {
        proceed: "Proceed to Post-Diagnosis Support",
        back: "Back to All Symptoms"
      }
    },
    ar: {
      header: "تفاصيل الأعراض",
      warningBox: {
        title: "متى تطلبين المساعدة الطبية",
        items: [
          "زيادة سريعة في حجم التورم",
          "ألم شديد أو حساسية",
          "تغييرات في لون الجلد أو الدفء",
          "حمى أو أعراض جهازية"
        ]
      },
      sections: [
        { title: "تورم متوسط – تغييرات في الأنسجة", refImages: "الصور المرجعية" },
        { title: "تغييرات الحلمة", refImages: "الصور المرجعية" },
        { title: "تجعد الجلد", refImages: "الصور المرجعية" },
        { title: "الاحمرار أو الطفح", refImages: "الصور المرجعية" },
        { title: "كتلة أو تثخين", refImages: "الصور المرجعية" }
      ],
      buttons: {
        proceed: "المتابعة إلى الدعم ما بعد التشخيص",
        back: "العودة إلى جميع الأعراض"
      }
    }
  }[lang];

  const WarningBox = () => (
    <div className="hidden md:block md:ml-[200px]">
      <div className="w-[350px] h-[210px] bg-[#FEF2F2] border-[#FECACA] border-[1.5px] rounded-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] flex flex-col justify-center">
        <h2 className="text-[#7F1D1D] text-[20px] ml-[20px] font-bold">
          <i className="fa-solid fa-triangle-exclamation text-[#DC2626] mr-2"></i>
          {t.warningBox.title}
        </h2>
        <ul className="list-none text-[#991B1B] p-[5px_10px_10px_20px] font-medium leading-loose">
          {t.warningBox.items.map((item, index) => (
            <li key={index}><i className="fa-solid fa-circle text-[#DC2626] text-[8px] mr-[5px] ml-[20px]"></i> {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );

  // نسخة الموبايل من الـ WarningBox
  const WarningBoxMobile = () => (
    <div className="block md:hidden mx-4 mt-4">
      <div className="w-full bg-[#FEF2F2] border-[#FECACA] border-[1.5px] rounded-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] p-4">
        <h2 className="text-[#7F1D1D] text-[18px] font-bold mb-2">
          <i className="fa-solid fa-triangle-exclamation text-[#DC2626] mr-2"></i>
          {t.warningBox.title}
        </h2>
        <ul className="list-none text-[#991B1B] font-medium space-y-1">
          {t.warningBox.items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <i className="fa-solid fa-circle text-[#DC2626] text-[8px]"></i> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const ActionButtons = () => (
    <div className="flex flex-col sm:flex-row justify-center gap-4 py-6 px-4">
      <Link
        to="/support1"
        className="w-full sm:w-[350px] h-[40px] bg-[#E91E63] text-white border-none rounded-[10px] font-semibold text-[15px] cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.2)] flex items-center justify-center"
      >
        <i className="fa-solid fa-stethoscope mr-1"></i> {t.buttons.proceed}
      </Link>
      <button className="w-full sm:w-[250px] h-[40px] bg-white text-[#E91E63] border border-[#E91E63] rounded-[10px] font-semibold text-[15px] cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
        <i className="fa-solid fa-arrow-left mr-1"></i> {t.buttons.back}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-['Inter'] pt-6">
      {/* Header */}
      <header className="mt-0 w-full h-[60px] bg-[#FFD3E3] flex items-center">
        <button className="bg-[#FFD3E3] border-none ml-[15px] cursor-pointer">
          <i className="fa-solid fa-arrow-left text-[#E91E63]"></i>
        </button>
        <h1 className="m-auto ml-[10px] text-[#76072E] text-[1.5rem] font-bold">{t.header}</h1>
      </header>

      {/* Section 1 - Responsive (معدّل بس) */}
      <div className="w-full max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 w-full">
            <div className="relative w-full">
              <img src="images/ChatGPT Image Nov 22, 2025, 08_51_12 PM.png" alt="Main" className="w-full h-auto rounded-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" />
              <h2 className="absolute bottom-[10px] left-0 right-0 text-center text-[#76072E] font-semibold text-[18px] md:text-[22px]">
                {t.sections[0].title}
              </h2>
            </div>
            <div className="w-full shadow-[0_4px_8px_rgba(0,0,0,0.2)] rounded-[20px] mt-4 bg-white p-4">
              <h3 className="text-[#76072E] text-[20px] font-bold mb-3">{t.sections[0].refImages}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <img src="images/ChatGPT Image Jan 31, 2026, 12_31_43 PM.png" className="w-full h-[80px] sm:h-[100px] object-cover rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" alt="" />
                <img src="images/ds00632_im00877_br7_inflammatorythu_jpg.webp" className="w-full h-[80px] sm:h-[100px] object-cover rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" alt="" />
                <img src="images/24468.jpg" className="w-full h-[80px] sm:h-[100px] object-cover rounded-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" alt="" />
              </div>
            </div>
          </div>
          <WarningBox />
        </div>
        <WarningBoxMobile />
        <ActionButtons />
      </div>

      {/* Section 2 */}
      <div className="w-[80%] flex justify-evenly items-center m-auto py-10">
        <div className="w-[45%]">
          <div className="relative">
            <img src="images/Screenshot 2026-01-31 125655.png" alt="" className="w-[130%] h-full rounded-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" />
            <h2 className="absolute bottom-[10px] left-[20px] right-0 text-center text-[#76072E] font-semibold text-[22px] ml-[170px]">
              {t.sections[1].title}
            </h2>
          </div>
          <div className="w-[130%] shadow-[0_4px_8px_rgba(0,0,0,0.2)] rounded-[20px] mt-4 bg-white p-4">
            <h3 className="text-[#76072E] text-[20px] font-bold mb-3">{t.sections[1].refImages}</h3>
            <div className="flex items-center">
              <img src="images/large-nipple-inversion-grades.jpg" className="w-[95%] h-full object-cover rounded-[10px]" alt="" />
            </div>
          </div>
        </div>
        <WarningBox />
      </div>
      <WarningBoxMobile />
      <ActionButtons />

      {/* Section 3 */}
      <div className="w-[80%] flex justify-evenly items-center m-auto py-10">
        <div className="w-[45%]">
          <div className="relative">
            <img src="images/Screenshot (483).png" alt="" className="w-[130%] h-full rounded-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" />
            <h2 className="absolute bottom-[10px] left-[20px] right-0 text-center text-[#76072E] font-semibold text-[22px] ml-[170px]">
              {t.sections[2].title}
            </h2>
          </div>
        </div>
        <WarningBox />
      </div>
      <WarningBoxMobile />
      <ActionButtons />

      {/* Section 4 */}
      <div className="w-[80%] flex justify-evenly items-center m-auto py-10">
        <div className="w-[45%]">
          <div className="relative">
            <img src="images/Screenshot (484).png" alt="" className="w-[130%] h-full rounded-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" />
            <h2 className="absolute bottom-[10px] left-[20px] right-0 text-center text-[#76072E] font-semibold text-[22px] ml-[170px]">
              {t.sections[3].title}
            </h2>
          </div>
        </div>
        <WarningBox />
      </div>
      <WarningBoxMobile />
      <ActionButtons />

      {/* Section 5 */}
      <div className="w-[80%] flex justify-evenly items-center m-auto py-10">
        <div className="w-[45%]">
          <div className="relative">
            <img src="images/Screenshot (489).png" alt="" className="w-[130%] h-full rounded-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.2)]" />
            <h2 className="absolute bottom-[10px] left-[20px] right-0 text-center text-[#76072E] font-semibold text-[22px] ml-[170px]">
              {t.sections[4].title}
            </h2>
          </div>
        </div>
        <WarningBox />
      </div>
      <WarningBoxMobile />
      <ActionButtons />
    </div>
  );
};

export default SymptomDetails;
