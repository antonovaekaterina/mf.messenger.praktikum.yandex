import Block from "../src/components/Block/Block";
import {createRenderContent} from "../src/utils/render";

describe('Component', () => {
    class Example extends Block<any> {
        componentDidMount() {
            componentDidMountCallback();
        }

        componentDidUpdate(oldProps: any, newProps: any): boolean {
            componentDidUpdateCallback();
            return super.componentDidUpdate(oldProps, newProps);
        }

        render() {
            renderCallback();
            const source:string = (
                `<div class="Example">{{text}}</div>`
            );

            return createRenderContent(source, this.props);
        }
    }

    const componentDidMountCallback = jest.fn();
    const componentDidUpdateCallback = jest.fn();
    const renderCallback = jest.fn();
    const text = 'Example!';
    const newText = 'newProps!'

    const exampleProps = {
        text,
        componentDidMountCallback,
        componentDidUpdateCallback,
        renderCallback
    }

    const exampleInstance = new Example(exampleProps);

    test('component work correctly with new() call', () => {
        expect(exampleInstance).toBeTruthy();
    });

    describe('Component build DOM element', () => {
        test('method .getFragment return DOM element', () => {
            expect(exampleInstance.getFragment() instanceof HTMLElement).toBeTruthy();
        });

        test('method .getFragment return DOM element with correct markup', () => {
            const fragment = exampleInstance.getFragment();
            expect(fragment.querySelector('.Example')?.innerHTML === text).toBeTruthy();
        });
    })

    describe('Calling component methods after init', () => {
        test('method .componentDidMount call once after init', () => {
            expect(componentDidMountCallback).toHaveBeenCalledTimes(1)
        });

        test('method .render call once after init', () => {
            expect(renderCallback).toHaveBeenCalledTimes(1)
        });

        test('method .componentDidUpdate not call after init', () => {
            expect(componentDidUpdateCallback).toHaveBeenCalledTimes(0)
        });
    })

    describe('Calling component methods after props updates', () => {
        test('method .componentDidUpdate call once after prop update', () => {
            exampleInstance.setProps({
                text: newText
            });

            expect(componentDidUpdateCallback).toHaveBeenCalledTimes(1)
        });

        test('method .render called a second time after prop update', () => {
            expect(renderCallback).toHaveBeenCalledTimes(2)
        });

        test('method .getFragment return DOM element with updated markup', () => {
            const fragment = exampleInstance.getFragment();
            expect(fragment.querySelector('.Example')?.innerHTML === newText).toBeTruthy();
        });
    })


});