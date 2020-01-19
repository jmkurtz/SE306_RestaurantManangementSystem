import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginSystemComponent } from '../login-system/login-system.component';

@Component({
  selector: 'app-reg-system',
  templateUrl: './reg-system.component.html',
  styleUrls: ['./reg-system.component.css']
})
export class RegSystemComponent implements OnInit {
  isValid: boolean = true;

  constructor(public dialog: MatDialog,
    private service: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<RegSystemComponent>) { }

  ngOnInit() { this.resetForm(); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.newUser = {
      id: null,
      firstName: null,
      lastName: null,
      emailAddress: null,
      passWord: null,
      isAdmin: false,
      priorityStatus: 0
      // This was removed on 4/4/2019 userName: null,
    };
  }

  close(){
    this.dialogRef.close();
  }

  openLogin(): void{
    this.dialogRef.close();
    const dialogRef = this.dialog.open(LoginSystemComponent, {
      width: '295px'
    });

    dialogRef.afterClosed();
  }

  validateForm() {
    console.log(this.service.newUser);
    if (this.service.newUser.firstName == null)
      this.isValid = false;
    else if (this.service.newUser.lastName == null)
      this.isValid = false;
    else if (this.service.newUser.emailAddress == null)
      this.isValid = false;
    else
      this.isValid = true;

    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.dialogRef.close();
      })
    }
    location.reload();
  }

}
