import Block from "../../../components/Block/Block.js";
import InputField from "../../../components/InputField/InputField.js";
import Button from "../../../components/Button/Button.js";
import {
    createNestedComponent,
    createRenderContent,
    ICreateNestedComponent
} from "../../../utils/render.js";
import {IForm} from '../../../components/Form/types.js';

export default class AddUserInnerForm extends Block<IForm> {
    constructor(props: IForm) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () => ({
                label: 'Найти'
            })),
            inputList: (this.props.fields || []).map((field:any) => createNestedComponent(InputField, () => ({
                ...field,
                errors: this.props.formErrors && this.props.formErrors[field.attribute],
            }))),
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

    render() {
        const source = (
            `<div class="AddUserInnerForm">
                {{#each fields}}
                    <span class="component" id="inputList" data-index="{{@index}}"></span>
                {{/each}}
                <span class="component" id="button"></span>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}

