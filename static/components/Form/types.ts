
export interface IForm {
    FormInner: any;
    name: string;
    fields: any[],
    onSubmit?: (...args: any[]) => any,
    formErrors?: Record<string, string[]>,
}

