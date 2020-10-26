export type handler = (...args: any[]) => any;

export interface IListener {
    [propName: string]: handler[]
}
