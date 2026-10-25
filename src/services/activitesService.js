
import { activities as localActivities } from "../data/activities.js";
import { supabase } from "../lib/supabase";

const STORAGE_BUCKET = "imaginelles-media";

// Source sélectionnée dans .env.local : "local" ou "supabase".
// Par défaut, on conserve le fonctionnement historique du site.
const configuredSource = (
    import.meta.env.VITE_ACTIVITIES_SOURCE ?? "local"
).trim().toLowerCase();

const SOURCE =
    configuredSource === "supabase" ? "supabase" : "local";

if (!["local", "supabase"].includes(configuredSource)) {
    console.warn(
        `Source d'activités inconnue : "${configuredSource}". ` +
        "Utilisation des données locales."
    );
}

function getTodayIso() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function normalizeDate(date) {
    if (!date) return "";

    const value = String(date).trim();
    const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

    if (!match) return "";

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);

    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    // Vérifie que la date existe réellement.
    if (
        parsedDate.getUTCFullYear() !== year ||
        parsedDate.getUTCMonth() !== month - 1 ||
        parsedDate.getUTCDate() !== day
    ) {
        return "";
    }

    return [
        String(year).padStart(4, "0"),
        String(month).padStart(2, "0"),
        String(day).padStart(2, "0"),
    ].join("-");
}

function getImageUrl(storagePath) {
    if (!storagePath) return null;

    const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(storagePath);

    return data?.publicUrl ?? null;
}

/**
 * Source locale : conserve les activités et leurs images importées
 * dans le projet React.
 */
function getLocalActivities() {
    return localActivities.map((activity) => ({
        ...activity,
        date: normalizeDate(activity.date),
    }));
}

/**
 * Source Supabase : récupère les activités et leurs photos.
 */
async function getSupabaseActivities() {
    const { data: rows, error: activitiesError } = await supabase
        .from("activities")
        .select("*")
        .order("event_date", { ascending: true });

    if (activitiesError) {
        console.error(
            "Erreur de chargement des activités Supabase :",
            activitiesError
        );
        throw new Error(
            "Impossible de charger les activités depuis Supabase."
        );
    }

    const today = getTodayIso();

    // Les brouillons ne sont jamais affichés publiquement.
    // Une activité archivée ne s'affiche que si sa date est passée.
    const visibleRows = (rows ?? []).filter((activity) => {
        const date = normalizeDate(activity.event_date);

        if (!date || activity.status === "draft") return false;

        if (
            activity.status !== "published" &&
            activity.status !== "archived"
        ) {
            return false;
        }

        if (activity.status === "archived" && date >= today) {
            return false;
        }

        return true;
    });

    if (visibleRows.length === 0) return [];

    const activityIds = visibleRows.map((activity) => activity.id);

    const { data: imageRows, error: imagesError } = await supabase
        .from("activity_images")
        .select("activity_id, image_type, storage_path, sort_order")
        .in("activity_id", activityIds)
        .order("sort_order", { ascending: true });

    if (imagesError) {
        console.error(
            "Erreur de chargement des photos Supabase :",
            imagesError
        );
        throw new Error(
            "Impossible de charger les photos des activités."
        );
    }

    const imagesByActivity = new Map();

    for (const image of imageRows ?? []) {
        if (!imagesByActivity.has(image.activity_id)) {
            imagesByActivity.set(image.activity_id, {
                main: [],
                presentation: [],
                archive: [],
            });
        }

        const groups = imagesByActivity.get(image.activity_id);

        if (groups[image.image_type]) {
            const url = getImageUrl(image.storage_path);

            if (url) {
                groups[image.image_type].push(url);
            }
        }
    }

    return visibleRows.map((row) => {
        const images = imagesByActivity.get(row.id) ?? {
            main: [],
            presentation: [],
            archive: [],
        };

        return {
            id: row.legacy_id ?? row.id,
            supabaseId: row.id,
            title: row.title,
            date: normalizeDate(row.event_date),
            description: row.description ?? "",
            color: row.color ?? "",
            image:
                images.main[0] ??
                images.presentation[0] ??
                images.archive[0] ??
                null,
            presentationImages: images.presentation,
            archiveImages: images.archive,
            referente: row.referente ?? "",
            who: row.who_text ?? "",
            when: row.when_text ?? "",
            where: row.where_text ?? "",
            price: row.price_text ?? "",
            helloasso: row.helloasso_url ?? "",
            details: row.details ?? "",
            status: row.status,
        };
    });
}

/**
 * Point d'entrée commun aux deux sources.
 */
export async function getActivities() {
    if (SOURCE === "supabase") {
        return getSupabaseActivities();
    }

    return getLocalActivities();
}

/**
 * Activités à venir : aujourd'hui ou dans le futur.
 */
export async function getUpcomingActivities() {
    const activities = await getActivities();
    const today = getTodayIso();

    return activities
        .filter((activity) => {
            const date = normalizeDate(activity.date);

            if (!date || date < today) return false;
            if (activity.status === "draft") return false;

            // En local, les anciennes données n'ont pas nécessairement
            // de champ status : elles restent donc utilisables.
            if (
                activity.status != null &&
                activity.status !== "published"
            ) {
                return false;
            }

            return true;
        })
        .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Archives : activités dont la date est passée.
 */
export async function getArchivedActivities() {
    const activities = await getActivities();
    const today = getTodayIso();

    return activities
        .filter((activity) => {
            const date = normalizeDate(activity.date);

            if (!date || date >= today) return false;
            if (activity.status === "draft") return false;

            if (
                activity.status != null &&
                activity.status !== "published" &&
                activity.status !== "archived"
            ) {
                return false;
            }

            return true;
        })
        .sort((a, b) => b.date.localeCompare(a.date));
}
