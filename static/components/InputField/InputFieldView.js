import Block from "../../components/Block/Block.js";
import { createRenderContent } from "../../utils/render.js";
export default class InputFieldView extends Block {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.onBlur) {
            const input = this.getFragment().querySelector('input');
            input && input.addEventListener('blur', () => {
                //@ts-ignore
                this.props.onBlur(input);
            });
        }
    }
    render() {
        const source = (`<div class="InputFieldView">
                <label for="{{attribute}}">{{label}}</label>
                <input type="{{type}}" id="{{attribute}}" name="{{attribute}}" placeholder="{{placeholder}}" value="{{value}}">
                {{#each errors}}
                    <div class="InputFieldView__error">{{this}}</div>
                {{/each}}
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=InputFieldView.js.map