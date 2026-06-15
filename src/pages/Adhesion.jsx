import { useState } from "react";

export default function Adhesion() {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi");
            }

            alert("Votre demande a bien été envoyée.");

            setFormData({
                nom: "",
                prenom: "",
                email: "",
                message: "",
            });
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
                Rejoindre ImaginElles Bzh
            </h1>

            <div className="bg-gray-200 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl dark:text-gray-500 font-semibold mb-4">
                    Comment adhérer ?
                </h2>

                <p className="text-gray-700 mb-4">
                    L'association est ouverte aux femmes cisgenres et transgenres.
                </p>

                <p className="text-gray-700 mb-4">
                    Pour faire partie de l'association, il faut adhérer aux statuts,
                    participer à une rencontre d'accueil et s'acquitter de la cotisation
                    annuelle fixée lors de l'assemblée générale.
                </p>

                <p className="text-gray-700 mb-8">
                    Utilisez le formulaire ci-dessous pour nous contacter et obtenir
                    davantage d'informations.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="grid md:grid-cols-2 gap-6 dark:text-gray-500">
                        <div>
                            <label
                                htmlFor="nom"
                                className="block mb-2 font-medium"
                            >
                                Nom
                            </label>

                            <input
                                id="nom"
                                name="nom"
                                type="text"
                                required
                                value={formData.nom}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="prenom"
                                className="block mb-2 font-medium"
                            >
                                Prénom
                            </label>

                            <input
                                id="prenom"
                                name="prenom"
                                type="text"
                                required
                                value={formData.prenom}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                            />
                        </div>
                    </div>

                    <div className="dark:text-gray-500">
                        <label
                            htmlFor="email"
                            className="block mb-2 font-medium"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <div className="dark:text-gray-500">
                        <label
                            htmlFor="message"
                            className="block mb-2 font-medium"
                        >
                            Message
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-full transition"
                    >
                        Envoyer ma demande
                    </button>
                </form>
            </div>
        </main>
    );
}