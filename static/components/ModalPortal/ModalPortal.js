import Block from "../../components/Block/Block.js";
import { createNestedComponent, createRenderContent } from "../../utils/render.js";
import { store } from "../../index.js";
import Modal from "./views/Modal.js";
import { closeModal } from "../../actions/modal.js";
export default class ModalPortal extends Block {
    constructor(props) {
        super(props);
    }
    createNestedComponents() {
        this.nestedComponents = {
            modalsList: (this.props.modals || []).map((modal) => createNestedComponent(Modal, () => ({
                modal,
                onClose: () => store.dispatch(closeModal(modal.id))
            }))),
        };
    }
    componentDidMount() {
        store.subscribe(this, state => ({
            modals: state.modals
        }));
        this.toggleBodyOverflow();
    }
    toggleBodyOverflow() {
        document.body.style.overflow = (this.props.modals && this.props.modals.length) ? 'hidden' : '';
    }
    componentDidUpdate(oldProps, newProps) {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);
        if (shouldUpdate) {
            this.updateNestedComponents();
            this.toggleBodyOverflow();
        }
        return shouldUpdate;
    }
    updateNestedComponents() {
        //@ts-ignore
        (this.props.modals || []).forEach((modal, index) => {
            const nestedItem = this.nestedComponents.modalsList[index];
            nestedItem.component.setProps(nestedItem.getProps());
        });
    }
    render() {
        const source = (`<div class="ModalPortal">
                {{#each modals}}
                    <span class="component" id="modalsList" data-index="{{@index}}"></span>
                {{/each}}
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ModalPortal.js.map