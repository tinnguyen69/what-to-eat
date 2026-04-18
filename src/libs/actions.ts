'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { mealSchema } from '@/models/schema';
import type { Meal } from '@/types/meal';
import { db } from './db';

const MealFormSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, { message: 'Please enter meal name.' }),
  description: z.string().trim().optional(),
  date: z.string(),
});

const CreateMeal = MealFormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
  data?: Meal | null;
};

export async function createMeal(_prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateMeal.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: 'Missing Fields. Failed to Create Meal.',
    };
  }

  // Insert data into the database
  try {
    const meal = await db
      .insert(mealSchema)
      .values(validatedFields.data)
      .returning({
        id: mealSchema.id,
        name: mealSchema.name,
        description: mealSchema.description,
      });

    return {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      data: meal[0] as Meal,
      message: 'Create Meal sucessful!',
    };
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to Create Meal.' };
  } finally {
    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/');
    // redirect('/');
  }
}
