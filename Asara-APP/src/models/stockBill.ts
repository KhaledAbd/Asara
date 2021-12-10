import { StockItem } from './stockItem';
import { User } from './user';

export interface StockBill {
    id: number;
    userId: number;
    userNavigation: User;
    stockItems: StockItem[];
    type: number;
    createdAt: Date;
    worker: string;
}
