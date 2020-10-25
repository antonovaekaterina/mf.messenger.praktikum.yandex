import {IForm} from './types.js';
import Block from "../Block/Block.js";
import {createNestedComponent, createRenderContent} from "../../scripts/utils.js";

export default class FormView extends Block {
    constructor(props: IForm) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            formInner: createNestedComponent(this.props.FormInner, () => ({...this.props}))
        }
    }

    componentDidMount(): void {
        super.componentDidMount();
        const form:any = this.getFragment().querySelector(`form[name="${this.props.name}"]`);
        if (!form) return;
        form.addEventListener('submit', this.props.onSubmit)
    }

    render() {
        const source:string = (
            `<form name="{{name}}">
                <span class="component" id="formInner"></span>
            </form>`
        );

        return createRenderContent(source, this.props);
    }
}