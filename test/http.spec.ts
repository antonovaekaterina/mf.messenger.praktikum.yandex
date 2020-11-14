import HTTP from "../static/components/HTTP";

describe('HTTP', () => {
    const httpInstance = new HTTP();

    test('constructor work correctly', () => {
        expect(httpInstance).toBeTruthy();
    });

    test('http return promise', () => {
        expect(httpInstance.request('')).toBeInstanceOf(Promise);
    });

});