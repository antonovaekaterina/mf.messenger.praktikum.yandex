import {INotification} from "../../reducers/notification.js";

export interface INotificationPortal {
    notifications?: INotification[]
}

export interface INotificationProps {
    notification: INotification,
    onClose: () => void
}