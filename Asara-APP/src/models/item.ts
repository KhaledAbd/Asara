import { BillItem } from './billItem';
import { Unit } from './unit';

export interface Item {
    id: number;
    name: string;
    price: number;
    quentity: number;
    unitId: number;
    unitNavigation: Unit;
    billItem: BillItem[];
    type: number;
}
