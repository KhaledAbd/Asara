import { BillItem } from './billItem';
import { User } from './user';

export interface Bill {
    id: number;

    userId: number;

    userNavigation: User;

    cost: number;

    clientName: string;

    billItems: BillItem[];

    type: number;

    createdAt: Date;

    paid: number;
    
}
