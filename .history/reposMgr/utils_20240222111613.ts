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



function getNextCharacter(char: string): string | null {
    // 获取字符的Unicode码点
    for (let i = 0, n = char.length; i++){

    }

    

    // 计算下一个字符的Unicode码点
    const nextCharCode = charCode + 1;

    // 将下一个码点转换回字符
    return String.fromCharCode(nextCharCode);
}

// 使用示例
const currentChar = 'PayPal';
const nextChar = getNextCharacter(currentChar);

console.log(nextChar); // 输出：'{'