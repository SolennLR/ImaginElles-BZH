import SEO from "../components/SEO";
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

            <SEO
                title="Imagin’Elles – Association pour les femmes dans le Pays de Lorient"
                description="Imagin’Elles est une association pour les femmes dans le Pays de Lorient. Elle propose des activités, sorties et rencontres autour de la bienveillance, de la sororité et de la convivialité."
            />

            {/* HERO */}
            <section
                className="py-10 px-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 text-center px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
                    Imagin’Elles
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
                    Un espace bienveillant de partage, de rencontres et de sororité en Bretagne.
                </p>

                <div className="flex gap-3 flex-col sm:flex-row">
                    <Link to="/association" className="bg-purple-700 text-white px-7 py-3 rounded-full text-lg border border-purple-700 hover:bg-transparent hover:text-purple-700 transition">
                        Découvrir l’association
                    </Link>

                    <Link to="/activites" className="border border-purple-700 text-purple-700 px-7 py-3 rounded-full text-lg hover:bg-purple-700 hover:text-white transition" >
                        Nos activités
                    </Link>

                    <Link to="/adhesion" className="bg-purple-700 text-white px-7 py-3 rounded-full text-lg border border-purple-700 hover:bg-transparent hover:text-purple-700 transition">
                        Adhérer
                    </Link>
                </div>
            </section>

            {/* PRESENTATION */}
            <section className="py-10 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-5 text-purple-700">
                    Qui sommes-nous ?
                </h2>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Imagin’Elles est née d’un collectif de femmes souhaitant créer des espaces de partage, d’échange et de solidarité.
                    <br /><br />
                    L’association propose des activités culturelles, sportives et conviviales afin de favoriser le lien social et rompre l’isolement.
                </p>
            </section>

            {/* VALEURS */}
            <ValuesSection />

            {/* ACTIVITIES */}
            <section className="py-10 px-6 max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-5 text-purple-700">
                    Nos activités
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Retrouvez ici les événements à venir de l’association Imagin’Elles.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {upcomingActivities.slice(0, 3).map((activity, i) => (
                        <ActivityCard
                            key={i}
                            {...activity}
                            onClick={() => setSelectedActivity(activity)}
                        />
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link
                        to="/activites"
                        className="inline-block border border-purple-700 text-purple-700 px-6 py-3 rounded-full hover:bg-purple-700 hover:text-white transition"
                    >
                        Voir toutes les activités
                    </Link>
                </div>
                <ActivityModal
                    activity={selectedActivity}
                    onClose={() => setSelectedActivity(null)}
                />
            </section>

            {/* JOIN US */}
            <JoinUsSection/>

            {/* CTA FINAL */}
            <section className="py-10 text-center bg-purple-700 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Rejoindre Imagin’Elles
                </h2>

                <p className="mb-8 text-lg max-w-2xl mx-auto">
                    Venez partager des moments conviviaux, rencontrer d'autres femmes et construire ensemble des projets solidaires.
                </p>

                <Link to="/adhesion" className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:opacity-90 transition">
                    J'adhère
                </Link>
            </section>
        </div>
    )
}