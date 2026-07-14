import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
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

                    <h1 className="ml-4 text-3xl font-bold text-purple-700 title-animation hidden sm:block">
                        ImaginElles Bzh
                    </h1>
                </Link>

                {/* Menu desktop */}
                <div className="hidden md:flex flex-1 justify-center gap-8">
                    <Link to="/" className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        Accueil
                    </Link>

                    <Link to="/association" className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        L’asso
                    </Link>

                    <Link to="/adhesion" className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        Adhérer
                    </Link>

                    <Link to="/archives" className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        Archives
                    </Link>

                    <Link to="/contact" className="text-gray-800 dark:text-gray-100 hover:text-purple-700 transition-colors duration-200">
                        Contact
                    </Link>
                </div>

                {/* Actions mobile */}
                <div className="flex items-center gap-6 ml-auto md:hidden">
                    <button
                        className="text-2xl"
                        onClick={() => setOpen(!open)}
                        aria-label="Ouvrir le menu"
                    >
                        ☰
                    </button>

                    <DarkToggle />
                </div>

                {/* Dark mode desktop */}
                <div className="hidden md:block flex-shrink-0">
                    <DarkToggle />
                </div>
            </div>

            {/* Menu mobile */}
            {open && (
                <div className="md:hidden mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <Link className="text-lg font-medium" to="/" onClick={() => setOpen(false)}>Accueil</Link>
                        <Link className="text-lg font-medium" to="/association" onClick={() => setOpen(false)}>L’asso</Link>
                        <Link className="text-lg font-medium" to="/adhesion" onClick={() => setOpen(false)}>Adhérer</Link>
                        <Link className="text-lg font-medium" to="/archives" onClick={() => setOpen(false)}>Archives</Link>
                        <Link className="text-lg font-medium" to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}