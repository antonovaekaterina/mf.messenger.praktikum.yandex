import {handler, IListener} from './types.js';

export default class EventBus {
    listeners: IListener;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: handler) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: handler) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener: handler) => listener !== callback);
    }

    emit(event: string, ...args: any[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener: handler) => {
            listener(...args);
        });
    }
}