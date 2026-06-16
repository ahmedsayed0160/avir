import { useState } from "react";
import { useLanguage } from '../LanguageContext/LanguageContext';

const SurvivorStories = () => {
  const { lang } = useLanguage();

  const t = {
    en: {
      title: "survivor stories",
      video: {
        title: "Stories of Strength A video featuring stories of breast cancer survivors",
        description: "Enjoy watching real, inspiring experiences of women who shared their journey from pain to hope. The video highlights support, healing, and overcoming the toughest moments.",
        button: "watch full story"
      },
      shareSection: {
        title: "share you're story",
        label: "your story",
        required: "*",
        placeholder: "Share your experience, challenges, victories, or words of encouragement. Your story, your way...",
        button: "share my story",
        note: "Your story will be reviewed with care and respect before being shared"
      },
      alert: "Please write something before sharing your story!",
      stories: [
        {
          name: "Carletta",
          title: "Ten years after her breast cancer diagnosis",
          content: "Carletta looks back on how her definition of bravery has changed. She discusses how she managed the highs and lows of being a cancer survivor and learning how to ask for help."
        },
        {
          name: "Huwaida",
          title: "8 Years of Courage and Resilience",
          content: "Huwaida discovered a lump during a self-exam and faced a difficult journey marked by fear and medical setbacks, but her faith and her family's support kept her strong. After recovering through treatment and resilience, she now shares her story to inspire others with hope."
        },
        {
          name: "Nadia",
          title: "She began her journey with breast cancer after noticing brown discharge",
          content: "and a lump beneath the nipple, and months later a biopsy confirmed the diagnosis, leading to a full mastectomy. Despite her initial fear, she overcame the challenge emotionally with support from the foundation and encourages all women to seek early detection and consult a doctor immediately if they notice any changes."
        },
        {
          name: "Mie Mifune",
          title: "was diagnosed with breast cancer just weeks before her wedding",
          content: "and her biggest fear was losing the chance to have children. She underwent a full mastectomy but saw her scar as the start of a new life. Twelve years later, thanks to freezing her eggs, she became a mother of two. Her message is that every woman should make an informed choice that fits her own life after cancer."
        },
        {
          name: "Alexandra Castro",
          title: "discovered a lump by chance while showering during quarantine",
          content: "Although she delayed seeing a doctor because of the pandemic, her family pushed her to get checked, and it was diagnosed as breast cancer. She stresses the importance of regular self-examination, as early detection at age 23 made a crucial difference in her treatment"
        },
        {
          name: "Doha",
          title: "discovered a lump in her breast",
          content: "and quietly went for tests, which confirmed she had breast cancer and needed surgery. She faced the initial shock but found strength through the support of her family and a friend who had survived the same illness, giving her hope. After connecting with the Breast Cancer Foundation of Egypt, she benefited from their rehabilitation and support services, and she advises women not to compare their symptoms with others, as every case is different."
        }
      ]
    },
    ar: {
      title: "قصص الناجيات",
      video: {
        title: "قصص القوة فيديو يعرض قصص ناجيات من سرطان الثدي",
        description: "استمتعي بمشاهدة تجارب حقيقية وملهمة لنساء شاركن رحلتهن من الألم إلى الأمل. الفيديو يسلط الضوء على الدعم، الشفاء، والتغلب على أصعب اللحظات.",
        button: "شاهدي القصة كاملة"
      },
      shareSection: {
        title: "شاركي قصتكِ",
        label: "قصتكِ",
        required: "*",
        placeholder: "شاركي تجربتكِ، تحدياتكِ، انتصاراتكِ، أو كلمات التشجيع. قصتكِ، بطريقتكِ...",
        button: "شاركي قصتي",
        note: "سيتم مراجعة قصتكِ بعناية واحترام قبل مشاركتها"
      },
      alert: "الرجاء كتابة شيء قبل مشاركة قصتكِ!",
      stories: [
        {
          name: "كارليتا",
          title: "عشر سنوات بعد تشخيصها بسرطان الثدي",
          content: "تسترجع كارليتا كيف تغير تعريفها للشجاعة. تناقش كيف تعاملت مع صعود وهبوط كونها ناجية من السرطان وتعلم كيفية طلب المساعدة."
        },
        {
          name: "حويدة",
          title: "8 سنوات من الشجاعة والمرونة",
          content: "اكتشفت حويدة كتلة أثناء الفحص الذاتي وواجهت رحلة صعبة تميزت بالخوف والانتكاسات الطبية، لكن إيمانها ودعم عائلتها حفظا قوتها. بعد التعافي من خلال العلاج والمرونة، تشارك الآن قصتها لإلهام الآخرين بالأمل."
        },
        {
          name: "نادية",
          title: "بدأت رحلتها مع سرطان الثدي بعد ملاحظة إفراز بني",
          content: "وكتلة تحت الحلمة، وبعد أشهر أكدت الخزعة التشخيص، مما أدى إلى استئصال كامل. على الرغم من خوفها الأولي، تغلبت على التحدي عاطفياً بدعم من المؤسسة وتحث جميع النساء على طلب الكشف المبكر واستشارة الطبيب فوراً إذا لاحظن أي تغييرات."
        },
        {
          name: "مي ميفوني",
          title: "تم تشخيصها بسرطان الثدي قبل أسابيع فقط من زفافها",
          content: "وكان أكبر خوفها هو فقدان فرصة الإنجاب. خضعت لاستئصال كامل لكنها رأت ندبتها كبداية لحياة جديدة. بعد اثني عشر عاماً، وبفضل تجميد بويضاتها، أصبحت أم لطفلين. رسالتها هي أن كل امرأة يجب أن تتخذ خياراً مستنيراً يناسب حياتها الخاصة بعد السرطان."
        },
        {
          name: "ألكساندرا كاسترو",
          title: "اكتشفت كتلة بالصدفة أثناء الاستحمام أثناء الحجر الصحي",
          content: "على الرغم من أنها أجلت زيارة الطبيب بسبب الجائحة، إلا أن عائلتها دفعتها للفحص، وتم تشخيصها بسرطان الثدي. تؤكد على أهمية الفحص الذاتي المنتظم، حيث أن الكشف المبكر في سن 23 أحدث فرقاً حاسماً في علاجها"
        },
        {
          name: "ضحى",
          title: "اكتشفت كتلة في ثديها",
          content: "وذهبت بهدوء للفحوصات، التي أكدت إصابتها بسرطان الثدي وحاجتها للجراحة. واجهت الصدمة الأولى لكنها وجدت القوة من خلال دعم عائلتها وصديقة نجت من نفس المرض، مما أعطاها الأمل. بعد التواصل مع مؤسسة سرطان الثدي في مصر، استفادت من خدمات إعادة التأهيل والدعم، وتنصح النساء بعدم مقارنة أعراضهن مع الآخرين، حيث أن كل حالة مختلفة."
        }
      ]
    }
  }[lang];

  const [stories, setStories] = useState(t.stories);
  const [newStory, setNewStory] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleShare = () => {
    if (!newStory.trim()) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
      return;
    }

    const story = {
      name: lang === 'ar' ? "أنتِ" : "You",
      title: lang === 'ar' ? "قصتي" : "My Story",
      content: newStory,
    };

    setStories([story, ...stories]);
    setNewStory("");
  };

  return (
    <div
      className="font-[Poppins] px-15 mt-20"
      style={{ background: "linear-gradient(to left, #f0dbdb, white, white)" }}
    >
      {/* ================= Video Section ================= */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center capitalize font-semibold text-5xl py-3">
          {t.title}
        </h1>
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 flex flex-col lg:flex-row justify-center items-center gap-6">
          <div className="video-box w-full lg:w-1/2">
            <video
              src="../Breast Cancer Survivor Stories And Their Advice.mp4"
              autoPlay
              muted
              className="w-full rounded"
            />
          </div>
          <div className="video-content w-full lg:w-1/2 mt-4 lg:mt-0">
            <h2 className="capitalize font-semibold text-3xl">
              {t.video.title}
            </h2>
            <p className="text-gray-700 leading-relaxed my-4 text-base">
              {t.video.description}
            </p>

            {/* ✅ الزرار بيشغل الفيديو بالصوت بدل ما يروح صفحة تانية */}
            <button
              onClick={() => {
                const video = document.querySelector(".video-box video");
                if (video) {
                  video.muted = false;
                  video.controls = true;
                  video.play();
                }
              }}
              className="px-5 py-4 text-white rounded-xl inline-block"
              style={{ background: "linear-gradient(#DB2777, #F472B6)" }}
            >
              {t.video.button}
            </button>
          </div>
        </div>
      </div>

      {/* ================= Stories ================= */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="story-box bg-white rounded-3xl shadow-lg p-6 md:p-7 transition-transform duration-500 hover:scale-105 hover:bg-[#ffd3e32d]"
              style={{ maxHeight: "800px" }}
            >
              <div className="profile flex items-center mb-2">
                <div className="profile-icon">
                  <i className="fa-regular fa-user text-xl"></i>
                </div>
                <h3 className="profile-name px-3 text-lg font-semibold capitalize text-[#491326] transition-colors duration-300 hover:text-[#DB2777]">
                  {story.name}
                </h3>
              </div>
              <div className="story-content overflow-hidden">
                <h4 className="text-lg font-semibold py-2">{story.title}</h4>
                <p className="text-gray-700 text-sm">{story.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Share Story ================= */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div
          className="parent text-center p-6 md:p-8 rounded-3xl shadow-lg mx-auto"
          style={{ background: "linear-gradient(to left ,#F472B6 , #FCE7F3)", maxWidth: "1000px" }}
        >
          <h2 className="capitalize font-semibold text-4xl text-[#491326] mb-6">
            {t.shareSection.title}
          </h2>

          <div className="w-full sm:max-w-md md:max-w-lg mx-auto">
            <label className="capitalize text-white text-left text-sm block mb-2">
              {t.shareSection.label} <span className="text-[#DB2777]">{t.shareSection.required}</span>
            </label>
            <textarea
              rows={5}
              placeholder={t.shareSection.placeholder}
              className="border-0 p-3 rounded-3xl mb-4 w-full outline-none bg-white/70 resize-none hover:bg-white transition-colors duration-300"
              value={newStory}
              onChange={(e) => setNewStory(e.target.value)}
            />

            <button
              onClick={handleShare}
              className="mb-3 w-full py-3 rounded-2xl font-semibold text-[#DB2777] bg-white/70 hover:bg-white hover:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-paper-plane"></i> {t.shareSection.button}
            </button>
          </div>

          <p className="text-white text-sm mt-2">
            {t.shareSection.note}
          </p>
        </div>
      </div>

      {/* ================= Alert Box ================= */}
      <div
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#DB2777] text-white py-4 px-8 rounded-xl shadow-lg font-medium text-center z-50 transition-all duration-500
          ${showAlert ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        {t.alert}
      </div>
    </div>
  );
};

export default SurvivorStories;