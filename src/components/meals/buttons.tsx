import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { deleteMeal } from '@/libs/actions';

export function CreateMeal() {
  const t = useTranslations('Meal');

  return (
    <Link href="/meals/create" className="app-button-primary-2">
      <span className="hidden md:block">{t('button_add')}</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateMeal({ id }: { id: string }) {
  return (
    <Link href={`/meals/${id}/edit`} className="app-button">
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteMeal({ id }: { id: string }) {
  const t = useTranslations('Meal');
  const deleteInvoiceWithId = deleteMeal.bind(null, id);

  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="app-button">
        <span className="sr-only">{t('button_delete')}</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
