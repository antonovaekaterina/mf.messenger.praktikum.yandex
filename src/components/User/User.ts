import Block from '../../components/Block/Block';
import {IUser} from './type';
import {createRenderContent} from '../../utils/render';
import './User.scss';

export default class User extends Block<IUser> {
    constructor(props: IUser) {
        super(props);
    }

    render() {
        const source:string = (
            `<div class='User'>
                <div class='User__img-wrap'>
                    <div class='User__img' {{#if user.avatar}}style='background-image: url("https://ya-praktikum.tech{{user.avatar}}")'{{/if}}></div>
                </div>
                <div class='User__info'>
                    <div class='User__name'>{{#if user.display_name}}{{user.display_name}}{{else}}{{user.first_name}} {{user.last_name}}{{/if}}</div>
                    {{#if message}}
                        <div class='User__message'>{{message}}</div>
                    {{/if}}
                </div>
            </div>`
        );

        return createRenderContent(source, this.props);
    }
}