import React, { useState } from 'react';
import { useLanguage } from '../LanguageContext/LanguageContext';
import { Heart, Image as ImageIcon, Smile, Shield, User, Loader2, Trash2, Edit2, Check, X } from 'lucide-react';

// ============================================
// API CONFIGURATION
// ============================================
const API_BASE = 'https://avir1.runasp.net';
const USER_ID = 1;

// ============================================
// API ENDPOINTS
// ============================================
const ENDPOINTS = {
  GET_ALL_POSTS: `${API_BASE}/communityposts`,
  GET_USER_POSTS: (userId) => `${API_BASE}/users/${userId}/communityposts`,
  CREATE_POST: (userId) => `${API_BASE}/users/${userId}/communityposts`,
  UPDATE_POST: (userId, postId) => `${API_BASE}/users/${userId}/communityposts/${postId}`,
  DELETE_POST: (userId, postId) => `${API_BASE}/users/${userId}/communityposts/${postId}`,
  LIKE_POST: (userId, postId) => `${API_BASE}/users/${userId}/communityposts/${postId}/like`,
};

// ============================================
// USER PROFILE (localStorage)
// ============================================
const getUserFromStorage = () => {
  return {
    name: localStorage.getItem('userName') || '',
    avatar: localStorage.getItem('userAvatar') || '',
    id: localStorage.getItem('userId') || USER_ID.toString()
  };
};

const saveUserProfile = (name, avatar) => {
  localStorage.setItem('userName', name);
  localStorage.setItem('userAvatar', avatar);
};

// ============================================
// MOCK DATA
// ============================================
const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Maya S.',
    time: '10:12 AM',
    avatar: 'https://i.pravatar.cc/150?u=maya',
    content: 'I just finished my follow-up ultrasound... and honestly my nerves are all over the place. Does anyone else get this wave of anxiety before results come out?',
    support: 42,
    notAlone: 27,
    comments: [
      { author: 'Sara', text: 'I totally get you, Maya. The waiting always makes me overthink. We\'re here for you.', type: 'user' },
      { author: 'Lina', text: 'Try to be gentle with yourself today. Waiting is tough, but you\'ve got a whole community behind you.', type: 'user' },
      { author: 'Noura', text: 'Take your time, Maya. We\'re here for you. Share whatever you feel comfortable with when you\'re ready.', type: 'user', verified: true }
    ]
  },
  {
    id: 2,
    author: 'Hiba R.',
    time: '10:15 AM',
    avatar: 'https://i.pravatar.cc/150?u=hiba',
    content: 'I found a small lump yesterday. I already booked an appointment, but I\'m freaking out. Any tips to calm down?',
    support: 42,
    comments: [
      { author: 'Dalia', text: 'Thank you for checking early. You did the right thing.', type: 'user' },
      { author: 'Mona', text: 'Try writing down your questions for the doctor—it helps!', type: 'user' }
    ]
  },
  {
    id: 3,
    author: 'Community Moderator',
    time: '10:20 AM',
    avatar: null,
    isModerator: true,
    pinned: true,
    content: 'Remember: Early detection saves lives. If you feel anything unusual, seek medical advice. We\'re here to support you.',
    support: 35
  },
  {
    id: 4,
    author: 'Jana M.',
    time: '10:26 AM',
    avatar: 'https://i.pravatar.cc/150?u=jana',
    content: 'Good news today! My doctor said the biopsy came back benign. I\'m so relieved and grateful for this group.',
    support: 44,
    likes: 18,
    comments: [
      { author: 'Maryam', text: 'Amazing news!! So happy for you.', type: 'user' },
      { author: 'Sana', text: 'Thank you for sharing hope with us.', type: 'user' },
      { author: 'Moderator', text: 'Congratulations Jana, we\'re proud of your strength.', type: 'moderator' },
      { author: 'Rana', text: 'You just made my day!', type: 'user' }
    ]
  },
  {
    id: 5,
    author: 'Anonymous Member',
    time: '10:30 AM',
    avatar: null,
    isAnonymous: true,
    content: 'Does anyone know if breast pain alone is a worrying symptom? No lump, just discomfort.',
    support: 8,
    comments: [
      { author: 'Lina', text: 'It can be hormonal, but it\'s always better to check with a doctor.', type: 'user' },
      { author: 'Moderator', text: 'Please send a private message if you want help finding a clinic.', type: 'moderator' }
    ]
  }
];

// Helper: تحويل API response لـ UI format
const mapApiPostToUi = (apiPost) => {
  const date = new Date(apiPost.datePosted);
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  return {
    id: apiPost.id,
    author: apiPost.user?.name || apiPost.user?.userName || 'Anonymous',
    time: timeString,
    avatar: apiPost.user?.avatar || `https://i.pravatar.cc/150?u=${apiPost.userID}`,
    content: apiPost.content,
    support: apiPost.likes || 0,
    isModerator: false,
    isAnonymous: false,
    pinned: false,
    comments: []
  };
};

const CommunityPage = () => {
  const { lang } = useLanguage();
  
  // User Profile
  const [currentUser, setCurrentUser] = useState(getUserFromStorage());
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');
  
  // Posts
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');

  const t = {
    en: {
      createPost: {
        placeholder: "Share your thoughts, ask questions, or offer support...",
        share: "Share",
        anonymous: "Post anonymously"
      },
      pinned: "Pinned Message",
      moderator: "Moderator",
      actions: {
        support: "Support",
        notAlone: "Not Alone",
        likes: "Likes",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel"
      },
      loading: "Loading posts...",
      error: "Failed to load posts. Please try again.",
      retry: "Retry",
      profile: {
        title: "Edit Profile",
        name: "Name",
        avatar: "Avatar URL",
        save: "Save",
        cancel: "Cancel"
      }
    },
    ar: {
      createPost: {
        placeholder: "شاركي أفكاركِ، اطرحي أسئلة، أو قدمي الدعم...",
        share: "نشر",
        anonymous: "نشر بشكل مجهول"
      },
      pinned: "رسالة مثبتة",
      moderator: "مشرفة",
      actions: {
        support: "دعم",
        notAlone: "لستِ وحدكِ",
        likes: "إعجابات",
        edit: "تعديل",
        delete: "حذف",
        save: "حفظ",
        cancel: "إلغاء"
      },
      loading: "جاري تحميل المنشورات...",
      error: "فشل تحميل المنشورات. حاولي مرة أخرى.",
      retry: "إعادة المحاولة",
      profile: {
        title: "تعديل الملف الشخصي",
        name: "الاسم",
        avatar: "رابط الصورة",
        save: "حفظ",
        cancel: "إلغاء"
      }
    }
  }[lang];

  // ============================================
  // API FUNCTIONS (جاهزة للاستخدام)
  // ============================================

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(ENDPOINTS.GET_ALL_POSTS);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const uiPosts = data.map(mapApiPostToUi);
      setPosts(prev => [...uiPosts, ...prev]);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPostApi = async (content, isAnonymous) => {
    const response = await fetch(ENDPOINTS.CREATE_POST(USER_ID), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: content.substring(0, 50),
        content: content,
        userID: USER_ID,
        datePosted: new Date().toISOString(),
        likes: 0
      }),
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };

  const updatePostApi = async (postId, content) => {
    const response = await fetch(ENDPOINTS.UPDATE_POST(USER_ID, postId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };

  const deletePostApi = async (postId) => {
    const response = await fetch(ENDPOINTS.DELETE_POST(USER_ID, postId), {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return true;
  };

  const likePostApi = async (postId) => {
    const response = await fetch(ENDPOINTS.LIKE_POST(USER_ID, postId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };

  // ============================================
  // LOCAL FUNCTIONS (شغالين دلوقتي)
  // ============================================

  const handleSaveProfile = () => {
    saveUserProfile(tempName, tempAvatar);
    setCurrentUser({ name: tempName, avatar: tempAvatar, id: USER_ID });
    setShowProfileModal(false);
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    setSubmitting(true);
    
    setTimeout(() => {
      const newPostObj = {
        id: Date.now(),
        author: isAnonymous 
          ? 'Anonymous Member' 
          : (currentUser.name || (lang === 'ar' ? 'عضوة جديدة' : 'New Member')),
        avatar: isAnonymous 
          ? null 
          : (currentUser.avatar || `https://i.pravatar.cc/150?u=${currentUser.id}`),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: newPost,
        support: 0,
        isAnonymous: isAnonymous,
        comments: []
      };
      
      setPosts(prev => [newPostObj, ...prev]);
      setNewPost('');
      setIsAnonymous(false);
      setSubmitting(false);
    }, 500);
  };

  const handleUpdatePost = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, content: editContent } : post
    ));
    setEditingPost(null);
    setEditContent('');
  };

  const handleDeletePost = (postId) => {
    if (!window.confirm(lang === 'ar' ? 'هل أنتِ متأكدة من الحذف؟' : 'Are you sure you want to delete?')) return;
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, support: (post.support || 0) + 1 }
        : post
    ));
  };

  const startEdit = (post) => {
    setEditingPost(post.id);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setEditContent('');
  };

  // Uncomment لما السيرفر يشتغل:
  // useEffect(() => { fetchPosts(); }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        
        {/* User Profile */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center overflow-hidden">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={20} className="text-white" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">
                {currentUser.name || (lang === 'ar' ? 'عضوة جديدة' : 'New Member')}
              </p>
              <p className="text-xs text-gray-500">
                {lang === 'ar' ? 'اضغطي لتغيير الاسم والصورة' : 'Click to change name and photo'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              setTempName(currentUser.name);
              setTempAvatar(currentUser.avatar);
              setShowProfileModal(true);
            }}
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>

        {/* Profile Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">{t.profile.title}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.profile.name}</label>
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder={lang === 'ar' ? 'اكتبي اسمك' : 'Enter your name'}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.profile.avatar}</label>
                  <input
                    type="text"
                    value={tempAvatar}
                    onChange={(e) => setTempAvatar(e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    {t.profile.save}
                  </button>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors"
                  >
                    {t.profile.cancel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Post */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <textarea
            placeholder={t.createPost.placeholder}
            className="w-full resize-none border-0 focus:ring-0 text-gray-700 placeholder-gray-400 min-h-[80px]"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <ImageIcon size={20} />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Smile size={20} />
              </button>
              <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                />
                {t.createPost.anonymous}
              </label>
            </div>
            <button 
              onClick={handleCreatePost}
              disabled={submitting || !newPost.trim()}
              className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {t.createPost.share}
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-gray-500">
              <Loader2 className="animate-spin" size={24} />
              <span>{t.loading}</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{t.error}</p>
            <button 
              onClick={fetchPosts}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {t.retry}
            </button>
          </div>
        )}

        {/* Posts Feed */}
        {posts.map((post) => (
          <div 
            key={post.id} 
            className={`bg-white rounded-2xl shadow-sm border ${post.pinned ? 'border-pink-200 ring-1 ring-pink-100' : 'border-gray-100'} overflow-hidden`}
          >
            {post.pinned && (
              <div className="bg-pink-50 px-4 py-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-xs font-semibold text-pink-600 uppercase tracking-wide">{t.pinned}</span>
              </div>
            )}

            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  post.isModerator ? 'bg-pink-500' : 
                  post.isAnonymous ? 'bg-gray-300' : 'bg-gray-200'
                }`}>
                  {post.isModerator ? (
                    <Shield size={20} className="text-white" />
                  ) : post.isAnonymous ? (
                    <User size={20} className="text-gray-600" />
                  ) : (
                    <img src={post.avatar} alt={post.author} className="w-full h-full rounded-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{post.author}</span>
                    {post.isModerator && (
                      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium">{t.moderator}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{post.time}</span>
                </div>
                
                {!post.isModerator && !post.isAnonymous && (
                  <div className="flex items-center gap-2">
                    {editingPost === post.id ? (
                      <>
                        <button onClick={() => handleUpdatePost(post.id)} className="text-green-500 hover:text-green-600">
                          <Check size={16} />
                        </button>
                        <button onClick={cancelEdit} className="text-red-500 hover:text-red-600">
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(post)} className="text-gray-400 hover:text-gray-600">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDeletePost(post.id)} className="text-gray-400 hover:text-red-500">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {editingPost === post.id ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full mt-3 resize-none border border-gray-200 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-pink-500"
                  rows={3}
                />
              ) : (
                <p className="mt-3 text-gray-700 leading-relaxed">{post.content}</p>
              )}

              <div className="flex items-center gap-6 mt-4">
                <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 text-pink-500 hover:text-pink-600">
                  <Heart size={18} />
                  <span className="text-sm font-medium">{t.actions.support} {post.support || 0}</span>
                </button>
                {post.notAlone > 0 && (
                  <button className="flex items-center gap-2 text-purple-500 hover:text-purple-600">
                    <span className="text-lg">🙋‍♀️</span>
                    <span className="text-sm font-medium">{t.actions.notAlone} {post.notAlone}</span>
                  </button>
                )}
                {post.likes > 0 && (
                  <button className="flex items-center gap-2 text-gray-500 hover:text-gray-600">
                    <Heart size={18} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                )}
              </div>
            </div>

            {post.comments && post.comments.length > 0 && (
              <div className="bg-gray-50 px-4 py-3 space-y-3">
                {post.comments.map((comment, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      comment.type === 'moderator' ? 'bg-pink-500' : 'bg-gray-300'
                    }`}>
                      {comment.type === 'moderator' ? (
                        <Shield size={14} className="text-white" />
                      ) : (
                        <User size={14} className="text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 bg-white rounded-2xl rounded-tl-none px-4 py-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${
                          comment.type === 'moderator' ? 'text-pink-600' : 'text-gray-900'
                        }`}>
                          {comment.author}
                        </span>
                        {comment.verified && (
                          <span className="text-xs text-pink-500">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;