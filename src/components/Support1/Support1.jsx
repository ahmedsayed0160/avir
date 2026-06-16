import React, { useEffect } from "react";
import { useLanguage } from '../LanguageContext/LanguageContext';
import { useNavigate } from "react-router-dom";
import heroImg from "/ChatGPT Image Nov 22, 2025, 11_46_24 PM.png";
import treatmentImg from "../../../public/WhatsApp Image 2026-02-24 at 12.04.42 AM.jpeg";
import communityImg from "../../../public/WhatsApp Image 2026-02-24 at 12.04.42111 AM.jpeg";

function SurvivorStory() {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    en: {
      hero: {
        badge: "you're not alone",
        title: "Post-Diagnosis Support & Guidance",
        subtitle: "Access emotional support, follow-up plans, and a trusted community.",
        button: "get started ➜"
      },
      survivorStories: {
        badge: "inspiration",
        title: "Survivor Stories",
        description: "Real experiences to inspire strength and hope. Watch powerful testimonials from survivors who've walked this path and emerged stronger.",
        features: [
          { title: "Authentic Experiences", description: "Hear firsthand accounts from real survivors" },
          { title: "Emotional Support", description: "Find comfort in shared experiences" },
          { title: "Hope & Resilience", description: "Discover stories of triumph and recovery" }
        ],
        button: "watch stories ➜"
      },
      treatmentPlans: {
        badge: "guidance",
        title: "Treatment Follow-Up Plans",
        description: "Structured guidance including schedules, nutrition, and emotional care. Get personalized plans tailored to your recovery journey.",
        cards: [
          { icon: "fa-calendar-check", color: "#8B5CF6", title: "Appointment Schedules", description: "Track follow-ups and reminders" },
          { icon: "fa-apple-whole", color: "#E91E8C", title: "Nutrition Plans", description: "Healthy eating guidelines" },
          { icon: "fa-heart-pulse", color: "#F472B6", title: "Emotional Care", description: "Mental health resources" }
        ],
        button: "view plans ➜"
      },
      community: {
        badge: "community",
        title: "Support Community",
        description: "Join discussions, ask questions, and get peer support. Connect with others who understand your journey.",
        featuresTitle: "key features",
        features: [
          { icon: "fa-lock", color: "#DB2777", title: "Login or Registration Required", description: "Secure, private community access" },
          { icon: "fa-images", color: "#8B5CF6", title: "Upload Profile Picture", description: "Personalize your community presence" },
          { icon: "fa-comments", color: "#F472B6", title: "Post Experiences or Ask Questions", description: "Share your story and get answers" }
        ],
        joinButton: "join the community",
        learnMore: "learn more ➜"
      }
    },
    ar: {
      hero: {
        badge: "أنتِ لستِ وحدكِ",
        title: "الدعم والإرشاد ما بعد التشخيص",
        subtitle: "احصلي على الدعم العاطفي، خطط المتابعة، ومجتمع موثوق.",
        button: "ابدئي الآن ➜"
      },
      survivorStories: {
        badge: "إلهام",
        title: "قصص الناجيات",
        description: "تجارب حقيقية لإلهام القوة والأمل. شاهدي شهادات قوية من الناجيات اللائي سلكن هذا الطريق وخرجن أقوى.",
        features: [
          { title: "تجارب أصيلة", description: "استمعي إلى روايات من الناجيات الحقيقيات" },
          { title: "الدعم العاطفي", description: "جدي الراحة في التجارب المشتركة" },
          { title: "الأمل والمرونة", description: "اكتشفي قصص النصر والتعافي" }
        ],
        button: "شاهدي القصص ➜"
      },
      treatmentPlans: {
        badge: "إرشاد",
        title: "خطط متابعة العلاج",
        description: "إرشاد منظم يشمل الجداول، التغذية، والرعاية العاطفية. احصلي على خطط مخصصة لرحلة تعافيكِ.",
        cards: [
          { icon: "fa-calendar-check", color: "#8B5CF6", title: "جداول المواعيد", description: "تتبعي المتابعات والتذكيرات" },
          { icon: "fa-apple-whole", color: "#E91E8C", title: "خطط التغذية", description: "إرشادات الأكل الصحي" },
          { icon: "fa-heart-pulse", color: "#F472B6", title: "الرعاية العاطفية", description: "موارد الصحة النفسية" }
        ],
        button: "عرض الخطط ➜"
      },
      community: {
        badge: "مجتمع",
        title: "مجتمع الدعم",
        description: "انضمي للنقاشات، اطرحي الأسئلة، واحصلي على دعم الأقران. تواصلي مع الآخرين الذين يفهمون رحلتكِ.",
        featuresTitle: "الميزات الرئيسية",
        features: [
          { icon: "fa-lock", color: "#DB2777", title: "تسجيل الدخول أو التسجيل مطلوب", description: "وصول آمن وخاص للمجتمع" },
          { icon: "fa-images", color: "#8B5CF6", title: "رفع صورة الملف الشخصي", description: "خصصي حضوركِ في المجتمع" },
          { icon: "fa-comments", color: "#F472B6", title: "نشر التجارب أو طرح الأسئلة", description: "شاركي قصتكِ واحصلي على إجابات" }
        ],
        joinButton: "انضمي للمجتمع",
        learnMore: "اعرفي المزيد ➜"
      }
    }
  }[lang];

  return (
    <div className="font-[Poppins]">

      {/* HERO */}
      <div className="w-full px-0">
        <div
          className="text-center flex justify-center items-center py-20 min-h-screen"
          style={{ background: "linear-gradient(to right,#FEF2F2 , #FCE7F3 , #FCE7F3)" }}
        >
          <div className="w-full lg:w-1/2">
            <span
              className="px-3 py-2 rounded-full uppercase font-semibold shadow-md"
              style={{ color: "#DB2777", backgroundColor: "white" }}
            >
              {t.hero.badge}
            </span>
            <h1 className="font-semibold my-6 text-6xl" style={{ color: "#491326", lineHeight: 1.3 }}>
              {t.hero.title}
            </h1>
            <p className="text-2xl" style={{ color: "#491326" }}>{t.hero.subtitle}</p>
            {/* ✅ get started → /survivor_stories */}
            <button
              onClick={() => navigate("/survivor_stories")}
              className="transition-all duration-300 hover:scale-90 cursor-pointer rounded-full px-6 py-3 text-white capitalize text-base my-8 shadow-lg"
              style={{ backgroundColor: "#DB2777" }}
            >
              {t.hero.button}
            </button>
          </div>
        </div>
      </div>

      {/* SURVIVOR STORIES */}
      <div className="w-full" style={{ background: "linear-gradient(to right,#591c8719 , rgba(0,0,0,0))" }}>
        <div className="p-10">
          <div className="flex flex-col lg:flex-row justify-evenly items-center">
            <div className="relative w-full lg:w-1/2 mx-auto mb-6 lg:mb-0">
              <img src={heroImg} className="rounded-[30px] shadow w-full" alt="survivor story" />
            </div>
            <div className="w-full lg:w-1/2 p-10">
              <span
                className="px-3 py-2 rounded-full uppercase font-semibold"
                style={{ color: "#8B5CF6", backgroundColor: "#F3E8FF" }}
              >
                {t.survivorStories.badge}
              </span>
              <h2 className="text-5xl font-semibold py-6">{t.survivorStories.title}</h2>
              <p className="text-xl text-[#4B5563]">{t.survivorStories.description}</p>
              <ul className="my-6">
                {t.survivorStories.features.map((feature, index) => (
                  <li key={index} className="p-3 flex items-center space-x-3">
                    <i
                      className="fa-solid fa-check flex justify-center items-center rounded-full text-center p-2"
                      style={{ color: "#DB2777", backgroundColor: "#FCE7F3" }}
                    ></i>
                    <div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <span className="text-sm text-[#4B5563]">{feature.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
              {/* ✅ watch stories → /survivor_stories */}
              <button
                onClick={() => navigate("/survivor_stories")}
                className="transition-all duration-300 hover:scale-90 cursor-pointer flex items-center justify-center px-6 py-3 rounded-full capitalize text-white font-semibold shadow-lg"
                style={{ backgroundColor: "#DB2777" }}
              >
                <i className="fa-solid fa-video mr-2"></i> {t.survivorStories.button}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TREATMENT PLANS */}
      <div className="w-full">
        <div className="flex flex-col lg:flex-row justify-center items-center p-10">
          <div className="w-full lg:w-1/2 p-10">
            <span
              className="px-3 py-2 rounded-full uppercase font-semibold"
              style={{ color: "#8B5CF6", backgroundColor: "#F3E8FF" }}
            >
              {t.treatmentPlans.badge}
            </span>
            <h2 className="text-5xl font-semibold py-6">{t.treatmentPlans.title}</h2>
            <p className="text-xl text-[#4B5563]">{t.treatmentPlans.description}</p>
            <div className="flex flex-wrap gap-6 py-6">
              {t.treatmentPlans.cards.map((card, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start px-6 py-4 rounded-xl shadow-lg"
                  style={{ flex: "0 0 calc(50% - 0.75rem)", background: "linear-gradient(to bottom,#FAF5FF,#FDF2F8)" }}
                >
                  <i
                    className={`fa-solid ${card.icon} text-white flex justify-center items-center rounded-lg mb-2 p-4 text-2xl`}
                    style={{ background: card.color }}
                  ></i>
                  <h3 className="text-lg py-2 font-bold">{card.title}</h3>
                  <p className="text-[#4B5563]">{card.description}</p>
                </div>
              ))}
            </div>
            {/* ✅ view plans → /awarenss1 */}
            <button
              onClick={() => navigate("/awarenss1")}
              className="transition-all duration-300 hover:scale-90 cursor-pointer flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold my-3 shadow-lg capitalize"
              style={{ backgroundColor: "#8B5CF6" }}
            >
              <i className="fa-solid fa-folder-plus mr-2"></i> {t.treatmentPlans.button}
            </button>
          </div>
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <img
              src={treatmentImg}
              className="rounded-xl w-full shadow-lg object-cover"
              style={{ height: "35rem" }}
              alt="treatment"
            />
          </div>
        </div>
      </div>

      {/* COMMUNITY */}
      <div className="w-full p-10" style={{ background: "linear-gradient(to right,#591c8719 , rgba(0,0,0,0))" }}>
        <div className="flex flex-col lg:flex-row justify-evenly items-center">
          <div className="relative w-full lg:w-1/2 mx-auto mb-6 lg:mb-0">
            <img
              src={communityImg}
              className="rounded-[30px] w-full object-contain"
              style={{ height: "35rem" }}
              alt="community"
            />
          </div>
          <div className="w-full lg:w-1/2 p-10">
            <span
              className="px-3 py-2 rounded-full uppercase font-semibold"
              style={{ color: "#DB2777", backgroundColor: "#FCE7F3" }}
            >
              {t.community.badge}
            </span>
            <h2 className="text-5xl font-semibold py-6">{t.community.title}</h2>
            <p className="text-xl text-[#4B5563]">{t.community.description}</p>
            <div
              className="flex flex-col gap-4 p-6 rounded-xl shadow-lg my-6"
              style={{ background: "linear-gradient(to bottom right,#FAF5FF,#FDF2F8)" }}
            >
              <h3 className="text-2xl font-semibold capitalize">{t.community.featuresTitle}</h3>
              {t.community.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <i
                    className={`fa-solid ${feature.icon} text-white flex justify-center items-center rounded-md p-3`}
                    style={{ background: feature.color }}
                  ></i>
                  <div>
                    <h4 className="text-sm font-bold">{feature.title}</h4>
                    <span className="text-sm text-[#4B5563]">{feature.description}</span>
                  </div>
                </li>
              ))}
            </div>
            <div className="flex items-center gap-4 py-6">
              {/* ✅ join the community → /community */}
              <button
                onClick={() => navigate("/community")}
                className="transition-all duration-300 hover:scale-90 cursor-pointer flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold capitalize shadow-lg"
                style={{ backgroundColor: "#DB2777" }}
              >
                <i className="fa-solid fa-user-plus mr-2"></i> {t.community.joinButton}
              </button>
              {/* ✅ learn more → /support_community */}
              <button
                onClick={() => navigate("/support_community")}
                className="capitalize text-black font-semibold hover:text-pink-600 transition"
              >
                {t.community.learnMore}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SurvivorStory;