// utils.ts
export function extend<T, U>(target: T, source: U, options?: { deep?: boolean }): T & U {
    const isDeep = options?.deep ?? false;
    target = target || {} as T;
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const srcVal = source[key];
            const tarVal = (target as any)[key];

            if (isDeep && typeof srcVal === 'object' && srcVal !== null && !Array.isArray(srcVal) && typeof tarVal === 'object' && tarVal !== null) {
                extend(tarVal as any, srcVal as any, { deep: true });
            } else {
                (target as any)[key] = srcVal;
            }
        }
    }
    return target as T & U;
}

export function removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
}

export default { extend, removeDuplicates }

foreach(let c in 'PayPal'){
    console.log(c + 1);
}