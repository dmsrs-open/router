// utils.ts
export function extend<T, U>(target: T, source: U, options?: { deep?: boolean }): T & U {
    // ... (extend函数的实现保持不变)
}

export function removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
}