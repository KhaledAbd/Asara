import { Item } from "./item";
import { StockBill } from "./stockBill";

export interface StockItem {
    id: number;
    quentity: number;
    itemId: number;
    itemNavigation: Item;
    stockBillId: number;
    stockBill: StockBill;
}
