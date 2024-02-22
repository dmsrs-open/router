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

let source = 'PayPal'
for (let i = 0, n = source.length; i < n; i++){
    let c=source[i];
    console.log(c. + 1);
}


function getNextCharacter(char: string): string | null {
    // 获取字符的Unicode码点
    const charCode = char.charCodeAt(0);

    // 检查是否已经是最后一个字符
    if (charCode === 0x10FFFF) {
        return null; // Unicode的最大码点是0x10FFFF，超过此值无意义
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