import {IModal} from "../../core/Store/reducers/modal.js";

export interface IModalPortal {
    modals?: IModal[]
}

export interface IModalProps {
    modal: IModal,
    onClose: () => void
}