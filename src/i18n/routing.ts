export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const documentLanguage: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-CN',
};

export const isLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);

export const getLocaleStaticPaths = () =>
  locales.map((locale) => ({
    params: { lang: locale },
    props: { locale },
  }));

const splitPathSuffix = (path: string) => {
  const suffixIndex = path.search(/[?#]/);

  return suffixIndex === -1
    ? { pathname: path, suffix: '' }
    : { pathname: path.slice(0, suffixIndex), suffix: path.slice(suffixIndex) };
};

export const withLocalePath = (path: string, locale: Locale) => {
  if (!path.startsWith('/') || path.startsWith('//')) return path;

  const { pathname, suffix } = splitPathSuffix(path);
  const pathWithoutLocale = pathname.replace(/^\/(?:en|zh)(?=\/|$)/, '');
  const normalizedPath = pathWithoutLocale === '' || pathWithoutLocale === '/'
    ? '/'
    : `/${pathWithoutLocale.replace(/^\/+|\/+$/g, '')}/`;

  return `/${locale}${normalizedPath}${suffix}`;
};

export const switchLocalePath = (pathname: string, targetLocale: Locale) =>
  withLocalePath(pathname, targetLocale);

export const getNewsSlug = (id: string) =>
  id.replace(/^(?:en|zh)\//, '').replace(/\.mdx?$/, '').replace(/\/index$/, '');

export const getNewsLocale = (id: string): Locale | undefined => {
  const locale = id.split('/')[0];
  return isLocale(locale) ? locale : undefined;
};
