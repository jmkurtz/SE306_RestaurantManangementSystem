import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { UserDto } from '../Models/userDto';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegSystemComponent } from '../reg-system/reg-system.component';

@Component({
  selector: 'app-login-system',
  templateUrl: './login-system.component.html',
  styleUrls: ['./login-system.component.css']
})

export class LoginSystemComponent implements OnInit {
  
  constructor(public dialog: MatDialog,
    private service: UserService,
    private dialogRef: MatDialogRef<LoginSystemComponent>,
    public router: Router) { }

  userList: UserDto[];
  isValid: boolean = true;
  username: string;
  password: string;

  ngOnInit() {
    this.resetForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
  }

  validateForm() {
    if (this.service.loginRequest.id == null)
      this.isValid = false;
    else if (this.service.loginRequest.passWord == null)
      this.isValid = false;
    else
      this.isValid = true;

    return this.isValid;
  }

  openRegistration(): void{
    this.dialogRef.close();
    const dialogRef = this.dialog.open(RegSystemComponent, {
      width: '520px'
    });

    dialogRef.afterClosed();
  }

  close(){
    this.dialogRef.close();
  }

  locObj: UserDto;

  onSubmit(form: NgForm) {
    this.service.loginRequest.id = this.username;
    this.service.loginRequest.passWord = this.password;
    if (this.validateForm()) {
        this.service.sendUserLoginRequest().subscribe(res => {
          this.locObj = {
            id: this.service.loginRequest.id,
            firstName: res.firstName,
            lastName: res.lastName,
            passWord: this.service.loginRequest.passWord,
            emailAddress: res.emailAddress,
            isAdmin: res.isAdmin,
            priorityStatus: res.priorityStatus
          };

          localStorage.setItem(
            'userdata',
            JSON.stringify(this.locObj)
          );

          this.dialogRef.close();
        });
        this.router.navigate(['homepage']);
    }
    else{
      console.log("NOT VALID");
    }
    //console.log(this.service.loginRequest.firstName);
  }
}
