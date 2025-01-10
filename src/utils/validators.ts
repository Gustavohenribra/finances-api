import { z } from 'zod';

export const userValidator = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export const financeValidator = z.object({
  userId: z.number(),
  type: z.enum(['income', 'expense']),
  amount: z.number().positive(),
  category: z.string().min(1),
});
