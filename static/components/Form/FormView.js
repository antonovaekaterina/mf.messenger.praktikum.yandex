import Block from "../Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../scripts/utils.js";
export default class FormView extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            formInner: createNestedComponent(this.props.FormInner, () => (Object.assign({}, this.props)))
        };
    }
    componentDidMount() {
        super.componentDidMount();
        const form = this.getFragment().querySelector(`form[name="${this.props.name}"]`);
        if (!form)
            return;
        form.addEventListener('submit', this.props.onSubmit);
    }
    render() {
        const source = (`<form name="{{name}}">
                <span class="component" id="formInner"></span>
            </form>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=FormView.js.map