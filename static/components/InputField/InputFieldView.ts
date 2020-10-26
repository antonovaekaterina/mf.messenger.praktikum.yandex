import Block from "../../components/Block/Block.js";
import {IInputField} from './type.js';
import {createRenderContent} from "../../scripts/utils.js";

export default class InputFieldView extends Block<IInputField> {
    constructor(props: IInputField) {
        super(props);
    }

    componentDidMount(): void {
        if (this.props.onBlur) {
            const input:HTMLInputElement | null = this.getFragment().querySelector('input');
            input && input.addEventListener('blur', () => {
                //@ts-ignore
                this.props.onBlur(input)
            })
        }
    }

    render() {
        const source:string = (
            `<div class="InputFieldView">
                <label for="{{attribute}}">{{label}}</label>
                <input type="{{type}}" id="{{attribute}}" name="{{attribute}}">
                {{#each errors}}
                    <div class="InputFieldView__error">{{this}}</div>
                {{/each}}
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}