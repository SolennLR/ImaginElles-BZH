
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import AdminActivityForm from "./AdminActivityForm";

const STATUSES = {
    draft: "Brouillon",
    published: "Publiée",
    archived: "Archivée",
};

const STORAGE_BUCKET = "imaginelles-media";

function ActionIcon({ type }) {
    if (type === "view") {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
            >
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        );
    }

    if (type === "edit") {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
            >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" />
            </svg>
        );
    }

    if (type === "duplicate") {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
            >
                <rect x="8" y="8" width="13" height="13" rx="2" />
                <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
            </svg>
        );
    }

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="m19 6-1 14H6L5 6" />
            <path d="M10 11v5M14 11v5" />
        </svg>
    );
}

function DetailLine({ label, value }) {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    return (
        <div className="border-b border-gray-100 py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 whitespace-pre-wrap text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {String(value)}
            </dd>
        </div>
    );
}

export default function AdminActivities() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activityImages, setActivityImages] = useState([]);

    const [loadingDetails, setLoadingDetails] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [duplicateFromId, setDuplicateFromId] = useState(null);

    const loadActivities = useCallback(async () => {
        setError("");

        const { data, error: queryError } = await supabase
            .from("activities")
            .select("id, title, description, event_date, status, cancelled, referente")
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
        loadActivities();
    }, [loadActivities]);

    const filteredActivities = useMemo(() => {
        const normalizedSearch = search.trim().toLocaleLowerCase("fr");

        return activities.filter((activity) => {
            const category = (activity.title ?? "").toLocaleLowerCase("fr");
            const title = (activity.description ?? "").toLocaleLowerCase("fr");
            const referente = (activity.referente ?? "").toLocaleLowerCase("fr");

            const matchesSearch =
                category.includes(normalizedSearch) ||
                title.includes(normalizedSearch) ||
                referente.includes(normalizedSearch);

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
        setShowDetails(false);
        setShowForm(true);
        setDuplicateFromId(null);
    }

    async function handleDuplicate(activity) {
        setError("");
        setLoadingDetails(true);

        const { data, error: queryError } = await supabase
            .from("activities")
            .select("*")
            .eq("id", activity.id)
            .single();

        setLoadingDetails(false);

        if (queryError) {
            console.error("Erreur de récupération pour duplication :", queryError);
            setError("Impossible de récupérer cette activité pour la dupliquer.");
            return;
        }

        // Préparation d'une nouvelle activité, sans reprendre son identité
        // ni son statut d'annulation.
        const duplicate = {
            ...data,
            id: undefined,
            status: "draft",
            cancelled: false,
            cancellationReason: "",
            helloasso_url: "",
        };

        setSelectedActivity(duplicate);
        setDuplicateFromId(data.id);
        setShowDetails(false);
        setShowForm(true);
    }

    async function openActivity(activity, mode) {
        setError("");
        setLoadingDetails(true);

        const { data, error: activityError } = await supabase
            .from("activities")
            .select("*")
            .eq("id", activity.id)
            .single();

        if (activityError) {
            console.error("Erreur de chargement de l'activité :", activityError);
            setError("Impossible de charger les informations de cette activité.");
            setLoadingDetails(false);
            return;
        }

        setSelectedActivity(data);

        if (mode === "edit") {
            setShowDetails(false);
            setShowForm(true);
            setLoadingDetails(false);
            return;
        }

        const { data: images, error: imagesError } = await supabase
            .from("activity_images")
            .select("id, image_type, storage_path, alt_text, sort_order")
            .eq("activity_id", activity.id)
            .order("sort_order", { ascending: true });

        if (imagesError) {
            console.error("Erreur de chargement des photos :", imagesError);
            setActivityImages([]);
        } else {
            setActivityImages(images ?? []);
        }

        setShowForm(false);
        setShowDetails(true);
        setLoadingDetails(false);
    }

    function handleCancel() {
        setShowForm(false);
        setShowDetails(false);
        setSelectedActivity(null);
        setActivityImages([]);
        setDuplicateFromId(null);
    }

    async function handleSaved() {
        await loadActivities();
        handleCancel();
    }

    async function handleDelete(activity) {
        const activityName = activity.description || activity.title || "cette activité";

        const confirmed = window.confirm(
            `Supprimer définitivement l'activité « ${activityName} » ?\n\n` +
            "Cette action supprimera également ses photos et ne pourra pas être annulée."
        );

        if (!confirmed) return;

        setDeletingId(activity.id);
        setError("");

        try {
            // 1. Récupérer les chemins des photos liées à l'activité.
            const { data: images, error: imagesError } = await supabase
                .from("activity_images")
                .select("storage_path")
                .eq("activity_id", activity.id);

            if (imagesError) {
                throw new Error(
                    "Impossible de récupérer les photos de l'activité. " +
                    "Aucune suppression n'a été effectuée."
                );
            }

            const allPaths = [
                ...new Set(
                    (images ?? [])
                        .map((image) => image.storage_path)
                        .filter(Boolean)
                ),
            ];

            // 2. Identifier les chemins éventuellement partagés
            // avec une autre activité, pour ne pas supprimer ses photos.
            let pathsToRemove = [];

            if (allPaths.length > 0) {
                const { data: sharedImages, error: sharedError } = await supabase
                    .from("activity_images")
                    .select("storage_path")
                    .in("storage_path", allPaths)
                    .neq("activity_id", activity.id);

                if (sharedError) {
                    throw new Error(
                        "Impossible de vérifier si certaines photos sont partagées. " +
                        "Aucune suppression n'a été effectuée."
                    );
                }

                const sharedPaths = new Set(
                    (sharedImages ?? []).map((image) => image.storage_path)
                );

                pathsToRemove = allPaths.filter(
                    (path) => !sharedPaths.has(path)
                );
            }

            // 3. Supprimer l'activité en base.
            // La contrainte ON DELETE CASCADE supprimera les lignes
            // correspondantes dans activity_images.
            const { error: deleteError } = await supabase
                .from("activities")
                .delete()
                .eq("id", activity.id);

            if (deleteError) {
                console.error("Erreur de suppression de l'activité :", deleteError);
                throw new Error(
                    "La suppression de l'activité a échoué. Les photos ont été conservées."
                );
            }

            // 4. Supprimer les fichiers physiques du Storage.
            if (pathsToRemove.length > 0) {
                const { error: storageError } = await supabase.storage
                    .from(STORAGE_BUCKET)
                    .remove(pathsToRemove);

                if (storageError) {
                    console.error(
                        "Erreur de suppression des photos dans Storage :",
                        storageError,
                        pathsToRemove
                    );

                    await loadActivities();

                    setError(
                        "L'activité a bien été supprimée, mais certaines photos " +
                        "n'ont pas pu être supprimées du stockage. Consulte la console pour les chemins concernés."
                    );

                    return;
                }
            }

            await loadActivities();

            if (allPaths.length > pathsToRemove.length) {
                setError(
                    "L'activité a été supprimée. Certaines photos ont été conservées " +
                    "car elles sont également référencées par une autre activité."
                );
            }
        } catch (deleteError) {
            console.error("Erreur lors de la suppression :", deleteError);
            setError(deleteError.message || "La suppression de l'activité a échoué.");
        } finally {
            setDeletingId(null);
        }
    }

    if (showForm) {
        return (
            <AdminActivityForm
                key={duplicateFromId ?? selectedActivity?.id ?? "new"}
                activity={selectedActivity}
                duplicateFromId={duplicateFromId}
                onSaved={handleSaved}
                onCancel={handleCancel}
            />
        );
    }

    if (showDetails && selectedActivity) {
        return (
            <section className="space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Consulter une activité</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Détails de l'activité en lecture seule.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => openActivity(selectedActivity, "edit")}
                            className="rounded-lg bg-pink-600 px-4 py-2 font-medium text-white hover:bg-pink-700"
                        >
                            Modifier
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50"
                        >
                            Retour
                        </button>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold">
                        Informations générales
                    </h2>

                    <dl className="divide-y divide-gray-100">
                        <DetailLine label="Catégorie" value={selectedActivity.title} />
                        <DetailLine label="Titre" value={selectedActivity.description} />
                        <DetailLine label="Date" value={formatDate(selectedActivity.event_date)} />
                        <DetailLine label="Statut" value={STATUSES[selectedActivity.status] ?? selectedActivity.status} />
                        <DetailLine label="Référente" value={selectedActivity.referente} />
                        <DetailLine label="Pour qui ?" value={selectedActivity.who_text} />
                        <DetailLine label="Quand ?" value={selectedActivity.when_text} />
                        <DetailLine label="Où ?" value={selectedActivity.where_text} />
                        <DetailLine label="Tarif" value={selectedActivity.price_text} />
                        <DetailLine label="Lien HelloAsso" value={selectedActivity.helloasso_url} />
                        <DetailLine label="Détails" value={selectedActivity.details} />
                        <DetailLine
                            label="Activité annulée"
                            value={selectedActivity.cancelled ? "Oui" : "Non"}
                        />
                        {selectedActivity.cancelled && (
                            <DetailLine
                                label="Motif d'annulation"
                                value={selectedActivity.cancellationReason}
                            />
                        )}
                    </dl>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <h2 className="mb-4 text-lg font-semibold">
                        Photos associées ({activityImages.length})
                    </h2>

                    {activityImages.length === 0 ? (
                        <p className="text-sm text-gray-500">Aucune photo associée.</p>
                    ) : (
                        <ul className="space-y-2">
                            {activityImages.map((image) => (
                                <li
                                    key={image.id}
                                    className="flex flex-col gap-1 rounded-lg bg-gray-50 p-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <span className="font-medium">
                                        {image.alt_text || image.image_type}
                                    </span>
                                    <span className="break-all text-xs text-gray-500">
                                        {image.storage_path}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
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
                        Créer, consulter, modifier et suivre les activités de l’association.
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
                    {key: "all", label: "Toutes"},
                    {key: "draft", label: "Brouillons"},
                    {key: "published", label: "Publiées"},
                    {key: "archived", label: "Archivées"},
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
                    Rechercher une activité ou une référente
                </label>

                <input
                    id="activity-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Saisir un titre, une catégorie ou un prénom…"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                />
            </div>

             {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {loading || loadingDetails ? (
                <p className="py-8 text-center text-gray-500">
                    Chargement des activités…
                </p>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="px-4 py-3 font-medium">Catégorie</th>
                            <th className="px-4 py-3 font-medium">Titre</th>
                            <th className="px-4 py-3 font-medium">Référente</th>
                            <th className="px-4 py-3 font-medium">Date</th>
                            <th className="px-4 py-3 font-medium">Statut</th>
                            <th className="px-4 py-3 text-center font-medium">Actions</th>
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

                                <td className="px-4 py-3 text-gray-700">
                                    {activity.description || "—"}
                                </td>

                                <td className="px-4 py-3 text-gray-700">
                                    {activity.referente || "—"}
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
                                    {activity.cancelled && (
                                        <span
                                            className="ml-1 inline-block rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
                                                Annulée
                                            </span>
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => openActivity(activity, "view")}
                                            title="Consulter"
                                            aria-label={`Consulter ${activity.description || activity.title}`}
                                            className="rounded-lg p-2 text-gray-600 transition hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            <ActionIcon type="view"/>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => openActivity(activity, "edit")}
                                            title="Modifier"
                                            aria-label={`Modifier ${activity.description || activity.title}`}
                                            className="rounded-lg p-2 text-gray-600 transition hover:bg-pink-50 hover:text-pink-700"
                                        >
                                            <ActionIcon type="edit"/>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDuplicate(activity)}
                                            title="Dupliquer"
                                            aria-label={`Dupliquer ${activity.description || activity.title}`}
                                            className="rounded-lg p-2 text-gray-600 transition hover:bg-purple-50 hover:text-purple-700"
                                        >
                                            <ActionIcon type="duplicate"/>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDelete(activity)}
                                            disabled={deletingId === activity.id}
                                            title="Supprimer"
                                            aria-label={`Supprimer ${activity.description || activity.title}`}
                                            className="rounded-lg p-2 text-gray-600 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            {deletingId === activity.id ? (
                                                <span
                                                    className="block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-red-600"/>
                                            ) : (
                                                <ActionIcon type="delete"/>
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredActivities.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
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
