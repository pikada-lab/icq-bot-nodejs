
const assert = require('assert')
const FormDataICQ = require('../dist/class/FormDataICQ').FormDataICQ


describe("FormDataICQ", () => {
    describe("constructor", () => {
        let formDataICQ = new FormDataICQ();
        it("empty constructor", () => {
            try {
                let formDataICQ = new FormDataICQ();
                assert(true);
            } catch (ex) {
                assert(false, ex.message);
            }
        })
    })
    describe("getBoundary", () => {

        let formDataICQ = new FormDataICQ();
        let formDataICQ2 = new FormDataICQ();
        it("boundary mast be difrend", () => {
            assert(formDataICQ.getBoundary() != formDataICQ2.getBoundary());
        })
        it("boundary mast by implements pattern ----WebKitFormBoundary...", () => {
            assert(/(----WebKitFormBoundary[0-9A-F]+)/i.test(formDataICQ.getBoundary()))
        })

    })
    describe("append", () => {
        let formDataICQ = new FormDataICQ();
        it("(string, key) - add", () => {
            formDataICQ.append("name", 123);
            assert(formDataICQ.data.length == 1)
        })

        it("(string, key) - add", () => {
            assert(formDataICQ.data[0].name == "name" && formDataICQ.data[0].value == 123)
        })
    })
    describe("appendFile", () => {
        let formDataICQ = new FormDataICQ();
        it("(string, key) - add real FILE", () => {
            formDataICQ.appendFile("img", "./README.md");
            assert(formDataICQ.files.length == 1)
        })

        it("(string, key) - add", () => {
            assert(formDataICQ.files[0].name == "img" && formDataICQ.files[0].filename == "./README.md")
        })

        it("(string, key) - add fake FILE", () => {
            try {
                formDataICQ.appendFile("img", "./R.md");
            } catch (ex) {
                assert(formDataICQ.files.length == 1)
            }
        })

    })
    describe("toString", () => {
        it("post data body valid", () => {
            let formDataICQ = new FormDataICQ();
            formDataICQ.append("name", 123);
            formDataICQ.append("title", 321);
            let data = Buffer.from("--" + formDataICQ.getBoundary() + "\r\n" +
                "Content-Disposition: form-data; name=\"name\"\r\n\r\n" +
                "123\r\n--" + formDataICQ.getBoundary() + "\r\n"+ 
                "Content-Disposition: form-data; name=\"title\"\r\n\r\n" +
                "321\r\n--" + formDataICQ.getBoundary() + "--").toString("base64");
            let dataForm = Buffer.from(formDataICQ.toString()).toString("base64");
            assert(dataForm == data)
        });

        it("post data file any body valid", () => {

            let formDataICQ = new FormDataICQ();
            formDataICQ.appendFile("img", "./LICENSE");
            let dataForm = formDataICQ.toString();
            assert(/(Content-Type: "application\/octet-stream")/.test(dataForm))
        });

        it("post data file img valid", () => {

            let formDataICQ = new FormDataICQ();
            formDataICQ.appendFile("img", "./test/19.png");
            let dataForm = formDataICQ.toString();
            assert(/(Content-Type: "image\/png")/.test(dataForm))
        });

        it("post data file text valid", () => {

            let formDataICQ = new FormDataICQ();
            formDataICQ.appendFile("json", "./package.json");
            let dataForm = formDataICQ.toString();
            assert(/(Content-Type: "text\/json")/.test(dataForm))
        });
    })
})