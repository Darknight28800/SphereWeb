import { z } from 'zod';

/** Corps attendu par POST /api/generate. */
export const generateSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(12, 'Décrivez votre projet en une phrase au moins.')
    .max(600, 'Brief trop long : 600 caractères maximum.'),
  // Honeypot : doit rester vide (rempli uniquement par les robots).
  website: z.string().max(0).optional(),
});

export type GenerateInput = z.infer<typeof generateSchema>;
