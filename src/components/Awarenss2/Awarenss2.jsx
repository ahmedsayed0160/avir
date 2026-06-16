import React from 'react'
import { useLanguage } from '../LanguageContext/LanguageContext'
import photo1 from "../../../public/ChatGPT Image Sep 27, 2025, 12_55_39 AM.png"

export default function Awarenss2() {
  const { lang } = useLanguage()

  const t = {
    en: {
      whatIsTitle: "What is Breast Cancer?",
      whatIsDesc: "To catch breast cancer early, it helps to know how it starts and how cancer cells act differently from normal ones",
      normalCells: "Normal Cells",
      normalCell1: "Grow and divide in controlled manner", normalCell2: "Die when damaged or old",
      normalCell3: "Stay in designated areas", normalCell4: "Respond to body's signals",
      cancerCells: "Cancer Cells",
      cancerCell1: "Grow and divide uncontrollably", cancerCell2: "Don't die when they should",
      cancerCell3: "Invade nearby tissues", cancerCell4: "Ignore body's stop signals",
      cellProcess: "Cell Development Process",
      cellProcessDesc: "Here is a simple illustration showing how healthy cells can turn into cancer cells after genetic changes.",
      whereStart: "Where It Starts",
      whereStartDesc: "Knowing the parts of the breast helps us see where cancer usually begins.",
      lobules: "Lobules", lobulesDesc: "Milk-producing glands where lobular cancers typically start. These are the functional units of the breast.",
      ducts: "Ducts", ductsDesc: "Tubes that carry milk from lobules to the nipple. Most breast cancers (about 80%) begin in the ducts.",
      stromal: "Stromal Tissues", stromalDesc: "Supportive tissues including fatty and fibrous connective tissue, blood vessels, and lymph vessels.",
      typesTitle: "Types of Breast Cancer", typesDesc: "Different types of breast cancer have unique characteristics and treatment approaches.",
      idc: "IDC", idcFull: "Invasive Ductal Carcinoma", idcDesc: "The most common type, accounting for 80% of all breast cancers.", idcFacts: "Key Facts:", idcFact1: "Most treatable when caught early",
      ilc: "ILC", ilcFull: "Invasive Lobular Carcinoma", ilcDesc: "Second most common type, starts in lobules. Grows in single-file pattern.", ilcFacts: "Key Facts:", ilcFact1: "10-15% of cases, often hormone-receptor positive",
      dcis: "DCIS", dcisFull: "Ductal Carcinoma In Situ", dcisDesc: "Non-invasive cancer confined to milk ducts. Considered 'pre-cancer'.", dcisFacts: "Key Facts:", dcisFact1: "Nearly 100% survival rate, may progress if untreated",
      idcSpotlight: "IDC Spotlight", idcSpotlightDesc: "Understanding the most common form of breast cancer and its warning signs.",
      symptoms: "Common Symptoms",
      lump: "Breast Lump", lumpDesc: "Hard, irregular lump that doesn't move",
      skinChanges: "Skin Changes", skinDesc: "Dimpling, puckering, or redness",
      sizeChange: "Size Change", sizeDesc: "One breast larger than the other",
      discharge: "Discharge", dischargeDesc: "Unusual nipple discharge",
      idcFactsTitle: "Key Facts About IDC",
      idcFact2: "Accounts for 80% of all breast cancer diagnoses",
      idcFact3: "5-year survival rate is 98% when caught early",
      idcFact4: "Can spread to lymph nodes and other organs",
      idcFact5: "Treatment options include surgery, chemo, radiation",
      riskFactors: "Risk Factors", age: "Age", genetics: "Genetics", hormones: "Hormones", lifestyle: "Lifestyle",
      statsTitle: "Global Statistics & Impact", statsDesc: "Understanding the worldwide impact of breast cancer helps drive awareness.",
      newCases: "New Cases Annually", newCasesNum: "2.3M", newCasesDesc: "Diagnosed worldwide each year",
      deaths: "Deaths Annually", deathsNum: "670K", deathsDesc: "Lives lost to breast cancer",
      affected: "Women Affected", affectedNum: "1 in 2", affectedDesc: "Will develop breast cancer",
      preventionTitle: "Prevention & Early Detection", preventionDesc: "Taking proactive steps can significantly reduce risk.",
      lifestyleTips: "Lifestyle Prevention Tips",
      active: "Stay Active", activeDesc: "Regular exercise reduces risk by 20-30%",
      diet: "Healthy Diet", dietDesc: "Focus on fruits, vegetables, whole grains",
      weight: "Maintain Healthy Weight", weightDesc: "Obesity increases risk, especially after menopause",
      alcohol: "Limit Alcohol", alcoholDesc: "Even small amounts increase risk",
      detection: "Early Detection Methods",
      mammograms: "Mammograms", mammogramsDesc: "Annual screening starting at age 40-50", mammogramsNote: "Can detect cancer 2 years before it can be felt",
      selfExam: "Self-Examinations", selfExamDesc: "Monthly checks to know what's normal for you",
      warningTitle: "Warning Signs", warningDesc: "Early detection saves lives.", warningAlert: "If you notice any of these symptoms, don't ignore them.",
      physicalChanges: "Physical Changes",
      newLump: "New Lump or Mass", newLumpDesc: "Hard, irregular lump in breast or underarm area",
      sizeShape: "Size or Shape Changes", sizeShapeDesc: "Noticeable change in breast size or shape",
      texture: "Skin Texture Changes", textureDesc: "Dimpling, puckering, or orange-peel texture",
      visualSymptoms: "Visual & Other Symptoms",
      nippleDischarge: "Nipple Discharge", nippleDesc: "Unusual discharge, especially if bloody",
      pain: "Persistent Pain", painDesc: "Ongoing breast or nipple pain",
      color: "Color Changes", colorDesc: "Redness, scaling, or skin discoloration",
    },
    ar: {
      whatIsTitle: "ما هو سرطان الثدي؟",
      whatIsDesc: "للكشف المبكر عن سرطان الثدي، من المفيد معرفة كيف يبدأ وكيف تتصرف خلايا السرطان بشكل مختلف",
      normalCells: "الخلايا الطبيعية",
      normalCell1: "تنمو وتتكاثر بطريقة منضبطة", normalCell2: "تموت عندما تتضرر أو تتقدم في السن",
      normalCell3: "تبقى في المناطق المخصصة", normalCell4: "تستجيب لإشارات الجسم",
      cancerCells: "خلايا السرطان",
      cancerCell1: "تنمو وتتكاثر بشكل غير منضبط", cancerCell2: "لا تموت عندما يجب أن تموت",
      cancerCell3: "تغزو الأنسجة المجاورة", cancerCell4: "تتجاهل إشارات توقف الجسم",
      cellProcess: "عملية تطور الخلية", cellProcessDesc: "إليك توضيح بسيط يظهر كيف يمكن للخلايا السليمة أن تتحول إلى خلايا سرطانية.",
      whereStart: "أين يبدأ", whereStartDesc: "معرفة أجزاء الثدي يساعدنا في رؤية أين يبدأ السرطان عادةً.",
      lobules: "الفصيصات", lobulesDesc: "الغدد المنتجة للحليب حيث تبدأ سرطانات الفصيصات عادةً.",
      ducts: "القنوات", ductsDesc: "أنابيب تنقل الحليب من الفصيصات إلى الحلمة. معظم سرطانات الثدي (حوالي 80%) تبدأ في القنوات.",
      stromal: "الأنسجة الضامة", stromalDesc: "الأنسجة الداعمة بما في ذلك الأنسجة الدهنية والليفية، الأوعية الدموية واللمفاوية.",
      typesTitle: "أنواع سرطان الثدي", typesDesc: "أنواع مختلفة من سرطان الثدي لها خصائص فريدة.",
      idc: "سرطان القنوات الغازي", idcFull: "النوع الأكثر شيوعاً", idcDesc: "يمثل 80% من جميع سرطانات الثدي.", idcFacts: "حقائق:", idcFact1: "الأكثر قابلية للعلاج عند الاكتشاف المبكر",
      ilc: "سرطان الفص الغازي", ilcFull: "النوع الثاني الأكثر شيوعاً", ilcDesc: "يبدأ في الفصيصات. ينمو بنمط صف واحد.", ilcFacts: "حقائق:", ilcFact1: "10-15% من الحالات",
      dcis: "سرطان القنوات الموضعي", dcisFull: "سرطان غير غازي", dcisDesc: "محصور في قنوات الحليب. يعتبر 'ما قبل السرطان'.", dcisFacts: "حقائق:", dcisFact1: "معدل البقاء تقريباً 100%",
      idcSpotlight: "تركيز على سرطان القنوات الغازي", idcSpotlightDesc: "فهم النوع الأكثر شيوعاً من سرطان الثدي.",
      symptoms: "الأعراض الشائعة",
      lump: "كتلة في الثدي", lumpDesc: "كتلة صلبة غير منتظمة لا تتحرك",
      skinChanges: "تغيرات الجلد", skinDesc: "تغضن، تجعد، أو احمرار",
      sizeChange: "تغير الحجم", sizeDesc: "ثدي أكبر من الآخر",
      discharge: "إفرازات", dischargeDesc: "إفرازات غير طبيعية من الحلمة",
      idcFactsTitle: "حقائق عن سرطان القنوات الغازي",
      idcFact2: "يمثل 80% من تشخيصات سرطان الثدي",
      idcFact3: "معدل البقاء لـ 5 سنوات 98% عند الاكتشاف المبكر",
      idcFact4: "يمكن أن ينتشر للعقد الليمفاوية",
      idcFact5: "خيارات العلاج تشمل الجراحة والكيمياء",
      riskFactors: "عوامل الخطر", age: "العمر", genetics: "الوراثة", hormones: "الهرمونات", lifestyle: "نمط الحياة",
      statsTitle: "الإحصائيات العالمية", statsDesc: "فهم التأثير العالمي لسرطان الثدي.",
      newCases: "حالات جديدة سنوياً", newCasesNum: "2.3 مليون", newCasesDesc: "تشخص سنوياً حول العالم",
      deaths: "الوفيات سنوياً", deathsNum: "670 ألف", deathsDesc: "حياة تفقد بسبب سرطان الثدي",
      affected: "النساء المصابات", affectedNum: "1 من كل 2", affectedDesc: "سوف يصبن بسرطان الثدي",
      preventionTitle: "الوقاية والاكتشاف المبكر", preventionDesc: "اتخاذ خطوات استباقية يمكن أن يقلل المخاطر.",
      lifestyleTips: "نصائح الوقاية",
      active: "حافظي على النشاط", activeDesc: "التمارين تقلل المخاطر 20-30%",
      diet: "نظام غذائي صحي", dietDesc: "ركزي على الفواكه والخضروات",
      weight: "حافظي على وزن صحي", weightDesc: "السمنة تزيد المخاطر بعد انقطاع الطمث",
      alcohol: "حددي الكحول", alcoholDesc: "حتى الكميات الصغيرة تزيد المخاطر",
      detection: "طرق الاكتشاف المبكر",
      mammograms: "الأشعة", mammogramsDesc: "فحص سنوي من عمر 40-50", mammogramsNote: "يمكن أن تكتشف السرطان قبل عامين",
      selfExam: "الفحص الذاتي", selfExamDesc: "فحوصات شهرية لتعرفي ما هو طبيعي",
      warningTitle: "علامات التحذير", warningDesc: "الاكتشاف المبكر ينقذ الأرواح.", warningAlert: "إذا لاحظتِ أي من هذه الأعراض، لا تتجاهليها.",
      physicalChanges: "تغيرات جسدية",
      newLump: "كتلة جديدة", newLumpDesc: "كتلة صلبة في الثدي أو الإبط",
      sizeShape: "تغيرات في الحجم", sizeShapeDesc: "تغير ملحوظ في حجم أو شكل الثدي",
      texture: "تغيرات في الجلد", textureDesc: "تغضن أو نسيج قشر البرتقال",
      visualSymptoms: "أعراض بصرية",
      nippleDischarge: "إفرازات من الحلمة", nippleDesc: "إفرازات غير طبيعية خاصة إذا دموية",
      pain: "ألم مستمر", painDesc: "ألم مستمر في الثدي",
      color: "تغيرات في اللون", colorDesc: "احمرار أو تغير في لون الجلد",
    }
  }[lang]

  const normalCells = [t.normalCell1, t.normalCell2, t.normalCell3, t.normalCell4]
  const cancerCells = [t.cancerCell1, t.cancerCell2, t.cancerCell3, t.cancerCell4]

  return (
    <div className="font-[Inter]">

      {/* Section 1 - What is */}
      <div className="w-full bg-gradient-to-r from-[#FDF2F8] to-white py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-4xl text-[#491326] font-bold mb-6">{t.whatIsTitle}</h2>
          <p className="text-center text-base md:text-xl text-[#4B5563] mb-10">{t.whatIsDesc}</p>
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex flex-col gap-4 flex-1">
              <div className="bg-white p-5 rounded-2xl shadow border-l-4 border-[#16A34A]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                    <i className="fa-solid fa-heart text-[#16A34A] text-lg"></i>
                  </div>
                  <span className="text-xl font-bold">{t.normalCells}</span>
                </div>
                <ul className="space-y-2">
                  {normalCells.map((item, i) => <li key={i} className="text-[#4B5563] flex items-center gap-2"><i className="fa-solid fa-check text-[#16A34A]"></i>{item}</li>)}
                </ul>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow border-l-4 border-[#EF4444]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FCE7F3] flex items-center justify-center">
                    <i className="fa-solid fa-triangle-exclamation text-[#DB2777] text-lg"></i>
                  </div>
                  <span className="text-xl font-bold">{t.cancerCells}</span>
                </div>
                <ul className="space-y-2">
                  {cancerCells.map((item, i) => <li key={i} className="text-[#4B5563] flex items-center gap-2"><i className="fa-solid fa-xmark text-[#EF4444]"></i>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="flex-1 bg-white text-center p-6 rounded-2xl shadow hover:-translate-y-2 transition-all duration-500">
              <img src={photo1} alt="cell" className="w-full h-auto max-h-[300px] mb-4 rounded-xl object-cover" />
              <h3 className="font-bold text-lg text-[#491326]">{t.cellProcess}</h3>
              <p className="mt-3 text-[#4B5563] text-sm">{t.cellProcessDesc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - Where it starts */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl text-[#491326] text-center font-bold mb-4">{t.whereStart}</h2>
          <p className="text-center text-[#4B5563] mb-10">{t.whereStartDesc}</p>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 bg-gradient-to-br from-[#FFC3E4] to-white p-6 rounded-2xl">
              <img src="/breast-cancer-diagram-1000x667.jpeg" alt="Breast diagram" className="w-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              {[
                { num: "1", title: t.lobules, desc: t.lobulesDesc },
                { num: "2", title: t.ducts, desc: t.ductsDesc },
                { num: "3", title: t.stromal, desc: t.stromalDesc },
              ].map((item, i) => (
                <div key={i} className="bg-[#FDF2F8] p-5 rounded-2xl border-l-4 border-[#B1476C] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#B1476C] flex items-center justify-center text-white font-bold">{item.num}</div>
                    <span className="font-bold text-lg">{item.title}</span>
                  </div>
                  <p className="text-[#4B5563] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="bg-white py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-3 text-center">{t.typesTitle}</h2>
          <p className="text-gray-600 text-center mb-10">{t.typesDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { abbr: t.idc, full: t.idcFull, desc: t.idcDesc, facts: t.idcFacts, fact: t.idcFact1, color: "pink" },
              { abbr: t.ilc, full: t.ilcFull, desc: t.ilcDesc, facts: t.ilcFacts, fact: t.ilcFact1, color: "blue" },
              { abbr: t.dcis, full: t.dcisFull, desc: t.dcisDesc, facts: t.dcisFacts, fact: t.dcisFact1, color: "green" },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{card.abbr}</h3>
                <p className={`text-${card.color}-600 text-sm font-semibold mb-3`}>{card.full}</p>
                <p className="text-gray-600 text-sm mb-4">{card.desc}</p>
                <div className={`bg-${card.color}-50 rounded-lg p-3`}>
                  <p className="text-gray-700 text-xs"><span className="font-semibold">{card.facts}</span> {card.fact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-rose-950 mb-3">{t.statsTitle}</h1>
          <p className="text-gray-500 mb-12">{t.statsDesc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: t.newCasesNum, title: t.newCases, desc: t.newCasesDesc, bg: "bg-[#FCE7F3]", color: "text-[#DB2777]" },
              { num: t.deathsNum, title: t.deaths, desc: t.deathsDesc, bg: "bg-blue-100", color: "text-[#374151]" },
              { num: t.affectedNum, title: t.affected, desc: t.affectedDesc, bg: "bg-[#E5E7EB]", color: "text-[#2563EB]" },
            ].map((s, i) => (
              <div key={i} className={`${s.bg} rounded-lg shadow-lg p-8 hover:scale-105 transition-transform duration-300`}>
                <h1 className={`${s.color} text-3xl font-bold text-center`}>{s.num}</h1>
                <h3 className="text-[#1F2937] text-center font-bold mt-2">{s.title}</h3>
                <p className="text-[#4B5563] text-center text-sm mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prevention */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-rose-950 text-center mb-3">{t.preventionTitle}</h1>
          <p className="text-gray-500 text-center mb-12">{t.preventionDesc}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-center mb-6">{t.lifestyleTips}</h2>
              <div className="space-y-4">
                {[
                  { icon: "fa-person-running", color: "text-[#16A34A]", title: t.active, desc: t.activeDesc },
                  { icon: "fa-apple-whole", color: "text-[#2563EB]", title: t.diet, desc: t.dietDesc },
                  { icon: "fa-scale-balanced", color: "text-[#9333EA]", title: t.weight, desc: t.weightDesc },
                  { icon: "fa-ban", color: "text-[#DC2626]", title: t.alcohol, desc: t.alcoholDesc },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center shrink-0">
                      <i className={`fa-solid ${item.icon} ${item.color}`}></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1F2937]">{item.title}</h3>
                      <p className="text-[#4B5563] text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-6">{t.detection}</h2>
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fas fa-x-ray text-[#2563EB] text-xl"></i>
                    <h3 className="font-bold text-xl">{t.mammograms}</h3>
                  </div>
                  <p className="text-[#4B5563] text-sm">{t.mammogramsDesc}</p>
                  <div className="bg-blue-100 rounded-lg p-3 mt-3">
                    <p className="text-[#1E40AF] text-sm">{t.mammogramsNote}</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <i className="fa-solid fa-hand text-red-700 text-xl"></i>
                    <h3 className="font-bold text-xl">{t.selfExam}</h3>
                  </div>
                  <p className="text-[#4B5563] text-sm">{t.selfExamDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="bg-red-50 py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-2">{t.warningTitle}</h2>
            <p className="text-red-700 mb-4">{t.warningDesc}</p>
            <div className="bg-red-100 border border-red-200 rounded-lg py-3 px-6 inline-block max-w-2xl">
              <p className="text-red-800 text-sm font-semibold">⚠ {t.warningAlert}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: t.physicalChanges, items: [{ title: t.newLump, desc: t.newLumpDesc }, { title: t.sizeShape, desc: t.sizeShapeDesc }, { title: t.texture, desc: t.textureDesc }] },
              { title: t.visualSymptoms, items: [{ title: t.nippleDischarge, desc: t.nippleDesc }, { title: t.pain, desc: t.painDesc }, { title: t.color, desc: t.colorDesc }] },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">{card.title}</h3>
                <div className="space-y-3">
                  {card.items.map((item, j) => (
                    <div key={j} className="bg-red-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-gray-600 text-xs mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}