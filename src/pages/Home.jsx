
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ActivityCard from "../components/ActivityCard";
import ActivityModal from "../components/ActivityModal";
import { getUpcomingActivities } from "../services/activitesService";
import ValuesSection from "../components/ValuesSection";
import JoinUsSection from "../components/JoinUsSection";

export default function Home() {
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
                    "Erreur de chargement des activités sur l'accueil :",
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
                title="Imagin’Elles – Association pour les femmes dans le Pays de Lorient"
                description="Imagin’Elles est une association pour les femmes dans le Pays de Lorient. Elle propose des activités, sorties et rencontres autour de la bienveillance, de la sororité et de la convivialité."
            />

            {/* HERO */}
            <section className="py-10 px-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
                    Imagin’Elles
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
                    Une association pour les femmes dans le Pays de Lorient,
                    autour du partage, des rencontres et de la sororité.
                </p>

                <div className="flex gap-3 flex-col sm:flex-row">
                    <Link
                        to="/association"
                        className="bg-purple-700 text-white px-7 py-3 rounded-full text-lg border border-purple-700 hover:bg-transparent hover:text-purple-700 transition"
                    >
                        Découvrir l’association
                    </Link>

                    <Link
                        to="/activites"
                        className="border border-purple-700 text-purple-700 px-7 py-3 rounded-full text-lg hover:bg-purple-700 hover:text-white transition"
                    >
                        Nos activités
                    </Link>

                    <Link
                        to="/adhesion"
                        className="bg-purple-700 text-white px-7 py-3 rounded-full text-lg border border-purple-700 hover:bg-transparent hover:text-purple-700 transition"
                    >
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
                    Imagin’Elles est née d’un collectif de femmes souhaitant
                    créer des espaces de partage, d’échange et de solidarité
                    dans le Pays de Lorient.
                    <br /><br />
                    L’association propose des activités culturelles, sportives
                    et conviviales afin de favoriser le lien social et rompre
                    l’isolement.
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
                    Découvrez les activités, sorties et rencontres proposées
                    par Imagin’Elles dans le Pays de Lorient.
                </p>
            </section>

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
                        {upcomingActivities.slice(0, 3).map((activity) => (
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
            <JoinUsSection />

            {/* CTA FINAL */}
            <section className="py-10 text-center bg-purple-700 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Rejoindre Imagin’Elles
                </h2>

                <p className="mb-8 text-lg max-w-2xl mx-auto">
                    Venez partager des moments conviviaux, rencontrer d'autres
                    femmes et construire ensemble des projets solidaires.
                </p>

                <Link
                    to="/adhesion"
                    className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold hover:opacity-90 transition"
                >
                    J'adhère
                </Link>
            </section>
        </div>
    );
}
