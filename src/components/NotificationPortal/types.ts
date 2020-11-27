import {INotification} from '../../core/Store/reducers/notification';

export interface INotificationPortal {
    notifications?: INotification[]
}

export interface INotificationProps {
    notification: INotification,
    onClose: () => void
}