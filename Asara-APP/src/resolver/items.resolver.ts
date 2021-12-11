import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/models/item';
import { ItemService } from 'src/service/item.service';

@Injectable()
export class ItemsResolver implements Resolve<Item[]> {
    constructor(private itemService: ItemService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Item[] | Observable<Item[]> | Promise<Item[]> {
        return this.itemService.getItems();
    }
}
