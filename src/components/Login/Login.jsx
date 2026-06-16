import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useLanguage } from "../../components/LanguageContext/LanguageContext"; // ← جديد
import { Eye, EyeOff } from "lucide-react";
import logo from "/Pink_Breast_Cancer_Awareness_Instagram_Post__8_-removebg-preview.png";
// 🌍 الترجمات
const translations = {
  en: {
    title1: "Log In To Our",
    title2: "Community",
    email: "Email",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    resetHere: "Reset here",
    signIn: "Sign In",
    loading: "Loading...",
    login: "Login",
    register: "Register",
    emailError: "Invalid email",
    passwordError:
      "Must include at least 1 capital letter, 1 small letter, 1 special char, 1 number, min length 8",
    loginFailed: "Login failed",
  },
  ar: {
    title1: "تسجيل الدخول إلى",
    title2: "مجتمعنا",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    resetHere: "إعادة تعيين",
    signIn: "تسجيل الدخول",
    loading: "جاري التحميل...",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    emailError: "بريد إلكتروني غير صالح",
    passwordError:
      "يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز خاص، 8 أحرف على الأقل",
    loginFailed: "فشل تسجيل الدخول",
  },
};

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { setuserLogin } = useContext(UserContext);

  // ← استخدم LanguageContext بدل useState
  const { lang } = useLanguage();

  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const t = translations[lang];

  const schema = z.object({
    email: z.string().email(t.emailError),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        t.passwordError,
      ),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState, setError } = form;

  useEffect(() => {
    if (formState.errors.email) {
      setError("email", { message: t.emailError });
    }
    if (formState.errors.password) {
      setError("password", { message: t.passwordError });
    }
  }, [lang, t, formState.errors.email, formState.errors.password, setError]);

  function handleLogin(data) {
    setIsLoading(true);
    const payload = {
      email: data.email,
      password: data.password,
    };

    axios
      .post(`https://avir.runasp.net/api/Auth/login`, payload)
      .then((res) => {
        setIsLoading(false);
        if (res.data.token) {
          localStorage.setItem("userToken", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("userName", res.data.name);
          localStorage.setItem("userLang", lang);
          setuserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        const errorMsg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          t.loginFailed;
        setApiError(errorMsg);
      });
  }

  return (
    <div
      className={`min-h-screen bg-white ${lang === "ar" ? "rtl" : "ltr"}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* 🔝 Navbar المبسطة - بدون Language Dropdown */}
      <nav className="w-full bg-pink-200 shadow-sm">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto py-3 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" className="w-auto h-16 object-contain" />
          </Link>

          {/* اليمين: Login | Register فقط */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-6 py-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition text-sm font-medium shadow-sm"
            >
              {t.login}
            </Link>

            <Link
              to="/register"
              className="px-6 py-2 rounded-full bg-white text-pink-600 border-2 border-pink-600 hover:bg-pink-50 transition text-sm font-medium shadow-sm"
            >
              {t.register}
            </Link>
          </div>
        </div>
      </nav>

      {/* 📝 Login Form */}
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4 py-8">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="max-w-md w-full mx-auto bg-white p-6 rounded-lg"
        >
          {apiError && (
            <h1 className="text-center bg-red-600 text-white rounded-md my-2 p-2 font-bold">
              {apiError}
            </h1>
          )}

          <div className="mb-10 text-center">
            <h1 className="font-bold text-4xl font-serif text-gray-900">
              {t.title1}
            </h1>
            <h2 className="italic text-3xl text-pink-700 mt-1 font-serif">
              {t.title2}
            </h2>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.email}
            </label>
            <input
              type="email"
              {...register("email")}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              placeholder=" "
            />
            {formState.errors.email && (
              <p className="text-red-600 font-semibold text-sm mt-1">
                {formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="relative w-full mb-4 group py-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {t.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="block py-2.5 px-0 w-full pr-10 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
                placeholder=" "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-pink-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formState.errors.password && (
              <p className="text-red-600 font-semibold text-sm mt-1 text-center">
                {formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={acceptPolicy}
                onChange={(e) => setAcceptPolicy(e.target.checked)}
                className="w-4 h-4 text-pink-600 border-pink-600 focus:ring-pink-600 rounded"
              />
              {t.rememberMe}
            </label>
            <a
              href="#"
              className="text-sm text-gray-900 hover:underline whitespace-nowrap"
            >
              {t.forgotPassword}{" "}
              <span className="font-medium underline text-pink-700">
                {t.resetHere}
              </span>
            </a>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-3 rounded-full bg-pink-700 hover:bg-pink-800 text-white font-semibold text-lg transition disabled:opacity-50"
          >
            {isLoading ? t.loading : t.signIn}
          </button>
        </form>
      </div>
    </div>
  );
}
