import Block from "../../../components/Block/Block.js";
import { createRenderContent } from "../../../scripts/utils.js";
export default class SearchInnerForm extends Block {
    render() {
        const source = (`<div class="SearchInnerForm">
                <input type="text" placeholder="Поиск диалога" name="search">
                <div class="Icon"></div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=SearchInnerForm.js.map