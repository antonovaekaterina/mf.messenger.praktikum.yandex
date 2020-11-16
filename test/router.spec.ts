import {router} from '../src';
import Route from "../src/components/Route/Route";
import Block from "../src/components/Block/Block";
import {createRenderContent} from "../src/utils/render";
import Router from "../src/components/Router";



describe('Routing', () => {
    router.back();
    /* Это хак - если так не сделать, то тест падает с ошибкой: "TypeError: _Route.default is not a constructor"
    * в файле 'static/components/Router' на 30 строке.
    * Думаю, это происходит потому, что внутри модуля Route импортируется Layout, который импортирует ModalPortal,
    * который, в свою очередь, импортирует store из static/index.js.
    * Модуль static/index.js исполняется и инициализирует Router,
    * который внутри себя вызывает new Route (тестируемый компонент) и тест падает с ошибкой.
    * Пробовала использовать mock для Layout и Router, ничего не помогает.
    * Прокомментируйте, пожалуйста, как можно решить эту проблему.
    * */
    function createRootContainer(rootClassName: string) {
        const root = document.createElement('div');
        root.classList.add(rootClassName);
        document.body.append(root);
    }

    const rootClassName = 'root';
    const rootSelector = `.${rootClassName}`;
    const pathname = '/example';
    createRootContainer(rootClassName);

    class Example extends Block<any> {
        render() {
            const source:string = (
                `<div id="Example">Example</div>`
            );

            return createRenderContent(source, this.props);
        }
    }

    describe('Test Route Component', () => {
        const routeInstance = new Route(pathname, Example, {}, rootSelector)

        afterAll(() => {
            routeInstance.leave();
        })

        test('constructor work correctly', () => {
            expect(routeInstance).toBeTruthy();
        });

        test('method .render append node in document', () => {
            routeInstance.render();
            expect(document.getElementById('Example')).toBeTruthy();
        });

        test('method .match compare pathnames', () => {
            expect(routeInstance.match('/test')).toBeFalsy();
            expect(routeInstance.match(pathname)).toBeTruthy();
        });

        test('method .leave remove node from document', () => {
            routeInstance.leave();
            expect(document.getElementById('Example')).toBeFalsy();
        });

        test('method .navigate check pathname and append node in document', () => {
            routeInstance.navigate('/test');
            expect(document.getElementById('Example')).toBeFalsy();

            routeInstance.navigate(pathname);
            expect(document.getElementById('Example')).toBeTruthy();
        });
    })

    describe('Test Router Component', () => {
        const routerInstance = new Router(rootSelector);

        test('constructor work correctly', () => {
            expect(routerInstance).toBeTruthy();
        });

        test('method .use return Router instance for chaining', () => {
            expect(routerInstance.use(pathname, Example)).toBeInstanceOf(Router);
        });

        test('method .getRoute return correct route', () => {
            expect(routerInstance.getRoute('/test')).toBeFalsy();
            expect(routerInstance.getRoute(pathname)).toBeInstanceOf(Route);
        });

        test('method .go append route in dom and push pathname in history correctly', () => {
            routerInstance.go(pathname);
            expect(document.getElementById('Example')).toBeTruthy();
            expect(window.location.pathname).toBe(pathname);

            routerInstance.go('/test');
            expect(document.getElementById('Example')).toBeFalsy();
            expect(window.location.pathname).toBe('/test');
        });

    })

});

