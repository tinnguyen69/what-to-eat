'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

type SearchProps = {
  placeholder: string;
};

export default function Search({ placeholder }: SearchProps) {
  const t = useTranslations('Common');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      const term = e.target.value;
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <div className="relative flex flex-1 shrink-0">
      <label htmlFor="search" className="sr-only">
        {t('search')}
      </label>
      <input
        id="search"
        className="app-input peer py-2.25"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-4.5 w-4.5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
