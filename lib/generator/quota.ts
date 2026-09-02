/**
 * Quotas et journalisation de la démo IA — en mémoire (process unique).
 *
 * Suffisant pour un déploiement mono-instance (Hostinger Node.js).
 * Pour du multi-instances, remplacer par un store partagé (Redis / Upstash)
 * — même remarque que pour `app/api/contact/route.ts`.
 */

// --- Quota par visiteur (IP) ---------------------------------------------
const PER_IP_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 h
const PER_IP_MAX = 3; // 3 générations gratuites / IP / jour

// --- Garde-fou global (coûts) ------------------------------------------
const GLOBAL_WINDOW_MS = 24 * 60 * 60 * 1000;
const GLOBAL_MAX = 150; // plafond dur toutes IP confondues / jour

interface Bucket {
  count: number;
  resetAt: number;
}

const perIp = new Map<string, Bucket>();
let global: Bucket = { count: 0, resetAt: Date.now() + GLOBAL_WINDOW_MS };

function tick(bucket: Bucket, windowMs: number): Bucket {
  if (Date.now() > bucket.resetAt) {
    return { count: 0, resetAt: Date.now() + windowMs };
  }
  return bucket;
}

export type QuotaResult =
  | { ok: true; remaining: number }
  | { ok: false; reason: 'ip' | 'global'; retryAfterMs: number };

/** Vérifie ET consomme un crédit si disponible. */
export function consumeQuota(ip: string): QuotaResult {
  global = tick(global, GLOBAL_WINDOW_MS);
  if (global.count >= GLOBAL_MAX) {
    return { ok: false, reason: 'global', retryAfterMs: global.resetAt - Date.now() };
  }

  const current = tick(perIp.get(ip) ?? { count: 0, resetAt: Date.now() + PER_IP_WINDOW_MS },
    PER_IP_WINDOW_MS);
  if (current.count >= PER_IP_MAX) {
    perIp.set(ip, current);
    return { ok: false, reason: 'ip', retryAfterMs: current.resetAt - Date.now() };
  }

  current.count += 1;
  global.count += 1;
  perIp.set(ip, current);
  return { ok: true, remaining: PER_IP_MAX - current.count };
}

/** Rend un crédit (appel après un échec côté modèle : on ne facture pas l'erreur). */
export function refundQuota(ip: string): void {
  const bucket = perIp.get(ip);
  if (bucket && bucket.count > 0) bucket.count -= 1;
  if (global.count > 0) global.count -= 1;
}

export const QUOTA_PER_IP = PER_IP_MAX;

// --- Journalisation -----------------------------------------------------
export interface GenerationLog {
  ip: string;
  promptLength: number;
  prompt: string;
  status: 'ok' | 'error';
  durationMs: number;
  model: string;
  inputTokens?: number;
  outputTokens?: number;
  error?: string;
}

/**
 * Trace une génération (analyse d'usage + anti-abus).
 * Sortie sur stdout au format JSON — récupérable via les journaux d'exécution
 * Hostinger. À brancher sur une table MySQL/Sequelize si un historique
 * persistant devient nécessaire.
 */
export function logGeneration(entry: GenerationLog): void {
  console.info(
    '[api/generate]',
    JSON.stringify({ at: new Date().toISOString(), ...entry, prompt: entry.prompt.slice(0, 500) }),
  );
}
