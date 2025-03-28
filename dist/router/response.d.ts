export interface SinnoResponse {
    code: string;
    msg: string;
    status: number;
}
export interface SinnoRouteResponse<P> {
    payload: P | null;
    response: SinnoResponse;
}
