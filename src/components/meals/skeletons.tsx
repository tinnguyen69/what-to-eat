import { useTranslations } from 'next-intl';

function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-secondary last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Meal Name and Image */}
      <td className="relative overflow-hidden py-3 pr-3 pl-6 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-secondary" />
          <div className="h-6 w-24 rounded bg-secondary" />
        </div>
      </td>
      {/* Description */}
      <td className="px-3 py-3 whitespace-nowrap">
        <div className="h-6 w-32 rounded bg-secondary" />
      </td>
      {/* Actions */}
      <td className="py-3 pr-3 pl-6 whitespace-nowrap">
        <div className="flex justify-end gap-3">
          <div className="h-9.5 w-9.5 rounded bg-secondary" />
          <div className="h-9.5 w-9.5 rounded bg-secondary" />
        </div>
      </td>
    </tr>
  );
}

function MealsMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-secondary pb-8">
        <div className="flex items-center">
          <div className="h-6 w-16 rounded bg-secondary" />
        </div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div />
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-secondary" />
          <div className="h-10 w-10 rounded bg-secondary" />
        </div>
      </div>
    </div>
  );
}

export function MealsTableSkeleton() {
  const t = useTranslations('Meal');

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <MealsMobileSkeleton />
            <MealsMobileSkeleton />
            <MealsMobileSkeleton />
            <MealsMobileSkeleton />
            <MealsMobileSkeleton />
            <MealsMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  {t('thead_name')}
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {t('thead_desc')}
                </th>
                <th
                  scope="col"
                  className="relative pt-2 pr-6 pb-4 pl-3 sm:pr-6"
                >
                  <span className="sr-only">{t('thead_edit')}</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
