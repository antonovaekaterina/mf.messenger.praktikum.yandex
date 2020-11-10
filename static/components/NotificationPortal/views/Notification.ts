import Block from "../../../components/Block/Block.js";
import {createNestedComponent, createRenderContent} from "../../../utils/render.js";
import {INotificationProps} from '../types.js';

export default class Notification extends Block<INotificationProps> {
    constructor(props: INotificationProps) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            notificationInner: createNestedComponent(this.props.notification.component, () => ({...this.props}))
        }
    }

    componentDidMount() {
        const root = this.getFragment();

        const closeElem = root.querySelector('.Notification_close');
        if (closeElem) {
            closeElem.addEventListener('click', this.props.onClose)
        }
    }

    render() {
        const source:string = (
            `<div class="Notification">
                <div class="Notification_inner">
                    <div class="Notification_close">Закрыть</div>
                    <span class="component" id="notificationInner"></span>
                </div>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}