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
                <h2 className="text-3xl font-bold mb-6">
                    {activity.title}
                </h2>

                <div className="space-y-4">

                    <p>
                        <strong>Qui ?</strong><br />
                        {activity.who}
                    </p>

                    <p>
                        <strong>Quand ?</strong><br />
                        {activity.when}
                    </p>

                    <p>
                        <strong>Où ?</strong><br />
                        {activity.where}
                    </p>

                    <p>
                        <strong>Description détaillée</strong><br />
                        {activity.details}
                    </p>

                </div>

                <div className="flex justify-end mt-8">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
}