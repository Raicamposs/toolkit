
/**
 * Checks if a value is neither null nor undefined.
 * 
 * @param value - The value to check for assignment.
 * @returns {boolean} True if the value is assigned (not null or undefined), false otherwise.
 */
export const isAssigned = <T>(value: T): value is T => value !== null && value !== undefined
