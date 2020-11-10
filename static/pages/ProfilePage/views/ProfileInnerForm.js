import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
import Button from "../../../components/Button/Button.js";
import InputField from "../../../components/InputField/InputField.js";
import { store } from "../../../index.js";
export default class ProfileInnerForm extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () => ({ label: 'Сохранить' })),
            inputList: (this.props.fields || []).map((field) => createNestedComponent(InputField, () => {
                var _a;
                return (Object.assign(Object.assign({}, field), { errors: this.props.formErrors && this.props.formErrors[field.attribute], 
                    // @ts-ignore
                    value: (_a = this.props.user) === null || _a === void 0 ? void 0 : _a[field.attribute] }));
            })),
        };
    }
    componentDidMount() {
        store.subscribe(this, (state) => ({
            user: state.user
        }));
    }
    componentDidUpdate(oldProps, newProps) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.updateNestedComponents();
        }
        return shouldUpdate;
    }
    updateNestedComponents() {
        //@ts-ignore
        (this.props.fields || []).forEach((field, index) => {
            const nestedItem = this.nestedComponents.inputList[index];
            nestedItem.component.setProps(nestedItem.getProps());
        });
    }
    render() {
        const source = (`<div class="ProfileInnerForm">
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
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ProfileInnerForm.js.map