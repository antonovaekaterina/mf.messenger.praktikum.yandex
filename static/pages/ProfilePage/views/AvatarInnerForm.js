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
        store.subscribe(this, (state) => ({
            user: state.user
        }));
    }
    render() {
        const source = (`<div class="AvatarInnerForm">
                <div class="container-fluid AvatarInnerForm__inner">
                    <div class="AvatarInnerForm__photo" {{#if user.avatar}}style='background-image: url("https://ya-praktikum.tech{{user.avatar}}")'{{/if}}></div>
                    <div class="AvatarInnerForm__user-info">
                        <div class="AvatarInnerForm__user-fullname">{{user.first_name}} {{user.second_name}}</div>
                        <div class="AvatarInnerForm__user-display-name">{{user.display_name}}</div>
                        <label class="AvatarInnerForm__user-change-photo-label" for="avatar">Изменить аватар</label>
                        <input class="AvatarInnerForm__user-change-photo-btn" type="file" id="avatar" name="avatar" accept=".jpg, .jpeg, .png">
                        <span class="component" id="button"></span>
                    </div>
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=AvatarInnerForm.js.map