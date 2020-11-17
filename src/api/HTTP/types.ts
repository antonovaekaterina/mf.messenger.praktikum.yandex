export interface IOptions {
    method?: 'GET' | 'PUT' | 'POST' | 'DELETE',
    headers?: Record<string, any>
    data?: string | FormData,
    timeout?: number
}