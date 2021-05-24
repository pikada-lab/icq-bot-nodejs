"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormDataICQ = void 0;
var fs = require('fs');
var FormDataICQ = /** @class */ (function () {
    function FormDataICQ() {
        this.data = [];
        this.files = [];
        this.razdel = "----WebKitFormBoundary" + (Math.random() * Math.pow(10, 18)).toString(16);
    }
    FormDataICQ.prototype.getBoundary = function () {
        return this.razdel;
    };
    FormDataICQ.prototype.append = function (name, value) {
        this.data.push({ name: name, value: value });
    };
    FormDataICQ.prototype.appendFile = function (name, file) {
        if (!fs.existsSync(file))
            throw "File not exist " + file;
        this.files.push({ name: name, filename: file });
    };
    FormDataICQ.prototype.toString = function () {
        var data = "";
        for (var _i = 0, _a = this.files; _i < _a.length; _i++) {
            var i = _a[_i];
            data += "--" + this.razdel + "\r\n";
            var fileName = i.filename.split(/(\/|\\)/g);
            var parts = i.filename.split(".");
            var ext = parts[parts.length - 1];
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
        for (var _b = 0, _c = this.data; _b < _c.length; _b++) {
            var i = _c[_b];
            if (data)
                data += "\r\n";
            data += "--" + this.razdel + "\r\n";
            data += "Content-Disposition: form-data; name=\"" + i.name + "\"\r\n\r\n";
            data += Buffer.from(i.value.toString(), "utf8").toString("latin1");
        }
        data += "\r\n--" + this.razdel + "--";
        return data;
    };
    return FormDataICQ;
}());
exports.FormDataICQ = FormDataICQ;
//# sourceMappingURL=FormDataICQ.js.map