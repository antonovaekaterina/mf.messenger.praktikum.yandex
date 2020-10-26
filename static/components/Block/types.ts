export type IAttribute = Record<string, string>

export interface IVirtualNode {
    nodeTypeCode: 'node' | 'text',
    tagName: string,
    attributes?: IAttribute,
    childNodes: IVirtualNode[],
    textContent?: string
}