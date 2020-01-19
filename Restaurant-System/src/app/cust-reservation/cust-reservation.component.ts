import { ReservationDto } from '../Models/reservationDto';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ReservationService } from '../reservation.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../users.service';
import { Router } from '@angular/router';
import { UserDto } from '../Models/userDto';

@Component({
  selector: 'app-cust-reservation',
  templateUrl: './cust-reservation.component.html',
  styleUrls: ['./cust-reservation.component.css']
})
export class CustReservationComponent implements OnInit {
  reservations: ReservationDto[];
  checked: boolean = false;

  constructor(public dialog: MatDialog,
    public service: ReservationService,
    private router: Router,
    public userService: UserService) { }

  ngOnInit() {
    this.service.getReservationList().subscribe(result => {
      this.reservations = result;
    });
    this.getUserData();
    this.ifLogged();
  }

  locObj: UserDto;
  getUserData(){
    if(localStorage.getItem('userdata') === null){
      this.locObj = {id: null,firstName: null,lastName: null,passWord: null,emailAddress: null,isAdmin: null,priorityStatus: null};
    }
    else{
      this.locObj = JSON.parse(localStorage.getItem('userdata'));
    }
  }

  ifLogged(){
    if(this.locObj.id == null){
      this.router.navigate(['homepage']);
    }
  }

  reloadPage(){
    window.location.reload();
  }

  deleteItem(element : ReservationDto){
    this.service.deleteReservation(element.id).subscribe();
    console.log(element.id);
  }

  openAddReservation(): void{
    const dialogRef = this.dialog.open(CustAddReservation, {
      width: '325px'
    });

    dialogRef.afterClosed();
  }

  openEditReservation(element: ReservationDto): void{
    this.service.newReservation = element;
    const dialogRef = this.dialog.open(CustEditReservation, {
      width: '325px'
    });

    dialogRef.afterClosed();
  }

}

@Component({
  selector: 'app-cust-add-reservation',
  templateUrl: './cust-add-reservation.component.html'
})
export class CustAddReservation implements OnInit {
  theDate : string
  theTime : string
  constructor(public dialogRef: MatDialogRef<CustAddReservation>,
    public service: ReservationService,
    public userService: UserService
  ) { }

  ngOnInit() { 
    this.resetForm();
    this.getUserData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  locObj: UserDto;
  getUserData(){
    if(localStorage.getItem('userdata') === null){
        this.locObj = {id: null,firstName: null,lastName: null,passWord: null,emailAddress: null,isAdmin: null,priorityStatus: null};
    }
    else{
      this.locObj = JSON.parse(localStorage.getItem('userdata'));
    }
  }

    //INFO TO API
  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
      this.service.newReservation = {
        id: null,
        reservationDate: null,
        reservationTime: null,
        tableSize: null,
        userId: null,
        userFirstName: null,
        userEmail: null,
        amountSpent: null,
        isCheckedIn: false,
        userPriorityStatus: null
      };
  }

  validateForm(){
    if(this.service.newReservation.userEmail == null)
      return false;
    else if(this.service.newReservation.tableSize == 0)
      return false;
    else
      return true;
  }

  transform(time: any): any {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
  }

  currentStatus(status:number): string
  {
      if (status == 0)
          return "New Customer";
      else if (status < 200)
          return "Bronze";
      else if (status < 400)
          return "Silver";
      else if (status >= 400)
          return "Gold";
      else
          return "Bad Customer";
  }
  
    onSubmit(form: NgForm) {
      this.service.newReservation.reservationTime = this.transform(this.theTime);
      this.service.newReservation.userId = this.locObj.id;
      this.service.newReservation.userFirstName = this.locObj.lastName;
      this.service.newReservation.userEmail = this.locObj.emailAddress;
      this.service.newReservation.isCheckedIn = false;
      this.service.newReservation.userPriorityStatus = this.currentStatus(this.locObj.priorityStatus)
      this.service.saveReservation().subscribe(res => {
        this.dialogRef.close();
      })
    }
}

@Component({
  selector: 'app-cust-edit-reservation',
  templateUrl: './cust-edit-reservation.component.html'
})
export class CustEditReservation implements OnInit {
  selectedItem: string
  theTime: string
  constructor(public dialogRef: MatDialogRef<CustAddReservation>,
    public service: ReservationService,
    public userService: UserService

  ) { }

  ngOnInit() {this.getUserData();}

  onNoClick(): void {
    this.dialogRef.close();
  }

  locObj: UserDto;
  getUserData(){
    if(localStorage.getItem('userdata') === null){
        this.locObj = {id: null,firstName: null,lastName: null,passWord: null,emailAddress: null,isAdmin: null,priorityStatus: null};
    }
    else{
      this.locObj = JSON.parse(localStorage.getItem('userdata'));
    }
  }

  transform(time: any): any {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
  }

    onSubmit(form: NgForm) {
      this.service.newReservation.reservationTime = this.transform(this.theTime);
      this.service.newReservation.userId = this.locObj.id;
      this.service.newReservation.userFirstName = this.locObj.lastName;
      this.service.newReservation.userEmail = this.locObj.emailAddress;
      this.service.newReservation.isCheckedIn = false;
      this.service.saveReservation().subscribe(res => {
        this.dialogRef.close();
      })
    }

}