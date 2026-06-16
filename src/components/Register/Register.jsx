import React, { useState, useContext } from "react";
import style from "./Register.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "../LanguageContext/LanguageContext";
import { UserContext } from "../../Context/UserContext"; // ← جديد

export default function Register() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { login } = useContext(UserContext); // ← جديد

  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptEmails, setAcceptEmails] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const t = {
    en: {
      createProfile: "Create your profile",
      username: "UserName",
      email: "Email",
      password: "Password",
      rePassword: "rePassword",
      dateOfBirth: "dateOfBirth",
      acceptEmails: "Yes, I would like to receive emails from Avir about updates and ways to support.",
      acceptPolicy: "By signing up, I agree to the Privacy Policy and Terms of Use",
      signUp: "Sign Up",
      loading: "Loading...",
      usernameError: "username is required",
      usernameLong: "username is too long",
      emailError: "invalid email",
      passwordError: "must include at least 1 capital letter, 1 small letter, 1 special char, 1 number, min length 8",
      rePasswordError: "passwords do not match",
      dateError: "invalid date",
      futureDate: "cannot be future date",
      policyError: "You must agree to the Privacy Policy and Terms of Use.",
      registerFailed: "Registration failed"
    },
    ar: {
      createProfile: "أنشئي ملفك الشخصي",
      username: "اسم المستخدم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      rePassword: "تأكيد كلمة المرور",
      dateOfBirth: "تاريخ الميلاد",
      acceptEmails: "نعم، أرغب في استلام رسائل بريد إلكتروني من Avir حول التحديثات وطرق الدعم.",
      acceptPolicy: "بالتسجيل، أوافق على سياسة الخصوصية وشروط الاستخدام",
      signUp: "إنشاء حساب",
      loading: "جاري التحميل...",
      usernameError: "اسم المستخدم مطلوب",
      usernameLong: "اسم المستخدم طويل جداً",
      emailError: "بريد إلكتروني غير صالح",
      passwordError: "يجب أن تحتوي على حرف كبير وحرف صغير ورقم ورمز خاص، 8 أحرف على الأقل",
      rePasswordError: "كلمات المرور غير متطابقة",
      dateError: "تاريخ غير صالح",
      futureDate: "لا يمكن أن يكون تاريخ في المستقبل",
      policyError: "يجب الموافقة على سياسة الخصوصية وشروط الاستخدام.",
      registerFailed: "فشل التسجيل"
    }
  }[lang];

  const schema = z
    .object({
      username: z.string().min(1, t.usernameError).max(10, t.usernameLong),
      email: z.string().email(t.emailError),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          t.passwordError
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, t.dateError)
        .refine((date) => {
          const userDate = new Date(date);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          return userDate < now;
        }, t.futureDate),
    })
    .refine((object) => object.password === object.rePassword, {
      message: t.rePasswordError,
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
    },
    resolver: zodResolver(schema),
  });

  let { register, handleSubmit, formState } = form;

  function handleRegister(data) {
    if (!acceptPolicy) {
      setError(t.policyError);
      return;
    }

    setError("");
    setIsLoading(true);

    const payload = {
      username: data.username,
      email: data.email,
      dateOfBirth: new Date(data.dateOfBirth).toISOString(),
      password: data.password,
    };

    axios
      .post(`http://avir1.runasp.net/api/Auth/register`, payload)
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          // ← جديد: خزن في Context (هيخزن في localStorage كمان)
          login({
            name: data.username,
            username: data.username,
            email: data.email,
            password: data.password,
            token: res.data.token || "token",
            userId: res.data.userId,
            image: null,
            avatar: null,
            lang: lang
          });
          
          navigate("/profile"); // ← روح للبروفايل
        }
      })
      .catch((err) => {
        setIsLoading(false);
        const errorMsg = err.response?.data?.message || err.response?.data?.error || t.registerFailed;
        setapiError(errorMsg);
      });
  }

  return (
    <>
      <div className="text-center pt-20 mt-2 pb-0">
        <h1 className="text-center my-5 text-stone-900 rounded-md text-5xl p-2 font-Poltawski">
          {t.createProfile}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="max-w-lg my-4 mx-auto border border-pink-700 p-10 rounded-xl border-rounded m-16 w-full"
      >
        {apiError && (
          <h1 className="text-center my-5 bg-red-600 text-white rounded-md p-2 font-bold">
            {apiError}
          </h1>
        )}

        {/* Username */}
        <div className="relative z-0 w-full mb-4 group py-2">
          <input
            type="text"
            {...register("username")}
            id="username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
          />
          <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-pink-600">
            {t.username}
          </label>
          {formState.errors.username && formState.touchedFields.username && (
            <p className="text-red-600 font-semibold text-center my-2">{formState.errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative z-0 w-full mb-4 group py-2">
          <input
            type="email"
            {...register("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
          />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-pink-600">
            {t.email}
          </label>
          {formState.errors.email && formState.touchedFields.email && (
            <p className="text-red-600 font-semibold text-center my-2">{formState.errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-4 group py-2">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            id="password"
            className="block py-2.5 px-0 w-full pr-10 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
          />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-pink-600">
            {t.password}
          </label>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {formState.errors.password && formState.touchedFields.password && (
            <p className="text-red-600 font-semibold text-center my-2">{formState.errors.password.message}</p>
          )}
        </div>

        {/* RePassword */}
        <div className="relative z-0 w-full mb-4 group py-2">
          <input
            type={showRePassword ? "text" : "password"}
            {...register("rePassword")}
            id="rePassword"
            className="block py-2.5 px-0 w-full pr-10 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
          />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-pink-600">
            {t.rePassword}
          </label>
          <button type="button" onClick={() => setShowRePassword(!showRePassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600">
            {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {formState.errors.rePassword && formState.touchedFields.rePassword && (
            <p className="text-red-600 font-semibold text-center my-2">{formState.errors.rePassword.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="relative z-0 w-full mb-4 group py-3">
          <input
            type="date"
            {...register("dateOfBirth")}
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
            placeholder=" "
          />
          <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-pink-600">
            {t.dateOfBirth}
          </label>
          {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && (
            <p className="text-red-600 font-semibold text-center my-2">{formState.errors.dateOfBirth.message}</p>
          )}
        </div>

        {/* Checkboxes */}
        <div className="pt-0 flex flex-wrap rounded-lg w-full mx-auto pb-5">
          <div className="mb-3 flex flex-nowrap">
            <label className="flex whitespace-nowrap items-center gap-2">
              <input
                type="checkbox"
                checked={acceptEmails}
                onChange={(e) => setAcceptEmails(e.target.checked)}
                className="ml-0 pl-0 border border-pink-600 w-4 h-4 text-pink-600 rounded focus:ring-2 focus:ring-pink-600"
              />
              <span className="whitespace-nowrap text-xs pl-0">{t.acceptEmails}</span>
            </label>
          </div>
          <div className="mb-1">
            <label className="flex items-center gap-2 pl-0">
              <input
                type="checkbox"
                checked={acceptPolicy}
                onChange={(e) => setAcceptPolicy(e.target.checked)}
                className="ml-0 pl-0 border border-pink-600 w-4 h-4 text-pink-600 rounded focus:ring-2 focus:ring-pink-600"
              />
              <span className="text-xs whitespace-nowrap pl-0">{t.acceptPolicy}</span>
            </label>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
        </div>

        {/* Submit */}
        <button
          disabled={isLoading}
          type="submit"
          className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none pt-1 focus:ring-pink-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading ? <i className="fas fa-spinner fa-spin text-white"></i> : t.signUp}
        </button>
      </form>
    </>
  );
}
