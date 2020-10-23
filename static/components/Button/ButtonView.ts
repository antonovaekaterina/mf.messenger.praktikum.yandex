import Block from "../../components/Block/Block.js";
import {IButtonProps} from './type.js';
import {createRenderContent} from "../../scripts/utils.js";

export default class ButtonView extends Block {
    constructor(props: IButtonProps) {
        super(props);
    }

    render() {
        const source:string = (
            `<input class="ButtonView" type="submit" value="{{label}}">`
        );

        return createRenderContent(source, this.props);
    }
}