'use client';

import {
  BuildingStorefrontIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from '@/libs/i18n-navigation';

export default function NavLinks() {
  const t = useTranslations('Sidenav');
  const pathname = usePathname();

  const links = [
    { name: t('home'), href: '/', icon: ShoppingCartIcon },
    {
      name: t('meal'),
      href: '/meals',
      icon: BuildingStorefrontIcon,
    },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const active =
          link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-disabled={pathname === link.href}
            className={clsx(
              'flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-primary': active,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
