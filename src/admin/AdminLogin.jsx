
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        if (error) {
            setError("Connexion impossible. Vérifie ton adresse e-mail et ton mot de passe.");
            setLoading(false);
            return;
        }

        // La vérification du profil et des droits sera faite
        // par la protection de la route d'administration.
        window.location.href = "/admin";
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-xl bg-white dark:bg-gray-800 p-8 shadow-lg"
            >
                <h1 className="text-2xl font-bold mb-2">
                    Administration Imagin’Elles
                </h1>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    Connecte-toi pour gérer les activités de l’association.
                </p>

                <label htmlFor="admin-email" className="block mb-1">
                    Adresse e-mail
                </label>
                <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-lg border p-3 mb-4 text-gray-900"
                />

                <label htmlFor="admin-password" className="block mb-1">
                    Mot de passe
                </label>
                <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-lg border p-3 mb-4 text-gray-900"
                />

                {error && (
                    <p role="alert" className="text-red-600 text-sm mb-4">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-pink-700 text-white font-semibold p-3 disabled:opacity-50"
                >
                    {loading ? "Connexion…" : "Se connecter"}
                </button>
            </form>
        </main>
    );
}
