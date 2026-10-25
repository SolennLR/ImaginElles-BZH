
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminActivityForm from "./AdminActivityForm";

const STATUSES = {
    draft: "Brouillon",
    published: "Publiée",
    archived: "Archivée",
};

export default function AdminActivities() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [showForm, setShowForm] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const loadActivities = useCallback(async () => {
        setError("");

        const { data, error: queryError } = await supabase
            .from("activities")
            .select("id, title, event_date, status")
            .order("event_date", { ascending: true });

        if (queryError) {
            console.error("Erreur de chargement des activités :", queryError);
            setError("Impossible de charger les activités.");
            setActivities([]);
        } else {
            setActivities(data ?? []);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function fetchActivities() {
            const { data, error: queryError } = await supabase
                .from("activities")
                .select("id, title, event_date, status")
                .order("event_date", { ascending: true });

            if (cancelled) return;

            if (queryError) {
                console.error("Erreur de chargement des activités :", queryError);
                setError("Impossible de charger les activités.");
                setActivities([]);
            } else {
                setActivities(data ?? []);
            }

            setLoading(false);
        }

        fetchActivities();

        return () => {
            cancelled = true;
        };
    }, []);

    const filteredActivities = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase("fr");

        return activities.filter((activity) => {
            const matchesSearch = (activity.title ?? "")
                .toLocaleLowerCase("fr")
                .includes(normalizedSearch);

            const matchesStatus =
                statusFilter === "all" ||
                activity.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [activities, search, statusFilter]);

    const counts = useMemo(() => ({
        all: activities.length,
        draft: activities.filter((a) => a.status === "draft").length,
        published: activities.filter((a) => a.status === "published").length,
        archived: activities.filter((a) => a.status === "archived").length,
    }), [activities]);

    function formatDate(date) {
        if (!date) return "—";

        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(new Date(`${date}T12:00:00`));
    }

    function statusStyle(status) {
        switch (status) {
            case "draft":
                return "bg-gray-100 text-gray-700";
            case "published":
                return "bg-green-100 text-green-800";
            case "archived":
                return "bg-amber-100 text-amber-800";
            default:
                return "bg-gray-100 text-gray-700";
        }
    }

    function handleNew() {
        setSelectedActivity(null);
        setShowForm(true);
    }

    function handleEdit(activity) {
        setSelectedActivity(activity);
        setShowForm(true);
    }

    function handleCancel() {
        setShowForm(false);
        setSelectedActivity(null);
    }

    async function handleSaved() {
        await loadActivities();
        setShowForm(false);
        setSelectedActivity(null);
    }

    if (showForm) {
        return (
            <AdminActivityForm
                key={selectedActivity?.id ?? "new"}
                activity={selectedActivity}
                onSaved={handleSaved}
                onCancel={handleCancel}
            />
        );
    }

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Gestion des activités
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Créer, modifier et suivre les activités de l’association.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleNew}
                    className="rounded-lg bg-pink-600 px-4 py-2 font-medium text-white hover:bg-pink-700"
                >
                    + Nouvelle activité
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                    { key: "all", label: "Toutes" },
                    { key: "draft", label: "Brouillons" },
                    { key: "published", label: "Publiées" },
                    { key: "archived", label: "Archivées" },
                ].map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        onClick={() => setStatusFilter(item.key)}
                        className={`rounded-lg border p-4 text-left transition ${
                            statusFilter === item.key
                                ? "border-pink-500 bg-pink-50"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                        }`}
                    >
                        <div className="text-sm text-gray-500">
                            {item.label}
                        </div>
                        <div className="mt-1 text-2xl font-bold">
                            {counts[item.key]}
                        </div>
                    </button>
                ))}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-4">
                <label
                    htmlFor="activity-search"
                    className="mb-2 block text-sm font-medium"
                >
                    Rechercher une activité
                </label>

                <input
                    id="activity-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Saisir un titre…"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                />
            </div>

            {loading ? (
                <p className="py-8 text-center text-gray-500">
                    Chargement des activités…
                </p>
            ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    <p>{error}</p>
                    <button
                        type="button"
                        onClick={loadActivities}
                        className="mt-2 font-medium underline"
                    >
                        Réessayer
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3 font-medium">Activité</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Statut</th>
                            <th className="px-4 py-3 font-medium">Action</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                        {filteredActivities.map((activity) => (
                            <tr
                                key={activity.id}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-4 py-3 font-medium text-gray-900">
                                    {activity.title}
                                </td>

                                <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                                    {formatDate(activity.event_date)}
                                </td>

                                <td className="px-4 py-3">
                                        <span
                                            className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle(activity.status)}`}
                                        >
                                            {STATUSES[activity.status] ?? activity.status}
                                        </span>
                                </td>

                                <td className="px-4 py-3">
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(activity)}
                                        className="font-medium text-pink-700 hover:underline"
                                    >
                                        Modifier
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filteredActivities.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-4 py-10 text-center text-gray-500"
                                >
                                    Aucune activité ne correspond à la recherche.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            <p className="text-xs text-gray-500">
                {filteredActivities.length} activité(s) affichée(s) sur {activities.length}.
            </p>
        </section>
    );
}
