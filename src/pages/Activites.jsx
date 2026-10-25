
import SEO from "../components/SEO";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivityModal from "../components/ActivityModal";
import { getUpcomingActivities } from "../services/activitesService";

export default function Activites() {
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [upcomingActivities, setUpcomingActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Chargement des activités depuis la source configurée
    // dans .env.local : local ou supabase.
    useEffect(() => {
        let cancelled = false;

        async function loadActivities() {
            try {
                setLoading(true);
                setError(null);

                const data = await getUpcomingActivities();

                if (!cancelled) {
                    setUpcomingActivities(data);
                }
            } catch (err) {
                console.error(
                    "Erreur de chargement des activités :",
                    err
                );

                if (!cancelled) {
                    setError("Impossible de charger les activités.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadActivities();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="px-6">
            <SEO
                title="Activités et sorties pour les femmes – Imagin’Elles"
                description="Découvrez les activités, sorties et rencontres proposées par Imagin’Elles aux femmes dans le Pays de Lorient et ses environs."
            />

            {/* HEADER */}
            <section className="py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
                    Nos activités
                </h1>

                <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
                    Retrouvez les activités et événements à venir de l’association
                    Imagin’Elles.
                </p>
            </section>

            {/* ACTIVITIES */}
            <section className="pb-16 max-w-6xl mx-auto">
                {loading ? (
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Chargement des activités...
                    </p>
                ) : error ? (
                    <p
                        role="alert"
                        className="text-center text-red-600 dark:text-red-400"
                    >
                        {error}
                    </p>
                ) : upcomingActivities.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingActivities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                {...activity}
                                onClick={() => setSelectedActivity(activity)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Aucune activité à venir pour le moment.
                    </p>
                )}

                <ActivityModal
                    activity={selectedActivity}
                    onClose={() => setSelectedActivity(null)}
                />
            </section>
        </div>
    );
}
