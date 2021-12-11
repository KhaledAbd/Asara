import { Bill } from "./bill";
import { User } from "./user";

export interface Expenses {
    id: number;
    reason: string;
    paid: number;
    billId: number;
    billNavigation: Bill;
    type: boolean;
    createdAt: Date;
    userNavigation: User;
}
