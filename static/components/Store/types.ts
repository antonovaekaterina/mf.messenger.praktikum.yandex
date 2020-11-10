export interface IAction {
    type: string,
    [index: string]: any;
}

export type StateType = Record<string, any>;

export type ReducerType = (state:StateType, action?: IAction) => StateType

