const assert = require("assert");
const ICQHttpClient = require("../dist/class/ICQHttpClient").ICQHttpClient

const FormDataICQ = require('../dist/class/FormDataICQ').FormDataICQ

describe("ICQHttpClient.", () => {
    let http = new ICQHttpClient();
    describe("Handler HandlerBase.", () => {
        it("get(http...) > 27,6 Kb", (done) => {
            http.get("https://fake-mm.ru/api.php", {
                id: "8-bitnaya",
                space: "articles",
                fn: "get"
            }, { "user-agent": "nodejs/test" }).then(res => { 
                if(res.status == 0 && res.response.id == 905197222)  done()
            })
        });
        it("post(http...) > 27,6 Kb", (done) => {
            let data = new FormDataICQ();
            data.append("id","8-bitnaya");
            data.append("space","articles");
            data.append("fn","get");
            http.post("https://fake-mm.ru/api.php", data, { "user-agent": "nodejs/test" }).then(res => { 
                if(res.status == 0 && res.response.id == 905197222)  done()
            })
        });
    });
});