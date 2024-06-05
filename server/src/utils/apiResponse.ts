

export class ApiResponse {
    private readonly code: number;
    private readonly message: string;
    private readonly data: any;

    constructor(code: number, message: string, data: null) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    static success(data: any) {
        return new ApiResponse(200, 'Success', data);
    }
    static error(message: string) {
        return new ApiResponse(500, message, null);
    }
    static badRequest(message: string) {
        return new ApiResponse(400, message, null);
    }
    static notFound(message: string) {
        return new ApiResponse(404, message, null);
    }
    toJson() {
        return {
            code: this.code,
            message: this.message,
            data: this.data
        };
    }
}