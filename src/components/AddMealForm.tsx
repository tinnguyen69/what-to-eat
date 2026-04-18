'use client';

import { useActionState, useEffect } from 'react';
import type { State } from '@/libs/actions';
import { createMeal } from '@/libs/actions';
import { addLocalMeal } from '@/libs/local-storage';
import type { Meal } from '@/types/meal';
import { Button } from './common/Button';
import { TextInput } from './common/TextInput';

type Props = {
  onAddAction: (meal: Meal) => void;
};

export default function AddMealForm({ onAddAction }: Props) {
  const initialState: State = { message: null, errors: {}, data: null };
  const [state, formAction, isPending] = useActionState(
    createMeal,
    initialState
  );

  useEffect(() => {
    if (state.data) {
      onAddAction(state.data);
      addLocalMeal(state.data);
    }
  }, [onAddAction, state]);

  return (
    <form action={formAction} style={{ marginTop: '20px' }}>
      {/* Meal Name */}
      <TextInput
        label="Choose a meal name"
        id="name"
        name="name"
        placeholder="Enter meal name"
        errors={state.errors?.name}
      />

      {/* Meal Descriptioin */}
      <TextInput
        label="Enter meal description"
        id="description"
        name="description"
        placeholder="Enter meal description"
        errors={state.errors?.description}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Đang thêm nè...' : 'Thêm'}
      </Button>
    </form>
  );
}
