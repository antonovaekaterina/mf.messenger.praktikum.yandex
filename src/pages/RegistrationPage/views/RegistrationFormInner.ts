import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import {createNestedComponent, createRenderContent, ICreateNestedComponent} from "../../../utils/render.js";
import {IForm} from '../../../components/Form/types.js';
import {ROUTE_LOGIN, router} from "../../../index.js";

export default class RegistrationFormInner extends Block<IForm> {
    constructor(props?: any) {
        super(props);

    }

    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () => ({
                label: 'Зарегистрироваться'
            })),
            inputList: (this.props.fields || []).map((field:any) => createNestedComponent(InputField, () => ({
                ...field,
                errors: this.props.formErrors && this.props.formErrors[field.attribute],
            }))),
        }
    }

    componentDidMount() {
        const root = this.getFragment();
        const elemLogIn = root.querySelector('.RegistrationFormInner__login');
        if (elemLogIn) {
            elemLogIn.addEventListener('click', this.handleLogInClick)
        }
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.updateNestedComponents();
        }
        return shouldUpdate;
    }

    updateNestedComponents() {
        this.nestedComponents.inputList.forEach((nestedItem: ICreateNestedComponent) => nestedItem.component.setProps(nestedItem.getProps()))
    }

    handleLogInClick(e: Event) {
        e.preventDefault();
        router.go(ROUTE_LOGIN);
    }

    render() {
        const source:string = (
            `<div class="RegistrationFormInner">
                {{#each fields}}
                    <span class="component" id="inputList" data-index="{{@index}}"></span>
                {{/each}}
                <span class="component" id="button"></span>
                <a class="RegistrationFormInner__login" href="#">Вход</a>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}
