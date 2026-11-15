import { useState } from "react";
import { supabase } from "../lib/supabase";

const INITIAL_FORM = {
    title: "",
    description: "",
    cancelled: false,
    cancellationReason: "",
    event_date: "",
    status: "draft",
    color: "#E879A9",
    referente: "",
    who_text: "",
    when_text: "",
    where_text: "",
    price_text: "",
    helloasso_url: "",
    details: "",
};

const STORAGE_BUCKET = "imaginelles-media";

async function duplicateActivityImages(sourceActivityId, targetActivityId) {
    const { data: images, error: imagesError } = await supabase
        .from("activity_images")
        .select("image_type, storage_path, alt_text, sort_order")
        .eq("activity_id", sourceActivityId)
        .order("sort_order", { ascending: true });

    if (imagesError) {
        throw new Error(
            `Impossible de récupérer les photos de l'activité d'origine : ${imagesError.message}`
        );
    }

    const copiedPaths = [];
    const imageRows = [];

    try {
        for (const [index, image] of (images ?? []).entries()) {
            const fileName = image.storage_path.split("/").pop();

            if (!fileName) {
                throw new Error(`Chemin de photo invalide : ${image.storage_path}`);
            }

            const newPath =
                `activities/${targetActivityId}/` +
                `${image.image_type}-${String(index + 1).padStart(2, "0")}-${fileName}`;

            const { error: copyError } = await supabase.storage
                .from(STORAGE_BUCKET)
                .copy(image.storage_path, newPath);

            if (copyError) {
                throw new Error(
                    `Impossible de copier la photo ${fileName} : ${copyError.message}`
                );
            }

            copiedPaths.push(newPath);

            imageRows.push({
                activity_id: targetActivityId,
                image_type: image.image_type,
                storage_path: newPath,
                alt_text: image.alt_text,
                sort_order: image.sort_order,
            });
        }

        if (imageRows.length > 0) {
            const { error: insertError } = await supabase
                .from("activity_images")
                .insert(imageRows);

            if (insertError) {
                throw new Error(
                    `Impossible d'associer les photos à la copie : ${insertError.message}`
                );
            }
        }
    } catch (error) {
        // Nettoyage des fichiers déjà copiés si une étape échoue.
        if (copiedPaths.length > 0) {
            const { error: cleanupError } = await supabase.storage
                .from(STORAGE_BUCKET)
                .remove(copiedPaths);

            if (cleanupError) {
                console.error("Erreur de nettoyage des photos copiées :", cleanupError);
            }
        }

        throw error;
    }
}

function getInitialForm(activity) {
    if (!activity) {
        return { ...INITIAL_FORM };
    }

    return {
        ...INITIAL_FORM,
        ...activity,
        event_date: activity.event_date
            ? String(activity.event_date).slice(0, 10)
            : "",
        title: activity.title ?? "",
        description: activity.description ?? "",
        cancelled: activity.cancelled ?? false,
        cancellationReason: activity.cancellationReason ?? "",
        status: activity.status ?? "draft",
        color: activity.color ?? "#E879A9",
        referente: activity.referente ?? "",
        who_text: activity.who_text ?? "",
        when_text: activity.when_text ?? "",
        where_text: activity.where_text ?? "",
        price_text: activity.price_text ?? "",
        helloasso_url: activity.helloasso_url ?? "",
        details: activity.details ?? "",
    };
}

export default function AdminActivityForm({
                                              activity = null,
                                              duplicateFromId = null,
                                              onSaved,
                                              onCancel,
                                          }) {
    const [form, setForm] = useState(() => getInitialForm(activity));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const isEditing = Boolean(activity?.id);
    const isDuplicating = Boolean(duplicateFromId);

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));

        setError("");
        setSuccess("");
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setSuccess("");

        const title = form.title.trim();

        if (!title) {
            setError("Le titre de l’activité est obligatoire.");
            return;
        }

        if (!form.event_date) {
            setError("La date de l’activité est obligatoire.");
            return;
        }

        if (!/^#[0-9A-Fa-f]{6}$/.test(form.color)) {
            setError("La couleur doit être au format hexadécimal #RRGGBB.");
            return;
        }

        if (
            form.helloasso_url.trim() &&
            !/^https?:\/\/\S+$/i.test(form.helloasso_url.trim())
        ) {
            setError("Le lien HelloAsso doit être une URL valide.");
            return;
        }

        const payload = {
            title,
            description: form.description.trim(),
            event_date: form.event_date,
            status: form.status,
            color: form.color.trim(),
            referente: form.referente.trim(),
            who_text: form.who_text.trim(),
            when_text: form.when_text.trim(),
            where_text: form.where_text.trim(),
            price_text: form.price_text.trim(),
            helloasso_url: form.helloasso_url.trim(),
            details: form.details.trim(),
            cancelled: form.cancelled,
            cancellationReason: form.cancelled
                ? form.cancellationReason.trim()
                : "",
            ...(isDuplicating
                ? {
                    cancelled: false,
                    cancellationReason: "",
                    helloasso_url: "",
                }
                : {}),
        };

        setSaving(true);

        try {
            let result;

            if (isEditing) {
                result = await supabase
                    .from("activities")
                    .update(payload)
                    .eq("id", activity.id)
                    .select()
                    .single();
            } else {
                result = await supabase
                    .from("activities")
                    .insert(payload)
                    .select()
                    .single();
            }

            if (result.error) {
                console.error("Erreur Supabase :", {
                    message: result.error.message,
                    code: result.error.code,
                    details: result.error.details,
                    hint: result.error.hint,
                });

                setError(
                    `Erreur Supabase (${result.error.code ?? "inconnue"}) : ${result.error.message}`
                );

                return;
            }

            if (isDuplicating && result.data?.id) {
                try {
                    await duplicateActivityImages(duplicateFromId, result.data.id);
                } catch (imageError) {
                    console.error("Erreur de duplication des photos :", imageError);

                    // La copie n'est pas considérée comme réussie si ses photos
                    // n'ont pas pu être copiées.
                    const { error: rollbackError } = await supabase
                        .from("activities")
                        .delete()
                        .eq("id", result.data.id);

                    if (rollbackError) {
                        console.error("Erreur de nettoyage de l'activité dupliquée :", rollbackError);
                    }

                    setError(
                        rollbackError
                            ? `${imageError.message} La suppression de la copie incomplète a également échoué.`
                            : `${imageError.message} La copie incomplète a été annulée.`
                    );

                    return;
                }
            }

            setSuccess(
                isEditing
                    ? "L’activité a été modifiée."
                    : isDuplicating
                        ? "L’activité a été dupliquée avec ses photos."
                        : "L’activité a été créée."
            );

            if (onSaved) {
                onSaved(result.data);
            } else if (!isEditing) {
                setForm(INITIAL_FORM);
            }
        } catch (err) {
            console.error("Erreur d’enregistrement de l’activité :", err);

            setError(
                "Impossible d’enregistrer l’activité. Vérifie les champs, les colonnes Supabase et les droits de l’utilisateur."
            );
        } finally {
            setSaving(false);
        }
    }

    const inputClass =
        "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100";

    const labelClass = "mb-1 block text-sm font-medium text-gray-700";

    return (
        <section className="mx-auto max-w-4xl space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {isDuplicating
                        ? "Dupliquer une activité"
                        : isEditing
                            ? "Modifier une activité"
                            : "Nouvelle activité"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Les champs marqués d’un * sont obligatoires.
                </p>
            </div>

            {error && (
                <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            {success && (
                <div
                    role="status"
                    className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800"
                >
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset
                    disabled={saving}
                    className="space-y-5 disabled:opacity-70"
                >
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h3 className="mb-4 text-lg font-semibold">
                            Informations générales
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className={labelClass} htmlFor="title">
                                    Titre *
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                    maxLength={200}
                                />
                            </div>

                            <div>
                                <label
                                    className={labelClass}
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className={inputClass}
                                    rows={4}
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label
                                        className={labelClass}
                                        htmlFor="event_date"
                                    >
                                        Date de l’activité *
                                    </label>
                                    <input
                                        id="event_date"
                                        name="event_date"
                                        type="date"
                                        value={form.event_date}
                                        onChange={handleChange}
                                        className={inputClass}
                                        required
                                    />
                                </div>

                                <div>
                                    <label
                                        className={labelClass}
                                        htmlFor="status"
                                    >
                                        Statut *
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className={inputClass}
                                        required
                                    >
                                        <option value="draft">
                                            Brouillon
                                        </option>
                                        <option value="published">
                                            Publiée
                                        </option>
                                        <option value="archived">
                                            Archivée
                                        </option>
                                    </select>
                                </div>
                            </div>


                            <div>
                                <label className={labelClass} htmlFor="color">
                                    Couleur de l’activité *
                                </label>

                                <div className="flex items-center gap-3">
                                    <input
                                        id="color"
                                        name="color"
                                        type="color"
                                        value={form.color}
                                        onChange={handleChange}
                                        className="h-11 w-16 cursor-pointer rounded border border-gray-300 p-1"
                                        required
                                    />

                                    <input
                                        type="text"
                                        value={form.color || "#E879A9"}
                                        onChange={handleChange}
                                        className={`${inputClass} max-w-40`}
                                        pattern="^#[0-9A-Fa-f]{6}$"
                                        title="Saisir un code couleur au format #RRGGBB"
                                        aria-label="Code hexadécimal de la couleur"
                                        required
                                    />
                                </div>

                                <p className="mt-1 text-xs text-gray-500">
                                    Choisis une couleur ou saisis son code hexadécimal, par exemple #E879A9.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h3 className="mb-4 text-lg font-semibold">
                            Organisation
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label
                                    className={labelClass}
                                    htmlFor="referente"
                                >
                                    Référente
                                </label>
                                <input
                                    id="referente"
                                    name="referente"
                                    value={form.referente}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    className={labelClass}
                                    htmlFor="who_text"
                                >
                                    Pour qui ?
                                </label>
                                <input
                                    id="who_text"
                                    name="who_text"
                                    value={form.who_text}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    className={labelClass}
                                    htmlFor="when_text"
                                >
                                    Quand ?
                                </label>
                                <input
                                    id="when_text"
                                    name="when_text"
                                    value={form.when_text}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    className={labelClass}
                                    htmlFor="where_text"
                                >
                                    Où ?
                                </label>
                                <input
                                    id="where_text"
                                    name="where_text"
                                    value={form.where_text}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    className={labelClass}
                                    htmlFor="price_text"
                                >
                                    Tarif
                                </label>
                                <input
                                    id="price_text"
                                    name="price_text"
                                    value={form.price_text}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h3 className="mb-4 text-lg font-semibold">
                            Inscription et informations complémentaires
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label
                                    className={labelClass}
                                    htmlFor="helloasso_url"
                                >
                                    Lien d’inscription HelloAsso
                                </label>
                                <input
                                    id="helloasso_url"
                                    name="helloasso_url"
                                    type="url"
                                    value={form.helloasso_url}
                                    onChange={handleChange}
                                    className={inputClass}
                                    placeholder="https://www.helloasso.com/..."
                                />
                            </div>

                            <div>
                                <label
                                    className={labelClass}
                                    htmlFor="details"
                                >
                                    Détails complémentaires
                                </label>
                                <textarea
                                    id="details"
                                    name="details"
                                    value={form.details}
                                    onChange={handleChange}
                                    className={inputClass}
                                    rows={5}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h3 className="mb-4 text-lg font-semibold">
                            Annulation de l'activité
                        </h3>

                        <div className="space-y-4">
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="cancelled"
                                    checked={form.cancelled}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-pink-600"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Activité annulée
                                </span>
                            </label>

                            {form.cancelled && (
                                <div>
                                    <label
                                        className={labelClass}
                                        htmlFor="cancellationReason"
                                    >
                                        Motif de l'annulation
                                    </label>

                                    <textarea
                                        id="cancellationReason"
                                        name="cancellationReason"
                                        value={form.cancellationReason}
                                        onChange={handleChange}
                                        className={inputClass}
                                        rows={3}
                                        placeholder="Indiquer le motif de l'annulation..."
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </fieldset>

                <div className="flex flex-wrap justify-end gap-3">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={saving}
                            className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Annuler
                        </button>
                    )}

                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-pink-600 px-5 py-2 font-medium text-white hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving
                            ? "Enregistrement…"
                            : isDuplicating
                                ? "Créer la copie"
                                : isEditing
                                    ? "Enregistrer les modifications"
                                    : "Créer l’activité"}
                    </button>
                </div>
            </form>
        </section>
    );
}
