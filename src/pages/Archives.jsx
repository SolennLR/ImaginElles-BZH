import { useMemo } from "react";
import ActivityCard from "../components/ActivityCard";

import { activities } from "../data/activities";

export default function Archives() {
    // 📅 date du jour normalisée
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    // 📦 filtrage des activités passées
    const archivedActivities = activities
        .filter((activity) => new Date(activity.date) < today)
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // du plus récent au plus ancien

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">

            {/* Titre */}
            <h1 className="text-3xl font-bold text-purple-700 mb-2">
                Archives des activités
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
                Retrouvez ici les événements passés de l’association ImaginElles Bzh.
            </p>

            {/* Grid */}
            {archivedActivities.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                    {archivedActivities.map((activity, i) => (
                        <ActivityCard
                            key={i}
                            {...activity}
                            // pas de modal ici volontairement
                        />
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 dark:text-gray-400">
                    Aucune archive pour le moment.
                </div>
            )}
        </div>
    );
}