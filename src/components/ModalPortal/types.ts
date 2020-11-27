import {IModal} from '../../core/Store/reducers/modal';

export interface IModalPortal {
    modals?: IModal[]
}

export interface IModalProps {
    modal: IModal,
    onClose: () => void
}