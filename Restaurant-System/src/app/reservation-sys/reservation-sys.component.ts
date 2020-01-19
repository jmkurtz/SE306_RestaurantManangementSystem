import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource } from '@angular/material';
import { ReservationService } from '../reservation.service';
import { ReservationDto } from '../Models/reservationDto';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-reservation-sys',
  templateUrl: './reservation-sys.component.html',
  styleUrls: ['./reservation-sys.component.css']
})
export class ReservationSysComponent implements OnInit {
  displayedColumns: string[] = ['ReservationID', 'ReservationName', 'UserPriority','ReservationTime', 'Date', 'TableSize', 'CheckInOut', 'Edit', 'Delete']
  newDataSource: ReservationDto[];
  checked: boolean = false;
  dataSource: any;

  constructor(public dialog: MatDialog,
    public service: ReservationService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.service.getReservationList().subscribe(result => {
      this.newDataSource = result;
      console.log(this.newDataSource);
      this.dataSource = new MatTableDataSource<ReservationDto>(this.newDataSource)
      this.dataSource.paginator = this.paginator;
    });
  }

  reloadPage(){
    this.ngOnInit();
  }

  deleteItem(element : ReservationDto){
    this.service.deleteReservation(element.id).subscribe();
    console.log(element.id);
  }
  
  openAddAdminReservation(): void{
    const dialogRef = this.dialog.open(AddReservation, {
      width: '325px'
    });

    dialogRef.afterClosed();
  }

  openEditAdminReservation(element: ReservationDto): void{
    this.service.newReservation = element;
    const dialogRef = this.dialog.open(EditReservation, {
      width: '325px'
    });

    dialogRef.afterClosed();
  }

  openCheckOut(element: ReservationDto){
    this.service.newReservation = element;
    this.service.newReservation.isCheckedIn = false;
    const dialogRef = this.dialog.open(CheckOutReservation, {
      width: '325px'
    });

    dialogRef.afterClosed();
  }

  checkIn(element: ReservationDto){
    this.service.newReservation = element;
    this.service.newReservation.isCheckedIn = true;
    this.service.checkinReservation();
  }

}

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html'
})
export class AddReservation implements OnInit {
  theDate : string
  theTime : string
  constructor(public dialogRef: MatDialogRef<AddReservation>,
    public service: ReservationService
    
  ) { }
    
  ngOnInit() { this.resetForm(); }

  onNoClick(): void {
    this.dialogRef.close();
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
  
    onSubmit(form: NgForm) {
      if(this.validateForm()){
        this.service.newReservation.reservationTime = this.transform(this.theTime);
        this.service.newReservation.userPriorityStatus = "Guest";
        this.service.saveReservation().subscribe(res => {
          this.resetForm();
          this.dialogRef.close();
        })
      }
    }

}

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html'
})
export class EditReservation implements OnInit {
  selectedItem: string
  theTime: string
  constructor(public dialogRef: MatDialogRef<AddReservation>,
    public service: ReservationService

  ) { }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
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
      this.service.saveReservation().subscribe(res => {
        this.dialogRef.close();
      })
    }

}

@Component({
  selector: 'app-checkout-reservation',
  templateUrl: './checkout-reservation.component.html'
})
export class CheckOutReservation implements OnInit {
  selectedItem: string
  theTime: string
  constructor(public dialogRef: MatDialogRef<AddReservation>,
    public service: ReservationService

  ) { }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    this.service.checkoutReservation().subscribe(res => {
      this.dialogRef.close();
    })
  }

}

