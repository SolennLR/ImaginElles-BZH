import { Link } from "react-router-dom";
import ActivityCard from '../components/ActivityCard'
import ActivityModal from "../components/ActivityModal";
import {useMemo, useState} from "react";
import { activities } from "../data/activities";
import ValuesSection from "../components/ValuesSection";
import JoinUsSection from "../components/JoinUsSection";

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
            <section
                className="min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-6 py-8">
                <h1 className="text-5xl md:text-6xl font-bold text-purple-700 mb-6">
                    ImaginElles Bzh
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                    Un espace bienveillant de partage, de rencontres et de sororité en Bretagne.
                </p>

                <div className="flex gap-4 flex-col sm:flex-row">
                    <Link to="/association" className="bg-purple-700 text-white px-8 py-4 rounded-full text-lg hover:opacity-90 transition">
                        Découvrir l’association
                    </Link>

                    <Link to="/adhesion" className="border border-purple-700 text-purple-700 px-8 py-4 rounded-full text-lg hover:bg-purple-700 hover:text-white transition">
                        Adhérer
                    </Link>
                </div>
            </section>

            {/* PRESENTATION */}
            <section className="py-20 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6 text-purple-700">
                    Qui sommes-nous ?
                </h2>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    ImaginElles Bzh est née d’un collectif de femmes lesbiennes souhaitant créer des espaces de partage, d’échange et de solidarité.
                    <br /><br />
                    L’association propose des activités culturelles, sportives et conviviales afin de favoriser le lien social et rompre l’isolement.
                </p>
            </section>

            {/* VALEURS */}
            <ValuesSection />

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

            {/* JOIN US */}
            <JoinUsSection />

            {/* CTA FINAL */}
            <section className="py-24 text-center bg-purple-700 text-white">
                <h2 className="text-4xl font-bold mb-6">
                    Rejoindre ImaginElles Bzh
                </h2>

                <p className="mb-8 text-lg max-w-2xl mx-auto">
                    Venez partager des moments conviviaux, rencontrer d'autres femmes et construire ensemble des projets solidaires.
                </p>

                <Link to="/contact" className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:opacity-90 transition">
                    Nous contacter
                </Link>
            </section>

        </div>
    )
}