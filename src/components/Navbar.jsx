import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.jpg";
import DarkToggle from "./DarkToggle";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4">
            <div className="flex items-center">
                {/* Logo + Nom */}
                <Link to="/" className="flex items-center flex-shrink-0">
                    <img
                        src={logo}
                        alt="Logo ImaginElles Bzh"
                        className="h-32 w-auto logo-animation"
                    />

                    <h1 className="ml-4 text-3xl font-bold text-purple-700 title-animation">
                        ImaginElles Bzh
                    </h1>
                </Link>

                {/* Menu desktop */}
                <div className="hidden md:flex flex-1 justify-center gap-8">
                    <Link to="/"
                          className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        Accueil
                    </Link>

                    <Link to="/asso"
                          className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        L’asso
                    </Link>

                    <Link to="/adhesion"
                          className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        Adhérer
                    </Link>

                    <Link to="/archives"
                          className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        Archives
                    </Link>

                    <Link to="/contact"
                          className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        Contact
                    </Link>
                </div>

                {/* Bouton Dark Mode */}
                <div className="flex-shrink-0">
                    <DarkToggle/>
                </div>

                {/* Menu burger mobile */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setOpen(!open)}
                >
                    ☰
                </button>


                {/* Menu mobile */}
                {open && (
                    <div className="flex flex-col gap-4 mt-4 md:hidden">
                        <Link to="/">Accueil</Link>
                        <Link to="/asso">L’asso</Link>
                        <Link to="/adhesion">Adhérer</Link>
                        <Link to="/archives">Archives</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}