import Block from './Block';

export type IAttribute = Record<string, string>

export interface IVirtualNode {
    nodeTypeCode: 'node' | 'text',
    tagName: string,
    attributes?: IAttribute,
    childNodes: IVirtualNode[],
    textContent?: string
}

export type ComponentType<T extends Block<any>> = new (...args: any[]) => T;