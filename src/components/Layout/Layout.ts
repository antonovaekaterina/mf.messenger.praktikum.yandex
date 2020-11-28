import Block from '../../components/Block/Block';
import {createNestedComponent, createRenderContent} from '../../utils/render';
import {ILayout} from './types';
import ModalPortal from '../ModalPortal/ModalPortal';
import NotificationPortal from '../NotificationPortal/NotificationPortal';
import './Layout.scss';

export default class Layout extends Block<ILayout> {
    createNestedComponents() {
        this.nestedComponents = {
            innerComponent: createNestedComponent(this.props.innerComponent, () => ({...this.props.innerComponentProps}), this.props.innerComponentClassName),
            modalPortal: createNestedComponent(ModalPortal, () => ({})),
            notificationPortal: createNestedComponent(NotificationPortal, () => ({}))
        };
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
