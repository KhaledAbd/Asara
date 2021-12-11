import { Bill } from './bill';
import { Item } from './item';

export interface BillItem {
    id: number;

    price: number;

    quentity: number;

    itemId: number;

    itemNavigation: Item;

    billId: number;

    billNavigation: Bill;
}
