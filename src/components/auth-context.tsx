"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { isQciMember } from "@/lib/authz";
import { getSupabaseClient } from "@/lib/supabase-client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  signUp: (
    email: string,
    password: string,
    profile: { accessCode: string; firstName: string; lastName: string },
  ) => Promise<void>;
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

        const sessionUser = session?.user ?? null;

        if (sessionUser && !isQciMember(sessionUser)) {
          await supabase.auth.signOut();
          setUser(null);
          setAuthError("This account is not approved for the QCI members portal.");
          return;
        }

        setUser(sessionUser);
        setAuthError(null);

        const {
          data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
          const nextUser = session?.user ?? null;

          if (nextUser && !isQciMember(nextUser)) {
            setUser(null);
            setAuthError("This account is not approved for the QCI members portal.");
            void supabase.auth.signOut();
            return;
          }

          setUser(nextUser);
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

  const signUp = async (
    email: string,
    password: string,
    profile: { accessCode: string; firstName: string; lastName: string },
  ) => {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessCode: profile.accessCode,
        email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        password,
      }),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        typeof result?.error === "string" ? result.error : "Account could not be created.",
      );
    }
  };

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    if (data.user && !isQciMember(data.user)) {
      await supabase.auth.signOut();
      setUser(null);
      throw new Error("This account is not approved for the QCI members portal.");
    }

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
