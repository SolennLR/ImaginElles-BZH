/**
 * Import ponctuel de src/data/activites.js vers Supabase.
 * À exécuter depuis la racine du projet Vite.
 *
 * Prérequis dans .env.local :
 *   VITE_SUPABASE_URL=https://...supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=...
 *
 * La clé SERVICE_ROLE est secrète :
 * ne jamais la préfixer par VITE_.
 */

import { createServer, loadEnv } from 'vite';
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { basename, extname, join } from 'node:path';

const root = process.cwd();
const env = loadEnv('development', root, '');
const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
const bucketName = 'imaginelles-media';

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    'Configuration manquante. Vérifie VITE_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function normalizeDate(value) {
  const match = String(value ?? '').trim().match(
    /^(\d{4})-(\d{1,2})-(\d{1,2})$/
  );

  if (!match) {
    throw new Error(`Date invalide dans activites.js : ${value}`);
  }

  const [, year, month, day] = match;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function localTodayIso() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function mimeType(filePath) {
  switch (extname(filePath).toLowerCase()) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

async function readImportedAsset(assetUrl) {
  if (!assetUrl) return null;

  if (assetUrl.startsWith('data:')) {
    const [metadata, encoded] = assetUrl.split(',', 2);
    const buffer = metadata.includes(';base64')
      ? Buffer.from(encoded, 'base64')
      : Buffer.from(decodeURIComponent(encoded));

    const type =
      metadata.match(/^data:([^;]+)/)?.[1] ||
      'application/octet-stream';

    const extension =
      type === 'image/png' ? 'png' :
      type === 'image/webp' ? 'webp' : 'jpg';

    return {
      buffer,
      fileName: `image.${extension}`,
      contentType: type,
    };
  }

  const pathname = decodeURIComponent(
    new URL(assetUrl, 'http://vite.local').pathname
  );

  const marker = '/src/assets/';
  let filePath;

  if (pathname.includes(marker)) {
    filePath = join(root, 'src', 'assets', basename(pathname));
  } else {
    const name = basename(pathname);

    if (!name || name === '/' || name.includes('?')) {
      throw new Error(
        `Impossible de retrouver le fichier source de l'image : ${assetUrl}`
      );
    }

    filePath = join(root, 'src', 'assets', name);
  }

  const buffer = await readFile(filePath);

  return {
    buffer,
    fileName: basename(filePath),
    contentType: mimeType(filePath),
  };
}

async function uploadImage(legacyId, imageType, index, assetUrl) {
  const asset = await readImportedAsset(assetUrl);
  if (!asset) return null;

  const safeId = legacyId.replace(/[^a-zA-Z0-9_-]/g, '-');
  const safeName = asset.fileName.replace(/[^a-zA-Z0-9._-]/g, '-');

  const storagePath =
    `activities/${safeId}/${imageType}-` +
    `${String(index + 1).padStart(2, '0')}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(storagePath, asset.buffer, {
      contentType: asset.contentType,
      upsert: true,
      cacheControl: '3600',
    });

  if (uploadError) {
    throw new Error(
      `Upload ${storagePath} : ${uploadError.message}`
    );
  }

  return storagePath;
}

async function main() {
  const vite = await createServer({
    configFile: path.join(root, 'vite.config.js'),
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  });

  try {
    const { activities } = await vite.ssrLoadModule(
      '/src/data/activities.js'
    );

    if (!Array.isArray(activities) || activities.length === 0) {
      throw new Error(
        'Aucune activité trouvée dans src/data/activities.js. ' +
        'Vérifie le nom de l’export.'
      );
    }

    const today = localTodayIso();

    console.log(
      `${activities.length} activité(s) détectée(s). ` +
      `Date de référence : ${today}`
    );

    console.log(
      'Règle : date passée = archived ; ' +
      'aujourd’hui/future = published.'
    );

    let imported = 0;

    for (const source of activities) {
      const legacyId = String(source.id ?? '').trim();

      if (!legacyId) {
        throw new Error(
          `Une activité n'a pas d'id : ${source.title ?? '(sans titre)'}`
        );
      }

      const eventDate = normalizeDate(source.date);
      const status = eventDate < today ? 'archived' : 'published';

      const row = {
        legacy_id: legacyId,
        title: source.title ?? '',
        event_date: eventDate,
        description: source.description ?? '',
        color: source.color ?? null,
        referente: source.referente ?? null,
        who_text: source.who ?? null,
        when_text: source.when ?? null,
        where_text: source.where ?? null,
        price_text: source.price ?? null,
        helloasso_url: source.helloasso ?? null,
        details: source.details ?? null,
        status,
      };

      const { data: existing, error: lookupError } = await supabase
        .from('activities')
        .select('id')
        .eq('legacy_id', legacyId)
        .maybeSingle();

      if (lookupError) {
        throw new Error(
          `Lecture activité ${legacyId} : ${lookupError.message}`
        );
      }

      let activityId;

      if (existing?.id) {
        const { data, error } = await supabase
          .from('activities')
          .update({
            ...row,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
          .select('id')
          .single();

        if (error) {
          throw new Error(
            `Mise à jour activité ${legacyId} : ${error.message}`
          );
        }

        activityId = data.id;
      } else {
        const { data, error } = await supabase
          .from('activities')
          .insert(row)
          .select('id')
          .single();

        if (error) {
          throw new Error(
            `Insertion activité ${legacyId} : ${error.message}`
          );
        }

        activityId = data.id;
      }

      // Recréer les métadonnées des images de cette activité.
      const { error: deleteImagesError } = await supabase
        .from('activity_images')
        .delete()
        .eq('activity_id', activityId);

      if (deleteImagesError) {
        throw new Error(
          `Suppression des anciennes images ${legacyId} : ` +
          deleteImagesError.message
        );
      }

      const images = [];

      if (source.image) {
        images.push({ type: 'main', url: source.image });
      }

      for (const url of source.presentationImages ?? []) {
        if (url) images.push({ type: 'presentation', url });
      }

      for (const url of source.archiveImages ?? []) {
        if (url) images.push({ type: 'archive', url });
      }

      const imageRows = [];
      const counters = {
        main: 0,
        presentation: 0,
        archive: 0,
      };

      for (const image of images) {
        const index = counters[image.type]++;

        const storagePath = await uploadImage(
          legacyId,
          image.type,
          index,
          image.url
        );

        if (!storagePath) continue;

        const imageLabel =
          image.type === 'main'
            ? 'photo principale'
            : image.type === 'presentation'
              ? 'photo de présentation'
              : 'photo d’archive';

        imageRows.push({
          activity_id: activityId,
          image_type: image.type,
          storage_path: storagePath,
          alt_text: `${source.title ?? 'Activité'} - ${imageLabel}`,
          sort_order: index,
        });
      }

      if (imageRows.length) {
        const { error } = await supabase
          .from('activity_images')
          .insert(imageRows);

        if (error) {
          throw new Error(
            `Insertion images ${legacyId} : ${error.message}`
          );
        }
      }

      imported++;

      console.log(
        `✓ ${legacyId} — ${eventDate} — ${status} — ` +
        `${imageRows.length} image(s)`
      );
    }

    console.log(
      `\nImport terminé : ${imported}/${activities.length} activité(s).`
    );
  } finally {
    await vite.close();
  }
}

main().catch((error) => {
  console.error('\nÉCHEC DE L’IMPORT :', error.message || error);
  process.exitCode = 1;
});
