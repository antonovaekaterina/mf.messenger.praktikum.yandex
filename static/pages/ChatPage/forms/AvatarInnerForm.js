import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
import { store } from "../../../index.js";
import Button from "../../../components/Button/Button.js";
export default class AvatarInnerForm extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () => ({ label: 'Сохранить' })),
        };
    }
    componentDidMount() {
        store.subscribe(this, (state) => {
            var _a;
            return ({
                avatar: (_a = state.chat.activeChat) === null || _a === void 0 ? void 0 : _a.avatar
            });
        });
    }
    render() {
        const source = (`<div class="AvatarChatInnerForm">
                <div class="AvatarChatInnerForm__inner">
                    <div class="AvatarChatInnerForm__photo" {{#if avatar}}style='background-image: url("https://ya-praktikum.tech{{avatar}}")'{{/if}}></div>
                    <div class="AvatarChatInnerForm__controls">
                        <label class="AvatarChatInnerForm__change-photo-label" for="avatar">Изменить аватар</label>
                        <input class="AvatarChatInnerForm__change-photo-btn" type="file" id="avatar" name="avatar" accept=".jpg, .jpeg, .png">
                    </div>
                </div>
                <div class="AvatarChatInnerForm__submit-btn-wrap">
                    <span class="component" id="button"></span>
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=AvatarInnerForm.js.map