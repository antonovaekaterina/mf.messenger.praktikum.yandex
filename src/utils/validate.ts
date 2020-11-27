import {validationParam} from '../components/InputField/type';

const correctEmailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = (validationParams: validationParam[], attribute: string, value: string):string[] => {
    return (validationParams || []).map((param:validationParam):any => {
        switch(param) {
            case 'required':
                if (!value.length) {
                   return `Нужно заполнить ${attribute}`;
                }
                break;
            case 'number':
                if (value && isNaN(Number(value))) {
                    return 'Поле должно содержать только числа';
                }
                break;
            case 'email':
                if (value && !correctEmailReg.test(value)) {
                    return 'Не корректный email';
                }
                break;
            case 'phoneNumber':
                if (value && (isNaN(Number(value)) || value.length !== 11)) {
                    return 'Не корректный номер телефона';
                }
                break;
            default:
                return false;
        }
    }).filter(Boolean);
};