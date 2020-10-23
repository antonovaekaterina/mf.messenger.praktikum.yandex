export type handler = (...args: any[]) => any;

export interface IEventBusOutput {
    listeners: any;
    on(event: string, callback: handler): any;
    off(event: string, callback: handler): any;
    emit(event: string, ...args: any[]): any;
}

export interface IListener {
    [propName: string]: any[]
}
