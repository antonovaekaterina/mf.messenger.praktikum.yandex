import Block from "../../components/Block/Block.js";
import { createRenderContent } from "../../utils/render.js";
import { ROOT, router } from "../../index.js";
export default class ErrorMessage extends Block {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const root = this.getFragment();
        const elemBackBtn = root.querySelector('.ErrorMessage__back-btn');
        if (elemBackBtn) {
            elemBackBtn.addEventListener('click', this.handleBackBtnClick);
        }
    }
    handleBackBtnClick(e) {
        e.preventDefault();
        router.go(ROOT);
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
                    <a class="btn ErrorMessage__back-btn" href="#">Вернуться к чатам</a>
                </div>
            </div>`);
        return createRenderContent(source, this.props);
    }
}
//# sourceMappingURL=ErrorMessage.js.map