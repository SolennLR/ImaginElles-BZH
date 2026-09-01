export default function ActivityModal({ activity, onClose }) {
    if (!activity) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl h-[80vh] max-h-[700px]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* En-tête */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2
                        className="pr-4 text-2xl font-bold"
                        style={{color: activity.color}}
                    >
                        {activity.title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fermer"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        ×
                    </button>
                </div>

                {/* Contenu défilant */}
                <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-8">
                    <div className="space-y-5 text-gray-700">

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

                {/* Pied de modal */}
                <div className="shrink-0 border-t border-gray-200 bg-white px-5 py-4">
                    {activity.helloasso && (
                        <div className="flex justify-center">
                            <a
                                href={activity.helloasso}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full rounded-full bg-[#7B2CBF] px-6 py-3 text-center font-semibold text-white shadow-md transition hover:bg-white hover:text-[#7B2CBF] hover:ring-2 hover:ring-[#7B2CBF] "
                            >
                                Inscription
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}