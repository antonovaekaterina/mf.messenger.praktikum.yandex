import Block from "../../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../../utils/render.js";
export default class Modal extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            modalInner: createNestedComponent(this.props.modal.component, () => (Object.assign({}, this.props)))
        };
    }
    componentDidMount() {
        const root = this.getFragment();
        const closeElem = root.querySelector('.Modal_close');
        if (closeElem) {
            closeElem.addEventListener('click', this.props.onClose);
        }
    }
    render() {
        const source = (`<div class="Modal">
                <div class="Modal__layout">
                    <div class="Modal__modal">
                        <div class="Modal__inner">
                            <div class="Modal__close">Закрыть</div>
                            <span class="component" id="modalInner"></span>
                        </div>
                    </div>
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=Modal.js.map