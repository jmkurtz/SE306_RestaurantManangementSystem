import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../src/environments/environment'
import { Observable } from 'rxjs';
import { InventoryDto } from './Models/inventoryDto';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  newInvItem : InventoryDto

  constructor(private http: HttpClient) { }

  saveInventory() {
    return this.http.post<InventoryDto>('api/inventory', this.newInvItem);
  }

  getInvItemList() : Observable<InventoryDto[]> {
    return this.http.get<InventoryDto[]>('api/inventory', options);
  }

  getInvItemByID(id:string): Observable<InventoryDto> {
    return this.http.get<InventoryDto>('api/inventory/' + id);
  }

  deleteInvItem(id:string) : Observable<{}>{
    console.log("Hi");
    return this.http.delete('api/inventory/' + id, options);
  }
}