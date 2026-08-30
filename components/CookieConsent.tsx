'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'sw-consent';

type Choice = 'accepted' | 'refused';

/**
 * Bandeau de consentement (Charte §5 / §6.2 — suivi de fréquentation respectueux du RGPD).
 * Aucun script de mesure d'audience n'est chargé tant que l'utilisateur n'a pas accepté.
 * Brancher ici l'initialisation de l'outil analytics le jour où il est ajouté.
 */
export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'accepted';
  } catch {
    return false;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* stockage indisponible : on n'affiche rien plutôt que de boucler */
    }
  }, []);

  const decide = (choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement à la mesure d'audience"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy-800/95 backdrop-blur"
    >
      <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/70">
          Ce site n&apos;utilise aucun traceur publicitaire. J&apos;aimerais mesurer la fréquentation
          de façon anonyme pour améliorer le site.{' '}
          <Link href="/confidentialite" className="link-accent">
            En savoir plus
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" className="btn-ghost px-4 py-2" onClick={() => decide('refused')}>
            Refuser
          </button>
          <button type="button" className="btn-primary px-4 py-2" onClick={() => decide('accepted')}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
