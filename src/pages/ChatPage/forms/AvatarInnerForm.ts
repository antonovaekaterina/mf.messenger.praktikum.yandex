import Block from '../../../components/Block/Block';
import {createNestedComponent, createRenderContent} from '../../../utils/render';
import {store} from '../../../index';
import Button from '../../../components/Button/Button';
import {IAvatarInnerForm} from '../type';
import './AvatarInnerForm.scss';

export default class AvatarInnerForm extends Block<IAvatarInnerForm> {
    constructor(props: IAvatarInnerForm) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            button: createNestedComponent(Button, () =>({label: 'Сохранить'})),
        }
    }

    componentDidMount() {
        store.subscribe(this, (state) => ({
            avatar: state.chat.activeChat?.avatar
        }))
    }

    render() {
        const source = (
            `<div class="AvatarChatInnerForm">
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
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}

