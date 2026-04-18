import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import MealSelection from '@/components/MealSelection';

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
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#f4f4f4',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>{t('header')}</h1>

      <MealSelection />
    </main>
  );
}
