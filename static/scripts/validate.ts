import {validationParam} from '../components/InputField/type.js';

export default (validationParams: validationParam[] = [], attribute: string, value: string):string[] => {
    return validationParams.map((param:validationParam):string => {
        let errorText:string = '';

        switch(param) {
            case 'required':
                if (!value.length) {
                    errorText = `Нужно заполнить ${attribute}`;
                }
                break;
            case 'number':
                if (value && isNaN(Number(value))) {
                    errorText = 'Поле должно содержать только числа';
                }
                break;
            case 'email':
                if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    errorText = 'Не корректный email';
                }
                break;
            case 'phoneNumber':
                if (value && (isNaN(Number(value)) || value.length !== 11)) {
                    errorText = 'Не корректный номер телефона';
                }
                break;
        }

        return errorText;
    }).filter(Boolean);

}