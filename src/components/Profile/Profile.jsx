import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLanguage } from '../LanguageContext/LanguageContext';
import { UserContext } from '../../Context/UserContext';

const ProfilePage = () => {
  const { lang } = useLanguage();
  const { userLogin, updateProfile, isLoading: userLoading } = useContext(UserContext);
  
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const fileInputRef = useRef(null);

  // Form state - initialize empty
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    newPassword: '',
    avatar: null
  });

  // IMPORTANT: Update formData whenever userLogin changes
  useEffect(() => {
    console.log("userLogin changed:", userLogin);
    
    if (userLogin) {
      // Try to get avatar from userLogin first, then from localStorage
      let avatar = userLogin.image || userLogin.avatar || null;
      
      if (!avatar) {
        const savedAvatar = localStorage.getItem("userAvatar");
        if (savedAvatar) {
          avatar = savedAvatar;
        }
      }
      
      setFormData({
        username: userLogin.name || userLogin.username || '',
        email: userLogin.email || '',
        password: userLogin.password || '',
        newPassword: '',
        avatar: avatar
      });
    }
  }, [userLogin]);

  const t = {
    en: {
      title: 'My Profile',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      newPassword: 'New Password',
      changePassword: 'Change Password',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      uploadPhoto: 'Upload Photo',
      changePhoto: 'Change Photo',
      removePhoto: 'Remove Photo',
      required: 'This field is required',
      invalidEmail: 'Invalid email format',
      passwordShort: 'Password must be at least 6 characters',
      saved: 'Profile saved successfully!',
      logout: 'Log Out',
      deleteAccount: 'Delete Account',
      loading: 'Loading...',
      noUser: 'Please log in to view your profile'
    },
    ar: {
      title: 'ملفي الشخصي',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      newPassword: 'كلمة المرور الجديدة',
      changePassword: 'تغيير كلمة المرور',
      saveChanges: 'حفظ التغييرات',
      saving: 'جاري الحفظ...',
      uploadPhoto: 'رفع صورة',
      changePhoto: 'تغيير الصورة',
      removePhoto: 'إزالة الصورة',
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'صيغة البريد الإلكتروني غير صحيحة',
      passwordShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      saved: 'تم حفظ الملف الشخصي بنجاح!',
      logout: 'تسجيل الخروج',
      deleteAccount: 'حذف الحساب',
      loading: 'جاري التحميل...',
      noUser: 'يرجى تسجيل الدخول لعرض ملفك الشخصي'
    }
  }[lang];

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) newErrors.username = t.required;
    if (!formData.email.trim()) newErrors.email = t.required;
    else if (!emailRegex.test(formData.email)) newErrors.email = t.invalidEmail;

    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = t.passwordShort;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setFormData(prev => ({ ...prev, avatar: null }));
    localStorage.removeItem("userAvatar"); // Remove from localStorage
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save avatar to localStorage separately
    if (formData.avatar) {
      localStorage.setItem("userAvatar", formData.avatar);
    }

    // Update Context (which updates Navbar + localStorage)
    updateProfile({
      name: formData.username,
      username: formData.username,
      email: formData.email,
      password: formData.newPassword || formData.password,
      image: formData.avatar,
      avatar: formData.avatar
    });

    setFormData(prev => ({ 
      ...prev, 
      password: formData.newPassword || formData.password, 
      newPassword: '' 
    }));
    
    setIsLoading(false);
    setSuccessMessage(t.saved);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleLogout = () => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من تسجيل الخروج؟' : 'Are you sure you want to log out?')) {
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userAvatar");
      window.location.reload();
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف حسابك؟ هذا لا يمكن التراجع عنه.' : 'Are you sure? This cannot be undone.')) {
      localStorage.removeItem("userData");
      localStorage.removeItem("userToken");
      localStorage.removeItem("userAvatar");
      window.location.reload();
    }
  };

  // Icons
  const EyeIcon = ({ open }) => (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      )}
    </svg>
  );

  const CameraIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  const LogoutIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  );

  // Loading state
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  // No user logged in
  if (!userLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-24">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 text-center max-w-md">
          <UserIcon />
          <h2 className="text-xl font-bold text-gray-900 mt-4">{t.noUser}</h2>
          <button 
            onClick={() => window.location.href = '/login'}
            className="mt-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-xl transition-all"
          >
            {lang === 'ar' ? 'تسجيل الدخول' : 'Log In'}
          </button>
        </div>
      </div>
    );
  }

  // Avatar URL - check formData first, then userLogin, then localStorage
  const avatarUrl = formData.avatar || userLogin?.image || userLogin?.avatar || localStorage.getItem("userAvatar") || null;
  const displayName = formData.username || userLogin?.name || userLogin?.username || 'User';
  const displayEmail = formData.email || userLogin?.email || 'email@example.com';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-xl mx-auto">
        
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
              <CheckIcon />
            </div>
            <p className="text-green-700 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          
          {/* Avatar Section */}
          <div className="pt-10 pb-6 flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-pink-100 bg-gray-50 overflow-hidden shadow-md flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
              >
                <CameraIcon />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>

            {/* Display Name & Email */}
            <h2 className="mt-4 text-2xl font-bold text-gray-900">{displayName}</h2>
            <p className="text-gray-500 text-sm">{displayEmail}</p>
            
            {avatarUrl && (
              <button 
                onClick={removeAvatar}
                className="mt-2 text-xs text-red-400 hover:text-red-600 transition"
              >
                {t.removePhoto}
              </button>
            )}
          </div>

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.name}</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all bg-gray-50 ${errors.username ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100'}`}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all bg-gray-50 ${errors.email ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Current Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.password}</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 focus:outline-none transition-all bg-gray-50 pr-12"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-[38px]"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.newPassword}</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder={lang === 'ar' ? 'اتركه فارغاً إذا لا تريد التغيير' : 'Leave empty if no change'}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all bg-gray-50 pr-12 ${errors.newPassword ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100'}`}
                />
                <button 
                  type="button" 
                  onClick={() => setShowNewPassword(!showNewPassword)} 
                  className="absolute right-3 top-[38px]"
                >
                  <EyeIcon open={showNewPassword} />
                </button>
                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.saving}
                  </span>
                ) : (
                  t.saveChanges
                )}
              </button>
            </form>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
              >
                <LogoutIcon />
                {t.logout}
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-red-200 rounded-xl text-red-500 hover:bg-red-50 transition-all"
              >
                <TrashIcon />
                {t.deleteAccount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
