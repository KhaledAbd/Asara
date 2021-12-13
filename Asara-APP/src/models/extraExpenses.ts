import { User } from "./user";

export interface ExtraExpenses {
    id: number;
    reason: string;
    paid: number;
    createdAt: Date;
    userNavigation: User;
}
