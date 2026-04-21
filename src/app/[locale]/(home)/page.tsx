import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import MealRandom from '@/components/home/meal-random';
import { lusitana } from '@/ui/font';

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  props: IndexPageProps
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {t('header')}
      </h1>
      <div className="flex flex-col items-center justify-center">
        <MealRandom />
      </div>
    </main>
  );
}
