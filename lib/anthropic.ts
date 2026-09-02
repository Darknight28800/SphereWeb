import Anthropic from '@anthropic-ai/sdk';

/**
 * Point de configuration centralisé de l'API Anthropic (Claude).
 *
 * La clé vit UNIQUEMENT côté serveur, dans la variable d'environnement
 * `ANTHROPIC_API_KEY` (jamais exposée au frontend). Elle est distincte de
 * l'abonnement claude.ai : il faut une clé de la Console API
 * (https://console.anthropic.com), avec un plafond de dépense configuré.
 *
 * Voir README.md § « Démo IA » pour la marche à suivre.
 */

/** Modèle utilisé pour la génération de maquette. */
export const GENERATION_MODEL = 'claude-sonnet-5';

/** Plafond de tokens en sortie pour une génération (HTML autonome + éventuel raisonnement). */
export const GENERATION_MAX_TOKENS = 12000;

/** `true` si la démo est configurée (clé présente). Permet une dégradation gracieuse. */
export function isGeneratorConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

let client: Anthropic | null = null;

/**
 * Retourne un client Anthropic partagé (singleton).
 * Lève une erreur si la clé n'est pas configurée — l'appelant doit
 * vérifier `isGeneratorConfigured()` d'abord pour répondre proprement.
 */
export function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY manquante : la démo IA n’est pas configurée.');
  }
  if (!client) {
    client = new Anthropic({
      // Lue automatiquement depuis process.env.ANTHROPIC_API_KEY, explicite ici
      // pour la lisibilité du point de configuration.
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxRetries: 1,
    });
  }
  return client;
}
