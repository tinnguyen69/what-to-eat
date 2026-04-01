import { Meal } from "@/types/meal";

const KEY = "meals";

export function getUserMeals(): Meal[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUserMeals(meals: Meal[]) {
  localStorage.setItem(KEY, JSON.stringify(meals));
}

export function addMeal(meal: Meal) {
  const meals = getUserMeals();
  meals.push(meal);
  saveUserMeals(meals);
}
