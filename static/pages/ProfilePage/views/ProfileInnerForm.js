import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../../scripts/utils.js";
import Button from "../../../components/Button/Button.js";
import InputField from "../../../components/InputField/InputField.js";
export default class ProfileInnerForm extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            commonButton: createNestedComponent(Button, () => ({ label: 'Сохранить' })),
            passwordButton: createNestedComponent(Button, () => ({ label: 'Сохранить' })),
            commonInputFieldList: (this.props.commonFields || []).map((field) => createNestedComponent(InputField, () => (Object.assign(Object.assign({}, field), { errors: this.props.formErrors && this.props.formErrors[field.attribute] })))),
            passwordInputFieldList: (this.props.passwordFields || []).map((field) => createNestedComponent(InputField, () => (Object.assign(Object.assign({}, field), { errors: this.props.formErrors && this.props.formErrors[field.attribute] })))),
        };
    }
    componentDidUpdate(oldProps, newProps) {
        const result = super.componentDidUpdate(oldProps, newProps);
        if (result) {
            //@ts-ignore
            (this.props.commonFields || []).forEach((field, index) => {
                const nestedItem = this.nestedComponents.commonInputFieldList[index];
                nestedItem.component.setProps(nestedItem.getProps());
            });
            //@ts-ignore
            (this.props.passwordFields || []).forEach((field, index) => {
                const nestedItem = this.nestedComponents.passwordInputFieldList[index];
                nestedItem.component.setProps(nestedItem.getProps());
            });
        }
        return result;
    }
    render() {
        const source = (`<div class="ProfileInnerForm">
               <div class="container-fluid">
                    <div class="ProfileInnerForm__user">
                        <div class="ProfileInnerForm__photo"></div>
                        <div class="ProfileInnerForm__user-info">
                            <div class="ProfileInnerForm__user-fullname">{{user.firstName}} {{user.lastName}}</div>
                            <div class="ProfileInnerForm__user-display-name">{{user.displayName}}</div>
                            <label class="ProfileInnerForm__user-change-photo-label btn" for="avatar">Изменить аватар</label>
                            <input class="ProfileInnerForm__user-change-photo-btn" type="file" id="avatar" name="avatar" accept=".jpg, .jpeg, .png">
                        </div>
                    </div>
                    <div class="ProfileInnerForm__settings ProfileInnerForm__settings--common">
                        <div class="ProfileInnerForm__title ProfileInnerForm__title--common">
                            <div class="Icon"></div>
                            <h3>Редактировать профиль</h3>
                        </div>
                        <div class="ProfileInnerForm__input-group">
                            {{#each commonFields}}
                                <span class="component" id="commonInputFieldList" data-index="{{@index}}"></span>
                            {{/each}}
                            <span class="component" id="commonButton"></span>
                        </div>
                    </div>
                    <div class="ProfileInnerForm__settings ProfileInnerForm__settings--password">
                        <div class="ProfileInnerForm__title ProfileInnerForm__title--password">
                            <div class="Icon"></div>
                            <h3>Изменить пароль</h3>
                        </div>
                        <div class="ProfileInnerForm__input-group">
                            {{#each passwordFields}}
                                <span class="component" id="passwordInputFieldList" data-index="{{@index}}"></span>
                            {{/each}}
                            <span class="component" id="passwordButton"></span>
                        </div>
                    </div>
                 </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ProfileInnerForm.js.map