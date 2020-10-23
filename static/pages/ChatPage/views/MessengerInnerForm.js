import Block from "../../../components/Block/Block.js";
import { createRenderContent } from "../../../scripts/utils.js";
export default class MessengerInnerForm extends Block {
    render() {
        const source = (`<div class="MessengerInnerForm">
                <textarea placeholder="Начните вводить сообщение..." name="message"></textarea>
                <button class="Icon MessengerInnerForm__messenger-attachment"></button>
                <input class="MessengerInnerForm__messenger-send-btn" type="submit" value="">
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=MessengerInnerForm.js.map