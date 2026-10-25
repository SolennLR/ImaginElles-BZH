import SEO from "../components/SEO";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivityModal from "../components/ActivityModal";
import { getArchivedActivities } from "../services/activitesService";

export default function Archives() {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [archivedActivities, setArchivedActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Chargement des archives depuis la source configurée
    // dans .env.local : local ou supabase.
    useEffect(() => {
        let cancelled = false;

        async function loadArchives() {
            try {
                setLoading(true);
                setError(null);

                const data = await getArchivedActivities();

                if (!cancelled) {
                    setArchivedActivities(data);
                }
            } catch (err) {
                console.error(
                    "Erreur de chargement des archives :",
                    err
                );

                if (!cancelled) {
                    setError("Impossible de charger les archives.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadArchives();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
            <SEO
                title="Archives des activités – Imagin’Elles"
                description="Retrouvez les activités, sorties et rencontres passées organisées par Imagin’Elles pour les femmes dans le Pays de Lorient."
            />

            {/* HEADER */}
            <section className="py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
                    Archives des activités
                </h1>

                <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
                    Retrouvez ici les événements passés de l’association Imagin’Elles.
                </p>
            </section>

            {/* Grid */}
            <section className="pb-16 max-w-6xl mx-auto">
                {loading ? (
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Chargement des archives...
                    </p>
                ) : error ? (
                    <p
                        role="alert"
                        className="text-center text-red-600 dark:text-red-400"
                    >
                        {error}
                    </p>
                ) : archivedActivities.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {archivedActivities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                {...activity}
                                onClick={() => setSelectedActivity(activity)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        Aucune archive pour le moment.
                    </div>
                )}

                {/* Modal */}
                <ActivityModal
                    activity={selectedActivity}
                    onClose={() => setSelectedActivity(null)}
                />
            </section>
        </div>
    );
}
