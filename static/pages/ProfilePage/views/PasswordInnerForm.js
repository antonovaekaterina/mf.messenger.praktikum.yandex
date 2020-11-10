import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
import Button from "../../../components/Button/Button.js";
import InputField from "../../../components/InputField/InputField.js";
export default class PasswordInnerForm extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () => ({ label: 'Сохранить' })),
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
        const source = (`<div class="PasswordInnerForm">
                <div class="container-fluid">
                    <div class="PasswordInnerForm__title">
                        <div class="Icon"></div>
                        <h3>Изменить пароль</h3>
                    </div>
                    <div class="PasswordInnerForm__input-group">
                        {{#each fields}}
                            <span class="component" id="inputList" data-index="{{@index}}"></span>
                        {{/each}}
                        <span class="component" id="button"></span>
                    </div>
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=PasswordInnerForm.js.map