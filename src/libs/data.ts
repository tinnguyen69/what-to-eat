'use server';

import type { Meal } from '@/types/meal';
import { db } from './db';

export async function fetchMeals() {
  try {
    const data = await db.query.mealSchema.findMany();

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return data as Meal[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch meals data.', { cause: error });
  }
}
