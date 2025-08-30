/** Theoretical delay to mimic network speed. */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
