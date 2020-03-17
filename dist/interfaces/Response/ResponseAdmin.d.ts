import { User } from "../Entities/User";
import { Response } from "./Response";
export interface ResponseAdmin extends Response {
    admins: User[];
}
