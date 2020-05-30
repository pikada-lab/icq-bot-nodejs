"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var https = require('https');
var ICQHttpClient = (function () {
    function ICQHttpClient() {
    }
    ICQHttpClient.prototype.get = function (url, params, header) {
        return new Promise(function (resolve, reject) {
            var requestString = "?";
            for (var i in params) {
                if (Array.isArray(params[i])) {
                    for (var _i = 0, _a = params[i]; _i < _a.length; _i++) {
                        var j = _a[_i];
                        requestString += encodeURIComponent(i) + "=" + encodeURIComponent(j) + "&";
                    }
                }
                else {
                    requestString += encodeURIComponent(i) + "=" + encodeURIComponent(params[i]) + "&";
                }
            }
            requestString = requestString.slice(0, -1);
            var urlData = new url_1.URL(url);
            var req = https.request({
                host: urlData.hostname,
                port: urlData.port,
                path: "" + urlData.pathname + requestString,
                method: "GET",
                headers: {
                    // "Content-Type": "application/json",
                    "user-agent": header["user-agent"]
                }
            }, function (res) {
                res.setEncoding('utf8');
                var rawData = '';
                res.on('data', function (chunk) { rawData += chunk; });
                res.on('end', function (d) {
                    try {
                        resolve(JSON.parse(rawData.toString()));
                    }
                    catch (ex) {
                        console.log(ex.message);
                    }
                });
            });
            req.on("error", function (d) {
                reject(d);
            });
            req.end();
        });
    };
    ICQHttpClient.prototype.post = function (url, data, header) {
        return new Promise(function (resolve, reject) {
            var urlData = new url_1.URL(url);
            var content = data.toString();
            var req = https.request({
                host: urlData.hostname,
                path: urlData.pathname,
                port: urlData.port,
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data; boundary=" + data.getBoundary(),
                    "user-agent": header["user-agent"],
                }
            }, function (res) {
                res.setEncoding('utf8');
                var rawData = '';
                res.on('data', function (chunk) { rawData += chunk; });
                res.on('end', function () {
                    resolve(JSON.parse(rawData.toString()));
                });
            });
            req.on("error", function (d) {
                reject(d);
            });
            req.write(content, "latin1");
            req.end();
        });
    };
    return ICQHttpClient;
}());
exports.ICQHttpClient = ICQHttpClient;
//# sourceMappingURL=ICQHttpClient.js.map