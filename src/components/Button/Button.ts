import Block from '../../components/Block/Block';
import ButtonView from './ButtonView';
import {IButtonProps} from './types';
import {createNestedComponent, createRenderContent} from '../../utils/render';

export default class Button extends Block<IButtonProps> {
    createNestedComponents() {
        this.nestedComponents = {
            buttonView: createNestedComponent(ButtonView, () => ({...this.props}))
        };
    }

    render() {
        const source:string = '<span class=\'component\' id=\'buttonView\'></span>';

        return createRenderContent(source, this.props);
    }
}
