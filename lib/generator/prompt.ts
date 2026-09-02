/**
 * Construction du prompt système et du prompt utilisateur pour la
 * génération de maquette, + nettoyage / sécurisation de la sortie du modèle.
 *
 * Objectif du rendu (spec) : une home page SEULE — header/hero, palette
 * appliquée selon le style demandé, grille de 3-4 cards en placeholder.
 * Pas de sous-pages, pas de navigation fonctionnelle, pas de faux contenu
 * détaillé. On donne une impression de style, pas un site complet.
 */

/**
 * CSP injectée dans le document généré avant affichage dans l'iframe.
 * L'iframe est déjà `sandbox="allow-scripts"` (sans `allow-same-origin`) :
 * cette CSP interdit en plus toute requête réseau sortante depuis la maquette
 * (le rendu ne peut ni « téléphoner » ni charger de ressource distante).
 */
const SANDBOX_CSP =
  "default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:; " +
  "script-src 'unsafe-inline'; base-uri 'none'; form-action 'none'";

export function buildSystemPrompt(): string {
  return `Tu es un directeur artistique et intégrateur web senior. Tu produis des maquettes de PAGE D'ACCUEIL pour l'outil de démonstration de SphereWeb (studio de développement web freelance).

RÔLE ET PÉRIMÈTRE
- Tu génères UNIQUEMENT une page d'accueil de démonstration, en un seul fichier HTML autonome.
- But : montrer une AMBIANCE et un STYLE crédibles en quelques secondes — pas un site réel, pas un contenu d'entreprise véridique.
- Interdits : sous-pages, routeur, liens internes fonctionnels, formulaires qui envoient des données, fausses coordonnées précises (téléphone, adresse, SIRET…), faux avis clients nominatifs, logos de marques existantes.

STRUCTURE IMPOSÉE (dans cet ordre, rien d'autre)
1. Un header simple : nom fictif court de l'activité (inventé, générique) + 3 à 4 liens de navigation FACTICES (href="#", non cliquables utiles) + éventuellement un bouton d'appel à l'action.
2. Un hero : titre accrocheur court, sous-titre d'une à deux phrases, un ou deux boutons. Autorisé : une forme décorative en CSS pur (dégradé, cercle, blob) — jamais d'image externe.
3. Une grille de 3 ou 4 cards « services / prestations » en PLACEHOLDER : chaque card = une icône, un titre de prestation générique, 1 à 2 lignes de texte neutre (« Lorem »-like léger mais en français plausible), pas de prix.
4. Un pied de page minimal : le nom fictif + une mention générique (« © 2026 », « Mentions légales » en lien factice).

DIRECTION ARTISTIQUE
- Applique fidèlement le SECTEUR, l'AMBIANCE et la PALETTE demandés par l'utilisateur.
- Si une palette est donnée, respecte-la (2 à 4 couleurs + neutres). Sinon, choisis une palette cohérente avec le secteur et l'ambiance.
- Définis les couleurs en variables CSS (:root) et réutilise-les partout.
- Typographie : uniquement des polices système (system-ui, Georgia, « Times New Roman », Courier…). AUCUN import de Google Fonts ni @font-face distant.
- Soigne les détails : espacement généreux, hiérarchie typographique nette, coins/ombres cohérents, contraste suffisant (accessibilité AA sur le texte).
- Responsive : la grille passe à une colonne sous ~640px (flex/grid + media query).

CONTRAINTES TECHNIQUES (strictes)
- UN SEUL document : <!DOCTYPE html> … </html>.
- Tout le CSS dans une balise <style> unique dans <head>. JS seulement si utile (petit effet), inline dans <script>, sans dépendance.
- ZÉRO ressource externe : pas de <link>, pas de <script src>, pas d'<img src="http…">, pas de fetch/XHR, pas d'URL distante. Les images = dégradés/formes CSS ou SVG inline.
- ICÔNES : UNIQUEMENT du SVG inline (<svg viewBox="0 0 24 24">…</svg>) ou une forme CSS. JAMAIS de caractère spécial, emoji, dingbat, rune ou glyphe typographique en guise d'icône (ça s'affiche cassé).
- INTERACTIVITÉ : c'est un aperçu figé. Tous les liens en href="#", tous les <button> en type="button". Aucun formulaire qui soumet. Prévois des styles :hover discrets sur les boutons et liens (changement de couleur/opacité).
- Pas de commentaire de développeur, pas de texte hors du HTML.
- Longueur cible : 150 à 320 lignes. Reste compact.

RÉPONSE
- Réponds STRICTEMENT avec le document HTML, en commençant par <!DOCTYPE html> et en terminant par </html>.
- Aucune phrase d'introduction, aucun bloc de code Markdown, aucun commentaire avant ou après.`;
}

export interface GenerationBrief {
  /** Texte libre du prospect (déjà validé / borné en amont). */
  prompt: string;
  /** Palette choisie par le visiteur (2 à 4 couleurs hex), facultative. */
  colors?: string[];
}

export function buildUserPrompt({ prompt, colors }: GenerationBrief): string {
  const palette =
    colors && colors.length >= 2
      ? `\n\nPALETTE IMPOSÉE PAR LE CLIENT (prioritaire sur toute couleur citée dans le brief) : ${colors.join(', ')}.
Utilise EXACTEMENT ces couleurs comme base de la charte (fond, accents, boutons, titres), en t'autorisant seulement des neutres (blanc, noir, gris) et des variations d'opacité. Ne substitue aucune de ces couleurs.`
      : '';

  return `Génère la maquette de page d'accueil pour le brief suivant :

"""
${prompt}
"""${palette}

Rappel : header + hero + grille de 3-4 cards placeholder + pied de page minimal. Un seul fichier HTML autonome, zéro ressource externe. Réponds uniquement avec le HTML.`;
}

export class MalformedGenerationError extends Error {
  constructor() {
    super('Le modèle n’a pas renvoyé de document HTML exploitable.');
    this.name = 'MalformedGenerationError';
  }
}

/**
 * Extrait le document HTML de la réponse du modèle, retire un éventuel
 * emballage Markdown, et injecte la CSP de sandbox.
 * Lève `MalformedGenerationError` si le document est absent ou tronqué.
 */
export function extractHtmlDocument(raw: string): string {
  let text = raw.trim();

  // Retire un éventuel bloc ```html … ```
  const fence = text.match(/```(?:html)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) text = fence[1].trim();

  const start = text.search(/<!DOCTYPE html>/i);
  const end = text.toLowerCase().lastIndexOf('</html>');
  if (start === -1 || end === -1 || end <= start) {
    throw new MalformedGenerationError();
  }

  const doc = text.slice(start, end + '</html>'.length);

  // Garde-fou : pas de ressource distante même si le modèle a dérapé.
  if (/<(?:link|script)\b[^>]*\b(?:href|src)\s*=\s*["']?https?:/i.test(doc)) {
    throw new MalformedGenerationError();
  }

  return injectInertGuard(injectCsp(doc));
}

function injectCsp(doc: string): string {
  const meta = `<meta http-equiv="Content-Security-Policy" content="${SANDBOX_CSP}">`;
  if (/<head[^>]*>/i.test(doc)) {
    return doc.replace(/<head[^>]*>/i, (m) => `${m}\n  ${meta}`);
  }
  return doc.replace(/<html[^>]*>/i, (m) => `${m}\n<head>${meta}</head>`);
}

/**
 * Rend la maquette NON interactive : c'est un aperçu de rendu, pas un site.
 * Le document est injecté via `srcdoc` — son URL de base est celle du site
 * parent, donc un `href="#"` ou `href="/"` ferait naviguer l'iframe vers
 * sphereweb-dev.com. On neutralise donc tout : clics de liens, envois de
 * formulaire, navigation. Le survol (`:hover`) et le curseur `pointer`
 * restent actifs pour donner l'impression d'un site vivant.
 */
function injectInertGuard(doc: string): string {
  const guard = `<style>a,button,[role="button"],input[type="submit"],input[type="button"],label{cursor:pointer}</style>
<script>(function(){var s=function(e){e.preventDefault();e.stopPropagation();};
addEventListener('click',s,true);addEventListener('submit',s,true);addEventListener('auxclick',s,true);
addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target){var t=e.target.tagName;if(t==='A'||t==='BUTTON')e.preventDefault();}},true);
addEventListener('beforeunload',function(e){e.preventDefault();e.returnValue='';});
try{history.pushState=function(){};history.replaceState=function(){};}catch(_){}}());</script>`;

  if (/<\/body>/i.test(doc)) return doc.replace(/<\/body>/i, `${guard}\n</body>`);
  return doc.replace(/<\/html>/i, `${guard}\n</html>`);
}
