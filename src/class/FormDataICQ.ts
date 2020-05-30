var fs = require('fs');
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
        if (!fs.existsSync(file))
            throw "File not exist " + file;
        this.files.push({ name: name, filename: file });
    }
    public toString() {
        let data = "";
        for (let i of this.files) {
            data += "--" + this.razdel + "\r\n";
            let fileName = i.filename.split(/\//g);
            let parts = i.filename.split(".");
            let ext = parts[parts.length - 1];
            data += "Content-Disposition: form-data; name=\"" + i.name + "\"; filename=\"" + fileName[fileName.length - 1] + "\"\r\n";
            if (/(jpg|jpeg|png|gif)/i.test(ext)) {
                data += "Content-Type: \"image/" + ext + "\"\r\n\r\n";
            }
            else if (/(txt|html|css|cmd|htm|json)/i.test(ext)) {
                data += "Content-Type: \"text/" + ext + "\"\r\n\r\n";
            }
            else {
                data += "Content-Type: \"application/octet-stream\"\r\n\r\n";
            }
            data += fs.readFileSync(i.filename, "latin1"); // Без latin1 будет битый файл

        }
        for (let i of this.data) {
            if (data)
                data += "\r\n";
            data += "--" + this.razdel + "\r\n";
            data += "Content-Disposition: form-data; name=\"" + i.name + "\"\r\n\r\n";
            data += Buffer.from(i.value.toString(), "utf8").toString("latin1");
        }
        data += `\r\n--${this.razdel}--`;
        return data;
    }
}
