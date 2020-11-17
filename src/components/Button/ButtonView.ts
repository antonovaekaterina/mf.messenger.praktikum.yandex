import Block from '../../components/Block/Block.js';
import {IButtonProps} from './types.js';
import {createRenderContent} from '../../utils/render.js';

export default class ButtonView extends Block<IButtonProps> {
    constructor(props: IButtonProps) {
        super(props);
    }

    render() {
        const source:string = (
            `<input class='ButtonView' type='submit' value='{{label}}'>`
        );

        return createRenderContent(source, this.props);
    }
}