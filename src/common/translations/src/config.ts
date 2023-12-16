import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enAuthTranslation from "./auth/en.json";
import esAuthTranslation from "./auth/es.json";
import frAuthTranslation from "./auth/fr.json";

import enSidebarTranslation from "./sidebar/en.json";
import esSidebarTranslation from "./sidebar/es.json";
import frSidebarTranslation from "./sidebar/fr.json";

import enStoreTranslation from "./store/en.json";
import esStoreTranslation from "./store/es.json";
import frStoreTranslation from "./store/fr.json";

import enBankSettingsTranslation from "./bankSettings/en.json";
import esBankSettingsTranslation from "./bankSettings/es.json";
import frBankSettingsTranslation from "./bankSettings/fr.json";

import enBundlesTranslation from "./bundles/en.json";
import esBundlesTranslation from "./bundles/es.json";
import frBundlesTranslation from "./bundles/fr.json";

import enDrinksTranslation from "./drinks/en.json";
import esDrinksTranslation from "./drinks/es.json";
import frDrinksTranslation from "./drinks/fr.json";

import enRedemptionsTranslation from "./redemptions/en.json";
import esRedemptionsTranslation from "./redemptions/es.json";
import frRedemptionsTranslation from "./redemptions/fr.json";

import enCommonTranslation from "./common/en.json";
import esCommonTranslation from "./common/es.json";
import frCommonTranslation from "./common/fr.json";

import enContactTranslation from "./contact/en.json";
import esContactTranslation from "./contact/es.json";
import frContactTranslation from "./contact/fr.json";

import enDashboardTranslation from "./dashboard/en.json";
import esDashboardTranslation from "./dashboard/es.json";
import frDashboardTranslation from "./dashboard/fr.json";

import enMultiStoreTranslation from "./multi-store/en.json";
import esMultiStoreTranslation from "./multi-store/es.json";
import frMultiStoreTranslation from "./multi-store/fr.json";

import enSalesTranslation from "./sales/en.json";
import esSalesTranslation from "./sales/es.json";
import frSalesTranslation from "./sales/fr.json";

import enCustomersTranslation from "./customers/en.json";
import esCustomersTranslation from "./customers/es.json";
import frCustomersTranslation from "./customers/fr.json";

import enStampsTranslation from "./stamps/en.json";
import esStampsTranslation from "./stamps/es.json";
import frStampsTranslation from "./stamps/fr.json";

import enBillingTranslation from "./billing/en.json";
import esBillingTranslation from "./billing/es.json";
import frBillingTranslation from "./billing/fr.json";

const resources = {
  en: {
    auth: enAuthTranslation,
    sidebar: enSidebarTranslation,
    store: enStoreTranslation,
    bankSettings: enBankSettingsTranslation,
    bundles: enBundlesTranslation,
    drinks: enDrinksTranslation,
    redemptions: enRedemptionsTranslation,
    common: enCommonTranslation,
    contact: enContactTranslation,
    dashboard: enDashboardTranslation,
    multiStore: enMultiStoreTranslation,
    sales: enSalesTranslation,
    customers: enCustomersTranslation,
    stamps: enStampsTranslation,
    billing: enBillingTranslation,
  },
  fr: {
    auth: frAuthTranslation,
    sidebar: frSidebarTranslation,
    store: frStoreTranslation,
    bankSettings: frBankSettingsTranslation,
    bundles: frBundlesTranslation,
    drinks: frDrinksTranslation,
    redemptions: frRedemptionsTranslation,
    common: frCommonTranslation,
    contact: frContactTranslation,
    dashboard: frDashboardTranslation,
    multiStore: frMultiStoreTranslation,
    sales: frSalesTranslation,
    customers: frCustomersTranslation,
    stamps: frStampsTranslation,
    billing: frBillingTranslation,
  },
  es: {
    auth: esAuthTranslation,
    sidebar: esSidebarTranslation,
    store: esStoreTranslation,
    bankSettings: esBankSettingsTranslation,
    bundles: esBundlesTranslation,
    drinks: esDrinksTranslation,
    redemptions: esRedemptionsTranslation,
    common: esCommonTranslation,
    contact: esContactTranslation,
    dashboard: esDashboardTranslation,
    multiStore: esMultiStoreTranslation,
    sales: esSalesTranslation,
    customers: esCustomersTranslation,
    stamps: esStampsTranslation,
    billing: esBillingTranslation,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng:
      typeof window !== "undefined"
        ? window.navigator.language.split("-")[0]
        : "en",
    fallbackLng: "en",
    compatibilityJSON: "v3",
    resources,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
