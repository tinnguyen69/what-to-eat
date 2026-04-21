'use client';

import { clsx } from 'clsx';
import { useLocale } from 'next-intl';
import type { MouseEventHandler } from 'react';
import { usePathname, useRouter } from '@/libs/i18n-navigation';
import { routing } from '@/libs/i18n-routing';

export default function NavLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    const newLocale = event.currentTarget.name;

    if (newLocale === locale) {
      return;
    }

    const { search } = window.location;
    router.push(`${pathname}${search}`, { locale: newLocale, scroll: false });
  };

  return (
    <div className="flex h-12 grow items-center justify-center gap-2 md:flex-none md:justify-start">
      {routing.locales.map((elt) => (
        <button
          type="button"
          key={elt}
          name={elt}
          disabled={elt === locale}
          className={clsx(
            'app-button-secondary flex-1 h-12 rounded-md bg-gray-50 hover:bg-sky-100 hover:text-primary md:justify-start md:p-2 md:px-3 cursor-pointer',
            {
              'bg-sky-100 text-primary': elt === locale,
            }
          )}
          onClick={handleChange}
        >
          {elt.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
