const faqItems = [
    {
        question: "Qui peut adhérer à l’association Imagin’Elles Bzh ?",
        answer:
            "L’association est ouverte à toutes les femmes souhaitant participer aux activités, partager des moments conviviaux et créer du lien."
    },
    {
        question: "Comment adhérer à l’association ?",
        answer:
            "Vous pouvez adhérer en ligne depuis la page Adhérer. La cotisation permet de soutenir les activités et le fonctionnement de l’association."
    },
    {
        question: "Les activités sont-elles obligatoires ?",
        answer:
            "Non. Chaque adhérente participe aux activités selon ses envies et ses disponibilités."
    },
    {
        question: "Puis-je participer à une activité avant d’adhérer ?",
        answer:
            "Selon les activités proposées, une participation découverte peut être possible. N’hésitez pas à nous contacter pour en discuter."
    },
    {
        question: "Où se déroulent les activités ?",
        answer:
            "Les activités sont organisées principalement dans le Morbihan et peuvent varier selon les événements."
    },
    {
        question: "Comment suivre les prochaines sorties ?",
        answer:
            "Les prochaines activités sont disponibles sur la page d’accueil et dans la rubrique des activités."
    }
];

export default function FAQ() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">

            <h1 className="text-3xl font-bold text-purple-700 mb-8">
                Foire aux questions
            </h1>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqItems.map((item, index) => (
                    <details
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow p-5"
                    >
                        <summary className="cursor-pointer font-semibold text-purple-700">
                            {item.question}
                        </summary>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.answer}
                        </p>
                    </details>
                ))}
            </div>

        </div>
    );
}