import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
export default class Notification extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            notificationInner: createNestedComponent(this.props.notification.component, () => (Object.assign({}, this.props)))
        };
    }
    componentDidMount() {
        const root = this.getFragment();
        const closeElem = root.querySelector('.Notification_close');
        if (closeElem) {
            closeElem.addEventListener('click', this.props.onClose);
        }
    }
    render() {
        const source = (`<div class="Notification">
                <div class="Notification_inner">
                    <div class="Notification_close">Закрыть</div>
                    <span class="component" id="notificationInner"></span>
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Notification.js.map