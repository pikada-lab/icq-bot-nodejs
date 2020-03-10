import { UserWidthName } from "./User";

    export interface Message {
        from: UserWidthName;
        msgId: number;
        text: string;
        timestamp: number;
    }
