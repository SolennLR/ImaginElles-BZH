import SEO from "../components/SEO";
import { useMemo, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivityModal from "../components/ActivityModal";
import { activities } from "../data/activities";

export default function Activites() {
    const [selectedActivity, setSelectedActivity] = useState(null);

    // 📅 Date du jour normalisée
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    // Activités à venir, triées par date
    const upcomingActivities = activities
        .filter((activity) => new Date(activity.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

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

                {upcomingActivities.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcomingActivities.map((activity, i) => (
                            <ActivityCard
                                key={i}
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