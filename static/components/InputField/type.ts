export type validationParam = 'required' | 'number' | 'phoneNumber' | 'email' | string;

export interface IInputField {
    attribute: string,
    type: 'text' | 'password' | 'email' | string,
    label: string,
    validationParams: validationParam[],
    errors?: string[],
    onBlur?: (...args: any[]) => any
}