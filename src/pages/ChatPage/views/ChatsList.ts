import Block from '../../../components/Block/Block.js';
import ChatItem from './ChatItem.js';
import {IChatList} from '../type.js';
import {createNestedComponent, createRenderContent, ICreateNestedComponent} from '../../../utils/render.js';
import Form from '../../../components/Form/Form.js';
import SearchInnerForm from '../forms/SearchInnerForm.js';
import {store} from '../../../index.js';
import {openModal} from '../../../core/Store/actions/modal.js';
import CreateChatModal from '../modals/CreateChatModal.js';

export default class ChatsList extends Block<IChatList> {
    constructor(props: IChatList) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            chats: (this.props.chatList || []).map((_chatItem, index: number) => createNestedComponent(ChatItem, () => {
                const item = this.props.chatList?.[index]

                return {
                    item,
                    isActive: this.props.activeChat?.id === item?.id
                }
            })),
            searchForm: createNestedComponent(Form, () => ({
                name: 'SearchForm',
                FormInner: SearchInnerForm
            })),
        }
    }

    componentDidMount() {
        store.subscribe(this, (state) => ({
            chatList: state.chat.chatList,
            activeChat: state.chat.activeChat
        }))

        const root = this.getFragment();
        const addChatBtn = root.querySelector('.ChatsList__add-dialog-btn');
        if (addChatBtn) {
            addChatBtn.addEventListener('click', this.handleAddChatBtnClick);
        }
    }

    handleAddChatBtnClick() {
        store.dispatch(openModal('CreateChatModal', CreateChatModal))
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);

        if (shouldUpdate) {
            this.updateNestedComponents();
        }
        return shouldUpdate;
    }

    updateNestedComponents() {
        if (!this.props.chatList) return;

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
                        const item = this.props.chatList?.[index]

                        return {
                            item,
                            isActive: this.props.activeChat?.id === item?.id
                        }
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

        return createRenderContent(source, this.props)
    }
}

