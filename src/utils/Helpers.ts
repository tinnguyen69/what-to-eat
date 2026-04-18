import { Env } from '@/libs/env';
import { routing } from '@/libs/i18n-routing';

/**
 * Resolves the public base URL of the application.
 * @returns The configured public app URL or the local development URL.
 */
export const getBaseUrl = () => {
  if (Env.NEXT_PUBLIC_APP_URL) {
    return Env.NEXT_PUBLIC_APP_URL;
  }

  return 'http://localhost:3000';
};

/**
 * Builds a locale-aware path by prefixing non-default locales.
 * @param url - The base application-relative path starting with a slash.
 * @param locale - The active locale identifier.
 * @returns The localized path, prefixed when the locale is not the default locale.
 */
export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export function getRandomItem<T>(items: T[]): T {
  const index = Math.floor(Math.random() * items.length);
  // oxlint-disable-next-line typescript/no-non-null-assertion
  return items[index]!;
}

// oxlint-disable-next-line typescript/promise-function-async
export function delay(second: number) {
  // oxlint-disable-next-line promise/avoid-new no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, second * 1000));
}
