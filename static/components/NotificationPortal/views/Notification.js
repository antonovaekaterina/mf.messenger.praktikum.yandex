import Block from "../../../components/Block/Block.js";
import { createRenderContent } from "../../../utils/render.js";
export default class Notification extends Block {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const root = this.getFragment();
        const closeElem = root.querySelector('.Notification__close');
        if (closeElem) {
            closeElem.addEventListener('click', this.props.onClose);
        }
    }
    render() {
        const source = (`<div class="Notification">
                <div class="Notification__inner">
                    <div class="Notification__close">Закрыть</div>
                    <div class="Notification__content">{{notification.props.text}}</div>
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Notification.js.map