import Block from "../../components/Block/Block.js";
import {createNestedComponent, createRenderContent, ICreateNestedComponent} from "../../utils/render.js";
import {IModalPortal} from "./types.js";
import {store} from "../../index.js";
import Modal from "./views/Modal.js";
import {IModal} from "../../core/Store/reducers/modal.js";
import {closeModal} from "../../core/Store/actions/modal.js";

export default class ModalPortal extends Block<IModalPortal> {
    constructor(props: IModalPortal) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            modalsList: (this.props.modals || []).map((_modal:IModal, index: number) => createNestedComponent(Modal, () => {
                // @ts-ignore
                const modalItem = this.props.modals[index];
                return {
                    modal: modalItem,
                    onClose: () => store.dispatch(closeModal(modalItem.id))
                }
            })),
        }
    }

    componentDidMount() {
        store.subscribe(this,state => ({
            modals: state.modals
        }))

        this.toggleBodyOverflow();
    }

    toggleBodyOverflow() {
        document.body.style.overflow = (this.props.modals && this.props.modals.length) ? 'hidden' : '';
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        const shouldUpdate = super.componentDidUpdate(oldProps, newProps);

        if (shouldUpdate) {
            this.updateNestedComponents();
            this.toggleBodyOverflow();
        }
        return shouldUpdate;
    }

    updateNestedComponents() {
        if (!this.props.modals) return;

        if (this.props.modals.length !== this.nestedComponents.modalsList.length) {
            const propsModalsLength = this.props.modals.length;
            const componentModalsLength = this.nestedComponents.modalsList.length;

            if (propsModalsLength < componentModalsLength) {
                this.nestedComponents.modalsList.splice(propsModalsLength);
                this.setPropsNestedComponents();
            } else {
                this.setPropsNestedComponents();

                let counter = componentModalsLength;
                while (counter < propsModalsLength) {
                    const index = counter;
                    this.nestedComponents.modalsList.push(createNestedComponent(Modal, () => {
                        // @ts-ignore
                        const modalItem = this.props.modals[index];
                        return {
                            modal: modalItem,
                            onClose: () => store.dispatch(closeModal(modalItem.id))
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
        this.nestedComponents.modalsList.forEach((nestedItem: ICreateNestedComponent) => nestedItem.component.setProps(nestedItem.getProps()));
    }

    render() {
        const source:string = (
            `<div class="ModalPortal">
                {{#each modals}}
                    <span class="component" id="modalsList" data-index="{{@index}}"></span>
                {{/each}}
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}