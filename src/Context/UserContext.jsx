import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  const [userLogin, setuserLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        // Try to load full user data first
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsed = JSON.parse(userData);
          
          // Load avatar separately (if exists)
          const avatar = localStorage.getItem("userAvatar");
          if (avatar) {
            parsed.image = avatar;
            parsed.avatar = avatar;
          }
          
          setuserLogin(parsed);
          setIsLoading(false);
          return;
        }
        
        // Fallback to old token only
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

  // Update profile function
  const updateProfile = (newData) => {
    setuserLogin((prev) => {
      const updated = { 
        ...prev, 
        ...newData,
        name: newData.name || newData.username || prev?.name || prev?.username || "User",
        email: newData.email || prev?.email || "",
        image: newData.image || newData.avatar || prev?.image || prev?.avatar || null,
      };
      
      // Save avatar separately to avoid localStorage size issues
      if (newData.image || newData.avatar) {
        localStorage.setItem("userAvatar", newData.image || newData.avatar);
      }
      
      // Remove userData from the object before saving (to avoid circular reference)
      const dataToSave = { ...updated };
      delete dataToSave.image; // Don't save image in userData (save separately)
      delete dataToSave.avatar;
      
      localStorage.setItem("userData", JSON.stringify(dataToSave));
      
      if (updated.token) {
        localStorage.setItem("userToken", updated.token);
      }
      
      return updated;
    });
  };

  // Login function (called from Login/Register)
  const login = (userData) => {
    const data = {
      ...userData,
      name: userData.name || userData.username || "User",
      email: userData.email || "",
      image: userData.image || userData.avatar || null,
      token: userData.token || userData.accessToken || "token",
    };
    
    // Save avatar separately
    if (data.image || data.avatar) {
      localStorage.setItem("userAvatar", data.image || data.avatar);
    }
    
    setuserLogin(data);
    
    // Save without image to avoid size issues
    const dataToSave = { ...data };
    delete dataToSave.image;
    delete dataToSave.avatar;
    
    localStorage.setItem("userData", JSON.stringify(dataToSave));
    localStorage.setItem("userToken", data.token);
  };

  // Logout function
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
