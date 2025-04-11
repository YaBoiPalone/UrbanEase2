import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase"; // Adjust path if needed

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.log("Session Error:", error.message);
        setLoading(false);
        return;
      }
      if (session?.user) {
        setUser(session.user);
        setRole(session.user.email === "admin@gmail.com" ? "admin" : "user");
      }
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setRole(session.user.email === "admin@gmail.com" ? "admin" : "user");
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      listener.subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data?.user) {
      console.log("Login error:", error?.message || "No user returned");
      return null;
    }

    const user = data.user;
    setUser(user);
    setRole(user.email === "admin@gmail.com" ? "admin" : "user");
    return user;
  };

  const signUp = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for confirmation.");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, signIn, signUp, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
