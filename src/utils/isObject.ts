export default function isObject(value: any): boolean {
    return Boolean(value && (typeof value === 'object') && !Array.isArray(value));
}
