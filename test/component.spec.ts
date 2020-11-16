import Block from "../src/components/Block/Block";
import {createRenderContent} from "../src/utils/render";

describe('Component', () => {
    class Example extends Block<any> {
        componentDidMount() {
            this.props.componentDidMountCallback();
        }

        componentDidUpdate(oldProps: any, newProps: any): boolean {
            this.props.componentDidUpdateCallback();
            return super.componentDidUpdate(oldProps, newProps);
        }

        render() {
            this.props.renderCallback();
            const source:string = (
                `<div class="Example">{{text}}</div>`
            );

            return createRenderContent(source, this.props);
        }
    }

    let componentDidMountCallback: () => any;
    let componentDidUpdateCallback: () => any;
    let renderCallback: () => any;

    const text = 'Example!';
    const newText = 'newProps!';

    let exampleInstance: Example | null = null;

    beforeEach(() => {
        componentDidMountCallback = jest.fn();
        componentDidUpdateCallback = jest.fn();
        renderCallback = jest.fn();

        const exampleProps = {
            text,
            componentDidMountCallback,
            componentDidUpdateCallback,
            renderCallback
        }

        exampleInstance = new Example(exampleProps);
    });

    test('component work correctly with new() call', () => {
        expect(exampleInstance).toBeTruthy();
    });

    describe('Component build DOM element', () => {
        test('method .getFragment return DOM element', () => {
            expect(exampleInstance?.getFragment() instanceof HTMLElement).toBeTruthy();
        });

        test('method .getFragment return DOM element with correct markup', () => {
            const fragment = exampleInstance?.getFragment();
            expect(fragment?.querySelector('.Example')?.innerHTML === text).toBeTruthy();
        });
    })

    describe('Calling component methods after init', () => {
        test('method .componentDidMount call once after init', () => {
            expect(componentDidMountCallback).toHaveBeenCalledTimes(1);
        });

        test('method .render call once after init', () => {
            expect(renderCallback).toHaveBeenCalledTimes(1);
        });

        test('method .componentDidUpdate not call after init', () => {
            expect(componentDidUpdateCallback).toHaveBeenCalledTimes(0);
        });
    })

    describe('Calling component methods after props updates', () => {
        const updateProps = () => {
            exampleInstance?.setProps({
                text: newText
            })
        }

        test('method .componentDidUpdate call once after prop update', () => {
            updateProps();
            expect(componentDidUpdateCallback).toHaveBeenCalledTimes(1);
        });

        test('method .render called a second time after prop update', () => {
            updateProps();
            expect(renderCallback).toHaveBeenCalledTimes(2);
        });

        test('method .getFragment return DOM element with updated markup', () => {
            updateProps();
            const fragment = exampleInstance?.getFragment();
            expect(fragment?.querySelector('.Example')?.innerHTML === newText).toBeTruthy();
        });
    })
});