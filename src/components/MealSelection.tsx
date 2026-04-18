'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchMeals } from '@/libs/data';
import { getLocalMeals, saveLocalMeals } from '@/libs/local-storage';
import type { Meal } from '@/types/meal';
import { delay, getRandomItem } from '@/utils/helpers';
import AddMealForm from './AddMealForm';
import MealCard from './MealCard';
import RandomButton from './RandomButton';

export default function MealSelection() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selected, setSelected] = useState<Meal | null>(null);

  const fetchData = async () => {
    let data = getLocalMeals();

    if (data.length < 1) {
      try {
        data = await fetchMeals();
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    setMeals(data);
    if (data.length > 0) {
      setSelected(getRandomItem(data));
      saveLocalMeals(data);
    }
  };

  // 🔄 Fetch meals from Lambda
  useEffect(() => {
    void fetchData();
  }, []);

  // 🎲 Pick random meal
  const pickRandom = async () => {
    if (meals.length === 0) {
      return;
    }

    setSelected(null);
    await delay(1);

    let newMeal;
    do {
      newMeal = getRandomItem(meals);
    } while (newMeal.id === selected?.id && meals.length > 1);

    setSelected(newMeal);
  };

  const handleAddMeal = useCallback((meal: Meal) => {
    setMeals((prev) => [...prev, meal]);
    setSelected(meal);
  }, []);

  return (
    <>
      <MealCard name={selected === null ? 'Đang si nghĩ...' : selected.name} />
      <RandomButton onClick={pickRandom} />
      <AddMealForm onAddAction={handleAddMeal} />
    </>
  );
}
