import {ComponentType} from '../Block/types';

export interface ILayout {
    innerComponent: ComponentType<any>,
    innerComponentProps: Record<string, any>,
    innerComponentClassName?: string
}
