import isObject from "./isObject.js";
export default function queryStringify(data) {
    if (!isObject(data)) {
        throw new Error('data must be an object');
    }
    const queryParts = Object.entries(data).map(([dataKey, dataValue]) => {
        if (dataValue && (typeof dataValue === 'object')) {
            if (Array.isArray(dataValue)) {
                return dataValue.map((dataValueItem, dataValueIndex) => `${dataKey}[${dataValueIndex}]=${dataValueItem}`).join('&');
            }
            else {
                const pathList = new PathList();
                pathList.make(dataValue, dataKey);
                return pathList.stringify();
            }
        }
        else {
            return `${dataKey}=${dataValue}`;
        }
    });
    return queryParts.filter(Boolean).join('&');
}
class PathList {
    constructor() {
        this.pathList = [];
    }
    make(source, path) {
        if (isObject(source)) {
            const sourceArr = Object.entries(source);
            if (sourceArr.length) {
                sourceArr.forEach(([sourceKey, sourceValue]) => {
                    this.make(sourceValue, `${path}[${sourceKey}]`);
                });
            }
            else {
                this.pathList.push(`${path}=null`);
            }
        }
        else if (Array.isArray(source)) {
            this.pathList.push(source.map((sourceValueItem, sourceValueIndex) => `${path}[${sourceValueIndex}]=${sourceValueItem}`).join('&'));
        }
        else {
            this.pathList.push(`${path}=${source}`);
        }
    }
    stringify() {
        return this.pathList.join('&');
    }
}
//# sourceMappingURL=queryStringify.js.map