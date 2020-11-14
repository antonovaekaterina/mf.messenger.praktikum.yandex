import User from "../static/components/User";

describe('Component', () => {
    test('constructor Block work correctly', () => {
        const userInstance = new User({
            user: {
                id: 1,
                first_name: 'user_first_name',
                second_name: 'user_second_name',
                display_name: 'user_display_name',
                login: '',
                email: '',
                phone: '',
                avatar: '',
                role: ''
            }
        })

        expect(userInstance).toBeTruthy();
    });

    /*test('constructor work correctly', () => {
        const routeInstance = new Route('/example', Message, {
            id: 0,
            text: 'Привет',
            type: 'incoming'
        }, '.root')

        expect(routeInstance).toBeTruthy();
    });*/

});