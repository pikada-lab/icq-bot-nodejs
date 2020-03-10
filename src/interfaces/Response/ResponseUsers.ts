import { User } from "../Entities/User";
import { Response } from "./Response";

export interface ResponseUsers extends Response {
    users: User[]
}
