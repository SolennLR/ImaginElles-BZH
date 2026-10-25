
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminLogin from "./AdminLogin";

export default function AdminGuard({ children }) {
    const [user, setUser] = useState(null);
    const [sessionLoading, setSessionLoading] = useState(true);
    const [profileStatus, setProfileStatus] = useState("checking");

    // Suivi de la session Supabase
    useEffect(() => {
        let mounted = true;

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (mounted) {
                setUser(session?.user ?? null);
                setSessionLoading(false);
            }
        });

        supabase.auth.getSession().then(({ data, error }) => {
            if (!mounted) return;

            if (error) {
                setUser(null);
            } else {
                setUser(data.session?.user ?? null);
            }

            setSessionLoading(false);
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    // Vérification du profil et du rôle
    useEffect(() => {
        let cancelled = false;

        async function checkProfile() {
            if (sessionLoading) return;

            if (!user) {
                setProfileStatus("unauthenticated");
                return;
            }

            setProfileStatus("checking");

            const { data: profile, error } = await supabase
                .from("profiles")
                .select("role, is_active")
                .eq("id", user.id)
                .maybeSingle();

            if (cancelled) return;

            if (error || !profile) {
                setProfileStatus("denied");
                return;
            }

            const authorized =
                profile.is_active === true &&
                ["admin", "collegiale"].includes(profile.role);

            setProfileStatus(authorized ? "authorized" : "denied");
        }

        checkProfile();

        return () => {
            cancelled = true;
        };
    }, [user, sessionLoading]);

    if (sessionLoading || profileStatus === "checking") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Vérification de l'accès…
            </div>
        );
    }

    if (profileStatus === "unauthenticated") {
        return <AdminLogin />;
    }

    if (profileStatus === "denied") {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
                <h1 className="text-2xl font-bold">
                    Accès refusé
                </h1>
                <p>
                    Ton compte ne possède pas les droits nécessaires
                    pour accéder à cette administration.
                </p>
                <button
                    onClick={() => supabase.auth.signOut()}
                    className="rounded-lg bg-pink-700 px-5 py-3 text-white"
                >
                    Se déconnecter
                </button>
            </main>
        );
    }

    return children;
}
