export default function JoinUsSection() {
    return (
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-purple-700 mb-8">
                    Pourquoi adhérer ?
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900">
                        🌿 Participer aux sorties
                    </div>

                    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900">
                        🤝 Rencontrer d'autres femmes
                    </div>

                    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900">
                        💜 Soutenir l'association
                    </div>

                    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-900">
                        ✨ Construire des projets ensemble
                    </div>
                </div>
            </div>
        </section>
    );
}