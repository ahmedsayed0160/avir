import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Trash2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext/LanguageContext';

// ============================================
// API CONFIGURATION
// ============================================
const API_BASE = 'http://avir.runasp.net';
const USER_ID = 1;

// ============================================
// AI MODEL (HuggingFace Space)
// ============================================
const SPACE_URL = "https://mostafaelgendy-chatbot.hf.space";

// ============================================
// API ENDPOINTS
// ============================================
const ENDPOINTS = {
  // Backend API
  GET_CHATS: `${API_BASE}/users/${USER_ID}/chats`,
  CREATE_CHAT: `${API_BASE}/users/${USER_ID}/chats`,
  GET_SESSION: (sessionId) => `${API_BASE}/users/${USER_ID}/chats/session/${sessionId}`,
  DELETE_CHAT: (id) => `${API_BASE}/users/${USER_ID}/chats/${id}`,
  GET_TRIAGE: `${API_BASE}/users/${USER_ID}/chats/triage`,
  CREATE_TRIAGE: `${API_BASE}/users/${USER_ID}/chats/triage`,
  
  // AI Model API
  AI_CHAT: `${SPACE_URL}/chat`,
  AI_SUGGEST: `${SPACE_URL}/suggest`,
};

const Chatbot = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const t = {
    en: {
      header: { title: "AI Health Assistant", online: "Online" },
      initialMessages: [
        { id: 1, sender: 'bot', text: "Hi there 👋 I'm your AI health assistant. I'll ask you few short questions to estimate your breast health risk level. Don't worry – this is not a diagnosis." },
        { id: 2, sender: 'bot', text: "Let's start with your age. How old are you?", options: ['18-29', '30-49', '50+'] }
      ],
      inputPlaceholder: "Type your message...",
      disclaimer: "This AI system provides awareness and guidance only — it is not a medical diagnosis.",
      loading: "Loading...",
      error: "Connection error. Please try again.",
      deleteConfirm: "Delete this message?"
    },
    ar: {
      header: { title: "المساعد الصحي بالذكاء الاصطناعي", online: "متصل" },
      initialMessages: [
        { id: 1, sender: 'bot', text: "مرحباً 👋 أنا مساعدك الصحي بالذكاء الاصطناعي. سأطرح عليك بعض الأسئلة القصيرة لتقدير مستوى خطر صحة ثديك. لا تقلقي – هذا ليس تشخيصاً طبياً." },
        { id: 2, sender: 'bot', text: "لنبدأ بعمرك. كم عمرك؟", options: ['18-29', '30-49', '50+'] }
      ],
      inputPlaceholder: "اكتبي رسالتك...",
      disclaimer: "يوفر هذا النظام الذكي الوعي والإرشاد فقط — وهو ليس تشخيصاً طبياً.",
      loading: "جاري التحميل...",
      error: "خطأ في الاتصال. حاولي مرة أخرى.",
      deleteConfirm: "حذف هذه الرسالة؟"
    }
  }[lang];

  const [messages, setMessages] = useState(t.initialMessages);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef(null);

  // Load History & Triage on Mount
  useEffect(() => {
    const initChat = async () => {
      setIsLoading(true);
      await fetchTriage();
      setIsLoading(false);
    };
    
    // initChat();
  }, []);

  // ============================================
  // API FUNCTIONS
  // ============================================

  // GET /users/1/chats
  const fetchChatHistory = async () => {
    try {
      const response = await fetch(ENDPOINTS.GET_CHATS);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const uiMessages = data.map(chat => ({
        id: chat.id,
        sender: chat.role === 'user' ? 'user' : 'bot',
        text: chat.message,
        timestamp: chat.timestamp
      }));
      
      if (uiMessages.length > 0) {
        setMessages(uiMessages);
        setChatHistory(data.map(chat => ({
          role: chat.role === 'user' ? 'user' : 'assistant',
          content: chat.message
        })));
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  // GET /users/1/chats/triage
  const fetchTriage = async () => {
    try {
      const response = await fetch(ENDPOINTS.GET_TRIAGE);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      if (data && data.length > 0) {
        const triageMessages = data.map((item, index) => ({
          id: `triage-${index}`,
          sender: 'bot',
          text: item.question,
          options: item.options || []
        }));
        setMessages(triageMessages);
      }
    } catch (err) {
      console.error('Error fetching triage:', err);
    }
  };

  // POST /users/1/chats
  const saveToBackend = async (role, message) => {
    try {
      const response = await fetch(ENDPOINTS.CREATE_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userID: USER_ID,
          sessionId: sessionId,
          role: role,
          message: message,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (err) {
      console.error('Save to backend error:', err);
    }
  };

  // DELETE /users/1/chats/{id}
  const deleteChat = async (chatId) => {
    if (!window.confirm(t.deleteConfirm)) return;
    
    try {
      const response = await fetch(ENDPOINTS.DELETE_CHAT(chatId), {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setMessages(prev => prev.filter(m => m.id !== chatId));
    } catch (err) {
      console.error('Delete error:', err);
      alert(lang === 'ar' ? 'فشل الحذف' : 'Failed to delete');
    }
  };

  // AI Suggestions
  const fetchSuggestions = async (lastBotReply) => {
    try {
      const res = await fetch(ENDPOINTS.AI_SUGGEST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ last_response: lastBotReply, language: lang }),
      });
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch {
      setSuggestions([]);
    }
  };

  // ============================================
  // CORE SEND LOGIC (LIVE LIVE AI MODE)
  // ============================================
  const handleSend = async (msg) => {
    const userMsg = (msg || inputValue).trim();
    if (!userMsg || isLoading) return;
    
    // 1. إضافة رسالة المستخدم للواجهة مباشرة وتنظيف الـ Input
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      sender: 'user', 
      text: userMsg 
    }]);
    setInputValue('');
    setIsLoading(true);
    setSuggestions([]);

    // 2. تحديث الـ context والـ History الخاص بالـ Model وحفظها في الـ Backend
    const updatedHistory = [...chatHistory, { role: 'user', content: userMsg }];
    setChatHistory(updatedHistory);
    await saveToBackend('user', userMsg);

    // 3. حجز مكان لرسالة الـ Bot بـ ID فريد للـ Streaming
    const botMsgId = Date.now() + 1;
    setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: '' }]);

    try {
      // 4. استدعاء الـ AI Model عبر الـ Streaming Endpoint
      const res = await fetch(ENDPOINTS.AI_CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedHistory }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullReply = '';

      // قراءة الـ Stream chunk chunk
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') break;

          try {
            const parsed = JSON.parse(payload);
            if (parsed.text) {
              fullReply += parsed.text;
              // تحديث النص في الواجهة حرف بحرف
              setMessages(prev =>
                prev.map(m => m.id === botMsgId ? { ...m, text: fullReply } : m)
              );
            }
          } catch {
            // تجاهل أي Chunk غير مكتمل أثناء القراءة
          }
        }
      }

      // 5. حفظ الرد النهائي للـ Bot في الـ History وفي الـ Backend والبحث عن المقترحات
      setChatHistory(prev => [...prev, { role: 'assistant', content: fullReply }]);
      await saveToBackend('bot', fullReply);
      
      if (fullReply) {
        fetchSuggestions(fullReply);
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev =>
        prev.map(m => m.id === botMsgId ? {
          ...m,
          text: lang === 'ar'
            ? 'عذراً، حدث خطأ في الاتصال. حاولي مرة أخرى.'
            : 'Sorry, there was a connection error. Please try again.'
        } : m)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4 mt-24">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t.header.title}</h3>
              <span className="text-xs text-green-500 font-medium">{t.header.online}</span>
            </div>
          </div>
          
          {/* Clear chat */}
          <button
            onClick={() => {
              if (window.confirm(lang === 'ar' ? 'مسح كل المحادثة؟' : 'Clear all chat?')) {
                setMessages(t.initialMessages);
                setChatHistory([]);
                setSuggestions([]);
              }
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 group">
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div className={`flex-1 ${msg.sender === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`inline-block max-w-[85%] relative ${
                  msg.sender === 'bot'
                    ? 'bg-gray-100 text-gray-700 rounded-2xl rounded-tl-none'
                    : 'bg-pink-500 text-white rounded-2xl rounded-tr-none'
                } px-4 py-3`}>
                  
                  {/* Delete button - For user messages (Dynamic IDs from Backend) */}
                  {msg.sender === 'user' && typeof msg.id === 'number' && (
                    <button
                      onClick={() => deleteChat(msg.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    >
                      ×
                    </button>
                  )}

                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  
                  {/* Quick Options Rendering */}
                  {msg.options && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {msg.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSend(option)}
                          disabled={isLoading}
                          className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && messages[messages.length - 1]?.text === '' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex items-center gap-1 py-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* AI Smart Suggestions */}
        {suggestions.length > 0 && !isLoading && (
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="text-xs bg-pink-50 text-pink-600 border border-pink-200 px-3 py-1.5 rounded-full hover:bg-pink-100 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2">
            <input
              type="text"
              placeholder={t.inputPlaceholder}
              className="flex-1 bg-transparent border-0 focus:ring-0 text-sm text-gray-700 placeholder-gray-400"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !inputValue.trim()}
              className="w-10 h-10 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-mt-5 text-[#491326] mt-6 text-center max-w-md">
        {t.disclaimer}
      </p>
    </div>
  );
};

export default Chatbot;