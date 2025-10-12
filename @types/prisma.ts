import { Ingredient, Product, Variation } from '@prisma/client';

export type ProductWithRelations = Product & { variations: Variation[]; ingredients: Ingredient[] };
