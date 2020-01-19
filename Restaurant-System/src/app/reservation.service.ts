import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../src/environments/environment'
import { Observable } from 'rxjs';
import { InventoryDto } from './Models/inventoryDto';
import { Injectable } from '@angular/core';
import { ReservationDto } from './Models/reservationDto';

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  newReservation : ReservationDto

  constructor(private http: HttpClient) { }

  saveReservation() {
    return this.http.post<ReservationDto>('api/reservation', this.newReservation);
  }

  getReservationList() : Observable<ReservationDto[]> {
    return this.http.get<ReservationDto[]>('api/reservation', options);
  }

  getReservationByID(id:string): Observable<ReservationDto> {
    return this.http.get<ReservationDto>('api/reservation/' + id);
  }

  deleteReservation(id:string) : Observable<{}>{
    return this.http.delete('api/reservation/' + id, options);
  }

  checkinReservation(){
    console.log("Check In");
    return this.http.post<ReservationDto>('api/reservation/checkin', this.newReservation);
  }

  checkoutReservation(){
    console.log("Check Out");
    return this.http.post<ReservationDto>('api/reservation/checkout', this.newReservation);
  }
}
