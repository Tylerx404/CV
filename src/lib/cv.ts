import type { Locale } from "@/lib/i18n";
import { localeResources } from "@/i18n/resources";
import { withBase } from "@/lib/urls";

export interface ResumeData {
	basics: {
		name: string;
		label: string;
		image: string;
		email: string;
		phone: string;
		url: string;
		summary: string;
		theme?: string;
		location: {
			address: string;
			ward: string;
			postalCode: string;
			city: string;
			countryCode: string;
			region: string;
		};
		profiles: Array<{
			network: string;
			username: string;
			url: string;
		}>;
	};
	work: Array<{
		name: string;
		position: string;
		location_type?: string;
		location?: string;
		url?: string;
		startDate: string;
		endDate: string | null;
		summary?: string | string[];
		highlights?: string[];
		responsibilities?: string[];
		skills?: string[];
	}>;
	education: Array<{
		institution: string;
		url?: string;
		area: string;
		studyType: string;
		startDate: string;
		endDate: string | null;
		score?: string;
		courses?: string[];
	}>;
	certificates: Array<{
		name: string;
		date: string;
		issuer?: string;
		url?: string;
	}>;
	skills: Array<{
		name: string;
		level?: string;
		keywords?: string[];
	}>;
	projects: Array<{
		name: string;
		isActive: boolean;
		description: string;
		highlights: string[];
		url?: string;
		github?: string;
	}>;
}

export type ResumeBasics = ResumeData["basics"];
export type ResumeWork = ResumeData["work"];
export type ResumeEducation = ResumeData["education"];
export type ResumeCertificates = ResumeData["certificates"];
export type ResumeSkills = ResumeData["skills"];
export type ResumeProjects = ResumeData["projects"];

export const getCv = (locale: Locale): ResumeData => {
	const cv = localeResources[locale].cv;

	return {
		...cv,
		basics: {
			...cv.basics,
			image: withBase(cv.basics.image),
			url: withBase(cv.basics.url),
		},
		certificates: cv.certificates.map((certificate) => ({
			...certificate,
			url: certificate.url ? withBase(certificate.url) : certificate.url,
		})),
	};
};
