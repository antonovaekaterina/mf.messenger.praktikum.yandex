import Block from "../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../utils/render.js";
import { store } from "../../index.js";
import { closeNotification } from "../../actions/notification.js";
import Notification from "./views/Notification.js";
export default class NotificationPortal extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            notificationsList: (this.props.notifications || []).map((notification) => createNestedComponent(Notification, () => ({
                notification,
                onClose: () => store.dispatch(closeNotification(notification.id))
            }))),
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
        //@ts-ignore
        (this.props.notifications || []).forEach((notification, index) => {
            const nestedItem = this.nestedComponents.notificationsList[index];
            nestedItem.component.setProps(nestedItem.getProps());
        });
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