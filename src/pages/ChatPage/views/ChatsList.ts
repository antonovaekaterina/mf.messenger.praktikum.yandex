import Block from '../../../components/Block/Block';
import ChatItem from './ChatItem';
import {IChatList} from '../type';
import {createNestedComponent, createRenderContent, ICreateNestedComponent} from '../../../utils/render';
import Form from '../../../components/Form/Form';
import SearchInnerForm from '../forms/SearchInnerForm';
import {store} from '../../../index';
import {openModal} from '../../../core/Store/actions/modal';
import CreateChatModal from '../modals/CreateChatModal';
import './ChatsList.scss';

export default class ChatsList extends Block<IChatList> {
    createNestedComponents() {
        this.nestedComponents = {
            chats: (this.props.chatList || []).map((_chatItem, index: number) => createNestedComponent(ChatItem, () => {
                const item = this.props.chatList?.[index];

                return {
                    item,
                    isActive: this.props.activeChat?.id === item?.id
                };
            })),
            searchForm: createNestedComponent(Form, () => ({
                name: 'SearchForm',
                FormInner: SearchInnerForm
            }))
        };
    }

    componentDidMount() {
        store.subscribe(this, state => ({
            chatList: state.chat.chatList,
            activeChat: state.chat.activeChat
        }));

        const root = this.getFragment();
        const addChatBtn = root.querySelector('.ChatsList__add-dialog-btn');
        if (addChatBtn) {
            addChatBtn.addEventListener('click', this.handleAddChatBtnClick);
        }
    }

    handleAddChatBtnClick() {
        store.dispatch(openModal('CreateChatModal', CreateChatModal));
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);

        if (shouldUpdate) {
            this.updateNestedComponents();
        }

        return shouldUpdate;
    }

    updateNestedComponents() {
        if (!this.props.chatList) {
            return;
        }

        const {chatList} = this.props;

        if (chatList.length !== this.nestedComponents.chats.length) {
            const propsChatsLength = chatList.length;
            const componentChatsLength = this.nestedComponents.chats.length;

            if (propsChatsLength < componentChatsLength) {
                this.nestedComponents.chats.splice(propsChatsLength);
                this.setPropsNestedComponents();
            } else {
                this.setPropsNestedComponents();

                let counter = componentChatsLength;
                while (counter < propsChatsLength) {
                    const index = counter;
                    this.nestedComponents.chats.push(createNestedComponent(ChatItem, () => {
                        const item = this.props.chatList?.[index];

                        return {
                            item,
                            isActive: this.props.activeChat?.id === item?.id
                        };
                    }));
                    ++counter;
                }
            }
        } else {
            this.setPropsNestedComponents();
        }
    }

    setPropsNestedComponents() {
        this.nestedComponents.chats.forEach((nestedItem: ICreateNestedComponent) => nestedItem.component.setProps(nestedItem.getProps()));
    }

    render() {
        const source:string = (
            `<aside class='ChatsList'>
                <div class='ChatsList__search-dialogs'>
                    <span class='component' id='searchForm'></span>
                </div>
                <div class='ChatsList__list'>
                    {{#each chatList}}
                        <span class='component' id='chats' data-index='{{@index}}'></span>
                    {{/each}}
                </div>
                <button class='ChatsList__add-dialog-btn Icon' title='Добавить контакт'></button>
            </aside>`
        );

        return createRenderContent(source, this.props);
    }
}

