import React, { useState, useEffect, useContext } from "react";
import { useLanguage } from '../LanguageContext/LanguageContext';
import axios from 'axios';
import { UserContext } from "../../Context/UserContext";

const API_BASE = "https://avir.runasp.net/api/Reminder";

const ReminderCalendar = () => {
  const { lang } = useLanguage();
  const { user } = useContext(UserContext);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [recommendedDays, setRecommendedDays] = useState([]);
  const [popup, setPopup] = useState({ message: "", bgColor: "", visible: false });
  const [savedReminders, setSavedReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    en: {
      title: "When would you like to be reminded?",
      subtitle: "Please enter the first day of your last period. We will use this date to calculate the best time for your self-exam (3-5) days after your period ends.",
      months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      reminderMethods: "Reminder Methods",
      email: { title: "Email", description: "Get reminders via email" },
      selectedReminder: "Selected Reminder",
      selectDay: "Select a day",
      perfectTiming: "Perfect timing for your self-examination",
      saveReminder: "Save Reminder",
      settingsNote: "You can change your reminder preferences anytime in settings",
      recommendedDays: "Recommended days (3-5 days after cycle)",
      selectedDay: "Selected day",
      savedReminders: "Saved Reminders",
      delete: "Delete",
      noReminders: "No reminders saved yet",
      errors: {
        selectDate: "Please select a date first!",
        saved: "Reminder saved successfully!",
        saveError: "Failed to save reminder",
        deleteError: "Failed to delete reminder",
        loadError: "Failed to load reminders"
      }
    },
    ar: {
      title: "متى تريدين أن يتم تذكيرك؟",
      subtitle: "الرجاء إدخال اليوم الأول من آخر دورة شهرية لك. سنستخدم هذا التاريخ لحساب أفضل وقت لفحصك الذاتي (3-5 أيام بعد انتهاء دورتك).",
      months: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
      days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
      reminderMethods: "طرق التذكير",
      email: { title: "البريد الإلكتروني", description: "احصلي على التذكيرات عبر البريد الإلكتروني" },
      selectedReminder: "التذكير المحدد",
      selectDay: "اختيار يوم",
      perfectTiming: "توقيت مثالي لفحصك الذاتي",
      saveReminder: "حفظ التذكير",
      settingsNote: "يمكنك تغيير تفضيلات التذكير في أي وقت من الإعدادات",
      recommendedDays: "الأيام الموصى بها (3-5 أيام بعد الدورة)",
      selectedDay: "اليوم المحدد",
      savedReminders: "التذكيرات المحفوظة",
      delete: "حذف",
      noReminders: "لا توجد تذكيرات محفوظة",
      errors: {
        selectDate: "الرجاء اختيار تاريخ أولاً!",
        saved: "تم حفظ التذكير بنجاح!",
        saveError: "فشل في حفظ التذكير",
        deleteError: "فشل في حذف التذكير",
        loadError: "فشل في تحميل التذكيرات"
      }
    }
  }[lang];

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/user/${userId}`);
      setSavedReminders(res.data || []);
    } catch (err) {
      console.error("GET error:", err);
      showPopup(t.errors.loadError, "#DC2626");
    } finally {
      setLoading(false);
    }
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const calculateRecommendedDays = (startDay) => {
    if (!startDay) return;
    const periodDate = new Date(currentYear, currentMonth, startDay);
    const newRecommendedDays = [];
    for (let i = 7; i <= 10; i++) {
      const examDate = new Date(periodDate);
      examDate.setDate(periodDate.getDate() + i);
      newRecommendedDays.push({
        day: examDate.getDate(),
        month: examDate.getMonth(),
        year: examDate.getFullYear()
      });
    }
    setRecommendedDays(newRecommendedDays);
  };

  const selectDate = (day) => {
    setSelectedDay(day);
    calculateRecommendedDays(day);
  };

  useEffect(() => {
    if (selectedDay) {
      calculateRecommendedDays(selectedDay);
    }
  }, [currentMonth, currentYear]);

  const prevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) { setCurrentYear((y) => y - 1); return 11; }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) { setCurrentYear((y) => y + 1); return 0; }
      return prev + 1;
    });
  };

  const showPopup = (message, bgColor) => {
    setPopup({ message, bgColor, visible: true });
    setTimeout(() => setPopup(prev => ({ ...prev, visible: false })), 2500);
  };

  const handleSave = async () => {
    if (!selectedDay) {
      showPopup(t.errors.selectDate, "#E91E63");
      return;
    }

    try {
      setLoading(true);

      const periodStartDate = new Date(currentYear, currentMonth, selectedDay);

      const payload = {
        id: 0,
        userID: userId,
        email: user?.email || "user@example.com",
        periodStartDate: periodStartDate.toISOString(),
        reminderDate: periodStartDate.toISOString(),
      };

      await axios.post(API_BASE, payload);

      showPopup(t.errors.saved, "#28a745");
      await fetchReminders();
      setSelectedDay(null);
      setRecommendedDays([]);

    } catch (err) {
      console.error("POST error:", err);
      showPopup(t.errors.saveError, "#DC2626");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reminderId) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE}/${reminderId}`);
      await fetchReminders();
      showPopup(lang === "ar" ? "تم الحذف بنجاح" : "Deleted successfully", "#28a745");
    } catch (err) {
      console.error("DELETE error:", err);
      showPopup(t.errors.deleteError, "#DC2626");
    } finally {
      setLoading(false);
    }
  };

  const calendarCells = [];
  const numDays = daysInMonth(currentMonth, currentYear);
  const firstDay = firstDayOfMonth(currentMonth, currentYear);
  let date = 1;

  for (let row = 0; row < 6; row++) {
    const cells = [];
    for (let col = 0; col < 7; col++) {
      if ((row === 0 && col < firstDay) || date > numDays) {
        cells.push(<td key={`${row}-${col}`}></td>);
      } else {
        let style = {
          borderRadius: "5px",
          cursor: "pointer",
          padding: "0.5rem",
          transition: "all 0.3s"
        };
        if (recommendedDays.some(d => d.day === date && d.month === currentMonth && d.year === currentYear)) {
          style.backgroundColor = "#FCE4EC";
        }
        if (date === selectedDay) {
          style.backgroundColor = "#E91E63";
          style.color = "white";
        }
        const currentDate = date;
        cells.push(<td key={`${row}-${col}`} style={style} onClick={() => selectDate(currentDate)}>{date}</td>);
        date++;
      }
    }
    calendarCells.push(<tr key={row}>{cells}</tr>);
  }

  const selectedText = selectedDay ? `${t.months[currentMonth]} ${selectedDay}` : t.selectDay;

  return (
    <div className="p-4 mt-12 flex justify-center items-center min-h-screen pt-18">
      <div className="container mx-auto shadow-lg p-3 rounded-xl max-w-6xl bg-white">

        {loading && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm mt-2 text-gray-600">{lang === "ar" ? "جاري التحميل..." : "Loading..."}</p>
            </div>
          </div>
        )}

        <h2 className="font-bold text-center text-2xl md:text-3xl text-[#491326]">{t.title}</h2>
        <p className="text-center mt-3 text-sm md:text-base text-[#76072E]">
          {t.subtitle.split('(3-5)')[0]}<br className="hidden sm:block" />
          {t.subtitle.includes('(3-5)') ? `(3-5)${t.subtitle.split('(3-5)')[1]}` : ''}
        </p>

        <div className="container p-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            <div className="md:col-span-7">
              <div className="p-3 rounded-xl bg-[#F5F5F5]">
                <div className="flex justify-between items-center mb-3">
                  <button onClick={prevMonth} className="btn rounded-full border-0 p-3 cursor-pointer transition-all duration-300 hover:bg-[#E91E63] hover:text-white hover:scale-110">&lt;</button>
                  <h5 className="m-0 text-lg">{t.months[currentMonth]} {currentYear}</h5>
                  <button onClick={nextMonth} className="btn rounded-full border-0 p-3 cursor-pointer transition-all duration-300 hover:bg-[#E91E63] hover:text-white hover:scale-110">&gt;</button>
                </div>
                <table className="calendar-table table text-center table-light table-borderless w-full">
                  <thead>
                    <tr className="text-gray-900 text-sm">
                      {t.days.map((day, i) => <th key={i}>{day}</th>)}
                    </tr>
                  </thead>
                  <tbody>{calendarCells}</tbody>
                </table>
                <div className="container text-center text-sm mt-3">
                  <span className="text-gray-600 small me-5 inline-flex items-center">
                    <span className="w-2 h-2 mr-2 p-2 rounded-sm" style={{ backgroundColor: '#FCE4EC' }}></span>
                    {t.recommendedDays}
                  </span>
                  <span className="text-gray-600 small inline-flex items-center">
                    <span className="w-2 h-2 mr-2 p-2 rounded-sm" style={{ backgroundColor: '#E91E63' }}></span>
                    {t.selectedDay}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-5">
              <div className="p-4 rounded-xl bg-[#F5F5F5]">
                <h3 className="text-lg font-semibold">{t.reminderMethods}</h3>
                <div className="reminder-method flex items-center gap-3 p-2">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-[#E91E63]" style={{ accentColor: '#E91E63' }} />
                  <div className="bg-white p-3 rounded-lg">
                    <i className="fa-solid fa-envelope text-xl" style={{ color: '#E91E63' }}></i>
                  </div>
                  <div className="method-content">
                    <h4 className="text-base">{t.email.title}</h4>
                    <p className="text-sm text-gray-500">{t.email.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#FCE4EC]">
                <h3 className="font-semibold text-lg">{t.selectedReminder}</h3>
                <h4 className="font-normal text-4xl py-2 text-[#E91E63]">{selectedText}</h4>
                <p className="text-gray-500 text-sm">{t.perfectTiming}</p>
              </div>
            </div>

          </div>
        </div>

        <div className="container">
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn py-2 px-6 rounded-lg cursor-pointer text-white block mx-auto mb-2 mt-4 shadow bg-[#E91E63] transition-all duration-300 hover:scale-93 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.saveReminder}
          </button>
          <p className="text-center text-gray-500 text-xs">{t.settingsNote}</p>
        </div>

        <div className="mt-8 px-4">
          <h3 className="text-xl font-bold text-[#491326] mb-4 text-center">{t.savedReminders}</h3>
          {savedReminders.length === 0 ? (
            <p className="text-center text-gray-500 py-4">{t.noReminders}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedReminders.map((reminder) => (
                <div key={reminder.id} className="bg-white border-2 border-pink-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-[#491326]">
                        {new Date(reminder.reminderDate).toLocaleDateString(
                          lang === "ar" ? "ar-EG" : "en-US",
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {lang === "ar" ? "معرف المستخدم:" : "User ID:"} {reminder.userID}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(reminder.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      {t.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <div
        className="fixed left-1/2 text-white p-5 rounded-xl font-bold z-50 transition-all duration-500"
        style={{
          top: "20px",
          transform: popup.visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-20px)",
          backgroundColor: popup.bgColor,
          opacity: popup.visible ? 1 : 0,
          pointerEvents: popup.visible ? "auto" : "none",
        }}
      >
        {popup.message}
      </div>
    </div>
  );
};

export default ReminderCalendar;