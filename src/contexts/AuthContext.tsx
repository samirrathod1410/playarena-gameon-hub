import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

type AppRole = "user" | "owner" | "admin";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  roles: AppRole[];
  hasRole: (role: AppRole) => boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<AppRole[]>([]);

  const fetchRoles = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      if (data) {
        setRoles(data.map((r: { role: AppRole }) => r.role));
      }
    } catch {
      // Never block auth flow if role fetch fails due to network issues
      setRoles([]);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => fetchRoles(session.user.id), 0);
        } else {
          setRoles([]);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchRoles(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    toast.success("Check your email to confirm your account!");
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    toast.success("Welcome back!");

 codex/fetch-login-and-booking-details-pgjoxa
    // Never fail login if audit logging fails
    if (data.user) {
      void (async () => {
        try {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user.id);

          const roles = roleData?.map((r: { role: AppRole }) => r.role) || [];

          await supabase.from("login_logs").insert({
            user_id: data.user.id,
            email: data.user.email || email,
            full_name: (data.user.user_metadata?.full_name as string | undefined) || null,
            roles,
            user_agent: navigator.userAgent,
          });

          if (roles.includes("admin") || roles.includes("owner")) {
            await supabase.from("admin_logs").insert({ admin_id: data.user.id });
          }
        } catch {
          // ignore non-critical logging errors
        }
      })();

codex/fetch-login-and-booking-details-mluzpu


 main
    // Never fail login if audit logging fails
    if (data.user) {
      void (async () => {
        try {
          const { data: roleData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user.id);

          const roles = roleData?.map((r: { role: AppRole }) => r.role) || [];

          await supabase.from("login_logs").insert({
            user_id: data.user.id,
            email: data.user.email || email,
            full_name: (data.user.user_metadata?.full_name as string | undefined) || null,
            roles,
            user_agent: navigator.userAgent,
          });

          if (roles.includes("admin") || roles.includes("owner")) {
            await supabase.from("admin_logs").insert({ admin_id: data.user.id });
          }
        } catch {
          // ignore non-critical logging errors
        }
      })();
 codex/fetch-login-and-booking-details-mluzpu

    // Log login details so admin/owner can track all logins from dashboard
    if (data.user) {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);

      const roles = roleData?.map((r: any) => r.role) || [];

      supabase.from("login_logs").insert({
        user_id: data.user.id,
        email: data.user.email || email,
        full_name: (data.user.user_metadata?.full_name as string | undefined) || null,
        roles,
        user_agent: navigator.userAgent,
      }).then(() => {});

      if (roles.includes("admin") || roles.includes("owner")) {
        supabase.from("admin_logs").insert({ admin_id: data.user.id }).then(() => {});
      }
 main
 main
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setRoles([]);
    toast.success("Logged out successfully");
  };

  const hasRole = (role: AppRole) => roles.includes(role);

  return (
    <AuthContext.Provider value={{ user, session, loading, roles, hasRole, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
