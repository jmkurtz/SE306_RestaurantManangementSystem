import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import { MatDialogRef, MatDialog, ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { RouterInitializer } from '@angular/router/src/router_module';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  commentControl = new FormControl('',Validators.required);
  firstNameControl = new FormControl('',Validators.required);
  lastNameControl = new FormControl('',Validators.required);
  constructor(public dialog: MatDialog) { }
  ngOnInit() {
  }

  openThankYou(): void{
    const dialogRef = this.dialog.open(ThankYouMessage, {
      width: '325px'
    });

    dialogRef.afterClosed();
  }


}

@Component({
  selector: 'app-thank-you-message',
  templateUrl: './thank-you-message.component.html'
})
export class ThankYouMessage implements OnInit {

  constructor(public dialogRef: MatDialogRef<ThankYouMessage>,
  public router: Router) { }

  ngOnInit() {}

  close(){
    this.router.navigate(['homepage']);
    this.dialogRef.close();
  }
}