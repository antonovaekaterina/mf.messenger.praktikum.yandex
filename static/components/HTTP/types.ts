export interface IOptions {
    method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | string,
    headers?: Record<string, any>
    data?: string | FormData,
    timeout?: number
}