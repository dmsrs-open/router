export function extend(target, source, options) {
    const isDeep = options?.deep ?? false;
    target = target || {};
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const srcVal = source[key];
            const tarVal = target[key];
            if (isDeep && typeof srcVal === 'object' && srcVal !== null && !Array.isArray(srcVal) && typeof tarVal === 'object' && tarVal !== null) {
                extend(tarVal, srcVal, { deep: true });
            }
            else {
                target[key] = srcVal;
            }
        }
    }
    return target;
}
export function removeDuplicates(array) {
    return [...new Set(array)];
}
//# sourceMappingURL=factory.js.map