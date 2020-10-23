import Block from "../../components/Block/Block.js";
import ButtonView from "./ButtonView.js";
import {IButtonProps} from "./type.js";
import {createRenderContent} from "../../scripts/utils.js";

export default class Button extends Block {
    constructor(props: IButtonProps) {
        super(props);
    }

    render() {
        const source:string = '<span class="component" id="buttonView"></span>';

        const nestedComponents = {
            buttonView: new ButtonView(this.props).getFragment()
        };

        return createRenderContent(source, this.props, nestedComponents);
    }
}