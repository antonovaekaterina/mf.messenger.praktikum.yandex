import Block from "../../../components/Block/Block.js";
import {createNestedComponent, createRenderContent, ICreateNestedComponent} from "../../../utils/render.js";
import {IForm} from '../../../components/Form/types.js';
import Button from "../../../components/Button/Button.js";
import InputField from "../../../components/InputField/InputField.js";

export default class PasswordInnerForm extends Block<IForm> {
    constructor(props: IForm) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () =>({label: 'Сохранить'})),
            inputList: (this.props.fields || []).map((field:any) => createNestedComponent(InputField, () => ({
                ...field,
                errors: this.props.formErrors && this.props.formErrors[field.attribute],
            }))),
        }
    }

    componentDidUpdate(oldProps: IForm, newProps: IForm): boolean {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);

        if (shouldUpdate) {
            this.updateNestedComponents();
        }
        return shouldUpdate;
    }

    updateNestedComponents() {
        this.nestedComponents.inputList.forEach((nestedItem: ICreateNestedComponent) => nestedItem.component.setProps(nestedItem.getProps()))
    }

    render() {
        const source = (
            `<div class="PasswordInnerForm">
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
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}

