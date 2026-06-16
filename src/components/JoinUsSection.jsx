import { Link } from "react-router-dom";

export default function JoinUsSection() {
    return (
        <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-purple-700 mb-8">
                    Pourquoi adhérer ?
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="p-6 rounded-2xl shadow">
                        🌿 Participer aux sorties
                    </div>

                    <div className="p-6 rounded-2xl shadow">
                        🤝 Rencontrer d'autres femmes
                    </div>

                    <div className="p-6 rounded-2xl shadow">
                        💜 Soutenir l'association
                    </div>

                    <div className="p-6 rounded-2xl shadow">
                        ✨ Construire des projets ensemble
                    </div>
                </div>

                <Link
                    to="/adhesion"
                    className="bg-purple-700 text-white px-8 py-4 rounded-full hover:bg-purple-800 transition"
                >
                    Rejoindre ImaginElles Bzh
                </Link>
            </div>
        </section>
    );
}