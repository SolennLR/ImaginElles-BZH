export default function Footer() {
    return (
        <footer className="bg-gray-100 mt-20 py-10 text-center text-sm text-gray-600">
            <p className="font-semibold text-purple-700">
                ImaginElles Bzh
            </p>

            <p>Association de partage, sororité et entraide</p>

            <p className="mt-2">
                © {new Date().getFullYear()} - Tous droits réservés
            </p>
        </footer>
    )
}