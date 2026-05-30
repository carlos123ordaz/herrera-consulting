export type { Translations, Lang } from './types';
export { es } from './es';
export { en } from './en';

import { es } from './es';
import { en } from './en';
import type { Lang, Translations } from './types';

export function getTranslations(lang: Lang): Translations {
  return lang === 'en' ? en : es;
}
