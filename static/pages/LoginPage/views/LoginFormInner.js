import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import { createNestedComponent, createRenderContent } from "../../../scripts/utils.js";
export default class LoginFormInner extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () => ({
                label: 'Войти'
            })),
            inputList: (this.props.fields || []).map((field) => createNestedComponent(InputField, () => (Object.assign(Object.assign({}, field), { errors: this.props.formErrors && this.props.formErrors[field.attribute] })))),
        };
    }
    componentDidUpdate(oldProps, newProps) {
        const result = super.componentDidUpdate(oldProps, newProps);
        if (result) {
            //@ts-ignore
            (this.props.fields || []).forEach((field, index) => {
                const nestedItem = this.nestedComponents.inputList[index];
                nestedItem.component.setProps(nestedItem.getProps());
            });
        }
        return result;
    }
    render() {
        const source = (`<div class="LoginFormInner">
                {{#each fields}}
                    <span class="component" id="inputList" data-index="{{@index}}"></span>
                {{/each}}
                <a href="#" class="LoginFormInner__forgot-password">Забыли пароль?</a>
                <span class="component" id="button"></span>
                <a class="LoginFormInner__sigh-in" href="./registration.html">Зарегистрироваться</a>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=LoginFormInner.js.map