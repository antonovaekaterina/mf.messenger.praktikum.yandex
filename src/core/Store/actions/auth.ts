export const TYPE_SET_USER = 'set-user';

export const setUser = (user: any) => ({
    type: TYPE_SET_USER,
    value: user
});
