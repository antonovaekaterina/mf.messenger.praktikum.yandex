import HTTP, {METHODS} from "../src/api/HTTP/HTTP";

describe('HTTP', () => {
    let httpInstance: null | HTTP;

    beforeEach(() => {
        httpInstance = new HTTP();
        httpInstance.request = jest.fn().mockImplementation((url, options, timeout) => Promise.resolve({
            url,
            options,
            timeout
        }));
    });

    test('constructor work correctly', () => {
        expect(httpInstance).toBeTruthy();
    });

    test('http return promise', () => {
        expect(httpInstance?.request('')).toBeInstanceOf(Promise);
    });

    test('method .get use correct params', () => {
        httpInstance?.get('').then((data:any) => {
            expect(data.options.method).toBe(METHODS.GET);
        });
    });

    test('method .post use correct params', () => {
        httpInstance?.post('').then((data:any) => {
            expect(data.options.method).toBe(METHODS.POST);
        });
    });

    test('method .put use correct params', () => {
        httpInstance?.put('').then((data:any) => {
            expect(data.options.method).toBe(METHODS.PUT);
        });
    });

    test('method .delete use correct params', () => {
        httpInstance?.delete('').then((data:any) => {
            expect(data.options.method).toBe(METHODS.DELETE);
        });
    });

});