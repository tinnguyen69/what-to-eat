import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Breadcrumbs from '@/components/meals/breadcrumbs';
import CreateMealForm from '@/components/meals/create-form';

type MealCreatePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: MealCreatePageProps
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'MealCreate',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function MealCreate(props: MealCreatePageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'MealCreate',
  });

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t('breadcrumb_parent'), href: '/meals' },
          {
            label: t('header'),
            href: '/meals/create',
            active: true,
          },
        ]}
      />
      <CreateMealForm />
    </main>
  );
}
