export function isEmptyArray(value: Array<any>): boolean {
	return value.length <= 0;
}

export function isArray(value: Array<any>): boolean {
	return Array.isArray(value);
}
