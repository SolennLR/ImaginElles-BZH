export default function Timeline() {
    const events = [
        { year: "2026", text: "Premières sorties et ateliers" },
        { year: "2026", text: "Création officielle de l’association" },
        { year: "2027", text: "Développement des activités" }
    ];

    return (
        <section className="py-20 px-6">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-12">
                Notre parcours
            </h2>

            <div className="max-w-3xl mx-auto">
                {events.map((e, i) => (
                    <div key={i} className="flex items-start gap-6 mb-8">
                        <div className="text-xl font-bold text-purple-700 w-20">
                            {e.year}
                        </div>

                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow flex-1">
                            {e.text}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}