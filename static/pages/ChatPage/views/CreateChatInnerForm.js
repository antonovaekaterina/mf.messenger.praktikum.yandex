import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
export default class CreateChatInnerForm extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () => ({
                label: 'Создать'
            })),
            inputList: (this.props.fields || []).map((field) => createNestedComponent(InputField, () => (Object.assign(Object.assign({}, field), { errors: this.props.formErrors && this.props.formErrors[field.attribute] })))),
        };
    }
    componentDidUpdate(oldProps, newProps) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.updateNestedComponents();
        }
        return shouldUpdate;
    }
    updateNestedComponents() {
        this.nestedComponents.inputList.forEach((nestedItem) => nestedItem.component.setProps(nestedItem.getProps()));
    }
    render() {
        const source = (`<div class="CreateChatInnerForm">
                {{#each fields}}
                    <span class="component" id="inputList" data-index="{{@index}}"></span>
                {{/each}}
                <span class="component" id="button"></span>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=CreateChatInnerForm.js.map