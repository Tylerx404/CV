import en from "@/i18n/locales/en.json";
import vi from "@/i18n/locales/vi.json";

import type { ResumeData } from "@/lib/cv";
import type { Locale, RawMessages } from "@/lib/i18n";

export interface LocaleResource {
	cv: ResumeData;
	messages: RawMessages;
}

export const localeResources: Record<Locale, LocaleResource> = {
	en: en as LocaleResource,
	vi: vi as LocaleResource,
};
