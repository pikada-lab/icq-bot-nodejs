import { User } from "../Entities/User";
import { Response } from "./Response";

export interface ResponseMembers extends Response {
    members: User[]
}
