import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {  // user가 login상태인지 확인
      if (user) {
        setIsLoggedIn(true);
        console.log("loading")
      }
      setIsLoading(false);
    });
  }, []);

  return { isLoggedIn, isLoading };
};

export default useAuthStatus;
