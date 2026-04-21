'use client';

import { DocumentIcon, TagIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import type { State } from '@/libs/actions';
import { createMeal } from '@/libs/actions';
import { addLocalMeal } from '@/libs/local-storage';
import type { Meal } from '@/types/meal';
import { Button } from '../common/button';
import { TextInput } from '../common/text-input';

type Props = {
  onAddAction?: (meal: Meal) => void;
};

export default function CreateMealForm({ onAddAction }: Props) {
  const t = useTranslations('MealCreate');

  const initialState: State = { message: null, errors: {}, data: null };
  const [state, formAction, isPending] = useActionState(
    createMeal,
    initialState
  );

  useEffect(() => {
    if (state.data) {
      onAddAction?.(state.data);
      addLocalMeal(state.data);
    }
  }, [onAddAction, state]);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Meal Name */}
        <TextInput
          label={t('name_label')}
          icon={TagIcon}
          id="name"
          name="name"
          placeholder={t('name_placeholder')}
          errors={state.errors?.name}
        />

        {/* Meal Descriptioin */}
        <TextInput
          label={t('desc_label')}
          icon={DocumentIcon}
          id="description"
          name="description"
          placeholder={t('desc_placeholder')}
          errors={state.errors?.description}
        />

        <div id="invoice-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/meals" className="app-button-secondary">
          {t('button_cancel')}
        </Link>
        <Button type="submit" disabled={isPending}>
          {isPending ? t('button_submitting') : t('button_submit')}
        </Button>
      </div>
    </form>
  );
}
