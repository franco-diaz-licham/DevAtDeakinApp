/** Generic API wrapper from server, handle a list of responses. */
export interface ApiResponse<T> {
    statusCode: number;
    data: T;
}
