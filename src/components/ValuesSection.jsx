export default function ValuesSection() {
    const values = [
        {
            icon: "🤝",
            title: "Sororité",
            description: "Créer du lien et avancer ensemble."
        },
        {
            icon: "💜",
            title: "Bienveillance",
            description: "Un espace respectueux et accueillant."
        },
        {
            icon: "🌈",
            title: "Inclusion",
            description: "Toutes les femmes ont leur place."
        },
        {
            icon: "🌱",
            title: "Entraide",
            description: "Se soutenir dans les moments importants."
        },
        {
            icon: "✨",
            title: "Partage",
            description: "Créer des souvenirs et des rencontres."
        }
    ];

    return (
        <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12 text-purple-700">
                    Nos valeurs
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg text-center hover:scale-105 transition"
                        >
                            <div className="text-5xl mb-4">{value.icon}</div>
                            <h3 className="text-xl font-bold mb-3">
                                {value.title}
                            </h3>
                            <p>{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}