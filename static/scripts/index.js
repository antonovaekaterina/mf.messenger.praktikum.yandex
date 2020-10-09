const forms = Array.from(document.forms);
if (forms.length) {
    forms.forEach(form => {
        form.onsubmit = function (e) {
            e.preventDefault();
            const formElements = Array.from(this.elements);
            const formValues = formElements.reduce((obj, element) => {
                if (element.name) {
                    obj[element.name] = element.value;
                }

                return obj;
            }, {});

            console.log(formValues)
        }
    })
}

