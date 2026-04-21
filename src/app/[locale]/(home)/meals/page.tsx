import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import Pagination from '@/components/common/pagination';
import Search from '@/components/common/search';
import { CreateMeal } from '@/components/meals/buttons';
import { MealsTableSkeleton } from '@/components/meals/skeletons';
import MealsTable from '@/components/meals/table';
import { fetchMealsPages } from '@/libs/data';
import { lusitana } from '@/ui/font';

type MealPageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: MealPageProps
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Meal',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Meal(props: MealPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Meal',
  });

  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchMealsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>{t('header')}</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder={t('search')} />
        <CreateMeal />
      </div>
      <Suspense key={query + currentPage} fallback={<MealsTableSkeleton />}>
        <MealsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
