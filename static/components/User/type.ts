export interface IUser {
    id: number,
    name: string;
    status: 'online' | 'offline' | 'idle',
    thumbnailURL?: string,
    message?: string
}
