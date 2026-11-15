
import { useState } from "react";
import { supabase } from "../lib/supabase";

import AdminActivities from "./AdminActivities";

const MENU_ITEMS = [
    { id: "activities", label: "Gestion des activités" },
    { id: "news", label: "Gestion des actualités" },
    { id: "members", label: "Gestion des membres" },
    { id: "logs", label: "Accès aux journaux" },
];

export default function AdminLayout() {
    const [signingOut, setSigningOut] = useState(false);
    const [error, setError] = useState("");
    const [activeMenu, setActiveMenu] = useState("activities");

    async function handleSignOut() {
        setSigningOut(true);
        setError("");

        const { error } = await supabase.auth.signOut();

        if (error) {
            setError("La déconnexion a échoué. Réessaie.");
            setSigningOut(false);
        }
    }

    function renderContent() {
        switch (activeMenu) {
            case "activities":
                return <AdminActivities />;

            case "news":
            case "members":
            case "logs":
                return (
                    <div className="rounded-xl border border-gray-200 bg-white dark:bg-gray-800 p-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            Cette rubrique sera développée prochainement.
                        </p>
                    </div>
                );

            default:
                return <AdminActivities />;
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

                <nav className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
                    {MENU_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveMenu(item.id)}
                            aria-current={
                                activeMenu === item.id ? "page" : undefined
                            }
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                activeMenu === item.id
                                    ? "bg-pink-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-pink-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                {renderContent()}
            </main>
        </div>
    );
}
