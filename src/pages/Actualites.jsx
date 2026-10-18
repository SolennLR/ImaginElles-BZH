
import SEO from "../components/SEO";
import { useMemo } from "react";
import { actus } from "../data/actus";

export default function Actu() {
    // Actualités triées de la plus récente à la plus ancienne
    const sortedActus = useMemo(() => {
        return [...actus].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    }, []);

    // Formatage des dates en français
    const formatDate = (date) => {
        return new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="px-6">
            <SEO
                title="Actualités et événements à découvrir – Imagin’Elles"
                description="Découvrez les événements culturels, sorties, rencontres et initiatives locales partagés par Imagin’Elles pour les femmes du Pays de Lorient et ses environs."
            />

            {/* HEADER */}
            <section className="py-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
                    Nos actualités
                </h1>

                <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
                    Des événements, des sorties et des initiatives à découvrir près de chez vous !
                    <br/><br/>
                    Imagin’Elles partage ici des informations sur des événements organisés par d'autres structures et
                    qui pourraient vous intéresser. Culture, loisirs, rencontres, conférences ou initiatives locales :
                    autant d'occasions de découvrir de nouvelles choses et de partager de belles expériences.
                </p>
            </section>

            {/* ACTUALITÉS */}
            <section className="pb-16 max-w-6xl mx-auto">
                {sortedActus.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedActus.map((actu) => {
                            const isExternalLink =
                                actu.link?.startsWith("https://") ||
                                actu.link?.startsWith("http://");

                            return (
                                <article
                                    key={actu.id}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col min-h-[480px]"
                                >
                                    {/* PHOTO */}
                                    {actu.image && (
                                        <img
                                            src={actu.image}
                                            alt={actu.title}
                                            className="w-full aspect-[240/300] object-cover"
                                            loading="lazy"
                                        />
                                    )}

                                    {/* CONTENU */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <p className="text-sm text-purple-600 dark:text-purple-300 mb-2">
                                            {formatDate(actu.date)}
                                        </p>

                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                            {actu.title}
                                        </h2>

                                        {/* LIEN FACULTATIF */}
                                        {actu.link && (
                                            <a
                                                href={actu.link}
                                                target={
                                                    isExternalLink
                                                        ? "_blank"
                                                        : undefined
                                                }
                                                rel={
                                                    isExternalLink
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                className="inline-block mt-4 font-semibold text-purple-700 dark:text-purple-300 hover:underline"
                                            >
                                                Découvrir l'événement →
                                            </a>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Aucune actualité pour le moment.
                    </p>
                )}
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-8">
                    Les événements présentés sont organisés par des structures
                    extérieures à Imagin’Elles.
                </p>
            </section>
        </div>
    );
}
