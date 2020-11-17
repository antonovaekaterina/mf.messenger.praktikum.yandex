import IUser from '../../types/UserType.js';
import {IForm} from '../../components/Form/types.js';

export interface IProfilePageProps {

}

export interface IProfileInnerForm extends IForm {
    user: IUser
}
