function isObject(value) {
    return !!(value && (typeof value === 'object'));
}
export default function isEqual(a, b) {
    const aArr = Object.entries(a);
    const bArr = Object.entries(b);
    if (aArr.length !== bArr.length) {
        return false;
    }
    const uniqKeys = new Set();
    aArr.concat(bArr).forEach(([key]) => {
        uniqKeys.add(key);
    });
    if (uniqKeys.size > aArr.length) {
        return false;
    }
    return aArr.every(([aKey, aValue]) => {
        const bValue = b[aKey];
        if (typeof aValue !== typeof bValue) {
            return false;
        }
        if (isObject(aValue) && isObject(bValue)) {
            const aValueIsArray = Array.isArray(aValue);
            const bValueIsArray = Array.isArray(bValue);
            if (aValueIsArray && bValueIsArray) {
                if (aValue.length !== bValue.length) {
                    return false;
                }
                return aValue.every((aValueItem, index) => {
                    return aValueItem === bValue[index];
                });
            }
            else if (!aValueIsArray && !bValueIsArray) {
                return isEqual(aValue, bValue);
            }
            else {
                return false;
            }
        }
        else {
            return aValue === bValue;
        }
    });
}
//# sourceMappingURL=isEqual.js.map