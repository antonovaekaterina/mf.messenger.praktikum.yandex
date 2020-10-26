import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import {createNestedComponent, createRenderContent} from "../../../scripts/utils.js";
import {IForm} from '../../../components/Form/types.js';

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


    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const result = super.componentDidUpdate(oldProps, newProps);
        if (result) {
            //@ts-ignore
            (this.props.fields || []).forEach((field: any, index: number) => {
                const nestedItem = this.nestedComponents.inputList[index];
                nestedItem.component.setProps(nestedItem.getProps())
            })
        }
        return result;
    }

    render() {
        const source:string = (
            `<div class="RegistrationFormInner">
                {{#each fields}}
                    <span class="component" id="inputList" data-index="{{@index}}"></span>
                {{/each}}
                <span class="component" id="button"></span>
                <a class="RegistrationFormInner__login" href="./login.html">Вход</a>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}

