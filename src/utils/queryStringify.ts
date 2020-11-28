import isObject from './isObject';

export default function queryStringify(data: Record<string, any>): string | never {
    if (!isObject(data)) {
        throw new Error('data must be an object');
    }

    const queryParts = Object.entries(data).map(([dataKey, dataValue]) => {
        if (dataValue && (typeof dataValue === 'object')) {
            if (Array.isArray(dataValue)) {
                return dataValue.map((dataValueItem, dataValueIndex) => `${dataKey}[${dataValueIndex}]=${dataValueItem}`).join('&');
            }

            const pathList = new PathList();
            pathList.make(dataValue, dataKey);
            return pathList.stringify();
        }

        return `${dataKey}=${dataValue}`;
    });

    return queryParts.filter(Boolean).join('&');
}

class PathList {
    private pathList: string[];

    constructor() {
        this.pathList = [];
    }

    make(source: unknown, path: string): void {
        if (isObject(source)) {
            const sourceArr = Object.entries(source as Object);

            if (sourceArr.length) {
                sourceArr.forEach(([sourceKey, sourceValue]) => {
                    this.make(sourceValue, `${path}[${sourceKey}]`);
                });
            } else {
                this.pathList.push(`${path}=null`);
            }
        } else if (Array.isArray(source)) {
            this.pathList.push(source.map((sourceValueItem, sourceValueIndex) => `${path}[${sourceValueIndex}]=${sourceValueItem}`).join('&'));
        } else {
            this.pathList.push(`${path}=${source}`);
        }
    }

    stringify(): string {
        return this.pathList.join('&');
    }
}
