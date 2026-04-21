"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase-client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    let subscription: { unsubscribe: () => void } | undefined;

    const initializeAuth = async () => {
      try {
        const supabase = getSupabaseClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isActive) {
          return;
        }

        setUser(session?.user ?? null);
        setAuthError(null);

        const {
          data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
          setAuthError(null);
        });

        subscription = authSubscription;
      } catch (error) {
        if (!isActive) {
          return;
        }

        const message = error instanceof Error ? error.message : "Auth error";
        setAuthError(message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isActive = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setUser(data.user ?? null);
    setAuthError(null);
  };

  const signOut = async () => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
