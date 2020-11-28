import Block from '../../components/Block/Block';
import {IButtonProps} from './types';
import {createRenderContent} from '../../utils/render';
import './ButtonView.scss';

export default class ButtonView extends Block<IButtonProps> {
    render() {
        const source:string = (
            '<input class=\'ButtonView\' type=\'submit\' value=\'{{label}}\'>'
        );

        return createRenderContent(source, this.props);
    }
}
