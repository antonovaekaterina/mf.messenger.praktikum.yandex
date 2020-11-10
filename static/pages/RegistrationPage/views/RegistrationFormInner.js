import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
import { ROUTE_LOGIN, router } from "../../../index.js";
export default class RegistrationFormInner extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () => ({
                label: 'Зарегистрироваться'
            })),
            inputList: (this.props.fields || []).map((field) => createNestedComponent(InputField, () => (Object.assign(Object.assign({}, field), { errors: this.props.formErrors && this.props.formErrors[field.attribute] })))),
        };
    }
    componentDidMount() {
        const root = this.getFragment();
        const elemLogIn = root.querySelector('.RegistrationFormInner__login');
        if (elemLogIn) {
            elemLogIn.addEventListener('click', this.handleLogInClick);
        }
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
    handleLogInClick(e) {
        e.preventDefault();
        router.go(ROUTE_LOGIN);
    }
    render() {
        const source = (`<div class="RegistrationFormInner">
                {{#each fields}}
                    <span class="component" id="inputList" data-index="{{@index}}"></span>
                {{/each}}
                <span class="component" id="button"></span>
                <a class="RegistrationFormInner__login" href="#">Вход</a>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=RegistrationFormInner.js.map