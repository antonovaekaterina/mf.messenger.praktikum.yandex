import Block from "../../components/Block/Block.js";
import {IInputField} from './type.js';
import {createRenderContent} from "../../scripts/utils.js";

export default class InputFieldView extends Block {
    constructor(props: IInputField) {
        super(props);
    }

    render() {
        const source:string = (
            `<div class="InputFieldView">
                <label for="{{attribute}}">{{label}}</label>
                <input type="{{type}}" id="{{attribute}}" name="{{attribute}}">
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}