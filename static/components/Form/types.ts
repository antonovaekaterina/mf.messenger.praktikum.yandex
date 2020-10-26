
export interface IForm {
    FormInner: any;
    name: string;
    onSubmit?: (...args: any[]) => any,
    formErrors?: Record<string, string[]>,
    fields?: any[],
    commonFields?: any[]
    passwordFields?: any[]
}

