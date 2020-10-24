import Block from "../../components/Block/Block.js";
import { createRenderContent } from "../../scripts/utils.js";
export default class InputFieldView extends Block {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const input = this.getFragment().querySelector('input');
        input === null || input === void 0 ? void 0 : input.addEventListener('blur', () => {
            this.props.onBlur(input);
        });
    }
    render() {
        const source = (`<div class="InputFieldView">
                <label for="{{attribute}}">{{label}}</label>
                <input type="{{type}}" id="{{attribute}}" name="{{attribute}}">
                {{#each errors}}
                    <div class="InputFieldView__error">{{this}}</div>
                {{/each}}
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=InputFieldView.js.map