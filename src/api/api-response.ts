// Define the API response structure to be used in the API response
export default interface ApiResponse<T = unknown> {
    status: number; // 200, 201, 400, 401, 404, 500
    data: T; // data to be returned, with a generic type
    message: string; // message to be returned
    message_vi?: string; // message to be returned in Vietnamese
}
