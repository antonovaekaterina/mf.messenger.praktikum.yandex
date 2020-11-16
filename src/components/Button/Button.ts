import Block from "../../components/Block/Block.js";
import ButtonView from "./ButtonView.js";
import {IButtonProps} from "./types.js";
import {createNestedComponent, createRenderContent} from "../../utils/render.js";

export default class Button extends Block<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            buttonView: createNestedComponent(ButtonView, () => ({...this.props}))
        }
    }

    render() {
        const source:string = '<span class="component" id="buttonView"></span>';

        return createRenderContent(source, this.props);
    }
}