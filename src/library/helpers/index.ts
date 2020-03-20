export const toArray = <T>(v: T | T[]): T[] => (Array.isArray(v) ? v : [v]);
