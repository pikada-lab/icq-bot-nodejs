import { URL } from 'url';
import { FormDataICQ } from './FormDataICQ';

var https = require('https') 

export interface HttpClient {
    get<T>(url: string, params: any, header: { "user-agent": string }): Promise<T>;
    post<T>(url: string, data: FormDataICQ, header: { "user-agent": string }): Promise<T>;
}

export class ICQHttpClient implements HttpClient {
    get<T>(url: string, params: any, header: { "user-agent": string }): Promise<T> {
        return new Promise((resolve, reject) => {
            let requestString = "?";
            for (let i in params) {
                requestString += `${encodeURI(i)}=${encodeURI(params[i])}&`
            }
            requestString = requestString.slice(0, -1);
            let urlData = new URL(url);
            var req = https.request(
                {
                    host: urlData.hostname,
                    port: urlData.port,
                    path: `${urlData.pathname}${requestString}`,
                    method: "GET",
                    headers: {
                        // "Content-Type": "application/json",
                        "user-agent": header["user-agent"]
                    }
                },
                function (res) {
                    res.on('data', (d: Buffer) => {
                        resolve(JSON.parse(d.toString()) as T);
                    })
                }
            )
            req.on("error", (d) => {
                reject(d);
            });
            req.end();
        })
    }

    post<T>(url: string, data: FormDataICQ, header: { "user-agent": string }): Promise<T> {
        return new Promise((resolve, reject) => {

            let urlData = new URL(url);
            let content = data.toString();
            var req = https.request(
                {
                    host: urlData.hostname,
                    path: urlData.pathname,
                    port: urlData.port,
                    method: "POST",
                    headers: {
                        "Content-Type": `multipart/form-data; boundary=${data.getBoundary()}`,
                        "user-agent": header["user-agent"],
                        // "Content-Length": content.length,
                        // "Connection": "keep-alive",
                        // "Keep-Alive": 300,
                    }
                },
                function (res) {
                    res.on('data', (d) => {
                        resolve(JSON.parse(d.toString()) as T);
                    })
                }
            )

            req.on("error", (d) => {
                reject(d);
            });

            req.write(content, "latin1");
            req.end();
        })
    }

}
