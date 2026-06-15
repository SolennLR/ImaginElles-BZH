import ActivityCard from '../components/ActivityCard'
import ActivityModal from "../components/ActivityModal";
import {useMemo, useState} from "react";
import { activities } from "../data/activities";

export default function Home() {
    const [selectedActivity, setSelectedActivity] = useState(null);

    // 📅 date du jour normalisée
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const upcomingActivities = activities
        .filter((activity) => new Date(activity.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="px-6">

            {/* HERO */}
            <section className="text-center py-20">
                <h1 className="text-5xl font-bold text-purple-700">
                    ImaginElles Bzh
                </h1>

                <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
                    Association de partage, d’entraide et de sororité en Bretagne.
                </p>

                <button className="mt-6 bg-purple-700 text-white px-6 py-3 rounded-full">
                    Adhérer
                </button>
            </section>

            {/* ACTIVITIES */}
            <section className="py-10">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Nos activités
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Retrouvez ici les événements à venir de l’association ImaginElles Bzh.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {upcomingActivities.map((activity, i) => (
                        <ActivityCard
                            key={i}
                            {...activity}
                            onClick={() => setSelectedActivity(activity)}
                        />
                    ))}
                </div>
                <ActivityModal
                    activity={selectedActivity}
                    onClose={() => setSelectedActivity(null)}
                />
            </section>

        </div>
    )
}