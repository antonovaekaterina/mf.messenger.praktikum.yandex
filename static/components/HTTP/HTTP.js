const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};
export default class HTTPTransport {
    constructor(prefix = null) {
        this.prefix = prefix;
    }
    get(url, options = {}) {
        return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }), options.timeout);
    }
    ;
    put(url, options = {}) {
        return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }), options.timeout);
    }
    ;
    post(url, options = {}) {
        return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }), options.timeout);
    }
    ;
    delete(url, options = {}) {
        return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.DELETE }), options.timeout);
    }
    ;
    request(url, options = {}, timeout = 5000) {
        const { headers, data, method = METHODS.GET } = options;
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
                Object.entries(headers).forEach(header => xhr.setRequestHeader(header[0], header[1]));
            }
            xhr.onload = function () {
                resolve(xhr);
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
            if (method === METHODS.GET || !data) {
                xhr.send();
            }
            else {
                xhr.send(data);
            }
        });
    }
    ;
}
export const authHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');
export const userHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');
export const chatHTTPInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');
//# sourceMappingURL=HTTP.js.map