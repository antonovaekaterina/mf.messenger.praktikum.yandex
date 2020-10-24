import Block from "../../../components/Block/Block.js";
import { createRenderContent } from "../../../scripts/utils.js";
import Button from "../../../components/Button/Button.js";
import InputField from "../../../components/InputField/InputField.js";
export default class ProfileInnerForm extends Block {
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
                            <span class="component" id="commonInputFieldList"></span>
                            <span class="component" id="commonButton"></span>
                        </div>
                    </div>
                    <div class="ProfileInnerForm__settings ProfileInnerForm__settings--password">
                        <div class="ProfileInnerForm__title ProfileInnerForm__title--password">
                            <div class="Icon"></div>
                            <h3>Изменить пароль</h3>
                        </div>
                        <div class="ProfileInnerForm__input-group">
                            <span class="component" id="passwordInputFieldList"></span>
                            <span class="component" id="passwordButton"></span>
                        </div>
                    </div>
                 </div>
            </div>`);
        const nestedComponents = {
            commonButton: new Button({ label: 'Сохранить' }).getFragment(),
            passwordButton: new Button({ label: 'Сохранить' }).getFragment(),
            commonInputFieldList: this.props.commonFields.map((field) => new InputField(Object.assign({ errors: this.props.formErrors && this.props.formErrors[field.attribute] }, field)).getFragment()),
            passwordInputFieldList: this.props.passwordFields.map((field) => new InputField(Object.assign({ errors: this.props.formErrors && this.props.formErrors[field.attribute] }, field)).getFragment())
        };
        return createRenderContent(source, this.props, nestedComponents);
    }
}
//# sourceMappingURL=ProfileInnerForm.js.map