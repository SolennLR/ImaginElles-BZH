import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo transparent.PNG";
import DarkToggle from "./DarkToggle";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="flex items-center">
                {/* Logo + Nom */}
                <Link to="/" className="flex items-center">
                    <img
                        src={logo}
                        alt="Logo Imagin'Elles"
                        className="h-32 w-auto logo-animation"
                    />
                </Link>

                {/* Menu desktop */}
                <div className="hidden lg:flex flex-1 justify-center gap-8">
                    <Link to="/" className="text-lg text-gray-800 hover:text-purple-700 transition-colors duration-200">
                        Accueil
                    </Link>

                    <Link to="/association" className="text-lg text-gray-800 hover:text-purple-700 transition-colors duration-200">
                        L’asso
                    </Link>

                    <Link to="/activites" className="text-lg text-gray-800 hover:text-purple-700 transition-colors duration-200" >
                        Activités
                    </Link>

                    <Link to="/adhesion" className="text-lg text-gray-800 hover:text-purple-700 transition-colors duration-200">
                        Adhérer
                    </Link>

                    <Link to="/archives" className="text-lg text-gray-800 hover:text-purple-700 transition-colors duration-200">
                        Archives
                    </Link>

                    <Link to="/faq" className="text-lg text-gray-800 hover:text-purple-700 transition-colors duration-200">
                        FAQ
                    </Link>

                    <Link to="/contact" className="text-lg text-gray-800 hover:text-purple-700 transition-colors duration-200">
                        Contact
                    </Link>
                </div>

                {/* Actions mobile */}
                <div className="flex items-center gap-6 ml-auto lg:hidden">
                    <button
                        className="text-2xl text-gray-800"
                        onClick={() => setOpen(!open)}
                        aria-label="Ouvrir le menu"
                    >
                        ☰
                    </button>

                    <DarkToggle />
                </div>

                {/* Dark mode desktop */}
                <div className="hidden lg:block flex-shrink-0">
                    <DarkToggle />
                </div>
            </div>

            {/* Menu mobile */}
            {open && (
                <div className="lg:hidden mt-4 border-t border-gray-200 pt-4 bg-white text-gray-800">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <Link className="text-lg font-medium" to="/" onClick={() => setOpen(false)}>Accueil</Link>
                        <Link className="text-lg font-medium" to="/association" onClick={() => setOpen(false)}>L’asso</Link>
                        <Link className="text-lg font-medium" to="/activites" onClick={() => setOpen(false)} > Activités </Link>
                        <Link className="text-lg font-medium" to="/adhesion" onClick={() => setOpen(false)}>Adhérer</Link>
                        <Link className="text-lg font-medium" to="/archives" onClick={() => setOpen(false)}>Archives</Link>
                        <Link className="text-lg font-medium" to="/faq" onClick={() => setOpen(false)}>FAQ</Link>
                        <Link className="text-lg font-medium" to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}