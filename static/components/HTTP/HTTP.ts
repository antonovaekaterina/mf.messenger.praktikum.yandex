import {IOptions} from "./types.js";

const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};

export default class HTTPTransport {
    readonly prefix: string | null;

    constructor(prefix: string | null = null) {
        this.prefix = prefix;
    }

    get(url: string, options: IOptions = {}) {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    put(url: string, options: IOptions = {}) {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    post(url: string, options: IOptions = {}) {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    delete(url: string, options: IOptions = {}) {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request(url: string, options: IOptions = {}, timeout = 5000) {
        const {headers, data, method = METHODS.GET} = options;

        if (this.prefix) {
           url = this.prefix + url;
        }

        if ((method === METHODS.GET) && data) {
            url = url + data;
        }

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.open(method, url);
            xhr.timeout = timeout;

            if (headers) {
                Object.entries(headers).forEach(header => xhr.setRequestHeader(header[0], header[1]))
            }

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }

        })
    };
}

export const authHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');
export const userHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');
export const chatHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');