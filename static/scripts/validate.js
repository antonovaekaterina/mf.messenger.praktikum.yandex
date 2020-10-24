export default (validationParams = [], attribute, value) => {
    return validationParams.map((param) => {
        let errorText = '';
        switch (param) {
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
};
//# sourceMappingURL=validate.js.map