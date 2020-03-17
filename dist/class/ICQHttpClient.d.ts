import { FormDataICQ } from './FormDataICQ';
export interface HttpClient {
    get<T>(url: string, params: any, header: {
        "user-agent": string;
    }): Promise<T>;
    post<T>(url: string, data: FormDataICQ, header: {
        "user-agent": string;
    }): Promise<T>;
}
export declare class ICQHttpClient implements HttpClient {
    get<T>(url: string, params: any, header: {
        "user-agent": string;
    }): Promise<T>;
    post<T>(url: string, data: FormDataICQ, header: {
        "user-agent": string;
    }): Promise<T>;
}
