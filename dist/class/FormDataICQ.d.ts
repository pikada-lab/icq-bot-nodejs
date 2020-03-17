export declare class FormDataICQ {
    private data;
    private files;
    private razdel;
    constructor();
    getBoundary(): any;
    append(name: any, value: any): void;
    appendFile(name: any, file: any): void;
    toString(): string;
}
