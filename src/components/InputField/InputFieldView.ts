import Block from '../../components/Block/Block';
import {IInputField} from './type';
import {createRenderContent} from '../../utils/render';
import './InputFieldView.scss';

export default class InputFieldView extends Block<IInputField> {
    componentDidMount(): void {
        if (this.props.onBlur) {
            const input:HTMLInputElement | null = this.getFragment().querySelector('input');
            if (input) {
                input.addEventListener('blur', () => {
                    if (typeof this.props.onBlur === 'function') {
                        this.props.onBlur(input);
                    }
                });
            }
        }
    }

    render() {
        const source:string = (
            `<div class='InputFieldView'>
                <label for='{{attribute}}'>{{label}}</label>
                <input type='{{type}}' id='{{attribute}}' name='{{attribute}}' placeholder='{{placeholder}}' value='{{value}}'>
                {{#each errors}}
                    <div class='InputFieldView__error'>{{this}}</div>
                {{/each}}
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}
