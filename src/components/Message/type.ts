export interface IMessage {
    id: number,
    text: string;
    type: 'incoming' | 'outgoing'
}
