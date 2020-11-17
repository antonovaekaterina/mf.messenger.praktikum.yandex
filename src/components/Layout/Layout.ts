import Block from '../../components/Block/Block.js';
import {createNestedComponent, createRenderContent} from '../../utils/render.js';
import {ILayout} from './types.js';
import ModalPortal from '../ModalPortal/ModalPortal.js';
import NotificationPortal from '../NotificationPortal/NotificationPortal.js';

export default class Layout extends Block<ILayout> {
    constructor(props: ILayout) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            innerComponent: createNestedComponent(this.props.innerComponent, () => ({...this.props.innerComponentProps}), this.props.innerComponentClassName),
            modalPortal: createNestedComponent(ModalPortal, () => ({})),
            notificationPortal: createNestedComponent(NotificationPortal, () => ({}))
        }
    }

    render() {
        const source:string = (
            `<div class='Layout'>
                <span class='component' id='innerComponent'></span>
                <span class='component' id='modalPortal'></span>
                <span class='component' id='notificationPortal'></span>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}