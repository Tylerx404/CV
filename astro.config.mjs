import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const isCi = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER ?? "";
const repositoryName = repository.split("/")[1] ?? "";
const isUserPagesRepo =
	repositoryOwner.length > 0 &&
	repositoryName.toLowerCase() === `${repositoryOwner.toLowerCase()}.github.io`;
const site = repositoryOwner ? `https://${repositoryOwner}.github.io` : undefined;
const base = isCi && repositoryName && !isUserPagesRepo ? `/${repositoryName}/` : "/";

// https://astro.build/config
export default defineConfig({
	site,
	base,
	vite: {
		plugins: [tailwindcss()],
	},
});
