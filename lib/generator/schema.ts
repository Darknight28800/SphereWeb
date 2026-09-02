import { z } from 'zod';

/** Corps attendu par POST /api/generate. */
export const generateSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(12, 'Décrivez votre projet en une phrase au moins.')
    .max(600, 'Brief trop long : 600 caractères maximum.'),
  // Palette choisie par le visiteur (facultative) : 2 à 4 couleurs hexadécimales.
  // Prioritaire sur toute couleur mentionnée dans le brief.
  colors: z
    .array(z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Couleur hexadécimale invalide.'))
    .min(2)
    .max(4)
    .optional(),
  // Honeypot : doit rester vide (rempli uniquement par les robots).
  website: z.string().max(0).optional(),
});

export type GenerateInput = z.infer<typeof generateSchema>;
