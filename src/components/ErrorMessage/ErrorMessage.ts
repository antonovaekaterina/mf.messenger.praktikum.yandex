import Block from '../../components/Block/Block';
import {IErrorMessage} from './type'
import {createRenderContent} from '../../utils/render';
import {ROOT, router} from '../../index';
import './ErrorMessage.scss';

export default class ErrorMessage extends Block<IErrorMessage> {
    constructor(props: IErrorMessage) {
        super(props);
    }

    componentDidMount() {
        const root = this.getFragment();

        const elemBackBtn = root.querySelector('.ErrorMessage__back-btn');
        if (elemBackBtn) {
            elemBackBtn.addEventListener('click', this.handleBackBtnClick)
        }
    }

    handleBackBtnClick(e: Event) {
        e.preventDefault();
        router.go(ROOT);
    }

    render() {
        const source:string = (
            `<div class='ErrorMessage {{errorType}}'>
                <div class='ErrorMessage__img'>
                    <div class='ErrorMessage__img-code'>{{imgText}}</div>
                    <div class='ErrorMessage__img-icon'></div>
                </div>
                <div class='ErrorMessage__info'>
                    <h3>{{title}}</h3>
                    <p>{{subtitle}}</p>
                    <a class='btn ErrorMessage__back-btn' href='#'>Вернуться к чатам</a>
                </div>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}