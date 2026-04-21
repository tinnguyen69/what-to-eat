'use client';

import { SparklesIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { fetchMeals } from '@/libs/data';
import { getLocalMeals, saveLocalMeals } from '@/libs/local-storage';
import { delay, getRandomItem } from '@/libs/utils/helpers';
import type { Meal } from '@/types/meal';
import { Button } from '../common/button';
import MealCard from './meal-card';

export default function MealRandom() {
  const t = useTranslations('Index');

  const [meals, setMeals] = useState<Meal[]>([]);
  const [selected, setSelected] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    let data = getLocalMeals();

    if (data.length < 1) {
      try {
        data = await fetchMeals();
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    const goOutMeal: Meal = { id: '0', name: 'Ăn ngoài' };

    setMeals([goOutMeal, ...data]);
    if (data.length > 0) {
      setSelected(getRandomItem(data));
      saveLocalMeals(data);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const pickRandom = useCallback(async () => {
    setLoading(true);

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
    setLoading(false);
  }, [meals, selected]);

  return (
    <>
      <MealCard
        name={selected && !loading ? selected.name : t('label_thinking')}
      />
      <Button onClick={pickRandom} disabled={loading}>
        {t('button_random')} <SparklesIcon className="h-5 md:ml-4" />
      </Button>
    </>
  );
}
