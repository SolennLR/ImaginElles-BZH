import { Link } from "react-router-dom";
import {FaInstagram, FaFacebook, FaEnvelope} from "react-icons/fa";

export default function Footer() {
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

                    <p className="mb-2">📍 Pays de Lorient, Bretagne, France</p>
                    <p className="flex items-center gap-2">
                        <FaEnvelope className="text-pink-500"/>
                        <a href="mailto:imaginelles-bzh@ikmail.com?subject=Contact%20ImaginElles%20Bzh"
                            className="hover:text-purple-700 transition-colors"> imaginelles-bzh@ikmail.com
                        </a>
                    </p>
                    <p>🤝 ImaginElles Bzh</p>
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
                            className="hover:text-pink-500 transition"
                            aria-label="Instagram"
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://facebook.com"
                            target="_blank"
                            className="hover:text-blue-600 transition"
                            aria-label="Facebook"
                        >
                            <FaFacebook />
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

            {/* BAS DE FOOTER */}
            <div className="border-t border-gray-300 dark:border-gray-700 text-center py-6 text-sm">
                © {new Date().getFullYear()} ImaginElles Bzh — Tous droits réservés
            </div>

        </footer>
    );
}