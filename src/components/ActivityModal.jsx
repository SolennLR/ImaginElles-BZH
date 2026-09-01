export default function ActivityModal({ activity, onClose }) {
    if (!activity) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-2xl w-[90%]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Croix de fermeture */}
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Fermer"
                    className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-2xl text-gray-600 shadow-md transition hover:bg-gray-100 hover:text-gray-900"
                >
                    ×
                </button>

                {/* Contenu */}
                <div className="p-6 sm:p-8">
                    <h2 className="text-3xl font-bold mb-6">
                        {activity.title}
                    </h2>

                    <div className="space-y-4">

                        <p>
                            <strong>Votre référente : </strong>
                            {activity.referente}
                        </p>

                        <p>
                            <strong>👥 Qui ?</strong><br/>
                            {activity.who}
                        </p>

                        <p>
                            <strong>📅 Quand ?</strong><br/>
                            {activity.when}
                        </p>

                        <p>
                            <strong>💶 Tarif : </strong>
                            {activity.price}
                        </p>

                        <p>
                            <strong>📍 Où ?</strong><br/>
                            {activity.where}
                        </p>

                        <p className="leading-relaxed whitespace-pre-line">
                            <strong>📝 Description détaillée : </strong><br/>
                            {activity.details}
                        </p>
                    </div>
                </div>

                {/* Bouton inscription */}
                {activity.helloasso && (
                    <div className="mt-8 flex justify-center border-t border-gray-200 pt-6">
                        <a
                            href={activity.helloasso}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full bg-[#7B2CBF] px-8 py-3 font-semibold text-white shadow-md transition hover:bg-white hover:text-[#7B2CBF] hover:ring-2 hover:ring-[#7B2CBF]"
                        >
                            Inscription
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}