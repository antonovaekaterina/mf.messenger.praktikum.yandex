import Block from "../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../utils/render.js";
import ModalPortal from "../ModalPortal/ModalPortal.js";
import NotificationPortal from "../NotificationPortal/NotificationPortal.js";
export default class Layout extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            innerComponent: createNestedComponent(this.props.innerComponent, () => (Object.assign({}, this.props.innerComponentProps)), this.props.innerComponentClassName),
            modalPortal: createNestedComponent(ModalPortal, () => ({})),
            notificationPortal: createNestedComponent(NotificationPortal, () => ({}))
        };
    }
    render() {
        const source = (`<div class="Layout">
                <span class="component" id="innerComponent"></span>
                <span class="component" id="modalPortal"></span>
                <span class="component" id="notificationPortal"></span>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Layout.js.map