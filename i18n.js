import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";
import { DateTime } from "luxon";

import en from "./translations/en-default.json";
import de from "./translations/de.json";

const userLocale = RNLocalize.getLocales( )[0].languageTag;

// I don't really get why all this is needed, but this is the format i18next expects
// according to this package https://github.com/DylanVann/i18next-react-native-language-detector
const languageDetector = {
  init: Function.prototype,
  type: "languageDetector",
  detect: () => userLocale,
  cacheUserLanguage: Function.prototype
};

// following setup from https://locize.com/blog/how-to-internationalize-react-i18next/#why-i18next
i18n
  // detect user language
  .use( languageDetector )
  // pass the i18n instance to react-i18next.
  .use( initReactI18next )
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init( {
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: ( value, format, lng ) => {
        if ( value instanceof Date ) {
          return DateTime.fromJSDate( value ).setLocale( lng ).toLocaleString( DateTime[format] );
        }
        return value;
      }
    },
    resources: {
      en: {
        translation: en
      },
      de: {
        translation: de
      }
    }
  } );

export default i18n;
