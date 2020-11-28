import Block from '../../components/Block/Block';
import InputFieldView from './InputFieldView';
import {IInputField} from './type';
import {createNestedComponent, createRenderContent} from '../../utils/render';
import {validate} from '../../utils/validate';

export default class InputField extends Block<IInputField> {
    createNestedComponents() {
        this.nestedComponents = {
            inputFieldView: createNestedComponent(InputFieldView, () => ({
                ...this.props,
                onBlur: (input: HTMLInputElement) => this.onBlur(input)
            }))
        };
    }

    onBlur(input: HTMLInputElement) {
        if (this.props.onBlur) {
            this.props.onBlur(input);
        }

        const errors:string[] = validate(this.props.validationParams, this.props.attribute, input.value);
        this.setProps({errors});
    }

    render() {
        const source:string = '<span class=\'component\' id=\'inputFieldView\'></span>';

        return createRenderContent(source, this.props);
    }
}
