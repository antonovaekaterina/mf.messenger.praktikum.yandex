import Block from "../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../utils/render.js";
import { store } from "../../index.js";
import Notification from "./views/Notification.js";
import { closeNotification } from "../../actions/notification.js";
export default class NotificationPortal extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            notificationsList: (this.props.notifications || []).map((_notification, index) => createNestedComponent(Notification, () => {
                // @ts-ignore
                const notificationItem = this.props.modals[index];
                return {
                    notification: notificationItem,
                    onClose: () => store.dispatch(closeNotification(notificationItem.id))
                };
            })),
        };
    }
    componentDidMount() {
        store.subscribe(this, state => ({
            notifications: state.notifications
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
        if (!this.props.notifications)
            return;
        if (this.props.notifications.length !== this.nestedComponents.notificationsList.length) {
            const propsNotificationsLength = this.props.notifications.length;
            const componentNotificationsLength = this.nestedComponents.notificationsList.length;
            if (propsNotificationsLength < componentNotificationsLength) {
                this.nestedComponents.notificationsList.splice(propsNotificationsLength);
                this.setPropsNestedComponents();
            }
            else {
                this.setPropsNestedComponents();
                let counter = componentNotificationsLength;
                while (counter < propsNotificationsLength) {
                    const index = counter;
                    this.nestedComponents.notificationsList.push(createNestedComponent(Notification, () => {
                        // @ts-ignore
                        const notificationItem = this.props.notifications[index];
                        return {
                            notification: notificationItem,
                            onClose: () => store.dispatch(closeNotification(notificationItem.id))
                        };
                    }));
                    ++counter;
                }
            }
        }
        else {
            this.setPropsNestedComponents();
        }
    }
    setPropsNestedComponents() {
        this.nestedComponents.notificationsList.forEach((nestedItem) => nestedItem.component.setProps(nestedItem.getProps()));
    }
    render() {
        const source = (`<div class="NotificationPortal">
                {{#each notifications}}
                    <span class="component" id="notificationsList" data-index="{{@index}}"></span>
                {{/each}}
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=NotificationPortal.js.map