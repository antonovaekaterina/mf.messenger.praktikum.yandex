import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import {createNestedComponent, createRenderContent, ICreateNestedComponent} from "../../../utils/render.js";
import {IForm} from '../../../components/Form/types.js';
import {ROUTE_REGISTRATION, router} from "../../../index.js";

export default class LoginFormInner extends Block<IForm> {
    constructor(props: IForm) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () => ({
                label: 'Войти'
            })),
            inputList: (this.props.fields || []).map((field:any) => createNestedComponent(InputField, () => ({
                ...field,
                errors: this.props.formErrors && this.props.formErrors[field.attribute],
            }))),
        }
    }

    componentDidMount() {
        const root = this.getFragment();
        const elemSignIn = root.querySelector('.LoginFormInner__sigh-in');
        if (elemSignIn) {
            elemSignIn.addEventListener('click', this.handleSignInClick)
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

    handleSignInClick(e: Event) {
        e.preventDefault();
        router.go(ROUTE_REGISTRATION);
    }

    render() {
        const source = (
            `<div class="LoginFormInner">
                {{#each fields}}
                    <span class="component" id="inputList" data-index="{{@index}}"></span>
                {{/each}}
                <a href="#" class="LoginFormInner__forgot-password">Забыли пароль?</a>
                <span class="component" id="button"></span>
                <a class="LoginFormInner__sigh-in" href="#">Зарегистрироваться</a>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}

