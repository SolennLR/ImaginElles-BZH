import { useState } from "react";
import { supabase } from "../lib/supabase";

const INITIAL_FORM = {
    title: "",
    description: "",
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
                                              onSaved,
                                              onCancel,
                                          }) {
    const [form, setForm] = useState(() => getInitialForm(activity));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const isEditing = Boolean(activity?.id);

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
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

            setSuccess(
                isEditing
                    ? "L’activité a été modifiée."
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
                    {isEditing
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
                            : isEditing
                                ? "Enregistrer les modifications"
                                : "Créer l’activité"}
                    </button>
                </div>
            </form>
        </section>
    );
}
