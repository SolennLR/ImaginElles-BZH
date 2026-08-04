import { useState } from "react";
import { FiMail } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";

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
                    Pour rejoindre ImaginElles Bzh, il est nécessaire d'adhérer aux statuts de l'association,
                    de participer à une rencontre d'accueil et de s'acquitter de la cotisation annuelle,
                    dont le montant est fixé lors de l'assemblée générale.
                </p>

                <p className="text-gray-700 mb-4">
                    Vous souhaitez en savoir plus avant de nous rejoindre ?
                    Utilisez le formulaire ci-dessous pour nous contacter et obtenir
                    davantage d'informations.
                </p>

                <p className="text-gray-700 mb-8">
                    Vous êtes prête à nous rejoindre ? Vous pouvez également finaliser
                    directement votre adhésion en ligne via HelloAsso.
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

                    <div className="mt-8 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                        {/* Bouton Envoyer */}
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-full transition w-full md:w-auto"
                        >
                            <FiMail size={18}/>
                            Envoyer ma demande
                        </button>

                        {/* Bouton HelloAsso */}
                        <a
                            href="https://www.helloasso.com/associations/imaginelles/adhesions/adhesion-2026-2027"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-full transition w-full md:w-auto"
                        >
                            <FiHeart size={18}/>
                            J'adhère via HelloAsso
                        </a>
                    </div>
                </form>
            </div>
        </main>
    )
        ;
}