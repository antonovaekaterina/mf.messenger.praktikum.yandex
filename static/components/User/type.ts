export interface IUser {
    name: string;
    status: 'online' | 'offline' | 'idle',
    thumbnailURL?: string,
    message?: string
}