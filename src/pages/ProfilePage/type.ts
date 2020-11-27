import IUser from '../../types/UserType';
import {IForm} from '../../components/Form/types';

export interface IProfilePageProps {

}

export interface IProfileInnerForm extends IForm {
    user: IUser
}
