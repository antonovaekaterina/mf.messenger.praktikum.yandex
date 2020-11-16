export default class Service {

    hasError(status: number) {
        return status !== 200;
    }

    makeErrorDescription(result: any) {
        let reason: string | undefined;

        if (result.response && (typeof result.response === 'string')) {
            const response = JSON.parse(result.response)
            reason = response.reason;
        }
        return new Error(`Ответ от сервера: ${result.status} | ${reason}`);
    }
}