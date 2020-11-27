import Block from '../../../components/Block/Block';
import {createRenderContent} from '../../../utils/render';
import './SearchInnerForm.scss';

export default class SearchInnerForm extends Block<SearchInnerForm> {
    render() {
        const source = (
            `<div class="SearchInnerForm">
                <input type="text" placeholder="Поиск диалога" name="search">
                <div class="Icon"></div>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}

