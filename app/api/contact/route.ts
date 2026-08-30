import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  name: z.string().trim().min(2, 'Nom trop court').max(120),
  email: z.string().trim().email('Adresse e-mail invalide').max(180),
  projectType: z.string().trim().max(80).optional(),
  message: z.string().trim().min(10, 'Message trop court').max(5000),
  company: z.string().max(0).optional(), // honeypot : doit rester vide
});

// Limitation basique en mémoire : 5 envois / 15 min / IP.
// Pour un déploiement multi-instances, remplacer par un store partagé (Redis, Upstash…).
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Trop de demandes envoyées. Merci de réessayer dans quelques minutes.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Données invalides.' },
      { status: 400 },
    );
  }

  // Honeypot rempli → on répond OK sans rien envoyer.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactEmail({ ...parsed.data, meta: { ip } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/contact] Échec de l’envoi :', err);
    return NextResponse.json(
      {
        error:
          "Le message n'a pas pu être envoyé pour le moment. Vous pouvez m'écrire directement à david.antoina@sphere-web.com.",
      },
      { status: 502 },
    );
  }
}
