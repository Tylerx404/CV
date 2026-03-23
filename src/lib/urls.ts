const ROOT_PATH_PATTERN = /^\/(?!\/)/;

export const withBase = (value: string) => {
	if (!ROOT_PATH_PATTERN.test(value)) {
		return value;
	}

	const base = import.meta.env.BASE_URL.replace(/\/$/, "");

	return value === "/" ? `${base}/` || "/" : `${base}${value}`;
};
