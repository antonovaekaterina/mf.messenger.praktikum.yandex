import Block from '../../../components/Block/Block.js';
import {createNestedComponent, createRenderContent, ICreateNestedComponent} from '../../../utils/render.js';
import Button from '../../../components/Button/Button.js';
import InputField from '../../../components/InputField/InputField.js';
import {store} from '../../../index.js';
import {IProfileInnerForm} from '../type.js'

export default class ProfileInnerForm extends Block<IProfileInnerForm> {
    constructor(props: IProfileInnerForm) {
        super(props);
    }

    createNestedComponents() {

        this.nestedComponents = {
            button: createNestedComponent(Button, () =>({label: 'Сохранить'})),
            inputList: (this.props.fields || []).map((field:any) => createNestedComponent(InputField, () => ({
                ...field,
                errors: this.props.formErrors && this.props.formErrors[field.attribute],
                // @ts-ignore
                value: this.props.user?.[field.attribute]
            }))),
        }
    }

    componentDidMount() {
        store.subscribe(this, (state) => ({
            user: state.user
        }))
    }

    componentDidUpdate(oldProps: IProfileInnerForm, newProps: IProfileInnerForm): boolean {
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
            `<div class="ProfileInnerForm">
                <div class="container-fluid">
                    <div class="ProfileInnerForm__title">
                        <div class="Icon"></div>
                        <h3>Редактировать профиль</h3>
                    </div>
                    <div class="ProfileInnerForm__input-group">
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

