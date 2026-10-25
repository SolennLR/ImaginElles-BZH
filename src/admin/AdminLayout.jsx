
import { useState } from "react";
import { supabase } from "../lib/supabase";

import AdminActivities from "./AdminActivities";

export default function AdminLayout() {
    const [signingOut, setSigningOut] = useState(false);
    const [error, setError] = useState("");

    async function handleSignOut() {
        setSigningOut(true);
        setError("");

        const { error } = await supabase.auth.signOut();

        if (error) {
            setError("La déconnexion a échoué. Réessaie.");
            setSigningOut(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
                    <div>
                        <h1 className="text-xl font-bold">
                            Administration Imagin’Elles
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Gestion du site de l’association
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="rounded-lg border px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                        {signingOut ? "Déconnexion…" : "Se déconnecter"}
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-8">
                {error && (
                    <p role="alert" className="mb-4 text-red-600">
                        {error}
                    </p>
                )}

                <h2 className="text-2xl font-semibold mb-3">
                    Tableau de bord
                </h2>

                <AdminActivities />
            </main>
        </div>
    );
}
