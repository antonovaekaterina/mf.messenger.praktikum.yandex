import Block from "../../components/Block/Block.js";
import { createRenderContent } from "../../scripts/utils.js";
export default class ErrorMessage extends Block {
    constructor(props) {
        super(props);
    }
    render() {
        const source = (`<div class="ErrorMessage {{errorType}}">
                <div class="ErrorMessage__img">
                    <div class="ErrorMessage__img-code">{{imgText}}</div>
                    <div class="ErrorMessage__img-icon"></div>
                </div>
                <div class="ErrorMessage__info">
                    <h3>{{title}}</h3>
                    <p>{{subtitle}}</p>
                    <a class="btn" href="./chat.html">Вернуться к чатам</a>
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ErrorMessage.js.map