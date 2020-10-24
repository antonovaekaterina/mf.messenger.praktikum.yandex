
export interface IForm {
    FormInner: any;
    name: string;
    onSubmit?: (...args: any[]) => any,
    formErrors?: any,
    fields?: any[],
    commonFields?: any[]
    passwordFields?: any[]
}

