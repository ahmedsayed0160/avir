import React from 'react';
import { useLanguage } from '../LanguageContext/LanguageContext';
import { Calendar, Info, Apple, Droplets, Utensils, CheckCircle2, ChevronRight, Activity, Wind, Brain, Dumbbell, Sparkles, Users, PenTool } from 'lucide-react';

const TreatmentFollowUp = () => {
  const { lang } = useLanguage();

  const t = {
    en: {
      hero: { badge: "Your Journey", title: "Treatment Follow-Up Plans", description: "A structured, supportive guide to help you navigate your post-treatment journey with clarity and confidence. Your well-being is our priority." },
      importantInfo: { title: "Important Information", description: "This module provides general lifestyle and well-being guidance only. Specific medical recommendations, diagnoses, or treatment plans are reserved for certified healthcare professionals. Please consult your medical team for personalized advice." },
      schedule: {
        title: "Follow-Up Appointment Schedule", subtitle: "A typical timeline to help you organize your follow-up visits",
        headers: ["Visit Time", "Purpose", "Typical Checks"],
        data: [
          { time: '1 Month', purpose: 'Symptom review', checks: 'Physical exam', icon: '1' },
          { time: '3 Months', purpose: 'Side-effects check', checks: 'Ultrasound if needed', icon: '3' },
          { time: '6 Months', purpose: 'Recovery assessment', checks: 'Mammogram if required', icon: '6' },
          { time: '12 Months', purpose: 'Annual evaluation', checks: 'Full screening review', icon: '12' },
          { time: 'Yearly', purpose: 'Routine long-term monitoring', checks: 'Standard imaging', icon: '∞' },
        ]
      },
      nutrition: {
        title: "Nutrition Guidance", subtitle: "General, non-medical nutrition suggestions to support your well-being",
        cards: [
          { title: 'Healthy Eating Guidelines', items: ['Focus on whole, unprocessed foods', 'Include plenty of fruits and vegetables', 'Choose lean proteins and whole grains', 'Incorporate healthy fats like nuts and seeds'] },
          { title: 'Foods to Limit', items: ['Reduce processed and sugary foods', 'Limit high-sodium items', 'Minimize saturated and trans fats', 'Avoid excessive caffeine and alcohol'] },
          { title: 'Hydration Habits', items: ['Drink 8-10 glasses of water daily', 'Start your day with a glass of water', 'Include herbal teas and infused water', 'Monitor hydration during exercise'] },
          { title: 'Daily Nutrition Routine', items: ['Eat regular, balanced meals', 'Practice mindful eating habits', 'Plan meals ahead when possible', "Listen to your body's hunger cues"] }
        ]
      },
      exercise: {
        title: "Exercise Guidance", subtitle: "Light, general activities to support your recovery and well-being",
        cards: [
          { title: 'Light Walking', description: 'Start with short 10-15 minute walks and gradually increase duration', tag: 'Beginner friendly' },
          { title: 'Basic Stretching', description: 'Gentle stretches to improve flexibility and reduce tension', tag: 'Low impact' },
          { title: 'Relaxation', description: 'Breathing exercises and relaxation techniques for stress relief', tag: 'Calming' },
          { title: 'Low-Fatigue', description: 'Gentle movements designed to minimize fatigue while staying active', tag: 'Energy-conscious' }
        ]
      },
      mentalHealth: {
        title: "Emotional & Mental Well-Being Support", subtitle: "Supportive resources to nurture your mental and emotional health",
        cards: [
          { title: 'Stress Management', description: 'Practical techniques to help you manage daily stress', badge: 'Essential', items: ['Deep breathing exercises', 'Progressive muscle relaxation', 'Mindfulness practices'] },
          { title: 'Meditation & Breathing', description: 'Simple meditation and breathing practices to promote inner peace', badge: 'Calming', items: ['Guided meditation sessions', '4-7-8 breathing technique', 'Body scan meditation'] },
          { title: 'Journaling Prompts', description: 'Thoughtful prompts to help you process emotions and track your journey', badge: 'Reflective', items: ['Daily gratitude practice', 'Emotion tracking and reflection', 'Goal setting and progress notes'] },
          { title: 'Supportive Communities', description: 'Connect with others who understand your journey', badge: 'Community', items: ['Online support groups'] }
        ]
      }
    },
    ar: {
      hero: { badge: "رحلتكِ", title: "خطط متابعة العلاج", description: "دليل منظم وداعم لمساعدتكِ في التنقل برحلتكِ ما بعد العلاج بوضوح وثقة. صحتكِ هي أولويتنا." },
      importantInfo: { title: "معلومات مهمة", description: "يوفر هذا القسم إرشادات عامة فقط حول نمط الحياة والرفاهية. يرجى استشارة فريقكِ الطبي للحصول على نصائح مخصصة." },
      schedule: {
        title: "جدول مواعيد المتابعة", subtitle: "جدول زمني نموذجي لمساعدتكِ في تنظيم زيارات المتابعة",
        headers: ["وقت الزيارة", "الغرض", "الفحوصات النموذجية"],
        data: [
          { time: 'شهر 1', purpose: 'مراجعة الأعراض', checks: 'الفحص البدني', icon: '1' },
          { time: '3 أشهر', purpose: 'فحص الآثار الجانبية', checks: 'الأشعة فوق الصوتية إذا لزم', icon: '3' },
          { time: '6 أشهر', purpose: 'تقييم التعافي', checks: 'الماموجرام إذا لزم', icon: '6' },
          { time: '12 شهر', purpose: 'التقييم السنوي', checks: 'مراجعة الفحص الشامل', icon: '12' },
          { time: 'سنوياً', purpose: 'المراقبة الروتينية طويلة المدى', checks: 'التصوير القياسي', icon: '∞' },
        ]
      },
      nutrition: {
        title: "إرشادات التغذية", subtitle: "اقتراحات تغذوية عامة وغير طبية لدعم رفاهيتكِ",
        cards: [
          { title: 'إرشادات الأكل الصحي', items: ['ركزي على الأطعمة الكاملة غير المصنعة', 'أضيفي الكثير من الفواكه والخضروات', 'اختاري البروتينات الخالية من الدهون والحبوب الكاملة', 'أضيفي الدهون الصحية مثل المكسرات والبذور'] },
          { title: 'الأطعمة التي يجب تقليلها', items: ['قللي الأطعمة المصنعة والسكرية', 'حدي الأطعمة عالية الصوديوم', 'قللي الدهون المشبعة والمتحولة', 'تجنبي الكافيين والكحول المفرطين'] },
          { title: 'عادات الترطيب', items: ['اشربي 8-10 أكواب من الماء يومياً', 'ابدئي يومكِ بكوب من الماء', 'أضيفي الشاي الأعشاب والمياه المنكهة', 'راقبي الترطيب أثناء التمرين'] },
          { title: 'روتين التغذية اليومي', items: ['تناولي وجبات منتظمة ومتوازنة', 'مارسي عادات الأكل الواعي', 'خططي للوجبات مسبقاً عند الإمكان', 'استمعي إلى إشارات جوع جسمكِ'] }
        ]
      },
      exercise: {
        title: "إرشادات التمرين", subtitle: "أنشطة خفيفة وعامة لدعم تعافيكِ ورفاهيتكِ",
        cards: [
          { title: 'المشي الخفيف', description: 'ابدئي بمشي قصير 10-15 دقيقة وزيدي المدة تدريجياً', tag: 'مناسب للمبتدئين' },
          { title: 'الإطالة الأساسية', description: 'تمدد لطيف لتحسين المرونة وتقليل التوتر', tag: 'تأثير منخفض' },
          { title: 'الاسترخاء', description: 'تمارين التنفس وتقنيات الاسترخاء لتخفيف الضغط', tag: 'مهدئ' },
          { title: 'منخفض الإجهاد', description: 'حركات لطيفة مصممة لتقليل التعب مع البقاء نشيطاً', tag: 'واعٍ بالطاقة' }
        ]
      },
      mentalHealth: {
        title: "دعم الصحة العاطفية والنفسية", subtitle: "موارد داعمة لرعاية صحتكِ العقلية والعاطفية",
        cards: [
          { title: 'إدارة الضغط', description: 'تقنيات عملية لمساعدتكِ في إدارة الضغط اليومي', badge: 'أساسي', items: ['تمارين التنفس العميق', 'استرخاء العضلات التدريجي', 'ممارسات اليقظة الذهنية'] },
          { title: 'التأمل والتنفس', description: 'ممارسات تأمل وتنفس بسيطة لتعزيز السلام الداخلي', badge: 'مهدئ', items: ['جلسات تأمل موجهة', 'تقنية التنفس 4-7-8', 'تأمل مسح الجسم'] },
          { title: 'مطالبات اليوميات', description: 'مطالبات مدروسة لمساعدتكِ في معالجة المشاعر', badge: 'تأملي', items: ['ممارسة الامتنان اليومية', 'تتبع المشاعر والتأمل', 'تحديد الأهداف وملاحظات التقدم'] },
          { title: 'مجتمعات الدعم', description: 'تواصلي مع الآخرين الذين يفهمون رحلتكِ', badge: 'مجتمع', items: ['مجموعات الدعم عبر الإنترنت'] }
        ]
      }
    }
  }[lang];

  const nutritionCards = [
    { bgColor: 'bg-green-100', checkColor: 'text-green-500', icon: <Apple className="w-6 h-6 text-green-600" /> },
    { bgColor: 'bg-red-100', checkColor: 'text-red-500', icon: <Utensils className="w-6 h-6 text-red-600" /> },
    { bgColor: 'bg-blue-100', checkColor: 'text-blue-500', icon: <Droplets className="w-6 h-6 text-blue-600" /> },
    { bgColor: 'bg-purple-100', checkColor: 'text-purple-500', icon: <Calendar className="w-6 h-6 text-purple-600" /> },
  ];

  const exerciseCards = [
    { borderColor: 'border-green-200', hoverBorder: 'hover:border-green-400', tagColor: 'bg-green-100 text-green-700', icon: <Activity className="w-5 h-5 text-green-500" /> },
    { borderColor: 'border-blue-200', hoverBorder: 'hover:border-blue-400', tagColor: 'bg-blue-100 text-blue-700', icon: <Dumbbell className="w-5 h-5 text-blue-500" /> },
    { borderColor: 'border-purple-200', hoverBorder: 'hover:border-purple-400', tagColor: 'bg-purple-100 text-purple-700', icon: <Wind className="w-5 h-5 text-purple-500" /> },
    { borderColor: 'border-orange-200', hoverBorder: 'hover:border-orange-400', tagColor: 'bg-orange-100 text-orange-700', icon: <Sparkles className="w-5 h-5 text-orange-500" /> },
  ];

  const mentalHealthCards = [
    { icon: <Brain className="w-6 h-6 text-rose-500" />, badgeColor: 'bg-rose-100 text-rose-700', dotColor: 'bg-rose-400' },
    { icon: <Wind className="w-6 h-6 text-blue-500" />, badgeColor: 'bg-blue-100 text-blue-700', dotColor: 'bg-blue-400' },
    { icon: <PenTool className="w-6 h-6 text-amber-500" />, badgeColor: 'bg-amber-100 text-amber-700', dotColor: 'bg-amber-400' },
    { icon: <Users className="w-6 h-6 text-green-500" />, badgeColor: 'bg-green-100 text-green-700', dotColor: 'bg-green-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Hero */}
      <div className="pt-20 px-4">
        <div className="relative bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 rounded-2xl overflow-hidden mx-auto max-w-5xl p-8 md:p-12 mt-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-white" />
              <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">{t.hero.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t.hero.title}</h1>
            <p className="text-pink-50 text-base max-w-xl leading-relaxed">{t.hero.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Important Info */}
        <div className="bg-blue-50 rounded-xl p-5 flex gap-4 items-start border-l-4 border-blue-500">
          <div className="bg-blue-500 rounded-full p-1.5 mt-0.5 shrink-0"><Info className="w-4 h-4 text-white" /></div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{t.importantInfo.title}</h3>
            <p className="text-gray-600 text-xs leading-relaxed">{t.importantInfo.description}</p>
          </div>
        </div>

        {/* Schedule */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{t.schedule.title}</h2>
              <p className="text-gray-500 text-sm">{t.schedule.subtitle}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl shrink-0"><Calendar className="w-6 h-6 text-purple-600" /></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <div className="grid grid-cols-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium min-w-[400px]">
              {t.schedule.headers.map((h, i) => <div key={i} className="px-4 py-4">{h}</div>)}
            </div>
            {t.schedule.data.map((item, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group cursor-pointer min-w-[400px]">
                <div className="px-4 py-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold group-hover:bg-purple-600 group-hover:text-white transition-all">{item.icon}</span>
                  <span className="font-semibold text-gray-900 text-sm">{item.time}</span>
                </div>
                <div className="px-4 py-4 text-gray-600 text-sm flex items-center">{item.purpose}</div>
                <div className="px-4 py-4 text-gray-600 text-sm flex items-center">{item.checks}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Nutrition */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{t.nutrition.title}</h2>
          <p className="text-gray-500 text-sm mb-6">{t.nutrition.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.nutrition.cards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className={`${nutritionCards[i].bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                  {nutritionCards[i].icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2 className={`w-5 h-5 ${nutritionCards[i].checkColor} shrink-0 mt-0.5`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Exercise */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{t.exercise.title}</h2>
          <p className="text-gray-500 text-sm mb-6">{t.exercise.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.exercise.cards.map((card, i) => (
              <div key={i} className={`bg-white rounded-2xl p-5 border-2 ${exerciseCards[i].borderColor} ${exerciseCards[i].hoverBorder} hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {exerciseCards[i].icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{card.title}</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{card.description}</p>
                <div className="flex items-center gap-1">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${exerciseCards[i].tagColor}`}>{card.tag}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mental Health */}
        <section className="pb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{t.mentalHealth.title}</h2>
          <p className="text-gray-500 text-sm mb-6">{t.mentalHealth.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.mentalHealth.cards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {mentalHealthCards[i].icon}
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${mentalHealthCards[i].badgeColor}`}>{card.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{card.description}</p>
                <ul className="space-y-2">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className={`w-2 h-2 rounded-full ${mentalHealthCards[i].dotColor}`}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default TreatmentFollowUp;