import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

export default function DarkToggle() {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 px-3 py-2 rounded-full border"
        >
            {darkMode ? "☀️" : "🌙"}
        </button>
    );
}