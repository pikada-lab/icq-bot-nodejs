import { URL } from 'url';

var https = require('https')
var fs = require('fs')

export interface HttpClient {
    get<T>(url: string, params: any, header: { "user-agent": string }): Promise<T>;
    post<T>(url: string, data: FormDataICQ, header: { "user-agent": string }): Promise<T>;
}

export class FormDataICQ {
    private data = [];
    private files = [];
    private razdel;
    constructor() {
        this.razdel = "----WebKitFormBoundary" + (Math.random() * Math.pow(10, 18)).toString(16);
    }

    getBoundary() {
        return this.razdel;
    }
    public append(name, value) {
        this.data.push({ name: name, value: value });
    }
    public appendFile(name, file) {
        if (!fs.existsSync(file)) throw "File not exist " + file;
        this.files.push({ name: name, filename: file });
    }
    public toString() {
        let data = "";

        for (let i of this.files) {
            try {
                data += "--" + this.razdel + "\r\n";
                let fileName = i.filename.split(/\//g);
                data += "Content-Disposition: form-data; name=\"" + i.name + "\"; filename=\"" + fileName[fileName.length - 1] + "\"\r\n";
                data += "Content-Type: \"image/png\"\r\n\r\n"; 
                data += fs.readFileSync(i.filename, "latin1"); // Без latin1 будет битый файл
            } catch (ex) {
                console.log(ex);
            }
        }

        for (let i of this.data) {
            if (data)
                data += "\r\n";
            data += "--" + this.razdel + "\r\n";
            data += "Content-Disposition: form-data; name=\"" + i.name + "\"\r\n\r\n";
            data += i.value;
        }


        data += `\r\n--${this.razdel}--`;
        return data;
    }
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
