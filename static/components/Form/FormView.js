import Block from "../Block/Block.js";
import { createRenderContent } from "../../scripts/utils.js";
export default class FormView extends Block {
    constructor(props) {
        super(props);
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
        const nestedComponents = {
            formInner: new this.props.FormInner(this.props).getFragment()
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=FormView.js.map