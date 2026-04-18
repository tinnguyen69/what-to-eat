import type { Meal } from '@/types/meal';

const KEY = 'meals';

export function getLocalMeals(): Meal[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const data = localStorage.getItem(KEY);
  // oxlint-disable-next-line typescript/no-unsafe-return
  return data ? JSON.parse(data) : [];
}

export function saveLocalMeals(meals: Meal[]) {
  localStorage.setItem(KEY, JSON.stringify(meals));
}

export function addLocalMeal(meal: Meal) {
  const meals = getLocalMeals();
  meals.push(meal);
  saveLocalMeals(meals);
}
