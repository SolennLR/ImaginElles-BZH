import { Link } from "react-router-dom";
import {FaInstagram, FaFacebook, FaEnvelope, FaArrowUp} from "react-icons/fa";

export default function Footer() {
    const handleBackToTop = () => { window.scrollTo({ top: 0, behavior: "smooth", }); };
    return (
        <footer className="relative bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-20">

            {/* 🌈 BANDEAU ARC-EN-CIEL DISCRET */}
            <div className="h-1 w-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 to-purple-600" />

            <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

                {/* CONTACT */}
                <div>
                    <h3 className="text-xl font-bold text-purple-700 mb-4">
                        Contact
                    </h3>

                    <div className="space-y-2">
                        <p>📍 Pays de Lorient, Bretagne, France</p>
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-pink-500"/>
                            <a href="mailto:imaginelles-bzh@ikmail.com?subject=Contact%20ImaginElles%20Bzh"
                               className="hover:text-purple-700 transition-colors"> imaginelles-bzh@ikmail.com
                            </a>
                        </p>
                    </div>
                </div>

                    {/* RESEAUX SOCIAUX */}
                    <div>
                        <h3 className="text-xl font-bold text-purple-700 mb-4">
                            Réseaux sociaux
                        </h3>

                        <div className="flex gap-5 text-2xl">

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-500 transition"
                                aria-label="Instagram"
                            >
                                <FaInstagram/>
                            </a>

                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 transition"
                                aria-label="Facebook"
                            >
                                <FaFacebook/>
                            </a>

                        </div>
                    </div>

                    {/* LEGAL */}
                    <div>
                        <h3 className="text-xl font-bold text-purple-700 mb-4">
                            Informations
                        </h3>

                        <div className="flex flex-col gap-2">
                            <Link to="/mentions-legales" className="hover:text-purple-700 transition">
                                Mentions légales
                            </Link>

                            <Link to="/confidentialite" className="hover:text-purple-700 transition">
                                Politique de confidentialité
                            </Link>
                        </div>
                    </div>

                </div>

            {/* RETOUR EN HAUT */}
            <div className="flex justify-center pb-8">
                <button
                    onClick={handleBackToTop} aria-label="Retour en haut de la page"
                    className=" w-11 h-11 rounded-full bg-purple-700 text-white flex items-center justify-center shadow-md hover:bg-purple-800 hover:-translate-y-1 transition-all "
                >
                    <FaArrowUp />
                </button>
            </div>

                {/* BAS DE FOOTER */}
            <div className="border-t border-gray-300 dark:border-gray-700 text-center py-6 text-sm">
                © {new Date().getFullYear()} Imagin’Elles Bzh - Tous droits réservés
            </div>

        </footer>
    );
}