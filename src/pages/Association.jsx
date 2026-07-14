import ValuesSection from "../components/ValuesSection";
import Timeline from "../components/Timeline";
import groupeImg from "../assets/groupe.jpg";

export default function Association() {
    return (
        <main>
            <section className="py-12 md:py-20 text-center bg-gray-50 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-6">
                        L’association
                    </h1>

                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-300 mb-10">
                        ImaginElles Bzh est née d’un collectif de femmes lesbiennes souhaitant créer des espaces de
                        partage, d’échange et de sororité en Bretagne.
                    </p>

                    {/* Photo équipe */}
                    <div className="max-w-5xl mx-auto">
                        <img
                            src={groupeImg}
                            alt="L'équipe ImaginElles Bzh"
                            className="w-full aspect-video object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
                    Notre histoire
                </h2>

                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center">
                    À l’origine, ImaginElles Bzh est un groupe de femmes lesbiennes qui souhaitaient sortir de l’isolement et créer
                    des moments simples de rencontre.
                    <br/><br/>
                    Très vite, ces rencontres sont devenues des sorties, des ateliers, puis une véritable dynamique
                    collective tournée vers le partage et la solidarité.
                </p>
            </section>

            <section className="py-20 bg-gray-50 dark:bg-gray-800 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-purple-700 mb-8">
                        Notre mission
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
                            🌱 Favoriser le lien social entre femmes
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
                            🤝 Créer des espaces bienveillants de rencontre
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
                            💜 Lutter contre l’isolement
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow">
                            🌈 Promouvoir l’inclusion et la diversité
                        </div>
                    </div>
                </div>
            </section>

            <ValuesSection/>

            <Timeline/>

            <section className="py-24 text-center bg-purple-700 text-white">
                <h2 className="text-4xl font-bold mb-6">
                    Rejoignez l’aventure
                </h2>

                <p className="mb-8 text-lg">
                    Venez découvrir ImaginElles Bzh et participer à nos prochaines rencontres.
                </p>

                <a
                    href="/adhesion"
                    className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold"
                >
                    Adhérer
                </a>
            </section>

        </main>
    );
}