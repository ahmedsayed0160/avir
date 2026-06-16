import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext/LanguageContext';

const SelfExamination = () => {
  const videoRef = useRef(null);
  const { lang } = useLanguage();

  const t = {
    en: {
      header: { title: "Self-Examination", subtitle: "Follow this 5-step guide to check yourself every month." },
      steps: ["Examine your breasts in a mirror with hands on hips","Raise arms and examine your breasts","Look for signs of breast fluid","Feel for breast lumps while lying down","Feel your breasts for lumps while standing or sitting"],
      step1: { title: "Mirror Examination - Hands on Hips", lookFor: "Look for:", normal: ["Normal size, shape, and color","No visible swelling"], warning: "Warning signs:", warnings: ["Dimpling or puckering","Inverted nipple","Redness or rash"] },
      step2: { title: "Mirror Examination - Arms Raised", description: "Raise your arms above your head and look for the same changes as in Step 1.", tip: "This position helps reveal any changes in breast shape or skin texture." },
      step3: { title: "Check for Nipple Discharge", description: "Gently squeeze each nipple to check for any discharge.", types: "Types of discharge to watch for:", dischargeTypes: ["Watery","Milky","Yellow","Bloody"] },
      step4: {
        title: "Feel for breast lumps while lying down",
        subtitle: "This position allows your breast tissue to spread evenly over your chest wall.",
        position: { title: "Position", items: ["Lie down on your back with a pillow under your right shoulder.","Put your right arm behind your head.","This position makes it easier to examine all breast tissue."] },
        movement: { title: "Movement", items: ["Use the finger pads of your left hand to examine your right breast.","Move in small circular motions, about the size of a coin.","Follow a systematic pattern to cover the entire breast area."] },
        pressure: { title: "Pressure Levels", items: ["Light pressure: Feel tissue closest to the skin surface.","Medium pressure: Feel for tissue in the middle of your breast.","Firm pressure: Feel for tissue closest to the chest and ribs."] },
        tips: { title: "Important Tips", items: ["Repeat the same process for your left breast using your right hand","Take your time - a thorough examination takes 10-15 minutes","Don't forget the area under your arms and up to your collarbone"] }
      },
      step5: { title: "Feel Breasts While Standing", items: ["Repeat the same examination while standing or sitting, such as in the shower.","Use the same circular motions and pressure variations as in Step 4."], tip: "Many women find it easier to examine their breasts when their skin is wet and soapy." },
      video: { title: "Educational Resources", button: "Watch Now", unsupported: "Your browser does not support the video tag" },
      assessment: {
        title: "Assessment Complete", question: "Did you notice any lumps or changes during your examination?",
        yes: "Yes, I noticed changes", no: "No changes detected",
        aiChat: { title: "We recommend doing a detailed assessment.", subtitle: "Let our AI guide you through a comprehensive check.", button: "Go to Chatbot" },
        reminder: { title: "Keep doing your self-exam every month.", subtitle: "You're on the right track with regular check-ups!", button: "Set Monthly Reminder" }
      }
    },
    ar: {
      header: { title: "الفحص الذاتي", subtitle: "اتبع هذا الدليل المكون من 5 خطوات لفحص نفسك كل شهر." },
      steps: ["افحصي ثدييك في المرآة مع وضع اليدين على الوركين","ارفعي ذراعيك وافحصي ثدييك","ابحثي عن علامات إفراز الثدي","ابحثي عن كتل الثدي أثناء الاستلقاء","افحصي ثدييك بحثًا عن كتل أثناء الوقوف"],
      step1: { title: "الفحص بالمرآة - اليدين على الوركين", lookFor: "ابحثي عن:", normal: ["الحجم والشكل واللون الطبيعي","عدم وجود تورم واضح"], warning: "علامات التحذير:", warnings: ["التجعد أو التجعد","حلمة مقلوبة","احمرار أو طفح جلدي"] },
      step2: { title: "الفحص بالمرآة - رفع الذراعين", description: "ارفعي ذراعيك فوق رأسك وابحثي عن نفس التغييرات.", tip: "تساعد هذه الوضعية في الكشف عن أي تغييرات في شكل الثدي." },
      step3: { title: "التحقق من إفراز الحلمة", description: "اضغطي بلطف على كل حلمة للتحقق من وجود أي إفرازات.", types: "أنواع الإفرازات:", dischargeTypes: ["مائي","حليبي","أصفر","دموي"] },
      step4: {
        title: "الشعور بكتل الثدي أثناء الاستلقاء", subtitle: "تتيح هذه الوضعية لأنسجة الثدي الانتشار بشكل متساوٍ.",
        position: { title: "الوضعية", items: ["استلقي على ظهرك مع وضع وسادة تحت كتفك الأيمن.","ضعي ذراعك اليمنى خلف رأسك.","تجعل هذه الوضعية من الأسهل فحص الثدي."] },
        movement: { title: "الحركة", items: ["استخدمي بطانات أصابع يدك اليسرى لفحص ثديك الأيمن.","تحركي بحركات دائرية صغيرة.","اتبعي نمطًا منظمًا لتغطية منطقة الثدي."] },
        pressure: { title: "مستويات الضغط", items: ["ضغط خفيف: اشعري بالأنسجة الأقرب إلى سطح الجلد.","ضغط متوسط: اشعري بالأنسجة في منتصف ثديك.","ضغط قوي: اشعري بالأنسجة الأقرب إلى الصدر."] },
        tips: { title: "نصائح مهمة", items: ["كرري نفس العملية لثديك الأيسر","خذي وقتك - يستغرق الفحص 10-15 دقيقة","لا تنسي منطقة تحت ذراعيك"] }
      },
      step5: { title: "الفحص أثناء الوقوف", items: ["كرري نفس الفحص أثناء الوقوف أو الجلوس.","استخدمي نفس الحركات الدائرية."], tip: "تجد العديد من النساء أنه من الأسهل فحص ثديهن عندما يكون جلدهن رطبًا." },
      video: { title: "الموارد التعليمية", button: "شاهد الآن", unsupported: "متصفحك لا يدعم علامة الفيديو" },
      assessment: {
        title: "اكتمل التقييم", question: "هل لاحظتِ أي كتل أو تغييرات أثناء فحصك؟",
        yes: "نعم، لاحظت تغييرات", no: "لم يتم اكتشاف تغييرات",
        aiChat: { title: "نوصي بإجراء تقييم مفصل.", subtitle: "دعي الذكاء الاصطناعي يرشدك.", button: "اذهب إلى الروبوت المحادث" },
        reminder: { title: "استمري في إجراء الفحص الذاتي كل شهر.", subtitle: "أنت على المسار الصحيح!", button: "تعيين تذكير شهري" }
      }
    }
  }[lang];

  const handleWatchNow = () => {
    if (videoRef.current) { videoRef.current.play(); videoRef.current.scrollIntoView({ behavior: 'smooth' }); }
  };

  const StepCard = ({ num, children }) => (
    <div className="w-full bg-[#FFF8F8] rounded-2xl shadow-md p-6 md:p-10">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#E91E63] flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">{num}</span>
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="font-[Inter] py-24 px-4 md:px-8">

      {/* Header */}
      <div className="bg-[#FEF2F2] py-10 px-6 rounded-2xl mb-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl text-[#491326] font-bold mb-3">{t.header.title}</h1>
          <p className="text-[#4B5563] text-base md:text-lg">{t.header.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {t.steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#e91e63] bg-white flex items-center justify-center shadow mb-3">
                <span className="text-2xl text-[#DB2777] font-bold">{i + 1}</span>
              </div>
              <p className="text-sm text-[#491326]">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Step 1 */}
        <div className="bg-[#FFF8F8] rounded-2xl shadow-md p-6 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#E91E63] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <h3 className="text-xl font-bold text-[#491326]">{t.step1.title}</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="font-bold text-[#491326] mb-2">{t.step1.lookFor}</p>
              <ul className="space-y-2 mb-4">
                {t.step1.normal.map((item, i) => <li key={i} className="text-[#4B5563] flex gap-2"><i className="fa-solid fa-check text-[#22C55E]"></i>{item}</li>)}
              </ul>
              <p className="font-bold text-[#DC2626] mb-2">{t.step1.warning}</p>
              <ul className="space-y-2">
                {t.step1.warnings.map((item, i) => <li key={i} className="text-[#4B5563] flex gap-2"><i className="fa-solid fa-triangle-exclamation text-[#EF4444]"></i>{item}</li>)}
              </ul>
            </div>
            <img src="/images/ChatGPT Image Oct 2, 2025, 12_01_46 AM.png" alt="Step 1" className="w-full md:w-64 h-52 rounded-2xl object-cover shadow" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#FFF8F8] rounded-2xl shadow-md p-6 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#E91E63] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <h3 className="text-xl font-bold text-[#491326]">{t.step2.title}</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-[#4B5563] mb-4">{t.step2.description}</p>
              <div className="bg-[#EFF6FF] p-4 rounded-lg text-[#1E40AF] text-sm">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>{t.step2.tip}
              </div>
            </div>
            <img src="/images/ChatGPT Image Oct 3, 2025, 01_11_32 AM.png" alt="Step 2" className="w-full md:w-64 h-52 rounded-2xl object-cover shadow" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#FFF8F8] rounded-2xl shadow-md p-6 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#E91E63] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <h3 className="text-xl font-bold text-[#491326]">{t.step3.title}</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-[#4B5563] mb-4">{t.step3.description}</p>
              <p className="font-bold text-[#491326] mb-3">{t.step3.types}</p>
              <ul className="space-y-2">
                {t.step3.dischargeTypes.map((type, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#4B5563]">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: ['#60A5FA','#E5E7EB','#FACC15','#EF4444'][i] }}></span>
                    {type}
                  </li>
                ))}
              </ul>
            </div>
            <img src="/images/ChatGPT Image Oct 3, 2025, 01_53_20 AM.png" alt="Step 3" className="w-full md:w-64 h-52 rounded-2xl object-cover shadow" />
          </div>
        </div>
      </div>

      {/* Step 4 */}
      <section className="py-12 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-[#E91E63] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">4</span>
          </div>
          <h2 className="text-2xl font-bold text-[#491326]">{t.step4.title}</h2>
          <p className="text-[#4B5563] mt-2">{t.step4.subtitle}</p>
        </div>
        <img src="/images/ChatGPT Image Oct 3, 2025, 02_16_42 AM.png" alt="Step 4" className="w-full max-w-lg mx-auto rounded-2xl object-cover shadow mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {[t.step4.position, t.step4.movement, t.step4.pressure].map((section, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-5">
              <h3 className="text-[#491326] font-bold mb-3">{section.title}</h3>
              <ul className="text-[#4B5563] text-sm space-y-3">
                {section.items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/(Light pressure:|Medium pressure:|Firm pressure:|ضغط خفيف:|ضغط متوسط:|ضغط قوي:)/, '<span class="font-bold">$1</span>') }}></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-white to-[#fbe7e9] p-6 rounded-2xl max-w-2xl mx-auto">
          <h3 className="text-[#491326] font-bold text-lg mb-4">{t.step4.tips.title}</h3>
          <ul className="space-y-2">
            {t.step4.tips.items.map((item, i) => <li key={i} className="text-[#4B5563] flex gap-2"><i className="fa-solid fa-check text-[#E91E63]"></i>{item}</li>)}
          </ul>
        </div>
      </section>

      {/* Step 5 */}
      <section className="max-w-4xl mx-auto bg-[#FFF8F8] rounded-2xl shadow-md p-6 md:p-10 my-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-[#E91E63] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl">5</span>
          </div>
          <h3 className="text-xl font-bold text-[#491326]">{t.step5.title}</h3>
        </div>
        <ul className="text-[#4B5563] space-y-3 mb-6">
          {t.step5.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div className="bg-[#F0FDF4] p-4 text-[#166534] text-sm rounded-lg w-full md:w-1/2">
          <i className="fa-solid fa-droplet mr-2"></i>{t.step5.tip}
        </div>
      </section>

      {/* Video */}
      <section className="py-12 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl text-[#491326] font-bold text-center mb-8">{t.video.title}</h2>
        <video ref={videoRef} controls className="w-full rounded-2xl shadow-lg">
          <source src="/videos/self exam .mp4" type="video/mp4" />{t.video.unsupported}
        </video>
        <button onClick={handleWatchNow} className="w-48 h-14 block mx-auto mt-6 bg-white border-2 border-[#FA90B5] rounded-full text-[#C03F6C] font-bold hover:bg-[#FA90B5] hover:text-white transition-all duration-300">
          {t.video.button}
        </button>
      </section>

      {/* Assessment */}
      <section className="max-w-4xl mx-auto pb-16">
        <div className="bg-[#FCE7F3] rounded-2xl p-6 md:p-10 text-center">
          <h2 className="text-2xl font-bold text-[#491326] mb-3">{t.assessment.title}</h2>
          <p className="text-[#4B5563] text-lg mb-8">{t.assessment.question}</p>
          <div className="flex justify-center gap-8 mb-10">
            {[{ id: "yes", label: t.assessment.yes }, { id: "no", label: t.assessment.no }].map((r) => (
              <div key={r.id} className="flex items-center gap-2">
                <input type="radio" id={r.id} name="assessment" className="w-4 h-4 accent-[#E91E63]" />
                <label htmlFor={r.id} className="text-base cursor-pointer">{r.label}</label>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-around gap-6">
            <div className="flex flex-col items-start w-full md:w-auto">
              <div className="bg-[#FEF2F2] border-2 border-[#FED7AA] rounded-2xl p-5 text-left w-full">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFEDD5] flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-triangle-exclamation text-[#EA580C]"></i>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.assessment.aiChat.title}</p>
                    <p className="text-xs text-[#4B5563]">{t.assessment.aiChat.subtitle}</p>
                  </div>
                </div>
              </div>
              <Link to="/chatbot" className="mt-4 bg-[#EA580C] text-white rounded-xl font-bold px-6 py-3 flex items-center gap-2 hover:opacity-90 transition shadow-lg">
                <i className="fa-solid fa-robot"></i> {t.assessment.aiChat.button}
              </Link>
            </div>
            <div className="flex flex-col items-start w-full md:w-auto">
              <div className="bg-[#ECFDF5] border-2 border-[#BBF7D0] rounded-2xl p-5 text-left w-full">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-circle-check text-[#059669]"></i>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.assessment.reminder.title}</p>
                    <p className="text-xs text-[#4B5563]">{t.assessment.reminder.subtitle}</p>
                  </div>
                </div>
              </div>
              <Link to="/awarenss4" className="mt-4 bg-[#16A34A] text-white rounded-xl font-bold px-6 py-3 flex items-center gap-2 hover:opacity-90 transition shadow-lg">
                <i className="fa-solid fa-calendar-plus"></i> {t.assessment.reminder.button}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SelfExamination;