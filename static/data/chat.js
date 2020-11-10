export default {
    contacts: [
        {
            id: 1,
            name: 'Василий Панкратович',
            status: 'online',
            message: 'Привет! Как твое ничего?',
            newMessageCount: 1,
        },
        {
            id: 2,
            name: 'Евгения Виссарионовна',
            status: 'online',
            message: 'Не поверишь, что я только что узнала!',
            newMessageCount: 2
        },
        {
            id: 3,
            name: 'Лариса Павловна',
            status: 'online',
            message: 'Приглашаю тебя на юбилей!',
            newMessageCount: 0,
            isActive: true
        },
    ],
    user: {
        id: 1,
        name: 'Прасковья Иосифовна',
        status: 'online',
    },
    messages: [
        {
            id: 1,
            text: 'Входящее сообщение',
            type: 'incoming'
        },
        {
            id: 2,
            text: 'Исходящее сообщение',
            type: 'outgoing'
        },
        {
            id: 3,
            text: 'Еще одно исходящее сообщение',
            type: 'outgoing'
        },
    ]
};
//# sourceMappingURL=chat.js.map