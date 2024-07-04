/**
 * Imports necessary modules for internationalization (i18n) support in the application.
 * @module i18n
 * @requires i18next
 * @requires Backend
 * @requires i18nextMiddleware
 * @requires path
 */
import i18next from 'i18next';
import Backend from 'i18next-node-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import path from 'path';

/**
 * Sets up i18next with the given locales path and configuration options.
 * @param {string} localesPath - The path to the locales directory with placeholders for language and namespace.
 * @returns None
 */
const localesPath = path.join(__dirname, '../../locales/{{lng}}/{{ns}}.json');

// Using i18next for localization.
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: localesPath,
    },
    fallbackLng: 'en',
    preload: ['en'],
  });

export default i18next;
