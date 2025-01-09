import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../helper/supabaseClient";

const AuthContext = createContext();

// AuthProvider komponenti
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    getUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === "function") {
        subscription.unsubscribe();
      }
    };
  }, []);

  const canReadOnly = () => !user;

  const canCreateOrInteract = () => !!user;

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    canReadOnly,
    canCreateOrInteract,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
