export const LOCALES = ["en", "vi"] as const;

export type Locale = (typeof LOCALES)[number];

type ThemeMode = "dark" | "light" | "system";

export interface RawMessages {
	sections: {
		about: string;
		experience: string;
		education: string;
		certificates: string;
		skills: string;
		projects: string;
	};
	labels: {
		summary: string;
		responsibilities: string;
		technologiesUsed: string;
	};
	actions: {
		copied: string;
		copyEmail: string;
		showMore: string;
		showLess: string;
		openExternal: string;
		viewRepository: string;
		call: string;
		visitProfile: string;
	};
	status: {
		present: string;
	};
	print: {
		cv: string;
		personalDetails: string;
		name: string;
		address: string;
		phone: string;
		email: string;
		personalProfile: string;
		skills: string;
		workExperience: string;
		education: string;
		certificates: string;
		gpa: string;
		skillGroups: {
			frontend: string;
			backend: string;
			databases: string;
			tools: string;
		};
		educationDegree: string;
	};
	controls: {
		theme: string;
		language: string;
		languageNames: Record<Locale, string>;
		themeNames: Record<ThemeMode, string>;
	};
}

export interface Messages extends Omit<RawMessages, "actions" | "print" | "controls"> {
	actions: Omit<RawMessages["actions"], "openExternal" | "call" | "visitProfile"> & {
		openExternal: (name: string) => string;
		call: (name: string, phone: string) => string;
		visitProfile: (name: string, network: string) => string;
	};
	print: Omit<RawMessages["print"], "educationDegree"> & {
		educationDegree: (studyType: string, area: string) => string;
	};
	controls: Omit<RawMessages["controls"], "theme" | "language"> & {
		theme: (label: string) => string;
		language: (label: string) => string;
	};
}

import { localeResources } from "@/i18n/resources";

const formatTemplate = (template: string, values: Record<string, string>) =>
	template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

export const getMessages = (locale: Locale): Messages => {
	const messages = localeResources[locale].messages;

	return {
		...messages,
		actions: {
			...messages.actions,
			openExternal: (name) => formatTemplate(messages.actions.openExternal, { name }),
			call: (name, phone) => formatTemplate(messages.actions.call, { name, phone }),
			visitProfile: (name, network) => formatTemplate(messages.actions.visitProfile, { name, network }),
		},
		print: {
			...messages.print,
			educationDegree: (studyType, area) => formatTemplate(messages.print.educationDegree, { studyType, area }),
		},
		controls: {
			...messages.controls,
			theme: (label) => formatTemplate(messages.controls.theme, { label }),
			language: (label) => formatTemplate(messages.controls.language, { label }),
		},
	};
};
