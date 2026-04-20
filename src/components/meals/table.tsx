import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { fetchMeals } from '@/libs/data';
import { DeleteMeal, UpdateMeal } from './buttons';

export default async function MealsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const t = await getTranslations('Meal');

  const meals = await fetchMeals(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {meals?.map((meal) => (
              <div
                key={meal.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{meal.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{meal.description}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div />
                  <div className="flex justify-end gap-2">
                    <UpdateMeal id={meal.id} />
                    <DeleteMeal id={meal.id} />
                  </div>
                </div>
              </div>
            ))}
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
                <th scope="col" className="relative py-3 pr-3 pl-6">
                  <span className="sr-only">{t('thead_edit')}</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {meals?.map((meal) => (
                <tr
                  key={meal.id}
                  className="w-full border-b border-gray-200 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="py-3 pr-3 pl-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {meal.image && (
                        <Image
                          src={meal.image}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${meal.name}'s picture`}
                        />
                      )}
                      <p>{meal.name}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {meal.description}
                  </td>
                  <td className="py-3 pr-3 pl-6 whitespace-nowrap">
                    <div className="flex justify-end gap-3">
                      <UpdateMeal id={meal.id} />
                      <DeleteMeal id={meal.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
