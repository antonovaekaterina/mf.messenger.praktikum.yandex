import Block from '../../../components/Block/Block';
import {createNestedComponent, createRenderContent} from '../../../utils/render';
import {IModalProps} from '../types';

export default class Modal extends Block<IModalProps> {
    constructor(props: IModalProps) {
        super(props);
    }

    createNestedComponents() {
        this.nestedComponents = {
            modalInner: createNestedComponent(this.props.modal.component, () => ({...this.props}))
        }
    }

    componentDidMount() {
        const root = this.getFragment();

        const closeElem = root.querySelector('.Modal__close');
        if (closeElem) {
            closeElem.addEventListener('click', this.props.onClose)
        }
    }

    render() {
        const source:string = (
            `<div class='Modal'>
                <div class='Modal__layout'>
                    <div class='Modal__modal'>
                        <div class='Modal__inner'>
                            <div class='Modal__close'>Закрыть</div>
                            <span class='component' id='modalInner'></span>
                        </div>
                    </div>
                </div>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}