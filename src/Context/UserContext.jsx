import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsed = JSON.parse(userData);
          const avatar = localStorage.getItem("userAvatar");
          if (avatar) {
            parsed.image = avatar;
            parsed.avatar = avatar;
          }
          setuserLogin(parsed);
          setIsLoading(false);
          return;
        }

        const token = localStorage.getItem("userToken");
        if (token) {
          try {
            const parsed = JSON.parse(token);
            setuserLogin(parsed);
          } catch (e) {
            setuserLogin({ token });
          }
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.error("Failed to load user data:", e);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const updateProfile = (newData) => {
    setuserLogin((prev) => {
      const updated = {
        ...prev,
        ...newData,
        name: newData.name || newData.username || prev?.name || prev?.username || "User",
        email: newData.email || prev?.email || "",
        image: newData.image || newData.avatar || prev?.image || prev?.avatar || null,
      };

      if (newData.image || newData.avatar) {
        localStorage.setItem("userAvatar", newData.image || newData.avatar);
      }

      const dataToSave = { ...updated };
      delete dataToSave.image;
      delete dataToSave.avatar;

      localStorage.setItem("userData", JSON.stringify(dataToSave));

      if (updated.token) {
        localStorage.setItem("userToken", updated.token);
      }

      return updated;
    });
  };

  // ✅ login معدّلة
  const login = (userData) => {
    const token = userData.token || userData.accessToken || userData.jwt || null;

    const data = {
      ...userData,
      name: userData.name || userData.username || "User",
      email: userData.email || "",
      image: userData.image || userData.avatar || null,
      token, // ✅ مش بنحط "token" كنص لو مجاش من الـ API
    };

    if (data.image || data.avatar) {
      localStorage.setItem("userAvatar", data.image || data.avatar);
    }

    setuserLogin(data);

    const dataToSave = { ...data };
    delete dataToSave.image;
    delete dataToSave.avatar;

    localStorage.setItem("userData", JSON.stringify(dataToSave));

    // ✅ بس لو في token حقيقي
    if (token) {
      localStorage.setItem("userToken", token);
    }
  };

  const logout = () => {
    setuserLogin(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userAvatar");
  };

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin, updateProfile, login, logout, isLoading }}>
      {props.children}
    </UserContext.Provider>
  );
}