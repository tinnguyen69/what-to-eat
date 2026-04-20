'use server';

import { desc, ilike } from 'drizzle-orm';
import { mealSchema } from '@/models/schema';
import type { Meal } from '@/types/meal';
import { db } from './db';

const ITEMS_PER_PAGE = 6;

export async function fetchMeals(query = '', currentPage = 1) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await db.query.mealSchema.findMany({
      where: query ? ilike(mealSchema.name, query) : undefined,
      limit: ITEMS_PER_PAGE,
      offset,
      orderBy: desc(mealSchema.createdAt),
    });

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return data as Meal[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch meals data.', { cause: error });
  }
}

export async function fetchMealsPages(query = '') {
  try {
    const count = await db.$count(
      mealSchema,
      query ? ilike(mealSchema.name, query) : undefined
    );

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of meals.', {
      cause: error,
    });
  }
}
